import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { getSigningSecret, verifyInstallToken } from '@/lib/install-token'
import { buildPromptVariables, parseRewriteRequestBody, type RewriteRequestBody } from '@/lib/rewrite-api'
import { getCanonicalPersona } from '@/lib/personas-server'
import {
  RATE_LIMITS,
  checkRateLimit,
  getClientKey,
  rateLimitResponseHeaders,
} from '@/lib/rate-limit'
import { shouldRejectDailyBudget } from '@/lib/spend-guard'

/**
 * Prefer this server's own canonical persona data over whatever the client
 * sent. This is what makes persona hotfixes possible without a new VSIX:
 * fix the wording here and redeploy, and every installed extension picks it
 * up on its next request — no client update needed.
 *
 * Falls back to the client-supplied fields when the persona id isn't in the
 * canonical set yet (e.g. an older/newer extension build referencing a
 * persona this deployment hasn't synced), so requests degrade gracefully
 * instead of failing outright during a rollout.
 */
function resolvePersonaFields(body: RewriteRequestBody): RewriteRequestBody {
  const canonical = getCanonicalPersona(body.persona)
  if (!canonical) {
    return body
  }

  return {
    ...body,
    personaName: canonical.name,
    personaEmoji: canonical.emoji,
    personaSystemPrompt: canonical.systemPrompt,
    personaMetadata: canonical.metadata,
  }
}

export const runtime = 'nodejs'

const DEFAULT_PROMPT_ID = 'pmpt_6a47dda639808194877bc3e2d961224307ddfd2442c27bfb'
const DEFAULT_PROMPT_VERSION = '22'

function getBearerToken(request: Request): string | undefined {
  const header = request.headers.get('authorization')
  if (!header?.toLowerCase().startsWith('bearer ')) {
    return undefined
  }
  const token = header.slice(7).trim()
  return token.length > 0 ? token : undefined
}

export async function POST(request: Request) {
  const secret = getSigningSecret()
  if (!secret) {
    return NextResponse.json({ error: 'Server is missing QUACKIE_SIGNING_SECRET' }, { status: 500 })
  }

  const token = getBearerToken(request)
  if (!token) {
    return NextResponse.json({ error: 'Missing install token' }, { status: 401 })
  }

  const verified = verifyInstallToken(token, secret)
  if (!verified.ok) {
    const message =
      verified.reason === 'expired'
        ? 'Install token expired'
        : 'Invalid install token'
    return NextResponse.json({ error: message }, { status: 401 })
  }

  const installId = verified.payload.installId

  const clientKey = getClientKey(request)
  const ipLimit = checkRateLimit('rewrite-ip', clientKey, RATE_LIMITS.rewrite)
  if (!ipLimit.allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please slow down and try again shortly.' },
      {
        status: 429,
        headers: rateLimitResponseHeaders(ipLimit),
      },
    )
  }

  const installLimit = checkRateLimit('rewrite-install', installId, RATE_LIMITS.rewrite)
  if (!installLimit.allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please slow down and try again shortly.' },
      {
        status: 429,
        headers: rateLimitResponseHeaders(installLimit),
      },
    )
  }

  if (shouldRejectDailyBudget()) {
    return NextResponse.json(
      { error: 'Quackie is temporarily unavailable. Please try again later.' },
      { status: 503 },
    )
  }

  let rawBody: unknown

  try {
    rawBody = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const parsedBody = parseRewriteRequestBody(rawBody)
  if (!parsedBody) {
    return NextResponse.json(
      { error: 'Expected { persona: string, type: string, text: string }' },
      { status: 400 },
    )
  }

  const body = resolvePersonaFields(parsedBody)

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Server is missing OPENAI_API_KEY' }, { status: 500 })
  }

  const client = new OpenAI({ apiKey })

  try {
    const response = await client.responses.create({
      prompt: {
        id: process.env.OPENAI_PROMPT_ID ?? DEFAULT_PROMPT_ID,
        version: process.env.OPENAI_PROMPT_VERSION ?? DEFAULT_PROMPT_VERSION,
        variables: buildPromptVariables(body),
      },
    })

    const text = response.output_text?.trim()
    if (!text) {
      return NextResponse.json({ error: 'OpenAI returned an empty rewrite' }, { status: 502 })
    }

    return NextResponse.json({ text })
  } catch (error) {
    const status = (error as { status?: number } | undefined)?.status
    if (status === 429) {
      return NextResponse.json(
        { error: 'Quackie is experiencing high demand right now. Please try again shortly.' },
        { status: 502 },
      )
    }

    const message = error instanceof Error ? error.message : 'Unknown error calling OpenAI'
    return NextResponse.json({ error: message }, { status: 502 })
  }
}

import { NextResponse } from 'next/server'
import OpenAI from 'openai'

export const runtime = 'nodejs'

const DEFAULT_PROMPT_ID = 'pmpt_6a47dda639808194877bc3e2d961224307ddfd2442c27bfb'
const DEFAULT_PROMPT_VERSION = '16'
const MAX_TEXT_LENGTH = 2000

interface RewriteRequestBody {
  persona: string
  type: string
  text: string
  personaName?: string
  personaEmoji?: string
  personaMetadata?: Record<string, unknown>
}

function parseBody(value: unknown): RewriteRequestBody | undefined {
  if (!value || typeof value !== 'object') {
    return undefined
  }

  const body = value as Record<string, unknown>

  if (
    typeof body.persona !== 'string' ||
    typeof body.type !== 'string' ||
    typeof body.text !== 'string' ||
    body.text.trim().length === 0 ||
    body.text.length > MAX_TEXT_LENGTH
  ) {
    return undefined
  }

  return {
    persona: body.persona,
    type: body.type,
    text: body.text,
    personaName: typeof body.personaName === 'string' ? body.personaName : undefined,
    personaEmoji: typeof body.personaEmoji === 'string' ? body.personaEmoji : undefined,
    personaMetadata:
      body.personaMetadata && typeof body.personaMetadata === 'object'
        ? (body.personaMetadata as Record<string, unknown>)
        : undefined,
  }
}

function buildPromptVariables(body: RewriteRequestBody): Record<string, string> {
  return {
    rewrite_type: body.type,
    input_text: body.text,
    persona_name: body.personaName ?? body.persona,
    persona_emoji: body.personaEmoji ?? '',
  }
}

export async function POST(request: Request) {
  let rawBody: unknown

  try {
    rawBody = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const body = parseBody(rawBody)
  if (!body) {
    return NextResponse.json(
      { error: 'Expected { persona: string, type: string, text: string }' },
      { status: 400 },
    )
  }

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
    const message = error instanceof Error ? error.message : 'Unknown error calling OpenAI'
    return NextResponse.json({ error: message }, { status: 502 })
  }
}

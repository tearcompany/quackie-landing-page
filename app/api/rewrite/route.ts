import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { buildPromptVariables, parseRewriteRequestBody } from '@/lib/rewrite-api'

export const runtime = 'nodejs'

const DEFAULT_PROMPT_ID = 'pmpt_6a47dda639808194877bc3e2d961224307ddfd2442c27bfb'
const DEFAULT_PROMPT_VERSION = '20'

export async function POST(request: Request) {
  let rawBody: unknown

  try {
    rawBody = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const body = parseRewriteRequestBody(rawBody)
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

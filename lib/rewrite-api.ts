export const MAX_REWRITE_TEXT_LENGTH = 2000
export const MAX_SYSTEM_PROMPT_LENGTH = 20000

export interface RewriteRequestBody {
  persona: string
  type: string
  text: string
  personaName?: string
  personaEmoji?: string
  personaSystemPrompt?: string
  personaMetadata?: Record<string, unknown>
}

export function parseRewriteRequestBody(value: unknown): RewriteRequestBody | undefined {
  if (!value || typeof value !== 'object') {
    return undefined
  }

  const body = value as Record<string, unknown>

  if (
    typeof body.persona !== 'string' ||
    typeof body.type !== 'string' ||
    typeof body.text !== 'string' ||
    body.text.trim().length === 0 ||
    body.text.length > MAX_REWRITE_TEXT_LENGTH
  ) {
    return undefined
  }

  if (
    typeof body.personaSystemPrompt === 'string' &&
    body.personaSystemPrompt.length > MAX_SYSTEM_PROMPT_LENGTH
  ) {
    return undefined
  }

  return {
    persona: body.persona,
    type: body.type,
    text: body.text,
    personaName: typeof body.personaName === 'string' ? body.personaName : undefined,
    personaEmoji: typeof body.personaEmoji === 'string' ? body.personaEmoji : undefined,
    personaSystemPrompt:
      typeof body.personaSystemPrompt === 'string' ? body.personaSystemPrompt : undefined,
    personaMetadata:
      body.personaMetadata && typeof body.personaMetadata === 'object'
        ? (body.personaMetadata as Record<string, unknown>)
        : undefined,
  }
}

export function buildPromptVariables(body: RewriteRequestBody): Record<string, string> {
  return {
    rewrite_type: body.type,
    input_text: body.text,
    persona_name: body.personaName ?? body.persona,
    persona_emoji: body.personaEmoji ?? '',
    persona_system_prompt: body.personaSystemPrompt ?? '',
    persona_metadata_json: JSON.stringify(body.personaMetadata ?? {}),
  }
}

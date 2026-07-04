import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { buildPromptVariables, parseRewriteRequestBody } from './rewrite-api.js'

describe('parseRewriteRequestBody', () => {
  it('accepts a minimal valid payload', () => {
    const body = parseRewriteRequestBody({
      persona: 'moo',
      type: 'commit',
      text: 'fix validation',
    })

    assert.deepEqual(body, {
      persona: 'moo',
      type: 'commit',
      text: 'fix validation',
      personaName: undefined,
      personaEmoji: undefined,
      personaSystemPrompt: undefined,
      personaMetadata: undefined,
    })
  })

  it('rejects empty text', () => {
    assert.equal(
      parseRewriteRequestBody({ persona: 'moo', type: 'commit', text: '   ' }),
      undefined,
    )
  })

  it('rejects oversized system prompts', () => {
    assert.equal(
      parseRewriteRequestBody({
        persona: 'moo',
        type: 'commit',
        text: 'fix validation',
        personaSystemPrompt: 'x'.repeat(20001),
      }),
      undefined,
    )
  })
})

describe('buildPromptVariables', () => {
  it('maps request fields to prompt variables', () => {
    const variables = buildPromptVariables({
      persona: 'moo',
      type: 'commit',
      text: 'fix validation',
      personaName: 'Moo',
      personaEmoji: '🐄',
      personaSystemPrompt: 'You are Moo.',
      personaMetadata: { max_length: 72 },
    })

    assert.equal(variables.rewrite_type, 'commit')
    assert.equal(variables.input_text, 'fix validation')
    assert.equal(variables.persona_name, 'Moo')
    assert.equal(variables.persona_emoji, '🐄')
    assert.equal(variables.persona_system_prompt, 'You are Moo.')
    assert.equal(variables.persona_metadata_json, '{"max_length":72}')
  })
})

import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  parseInstallToken,
  signInstallToken,
  verifyInstallToken,
} from './install-token.js'

const SECRET = 'test-signing-secret'

describe('signInstallToken / verifyInstallToken', () => {
  it('round-trips a valid token', () => {
    const token = signInstallToken({
      installId: '11111111-2222-4333-8444-555555555555',
      issuedAt: 1_700_000_000_000,
      ttlMs: 60_000,
      secret: SECRET,
    })

    const result = verifyInstallToken(token, SECRET, 1_700_000_000_000)
    assert.equal(result.ok, true)
    if (result.ok) {
      assert.equal(result.payload.installId, '11111111-2222-4333-8444-555555555555')
      assert.equal(result.payload.issuedAt, 1_700_000_000_000)
      assert.equal(result.payload.expiresAt, 1_700_000_060_000)
    }
  })

  it('rejects a tampered signature', () => {
    const token = signInstallToken({
      installId: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
      secret: SECRET,
    })
    const tampered = `${token.slice(0, -1)}x`
    const result = verifyInstallToken(tampered, SECRET)
    assert.equal(result.ok, false)
    if (!result.ok) {
      assert.equal(result.reason, 'invalid_signature')
    }
  })

  it('rejects an expired token', () => {
    const token = signInstallToken({
      installId: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
      issuedAt: 1_000,
      ttlMs: 10,
      secret: SECRET,
    })
    const result = verifyInstallToken(token, SECRET, 2_000)
    assert.equal(result.ok, false)
    if (!result.ok) {
      assert.equal(result.reason, 'expired')
    }
  })
})

describe('parseInstallToken', () => {
  it('parses expiresAt for client-side refresh checks', () => {
    const token = signInstallToken({
      installId: 'id-1',
      issuedAt: 100,
      ttlMs: 500,
      secret: SECRET,
    })
    assert.deepEqual(parseInstallToken(token), {
      installId: 'id-1',
      issuedAt: 100,
      expiresAt: 600,
    })
  })
})

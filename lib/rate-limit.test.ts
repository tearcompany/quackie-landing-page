import assert from 'node:assert/strict'
import { describe, it, beforeEach } from 'node:test'
import {
  checkRateLimit,
  resetRateLimitForTests,
} from './rate-limit.js'

describe('checkRateLimit', () => {
  beforeEach(() => {
    resetRateLimitForTests()
  })

  it('allows requests up to max within the window', () => {
    const options = { windowMs: 60_000, max: 3 }
    const now = 1_700_000_000_000

    assert.equal(checkRateLimit('rewrite-ip', 'client-a', options, now).allowed, true)
    assert.equal(checkRateLimit('rewrite-ip', 'client-a', options, now + 1).allowed, true)
    assert.equal(checkRateLimit('rewrite-ip', 'client-a', options, now + 2).allowed, true)
  })

  it('rejects the request once max is exceeded, with a correct retryAfterSeconds', () => {
    const options = { windowMs: 60_000, max: 2 }
    const now = 1_700_000_000_000

    assert.equal(checkRateLimit('rewrite-ip', 'client-b', options, now).allowed, true)
    assert.equal(checkRateLimit('rewrite-ip', 'client-b', options, now).allowed, true)

    const rejected = checkRateLimit('rewrite-ip', 'client-b', options, now + 10_000)
    assert.equal(rejected.allowed, false)
    assert.equal(rejected.retryAfterSeconds, 50)
  })

  it('resets the window once windowMs has elapsed', () => {
    const options = { windowMs: 1_000, max: 1 }
    const now = 1_700_000_000_000

    assert.equal(checkRateLimit('rewrite-ip', 'client-c', options, now).allowed, true)
    assert.equal(checkRateLimit('rewrite-ip', 'client-c', options, now + 500).allowed, false)
    // window has fully elapsed — counter should reset, not keep accumulating
    assert.equal(checkRateLimit('rewrite-ip', 'client-c', options, now + 1_000).allowed, true)
  })

  it('tracks different keys independently within the same bucket', () => {
    const options = { windowMs: 60_000, max: 1 }
    const now = 1_700_000_000_000

    assert.equal(checkRateLimit('rewrite-ip', 'client-d', options, now).allowed, true)
    assert.equal(checkRateLimit('rewrite-ip', 'client-e', options, now).allowed, true)
    // client-d is already at its limit, client-e is a separate key and unaffected
    assert.equal(checkRateLimit('rewrite-ip', 'client-d', options, now).allowed, false)
  })

  it('does not let separate buckets bleed into each other for the same key', () => {
    const now = 1_700_000_000_000
    const tight = { windowMs: 60_000, max: 1 }

    assert.equal(checkRateLimit('rewrite-ip', 'shared-key', tight, now).allowed, true)
    assert.equal(checkRateLimit('rewrite-ip', 'shared-key', tight, now).allowed, false)
    // same key, different bucket — must not inherit rewrite-ip's exhausted count
    assert.equal(checkRateLimit('rewrite-install', 'shared-key', tight, now).allowed, true)
  })
})

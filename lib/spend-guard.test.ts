import assert from 'node:assert/strict'
import { describe, it, beforeEach, afterEach } from 'node:test'
import { resetSpendGuardForTests, shouldRejectDailyBudget } from './spend-guard.js'

const DAY_ONE = Date.parse('2026-01-01T00:00:00.000Z')
const DAY_TWO = Date.parse('2026-01-02T00:00:00.000Z')

describe('shouldRejectDailyBudget', () => {
  const originalMax = process.env.MAX_DAILY_REQUESTS

  beforeEach(() => {
    resetSpendGuardForTests()
  })

  afterEach(() => {
    if (originalMax === undefined) {
      delete process.env.MAX_DAILY_REQUESTS
    } else {
      process.env.MAX_DAILY_REQUESTS = originalMax
    }
  })

  it('allows requests under the daily budget', () => {
    process.env.MAX_DAILY_REQUESTS = '3'

    assert.equal(shouldRejectDailyBudget(DAY_ONE), false)
    assert.equal(shouldRejectDailyBudget(DAY_ONE), false)
    assert.equal(shouldRejectDailyBudget(DAY_ONE), false)
  })

  it('rejects once the daily budget is exhausted', () => {
    process.env.MAX_DAILY_REQUESTS = '2'

    assert.equal(shouldRejectDailyBudget(DAY_ONE), false)
    assert.equal(shouldRejectDailyBudget(DAY_ONE), false)
    assert.equal(shouldRejectDailyBudget(DAY_ONE), true)
    assert.equal(shouldRejectDailyBudget(DAY_ONE), true)
  })

  it('resets the counter on UTC day rollover', () => {
    process.env.MAX_DAILY_REQUESTS = '1'

    assert.equal(shouldRejectDailyBudget(DAY_ONE), false)
    assert.equal(shouldRejectDailyBudget(DAY_ONE), true)
    // a new UTC day should get a fresh budget, not stay rejected
    assert.equal(shouldRejectDailyBudget(DAY_TWO), false)
  })

  it('falls back to the default when MAX_DAILY_REQUESTS is unset or invalid', () => {
    delete process.env.MAX_DAILY_REQUESTS
    assert.equal(shouldRejectDailyBudget(DAY_ONE), false)

    resetSpendGuardForTests()
    process.env.MAX_DAILY_REQUESTS = 'not-a-number'
    assert.equal(shouldRejectDailyBudget(DAY_ONE), false)
  })

  it('resetSpendGuardForTests clears state between test cases', () => {
    process.env.MAX_DAILY_REQUESTS = '1'
    assert.equal(shouldRejectDailyBudget(DAY_ONE), false)
    assert.equal(shouldRejectDailyBudget(DAY_ONE), true)

    resetSpendGuardForTests()
    assert.equal(shouldRejectDailyBudget(DAY_ONE), false)
  })
})

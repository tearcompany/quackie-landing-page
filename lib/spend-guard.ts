/**
 * In-memory daily request budget for the hosted rewrite API.
 *
 * Per-instance only (same limitation as rate-limit.ts). Acts as a last-resort
 * backstop before OpenAI spend runs away — pair with a hard usage cap on the
 * OpenAI API key in the provider dashboard.
 */

const DEFAULT_MAX_DAILY_REQUESTS = 5_000

let dayKey = ''
let count = 0

function utcDayKey(now = Date.now()): string {
  return new Date(now).toISOString().slice(0, 10)
}

function maxDailyRequests(): number {
  const raw = process.env.MAX_DAILY_REQUESTS?.trim()
  if (!raw) {
    return DEFAULT_MAX_DAILY_REQUESTS
  }
  const parsed = Number(raw)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_MAX_DAILY_REQUESTS
}

export function shouldRejectDailyBudget(now = Date.now()): boolean {
  const currentDay = utcDayKey(now)
  if (currentDay !== dayKey) {
    dayKey = currentDay
    count = 0
  }

  if (count >= maxDailyRequests()) {
    return true
  }

  count += 1
  return false
}

/** Test helper — not used in production routes. */
export function resetSpendGuardForTests(): void {
  dayKey = ''
  count = 0
}

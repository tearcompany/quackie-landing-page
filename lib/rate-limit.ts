/**
 * Best-effort in-memory rate limiter, keyed by client IP.
 *
 * This is per-instance, not shared across the serverless fleet — on Vercel,
 * each warm instance keeps its own counters, so the real ceiling under load
 * is roughly (instance count × MAX_REQUESTS_PER_WINDOW), not a hard global
 * cap. That's still enough to stop a single runaway client or a naive
 * script, but it is NOT a substitute for a durable, shared store (Vercel KV
 * / Upstash Redis) once traffic is high enough to run many instances.
 */
interface RateLimitEntry {
  count: number
  windowStart: number
}

const WINDOW_MS = 60_000
const MAX_REQUESTS_PER_WINDOW = 20
const MAX_TRACKED_KEYS = 5000

const buckets = new Map<string, RateLimitEntry>()

export interface RateLimitResult {
  allowed: boolean
  retryAfterSeconds?: number
}

export function checkRateLimit(key: string): RateLimitResult {
  const now = Date.now()
  const entry = buckets.get(key)

  if (!entry || now - entry.windowStart >= WINDOW_MS) {
    if (buckets.size >= MAX_TRACKED_KEYS) {
      buckets.clear()
    }
    buckets.set(key, { count: 1, windowStart: now })
    return { allowed: true }
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    const retryAfterSeconds = Math.ceil((entry.windowStart + WINDOW_MS - now) / 1000)
    return { allowed: false, retryAfterSeconds }
  }

  entry.count += 1
  return { allowed: true }
}

export function getClientKey(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }
  return request.headers.get('x-real-ip') ?? 'unknown'
}

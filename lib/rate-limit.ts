/**
 * Best-effort in-memory rate limiter.
 *
 * Buckets are keyed by (bucketName, clientKey). This is per-instance, not
 * shared across the serverless fleet — on Vercel, each warm instance keeps its
 * own counters, so the real ceiling under load is roughly
 * (instance count × max per window), not a hard global cap. That's still
 * enough to stop a single runaway client or a naive script, but it is NOT a
 * substitute for a durable, shared store (Vercel KV / Upstash Redis) once
 * traffic is high enough to run many instances.
 *
 * The extension is open-source — client-side secrets cannot be trusted.
 * Rate limits here protect the hosted API (register + rewrite) by raising the
 * cost of abuse; they do not cryptographically authenticate the client.
 */
interface RateLimitEntry {
  count: number
  windowStart: number
}

export interface RateLimitOptions {
  windowMs: number
  max: number
}

export interface RateLimitResult {
  allowed: boolean
  retryAfterSeconds?: number
}

const MAX_TRACKED_KEYS_PER_BUCKET = 5000

const buckets = new Map<string, Map<string, RateLimitEntry>>()

export const RATE_LIMITS = {
  register: { windowMs: 60 * 60 * 1000, max: 5 },
  rewrite: { windowMs: 60_000, max: 20 },
} as const

function bucketKey(bucket: string, key: string): string {
  return `${bucket}:${key}`
}

function getBucketMap(bucket: string): Map<string, RateLimitEntry> {
  let map = buckets.get(bucket)
  if (!map) {
    map = new Map()
    buckets.set(bucket, map)
  }
  return map
}

export function checkRateLimit(
  bucket: string,
  key: string,
  options: RateLimitOptions,
  now = Date.now(),
): RateLimitResult {
  const map = getBucketMap(bucket)
  const entry = map.get(key)

  if (!entry || now - entry.windowStart >= options.windowMs) {
    if (map.size >= MAX_TRACKED_KEYS_PER_BUCKET) {
      map.clear()
    }
    map.set(key, { count: 1, windowStart: now })
    return { allowed: true }
  }

  if (entry.count >= options.max) {
    const retryAfterSeconds = Math.ceil((entry.windowStart + options.windowMs - now) / 1000)
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

export function rateLimitResponseHeaders(result: RateLimitResult): Record<string, string> | undefined {
  if (!result.retryAfterSeconds) {
    return undefined
  }
  return { 'Retry-After': String(result.retryAfterSeconds) }
}

// Kept for tests or callers that used the composite key helper.
export { bucketKey }

/** Test helper — not used in production routes. */
export function resetRateLimitForTests(): void {
  buckets.clear()
}

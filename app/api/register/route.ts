import { randomUUID } from 'node:crypto'
import { NextResponse } from 'next/server'
import { getSigningSecret, signInstallToken } from '@/lib/install-token'
import {
  RATE_LIMITS,
  checkRateLimit,
  getClientKey,
  rateLimitResponseHeaders,
} from '@/lib/rate-limit'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const clientKey = getClientKey(request)
  const rateLimit = checkRateLimit('register', clientKey, RATE_LIMITS.register)
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: 'Too many registration attempts. Please try again later.' },
      {
        status: 429,
        headers: rateLimitResponseHeaders(rateLimit),
      },
    )
  }

  const secret = getSigningSecret()
  if (!secret) {
    return NextResponse.json({ error: 'Server is missing QUACKIE_SIGNING_SECRET' }, { status: 500 })
  }

  const installId = randomUUID()
  const token = signInstallToken({ installId, secret })

  return NextResponse.json({ token })
}

import { createHmac, timingSafeEqual } from 'node:crypto'

/**
 * Stateless install tokens for the hosted Quackie rewrite API.
 *
 * The extension is open-source — no client-embedded secret can be trusted.
 * Tokens are issued only by POST /api/register and signed with
 * QUACKIE_SIGNING_SECRET (server-only). Clients may refresh locally when
 * expired but cannot forge a valid signature without the secret.
 *
 * Format: installId.issuedAt.expiresAt.signature (signature = base64url HMAC-SHA256)
 */

export const DEFAULT_TOKEN_TTL_MS = 30 * 24 * 60 * 60 * 1000

export interface InstallTokenPayload {
  installId: string
  issuedAt: number
  expiresAt: number
}

export interface SignInstallTokenOptions {
  installId: string
  issuedAt?: number
  ttlMs?: number
  secret: string
}

export type VerifyInstallTokenResult =
  | { ok: true; payload: InstallTokenPayload }
  | { ok: false; reason: 'malformed' | 'invalid_signature' | 'expired' }

function signPayload(payload: string, secret: string): string {
  return createHmac('sha256', secret).update(payload).digest('base64url')
}

function encodeToken(payload: InstallTokenPayload, secret: string): string {
  const core = `${payload.installId}.${payload.issuedAt}.${payload.expiresAt}`
  const signature = signPayload(core, secret)
  return `${core}.${signature}`
}

export function signInstallToken(options: SignInstallTokenOptions): string {
  const issuedAt = options.issuedAt ?? Date.now()
  const ttlMs = options.ttlMs ?? DEFAULT_TOKEN_TTL_MS
  const payload: InstallTokenPayload = {
    installId: options.installId,
    issuedAt,
    expiresAt: issuedAt + ttlMs,
  }
  return encodeToken(payload, options.secret)
}

export function parseInstallToken(token: string): InstallTokenPayload | undefined {
  const parts = token.split('.')
  if (parts.length !== 4) {
    return undefined
  }

  const [installId, issuedAtRaw, expiresAtRaw] = parts
  const issuedAt = Number(issuedAtRaw)
  const expiresAt = Number(expiresAtRaw)

  if (!installId || !Number.isFinite(issuedAt) || !Number.isFinite(expiresAt)) {
    return undefined
  }

  return { installId, issuedAt, expiresAt }
}

export function verifyInstallToken(
  token: string,
  secret: string,
  now = Date.now(),
): VerifyInstallTokenResult {
  const parts = token.split('.')
  if (parts.length !== 4) {
    return { ok: false, reason: 'malformed' }
  }

  const payload = parseInstallToken(token)
  if (!payload) {
    return { ok: false, reason: 'malformed' }
  }

  const core = `${payload.installId}.${payload.issuedAt}.${payload.expiresAt}`
  const expected = signPayload(core, secret)
  const actual = parts[3]

  const expectedBuf = Buffer.from(expected)
  const actualBuf = Buffer.from(actual)
  if (expectedBuf.length !== actualBuf.length || !timingSafeEqual(expectedBuf, actualBuf)) {
    return { ok: false, reason: 'invalid_signature' }
  }

  if (payload.expiresAt <= now) {
    return { ok: false, reason: 'expired' }
  }

  return { ok: true, payload }
}

export function getSigningSecret(): string | undefined {
  const secret = process.env.QUACKIE_SIGNING_SECRET?.trim()
  return secret && secret.length > 0 ? secret : undefined
}

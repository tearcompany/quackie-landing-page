import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'

export const ogImageSize = { width: 1200, height: 630 } as const
export const ogImageContentType = 'image/png' as const

let logoSrcPromise: Promise<string> | undefined

async function getLogoSrc(): Promise<string> {
  if (!logoSrcPromise) {
    logoSrcPromise = readFile(join(process.cwd(), 'public', 'quackie.png')).then((data) =>
      `data:image/png;base64,${data.toString('base64')}`,
    )
  }
  return logoSrcPromise
}

export async function renderOgImage(eyebrow: string, title: string) {
  const logoSrc = await getLogoSrc()

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          backgroundColor: '#0a0a0f',
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(245,166,35,0.12) 0%, transparent 55%), radial-gradient(circle at 80% 75%, rgba(45,212,191,0.10) 0%, transparent 55%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
          <img src={logoSrc} width={72} height={72} alt="" />
          <span
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: '#f5f5f5',
              letterSpacing: '-0.02em',
            }}
          >
            Quackie
          </span>
        </div>
        <span
          style={{
            fontSize: 22,
            fontWeight: 600,
            color: '#f5a623',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: 16,
          }}
        >
          {eyebrow}
        </span>
        <span
          style={{
            fontSize: 58,
            fontWeight: 700,
            color: '#f5f5f5',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            maxWidth: 980,
          }}
        >
          {title}
        </span>
      </div>
    ),
    { ...ogImageSize },
  )
}

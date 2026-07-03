import { ogImageContentType, ogImageSize, renderOgImage } from '@/lib/og-image'
import { SITE_TAGLINE } from '@/lib/site'

export const size = ogImageSize
export const contentType = ogImageContentType
export const alt = `Quackie — ${SITE_TAGLINE}`

export default async function Image() {
  return renderOgImage('Quackie', SITE_TAGLINE)
}

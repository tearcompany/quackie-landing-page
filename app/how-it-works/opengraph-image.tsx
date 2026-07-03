import { ogImageContentType, ogImageSize, renderOgImage } from '@/lib/og-image'

export const size = ogImageSize
export const contentType = ogImageContentType
export const alt = 'How Quackie works — four steps, zero friction'

export default async function Image() {
  return renderOgImage('How it works', 'Four steps. Zero friction.')
}

import { ogImageContentType, ogImageSize, renderOgImage } from '@/lib/og-image'

export const size = ogImageSize
export const contentType = ogImageContentType
export const alt = 'Quackie FAQ — questions answered plainly'

export default async function Image() {
  return renderOgImage('FAQ', 'Questions, answered plainly')
}

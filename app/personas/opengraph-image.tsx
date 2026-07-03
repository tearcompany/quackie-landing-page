import { ogImageContentType, ogImageSize, renderOgImage } from '@/lib/og-image'

export const size = ogImageSize
export const contentType = ogImageContentType
export const alt = 'Quackie — 22 personas, one extension'

export default async function Image() {
  return renderOgImage('Personas', '22 personas. One extension.')
}

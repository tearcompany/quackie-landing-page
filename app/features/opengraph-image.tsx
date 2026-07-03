import { ogImageContentType, ogImageSize, renderOgImage } from '@/lib/og-image'

export const size = ogImageSize
export const contentType = ogImageContentType
export const alt = 'Quackie features — auto-rewrite, loop prevention, bundled personas'

export default async function Image() {
  return renderOgImage('Features', 'Built for developers who live in Git')
}

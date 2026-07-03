import { ogImageContentType, ogImageSize, renderOgImage } from '@/lib/og-image'

export const size = ogImageSize
export const contentType = ogImageContentType
export const alt = 'Quackie roadmap — commits are just the beginning'

export default async function Image() {
  return renderOgImage('Roadmap', 'Commits are just the beginning')
}

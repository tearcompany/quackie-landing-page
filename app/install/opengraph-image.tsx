import { ogImageContentType, ogImageSize, renderOgImage } from '@/lib/og-image'

export const size = ogImageSize
export const contentType = ogImageContentType
export const alt = 'Install Quackie for VS Code and Cursor'

export default async function Image() {
  return renderOgImage('Install', 'Get Quackie running in two minutes')
}

import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Quackie — Personality-first commit rewrites for VS Code',
  description:
    'Quackie is a VS Code extension that rewrites your Git commit messages through 22 bundled personas. Install once. Pick a persona. Type "fix validation" — get "🐄 fix: convince validation some manners".',
  generator: 'v0.app',
  keywords: ['VS Code extension', 'Git commit', 'commit messages', 'developer tools', 'Cursor'],
  openGraph: {
    title: 'Quackie — Personality-first commit rewrites for VS Code',
    description: 'Your commits. Their personality.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quackie — Personality-first commit rewrites for VS Code',
    description: 'Your commits. Their personality.',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0a0a0f',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`bg-background ${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

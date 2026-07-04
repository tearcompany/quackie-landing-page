import type { Metadata } from 'next'
import { Nav } from '@/components/nav'
import { Breadcrumb } from '@/components/breadcrumb'
import { PageHero } from '@/components/page-hero'
import { Install } from '@/components/install'
import { SettingsReference } from '@/components/settings-reference'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Install Quackie',
  description:
    'Download Quackie for VS Code and Cursor — VSIX or Marketplace. Pick a persona and start rewriting commits.',
  keywords: [
    'install vscode extension',
    'quackie vsix',
    'cursor extension install',
    'git commit extension setup',
  ],
  alternates: {
    canonical: '/install',
  },
  openGraph: {
    title: 'Install Quackie — VS Code & Cursor',
    description: 'Download Quackie — VSIX or Marketplace. Install once, pick a persona.',
    url: '/install',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Install Quackie — VS Code & Cursor',
    description: 'Download Quackie — VSIX or Marketplace. Install once, pick a persona.',
  },
}

export default function InstallPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Install', href: '/install' }]} />
      <PageHero
        eyebrow="Install"
        title="Get Quackie running in under two minutes"
        description="Download from the site or install from the Marketplace. Requires VS Code 1.85+ or Cursor with the built-in Git extension enabled."
      />
      <Install />
      <SettingsReference />
      <Footer />
    </main>
  )
}

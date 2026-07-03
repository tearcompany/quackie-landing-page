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
    'Step-by-step install guide for the Quackie VS Code extension: VSIX package or development build, plus requirements and settings reference.',
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
    title: 'Install Quackie — VS Code & Cursor Setup',
    description: 'Two ways to install Quackie. Both take under two minutes.',
    url: '/install',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Install Quackie — VS Code & Cursor Setup',
    description: 'Two ways to install Quackie. Both take under two minutes.',
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
        description="Install the VSIX package or run Quackie from source. Requires VS Code 1.85+ or Cursor with the built-in Git extension enabled."
      />
      <Install />
      <SettingsReference />
      <Footer />
    </main>
  )
}

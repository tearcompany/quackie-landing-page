import type { Metadata } from 'next'
import { Nav } from '@/components/nav'
import { Breadcrumb } from '@/components/breadcrumb'
import { PageHero } from '@/components/page-hero'
import { HowItWorks } from '@/components/how-it-works'
import { Architecture } from '@/components/architecture'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'How It Works',
  description:
    'Install, pick a persona, type your commit, and Quackie rewrites it after a 500ms debounce. See the exact flow and architecture behind the rewrite.',
  keywords: [
    'how does quackie work',
    'git commit debounce',
    'vscode extension architecture',
    'commit rewrite flow',
  ],
  alternates: {
    canonical: '/how-it-works',
  },
  openGraph: {
    title: 'How It Works — Quackie',
    description: 'Four steps from keystroke to persona-voiced commit, plus the architecture behind it.',
    url: '/how-it-works',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How It Works — Quackie',
    description: 'Four steps from keystroke to persona-voiced commit, plus the architecture behind it.',
  },
}

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <Breadcrumb
        items={[{ label: 'Home', href: '/' }, { label: 'How it works', href: '/how-it-works' }]}
      />
      <PageHero
        eyebrow="How it works"
        title="From keystroke to commit, in four steps"
        description="A step-by-step look at how Quackie detects your commit draft, debounces, rewrites it in your persona's voice, and hands control back to you — plus the architecture that keeps the extension personality-agnostic."
      />
      <HowItWorks />
      <Architecture />
      <Footer />
    </main>
  )
}

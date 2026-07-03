import type { Metadata } from 'next'
import { Nav } from '@/components/nav'
import { Breadcrumb } from '@/components/breadcrumb'
import { PageHero } from '@/components/page-hero'
import { ProblemSolution } from '@/components/problem-solution'
import { FeaturesGrid } from '@/components/features-grid'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Features',
  description:
    'See every Quackie feature: auto-rewrite as you type, status bar persona picker, loop prevention, bundled personas, and a pluggable RewriteService for VS Code and Cursor.',
  keywords: [
    'VS Code extension features',
    'git commit automation',
    'commit message rewrite',
    'developer productivity tool',
  ],
  alternates: {
    canonical: '/features',
  },
  openGraph: {
    title: 'Features — Quackie',
    description:
      'Auto-rewrite, loop prevention, bundled personas, and a pluggable rewrite engine — everything Quackie does.',
    url: '/features',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Features — Quackie',
    description:
      'Auto-rewrite, loop prevention, bundled personas, and a pluggable rewrite engine — everything Quackie does.',
  },
}

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Features', href: '/features' }]} />
      <PageHero
        eyebrow="Features"
        title="Everything Quackie does — and nothing it doesn't"
        description="A focused look at what the Quackie VS Code extension actually does: auto-rewrite, loop prevention, bundled personas, and a pluggable rewrite engine. No hidden AI magic, no scope creep."
      />
      <ProblemSolution />
      <FeaturesGrid />
      <Footer />
    </main>
  )
}

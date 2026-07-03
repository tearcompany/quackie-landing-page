import type { Metadata } from 'next'
import { Nav } from '@/components/nav'
import { Breadcrumb } from '@/components/breadcrumb'
import { PageHero } from '@/components/page-hero'
import { Roadmap } from '@/components/roadmap'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Roadmap',
  description:
    "See what's shipped and what's next for Quackie: a real LLM rewrite engine, pull request descriptions, code review comments, changelogs, and branch names.",
  keywords: ['quackie roadmap', 'vscode extension roadmap', 'ai commit tool future'],
  alternates: {
    canonical: '/roadmap',
  },
  openGraph: {
    title: 'Roadmap — Quackie',
    description: 'Commits are just the beginning. See what Quackie ships next.',
    url: '/roadmap',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Roadmap — Quackie',
    description: 'Commits are just the beginning. See what Quackie ships next.',
  },
}

export default function RoadmapPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Roadmap', href: '/roadmap' }]} />
      <PageHero
        eyebrow="Roadmap"
        title="Commits are just the beginning"
        description="Where Quackie is headed: a real LLM rewrite engine, pull request descriptions, code review comments, release notes, and branch names."
      />
      <Roadmap />
      <Footer />
    </main>
  )
}

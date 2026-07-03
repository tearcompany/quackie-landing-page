import type { Metadata } from 'next'
import { Nav } from '@/components/nav'
import { Breadcrumb } from '@/components/breadcrumb'
import { PageHero } from '@/components/page-hero'
import { FAQ } from '@/components/faq'
import { Footer } from '@/components/footer'
import { faqs } from '@/lib/faqs'
import { buildFaqJsonLd } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Answers to common questions about Quackie: persona files, Cursor support, editing rewritten commits, AI usage, and Conventional Commits.',
  keywords: ['quackie faq', 'vscode extension questions', 'git commit ai faq'],
  alternates: {
    canonical: '/faq',
  },
  openGraph: {
    title: 'FAQ — Quackie',
    description: 'Straight answers about how Quackie works and what it does (and doesn\'t) do with AI today.',
    url: '/faq',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ — Quackie',
    description: 'Straight answers about how Quackie works and what it does (and doesn\'t) do with AI today.',
  },
}

export default function FaqPage() {
  const faqJsonLd = buildFaqJsonLd(faqs)

  return (
    <main className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Nav />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'FAQ', href: '/faq' }]} />
      <PageHero
        eyebrow="FAQ"
        title="Questions, answered plainly"
        description="Straight answers about how Quackie works, whether it fights your edits, and what it does (and doesn't) do with AI today."
      />
      <FAQ />
      <Footer />
    </main>
  )
}

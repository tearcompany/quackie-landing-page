import type { Metadata } from 'next'
import { Nav } from '@/components/nav'
import { Breadcrumb } from '@/components/breadcrumb'
import { PageHero } from '@/components/page-hero'
import { PersonaShowcase } from '@/components/persona-showcase'
import { Footer } from '@/components/footer'
import { personas } from '@/lib/personas'
import { buildPersonaListJsonLd } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: '22 Personas',
  description:
    'Meet all 22 Quackie personas: Moo, Duck, Owl, Gandalf, Ada, Witch, and more. Each ships with its own voice, humor, and commit rewrite style — no config needed.',
  keywords: [
    'git commit personas',
    'AI commit message personality',
    'VS Code duck extension',
    'fun commit messages',
  ],
  alternates: {
    canonical: '/personas',
  },
  openGraph: {
    title: '22 Personas — Quackie',
    description: 'Browse every bundled Quackie persona with real before-and-after commit examples.',
    url: '/personas',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '22 Personas — Quackie',
    description: 'Browse every bundled Quackie persona with real before-and-after commit examples.',
  },
}

export default function PersonasPage() {
  const personaListJsonLd = buildPersonaListJsonLd(personas)

  return (
    <main className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personaListJsonLd) }}
      />
      <Nav />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Personas', href: '/personas' }]} />
      <PageHero
        eyebrow="Personas"
        title="22 personalities. One Git commit box."
        description="Browse every bundled Quackie persona — from a dry senior engineer to a sarcastic duck — with real before-and-after commit examples. All 22 ship inside the extension, zero setup required."
      />
      <PersonaShowcase />
      <Footer />
    </main>
  )
}

'use client'

import { motion } from 'framer-motion'
import { personas } from '@/lib/personas'
import { PersonaCard } from './persona-card'

/**
 * Curated homepage teaser — 8 recognizable personas, not all 40.
 * Full browsable, pack-grouped list lives on /personas.
 */
const FEATURED_IDS = [
  'repository-guardian',
  'moo',
  'rubber-duck',
  'sleep-deprived-senior',
  'tech-debt-slayer',
  'startup-cowboy',
  'doom',
  'gandalf',
]

export function PersonaTeaser() {
  const featured = FEATURED_IDS.map((id) => personas.find((p) => p.id === id)!).filter(Boolean)
  const remaining = personas.length - featured.length

  return (
    <section id="personas" className="py-24">
      <div className="max-w-6xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-center"
        >
          <h2
            className="text-4xl sm:text-5xl font-bold tracking-tight text-balance text-foreground"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Every commit needs{' '}
            <span className="text-amber">a narrator.</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-center text-muted-foreground mb-10 max-w-xl mx-auto"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          A few of the {personas.length} personas shipped inside Quackie.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featured.map((persona, i) => (
            <PersonaCard key={persona.id} persona={persona} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-center mt-8"
        >
          <a
            href="/personas"
            className="inline-flex items-center gap-1.5 text-sm text-amber hover:text-amber/80 transition-colors font-medium"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            +{remaining} more developer personalities included →
          </a>
        </motion.div>
      </div>
    </section>
  )
}

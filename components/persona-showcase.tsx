'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { personas, type PersonaPack, type Persona } from '@/lib/personas'
import { PersonaCard } from './persona-card'

type Filter = 'all' | PersonaPack

const filters: { label: string; value: Filter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Classic', value: 'classic' },
  { label: 'Archetype', value: 'archetype' },
]

interface PersonaShowcaseProps {
  onPersonaSelect?: (persona: Persona) => void
}

export function PersonaShowcase({ onPersonaSelect }: PersonaShowcaseProps) {
  const [filter, setFilter] = useState<Filter>('all')
  const [selectedId, setSelectedId] = useState<string>('moo')

  const filtered =
    filter === 'all' ? personas : personas.filter((p) => p.pack === filter)

  const handleSelect = (persona: Persona) => {
    setSelectedId(persona.id)
    onPersonaSelect?.(persona)
  }

  return (
    <section id="personas" className="py-24">
      <div className="max-w-6xl mx-auto px-5">
        {/* Heading */}
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
            22 personas.{' '}
            <span className="text-amber">One extension.</span>
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
          Each persona ships with metadata and a system prompt. The extension only knows{' '}
          <code
            className="text-xs text-teal bg-teal/10 px-1.5 py-0.5 rounded font-mono"
          >
            id
          </code>
          ,{' '}
          <code className="text-xs text-teal bg-teal/10 px-1.5 py-0.5 rounded font-mono">
            name
          </code>
          , and{' '}
          <code className="text-xs text-teal bg-teal/10 px-1.5 py-0.5 rounded font-mono">
            emoji
          </code>{' '}
          — everything else stays in persona data.
        </motion.p>

        {/* Filter pills */}
        <div className="flex items-center justify-center gap-2 mb-8" role="group" aria-label="Filter personas by pack">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-1.5 rounded-full text-sm transition-all ${
                filter === f.value
                  ? 'bg-amber text-amber-foreground font-medium'
                  : 'border border-white/[0.08] text-muted-foreground hover:text-foreground hover:border-white/20'
              }`}
              style={{ fontFamily: 'var(--font-space-grotesk)', color: filter === f.value ? '#0a0a0f' : undefined }}
              aria-pressed={filter === f.value}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((persona, i) => (
            <PersonaCard
              key={persona.id}
              persona={persona}
              index={i}
              onSelect={handleSelect}
              isSelected={selectedId === persona.id}
            />
          ))}
        </div>

        {/* Pack legend */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber/60" />
            <span className="text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-inter)' }}>
              Classic pack (12)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal/60" />
            <span className="text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-inter)' }}>
              Archetype pack (10)
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

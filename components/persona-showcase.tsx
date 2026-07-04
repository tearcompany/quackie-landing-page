'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { getPersonasByPack, type PersonaPack, type Persona } from '@/lib/personas'
import { PersonaCard } from './persona-card'

type Filter = 'all' | PersonaPack

const packInfo: Record<
  PersonaPack,
  { label: string; tagline: string; color: 'amber' | 'teal' | 'violet' }
> = {
  classic: {
    label: 'Classic',
    tagline: 'The original 12 — dry seniors, sarcastic ducks, grim doomers, wise wizards.',
    color: 'amber',
  },
  legends: {
    label: 'Legends',
    tagline: 'Mythic & literary characters — Ada, Queen, Valkyrie, Witch, and more.',
    color: 'teal',
  },
  archetype: {
    label: 'Archetype',
    tagline: 'Developer moods & situations everyone recognizes — from Friday deploys to 2am debugging.',
    color: 'violet',
  },
}

const packOrder: PersonaPack[] = ['classic', 'legends', 'archetype']

const filters: { label: string; value: Filter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Classic', value: 'classic' },
  { label: 'Legends', value: 'legends' },
  { label: 'Archetype', value: 'archetype' },
]

const dotClass: Record<'amber' | 'teal' | 'violet', string> = {
  amber: 'bg-amber/60',
  teal: 'bg-teal/60',
  violet: 'bg-violet/60',
}

const textClass: Record<'amber' | 'teal' | 'violet', string> = {
  amber: 'text-amber',
  teal: 'text-teal',
  violet: 'text-violet',
}

interface PersonaShowcaseProps {
  onPersonaSelect?: (persona: Persona) => void
}

export function PersonaShowcase({ onPersonaSelect }: PersonaShowcaseProps) {
  const [filter, setFilter] = useState<Filter>('all')
  const [selectedId, setSelectedId] = useState<string>('moo')

  const handleSelect = (persona: Persona) => {
    setSelectedId(persona.id)
    onPersonaSelect?.(persona)
  }

  const packsToRender: PersonaPack[] = filter === 'all' ? packOrder : [filter]

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
            40 personas.{' '}
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
        <div className="flex items-center justify-center gap-2 mb-14" role="group" aria-label="Filter personas by pack">
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

        {/* Grouped sections, one per pack */}
        {packsToRender.map((pack, sectionIndex) => {
          const packPersonas = getPersonasByPack(pack)
          const info = packInfo[pack]

          return (
            <div key={pack} className={sectionIndex > 0 ? 'mt-16' : undefined}>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4 }}
                className="flex items-baseline gap-3 mb-1"
              >
                <span className={`w-2 h-2 rounded-full ${dotClass[info.color]}`} />
                <h3
                  className={`text-lg font-semibold ${textClass[info.color]}`}
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  {info.label} pack
                </h3>
                <span
                  className="text-xs text-muted-foreground font-mono"
                  style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
                >
                  {packPersonas.length}
                </span>
              </motion.div>
              <p
                className="text-sm text-muted-foreground mb-6"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                {info.tagline}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {packPersonas.map((persona, i) => (
                  <PersonaCard
                    key={persona.id}
                    persona={persona}
                    index={i}
                    onSelect={handleSelect}
                    isSelected={selectedId === persona.id}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

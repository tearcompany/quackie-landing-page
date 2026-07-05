'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * "Who wrote this commit?" — the same real bug, rewritten by six different
 * personas. Click a persona to see how they'd have written the commit.
 * All outputs below are real, curated output from the Quackie rewrite
 * engine (input: "fix: button double submits on click") — not a mockup.
 */
interface DemoPersona {
  id: string
  emoji: string
  name: string
  message: string
}

const INPUT_COMMIT = 'fix: button double submits on click'

const demoPersonas: DemoPersona[] = [
  {
    id: 'repository-guardian',
    emoji: '🛡️',
    name: 'Repository Guardian',
    message: 'fix(button): prevent double submits when clicks get impatient',
  },
  {
    id: 'moo',
    emoji: '🐄',
    name: 'Moo',
    message: 'fix: calm the button so one click stays one click',
  },
  {
    id: 'rubber-duck',
    emoji: '🔍',
    name: 'Rubber Duck',
    message: "fix: explain the button's two-click habit out of existence",
  },
  {
    id: 'sleep-deprived-senior',
    emoji: '☕',
    name: 'Sleep-Deprived Senior',
    message: "fix(button): stop the double-submit before prod notices",
  },
  {
    id: 'tech-debt-slayer',
    emoji: '🪓',
    name: 'Tech Debt Slayer',
    message: 'fix(button): stop the double-submit landmine on click',
  },
  {
    id: 'startup-cowboy',
    emoji: '🤠',
    name: 'Startup Cowboy',
    message: 'fix: stop the button from sending two tickets per click',
  },
]

export function WhoWroteThis() {
  const [activeId, setActiveId] = useState(demoPersonas[0].id)
  const active = demoPersonas.find((p) => p.id === activeId)!

  return (
    <section className="py-24">
      <div className="max-w-3xl mx-auto px-5">
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
            Who wrote <span className="text-amber">this commit?</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-center text-muted-foreground mb-10 max-w-lg mx-auto"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          Same bug. Same fix. Click a persona and watch the commit message
          become someone else entirely.
        </motion.p>

        {/* Original commit */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="rounded-lg border border-white/[0.08] bg-[#0a0a0f] px-4 py-3 mb-3 flex items-center gap-3"
        >
          <span
            className="text-[10px] uppercase tracking-widest text-muted-foreground/50 flex-shrink-0"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            you wrote
          </span>
          <span
            className="text-sm font-mono text-muted-foreground"
            style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
          >
            {INPUT_COMMIT}
          </span>
        </motion.div>

        {/* Arrow */}
        <div className="flex justify-center text-muted-foreground/30 mb-3" aria-hidden="true">
          ↓
        </div>

        {/* Rewritten commit (animated swap) */}
        <div className="rounded-lg border border-amber/25 bg-[#0a0a0f] px-4 py-4 mb-8 min-h-[60px] flex items-center glow-amber-sm overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-3 w-full"
            >
              <span className="text-2xl leading-none flex-shrink-0" role="img" aria-label={active.name}>
                {active.emoji}
              </span>
              <span
                className="text-sm sm:text-base font-mono text-foreground"
                style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
              >
                {active.message}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Persona picker grid */}
        <div
          className="flex flex-wrap items-center justify-center gap-2"
          role="group"
          aria-label="Pick a persona to see their rewrite"
        >
          {demoPersonas.map((persona) => (
            <button
              key={persona.id}
              onClick={() => setActiveId(persona.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-sm transition-all ${
                activeId === persona.id
                  ? 'bg-amber text-amber-foreground font-medium'
                  : 'border border-white/[0.08] text-muted-foreground hover:text-foreground hover:border-white/20'
              }`}
              style={{
                fontFamily: 'var(--font-space-grotesk)',
                color: activeId === persona.id ? '#0a0a0f' : undefined,
              }}
              aria-pressed={activeId === persona.id}
            >
              <span className="text-base leading-none">{persona.emoji}</span>
              {persona.name}
            </button>
          ))}
          <a
            href="/personas"
            className="flex items-center px-3.5 py-2 rounded-full text-sm text-muted-foreground/60 hover:text-muted-foreground transition-colors"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            +34 more →
          </a>
        </div>
      </div>
    </section>
  )
}

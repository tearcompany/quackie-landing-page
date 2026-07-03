'use client'

import { motion } from 'framer-motion'

const columns = [
  {
    label: 'The problem',
    accent: 'border-red-500/20',
    labelColor: 'text-red-400/70',
    body: 'You write "fix bug" or "update stuff". Your git log reads like a hospital intake form. You want personality without losing professionalism.',
    icon: '📋',
  },
  {
    label: 'The Quackie way',
    accent: 'border-amber/20',
    labelColor: 'text-amber/80',
    body: 'Personas are data, not hardcoded prompts in the extension. Each persona has voice, humor style, verbs, and rules. The extension only orchestrates — detect, select, rewrite, replace.',
    icon: '🦆',
  },
  {
    label: 'The result',
    accent: 'border-teal/20',
    labelColor: 'text-teal/80',
    body: 'Same meaning. Better voice. One emoji. Max 72 characters. Your team might actually read the changelog.',
    icon: '✓',
  },
]

export function ProblemSolution() {
  return (
    <section id="features" className="py-24">
      <div className="max-w-6xl mx-auto px-5">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <h2
            className="text-4xl sm:text-5xl font-bold tracking-tight text-balance text-foreground"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Commits are boring.{' '}
            <span className="text-amber">Yours don&apos;t have to be.</span>
          </h2>
        </motion.div>

        {/* Three columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {columns.map((col, i) => (
            <motion.div
              key={col.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className={`rounded-xl border ${col.accent} bg-card p-6 flex flex-col gap-4`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl select-none" aria-hidden="true">
                  {col.icon}
                </span>
                <span
                  className={`text-xs font-semibold uppercase tracking-widest ${col.labelColor}`}
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  {col.label}
                </span>
              </div>
              <p
                className="text-[15px] text-muted-foreground leading-relaxed"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                {col.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

'use client'

import { motion } from 'framer-motion'

const chips = [
  'Personality-first architecture',
  'Conventional Commits preserved',
  'Zero workspace setup',
  'Open source friendly',
  'Works with built-in Git extension',
]

export function SocialProof() {
  return (
    <section className="py-10 border-y border-white/[0.05] bg-[#0d0d16]/60">
      <div className="max-w-6xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          {chips.map((chip, i) => (
            <motion.span
              key={chip}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.08] bg-muted/40 text-sm text-muted-foreground"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-teal flex-shrink-0" aria-hidden="true" />
              {chip}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

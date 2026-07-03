'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    n: '01',
    title: 'Install Quackie',
    body: 'VSIX or Extension Development Host. Personas ship bundled — no config files in your repo.',
  },
  {
    n: '02',
    title: 'Pick a persona',
    body: 'Click the status bar pill (🦆 Duck, 🐄 Moo, 🦉 Owl…) or use Command Palette: Quackie: Select Persona.',
  },
  {
    n: '03',
    title: 'Type your commit',
    body: 'Write a normal draft: feat: add payment retry',
  },
  {
    n: '04',
    title: 'Quackie rewrites',
    body: 'After ~500ms debounce, your commit input updates automatically. You stay in flow.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-[#0d0d16]/50">
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
            Four steps.{' '}
            <span className="text-amber">Zero friction.</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative rounded-xl border border-white/[0.07] bg-card p-6 flex flex-col gap-3"
            >
              {/* Connector line (desktop) */}
              {i < steps.length - 1 && (
                <div
                  className="hidden lg:block absolute top-8 left-full w-5 h-px bg-white/10 z-10"
                  aria-hidden="true"
                />
              )}
              <span
                className="text-3xl font-bold text-amber/20"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                {step.n}
              </span>
              <h3
                className="text-base font-semibold text-foreground"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                {step.title}
              </h3>
              <p
                className="text-sm text-muted-foreground leading-relaxed"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Callout note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-start gap-3 rounded-lg border border-teal/15 bg-teal/5 px-5 py-4 max-w-2xl mx-auto"
        >
          <span className="text-teal mt-0.5 flex-shrink-0 text-lg" aria-hidden="true">ℹ</span>
          <p
            className="text-sm text-teal/90 leading-relaxed"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Quackie won&apos;t fight you — manually edit a generated commit and it stays frozen until you&apos;re ready for the next rewrite.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

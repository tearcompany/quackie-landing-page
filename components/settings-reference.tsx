'use client'

import { motion } from 'framer-motion'

const settings = [
  {
    key: 'quackie.persona',
    default: '""',
    description: 'Active persona id',
  },
  {
    key: 'quackie.autoRewrite',
    default: 'true',
    description: 'Auto rewrite on type',
  },
  {
    key: 'quackie.debounceMs',
    default: '500',
    description: 'Debounce delay (ms)',
  },
  {
    key: 'quackie.enabledTargets',
    default: '["commit"]',
    description: 'Rewrite targets (future)',
  },
]

export function SettingsReference() {
  return (
    <section id="settings" className="py-24">
      <div className="max-w-3xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Configurable, sensible defaults
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-xl border border-white/[0.07] bg-card overflow-hidden"
        >
          {/* Table header */}
          <div className="grid grid-cols-3 bg-[#0d0d16] border-b border-white/[0.06]">
            {['Setting', 'Default', 'Description'].map((h) => (
              <div
                key={h}
                className="px-4 py-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground/60"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                {h}
              </div>
            ))}
          </div>

          {/* Rows */}
          {settings.map((row, i) => (
            <div
              key={row.key}
              className={`grid grid-cols-3 border-b border-white/[0.04] last:border-0 ${
                i % 2 === 0 ? 'bg-transparent' : 'bg-[#0d0d16]/30'
              }`}
            >
              <div className="px-4 py-3.5">
                <code
                  className="text-xs text-amber font-mono"
                  style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
                >
                  {row.key}
                </code>
              </div>
              <div className="px-4 py-3.5">
                <code
                  className="text-xs text-teal font-mono"
                  style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
                >
                  {row.default}
                </code>
              </div>
              <div
                className="px-4 py-3.5 text-sm text-muted-foreground"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                {row.description}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

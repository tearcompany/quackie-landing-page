'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Clock } from 'lucide-react'

const milestones = [
  {
    version: 'v0.1',
    label: 'Commit message rewrite',
    detail: 'MVP — current release',
    status: 'shipped' as const,
  },
  {
    version: 'v0.2',
    label: 'Real Quackie LLM engine',
    detail: 'Replace mock rewrite service',
    status: 'planned' as const,
  },
  {
    version: 'v0.3',
    label: 'Pull request descriptions',
    detail: 'Persona voice for PR body',
    status: 'planned' as const,
  },
  {
    version: 'v0.4',
    label: 'Code review comments',
    detail: 'Persona-flavored review threads',
    status: 'planned' as const,
  },
  {
    version: 'v0.5',
    label: 'Release notes & changelogs',
    detail: 'Auto-generated, persona-voiced',
    status: 'planned' as const,
  },
  {
    version: 'v0.6',
    label: 'Branch name suggestions',
    detail: 'Persona-aware branch names',
    status: 'planned' as const,
  },
  {
    version: 'v1.0',
    label: 'VS Code Marketplace',
    detail: 'Public release',
    status: 'planned' as const,
  },
]

export function Roadmap() {
  return (
    <section id="roadmap" className="py-24 bg-[#0d0d16]/50">
      <div className="max-w-3xl mx-auto px-5">
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
            Commits are just{' '}
            <span className="text-amber">the beginning</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-[calc(theme(spacing.5)+7px)] top-2 bottom-2 w-px bg-white/[0.06]"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-0">
            {milestones.map((m, i) => (
              <motion.div
                key={m.version}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.45 }}
                className="relative flex items-start gap-5 pb-7 last:pb-0"
              >
                {/* Icon */}
                <div className="relative z-10 flex-shrink-0 mt-0.5">
                  {m.status === 'shipped' ? (
                    <CheckCircle2 size={16} className="text-teal" />
                  ) : (
                    <Clock size={16} className="text-muted-foreground/40" />
                  )}
                </div>

                {/* Content */}
                <div
                  className={`flex-1 rounded-lg border px-4 py-3 ${
                    m.status === 'shipped'
                      ? 'border-teal/20 bg-teal/5'
                      : 'border-white/[0.06] bg-card'
                  }`}
                >
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs font-mono font-semibold ${
                          m.status === 'shipped' ? 'text-teal' : 'text-muted-foreground/60'
                        }`}
                        style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
                      >
                        {m.version}
                      </span>
                      <span
                        className={`text-sm font-medium ${
                          m.status === 'shipped' ? 'text-foreground' : 'text-foreground/70'
                        }`}
                        style={{ fontFamily: 'var(--font-space-grotesk)' }}
                      >
                        {m.label}
                      </span>
                    </div>
                    {m.status === 'shipped' ? (
                      <span className="text-[10px] uppercase tracking-widest font-semibold text-teal bg-teal/10 border border-teal/20 px-2 py-0.5 rounded-full">
                        shipped
                      </span>
                    ) : (
                      <span className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground/50 bg-white/5 border border-white/[0.06] px-2 py-0.5 rounded-full">
                        planned
                      </span>
                    )}
                  </div>
                  <p
                    className="text-xs text-muted-foreground mt-1"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {m.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

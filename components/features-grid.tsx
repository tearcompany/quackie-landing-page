'use client'

import { motion } from 'framer-motion'
import {
  RefreshCw,
  TerminalSquare,
  ShieldOff,
  PauseCircle,
  Package,
  Plug,
  GitBranch,
  CheckSquare,
} from 'lucide-react'

const features = [
  {
    icon: RefreshCw,
    title: 'Auto-rewrite as you type',
    body: 'Polls Git input, debounces 500ms, replaces in place. No popup, no copy-paste.',
  },
  {
    icon: TerminalSquare,
    title: 'Status bar persona picker',
    body: 'Always visible: 🐄 Moo. One click → QuickPick with all personas.',
  },
  {
    icon: ShieldOff,
    title: 'Loop prevention',
    body: 'Internal isUpdating guard — no infinite rewrite spiral.',
  },
  {
    icon: PauseCircle,
    title: 'User-respect freeze',
    body: 'Edit a generated commit manually? Quackie backs off until the next cycle.',
  },
  {
    icon: Package,
    title: 'Bundled personas',
    body: '30 personalities included. No personas/ folder in your project.',
  },
  {
    icon: Plug,
    title: 'Pluggable rewrite engine',
    body: 'RewriteService interface — swap mock for real LLM backend when ready.',
  },
  {
    icon: GitBranch,
    title: 'Multi-repo support',
    body: 'Works across multiple Git repositories in one workspace.',
  },
  {
    icon: CheckSquare,
    title: 'Conventional Commits',
    body: 'Meaning preserved. Format respected. Max 72 characters.',
  },
]

export function FeaturesGrid() {
  return (
    <section id="features-detail" className="py-24 bg-[#0d0d16]/50">
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
            Built for developers{' '}
            <span className="text-amber">who live in Git</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.45 }}
                className="rounded-xl border border-white/[0.07] bg-card p-5 flex flex-col gap-3 hover:border-amber/20 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-amber/10 flex items-center justify-center">
                  <Icon size={16} className="text-amber" aria-hidden="true" />
                </div>
                <h3
                  className="text-sm font-semibold text-foreground"
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-sm text-muted-foreground leading-relaxed"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {feature.body}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

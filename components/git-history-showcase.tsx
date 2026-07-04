'use client'

import { motion } from 'framer-motion'

/**
 * Example git history rewritten by Quackie personas.
 * Every message below is real output from the production rewrite engine
 * (one API call per commit, persona settings as bundled) — curated, not mocked.
 */
interface HistoryCommit {
  hash: string
  message: string
  persona: string
  decoration?: string
}

const commits: HistoryCommit[] = [
  {
    hash: 'f4a9e2b',
    message: '👑 chore: crown v1.0.0 as the first stable release',
    persona: 'Queen',
    decoration: 'HEAD -> main, tag: v1.0.0',
  },
  {
    hash: 'c81d3f7',
    message: '⛏️ docs: ogarnij README, żeby nie straszyło po staremu',
    persona: 'Hanys',
  },
  {
    hash: 'b52c9a0',
    message: '🌪️ feat: summon dark mode from the void',
    persona: 'Chaos',
  },
  {
    hash: 'e903b1c',
    message: '☕ revert: back out the Friday hotfix before it teaches us more lessons',
    persona: 'Sleep-Deprived Senior',
  },
  {
    hash: 'a17f08d',
    message: '🍺 fix: patch the payment crash before it takes the weekend hostage',
    persona: 'Friday Deploy Survivor',
  },
  {
    hash: 'd6e4c25',
    message: '🤠 feat: ship the checkout page in time for the demo',
    persona: 'Startup Cowboy',
  },
  {
    hash: '92b7f4e',
    message: '🦥 chore: eventually nudge the dependencies forward',
    persona: 'Sloth',
  },
  {
    hash: '7c3a812',
    message: '🐄 refactor: untangle payment logic into its own service',
    persona: 'Moo',
  },
  {
    hash: '4f19d6b',
    message: '💀 fix: let empty passwords fail without taking auth down with them',
    persona: 'Doom',
  },
  {
    hash: '8e5b03a',
    message: '🦆 feat: apparently we need a user login form',
    persona: 'Duck',
  },
  {
    hash: '1a2f9c4',
    message: '🧙 chore: lay the first stones of the realm',
    persona: 'Gandalf',
  },
]

export function GitHistoryShowcase() {
  return (
    <section id="git-history" className="py-24">
      <div className="max-w-4xl mx-auto px-5">
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
            Your git log, <span className="text-amber">after Quackie.</span>
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
          One sprint, eleven commits, eleven personas. Every message below is
          real output from the Quackie rewrite engine — not a mockup.
        </motion.p>

        {/* Terminal window */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="rounded-xl border border-white/[0.08] bg-[#0a0a0f] overflow-hidden glow-amber-sm"
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-surface">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            <span
              className="ml-3 text-xs text-muted-foreground font-mono"
              style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
            >
              ~/awesome-app — git log --oneline
            </span>
          </div>

          {/* Log lines */}
          <div
            className="p-4 sm:p-6 overflow-x-auto text-[13px] leading-relaxed font-mono"
            style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
          >
            {commits.map((commit, i) => (
              <motion.div
                key={commit.hash}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: Math.min(i * 0.07, 0.8), duration: 0.3 }}
                className="group flex items-baseline gap-2 whitespace-nowrap py-0.5"
              >
                <span className="text-muted-foreground/40 select-none">*</span>
                <span className="text-amber/80">{commit.hash}</span>
                {commit.decoration && (
                  <span className="text-teal/80">({commit.decoration})</span>
                )}
                <span className="text-foreground/90">{commit.message}</span>
                <span className="ml-auto pl-6 text-[11px] text-muted-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:inline">
                  ← {commit.persona}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Caption */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-center text-xs text-muted-foreground mt-6"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          Hover a line to see which persona wrote it. Switch personas anytime —
          one click in the status bar.
        </motion.p>
      </div>
    </section>
  )
}

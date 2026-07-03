'use client'

import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

const flowSteps = [
  { label: 'You type commit', detail: null },
  { label: 'CommitWatcher', detail: 'debounce · freeze logic' },
  { label: 'RewriteService.rewrite()', detail: 'persona · type · text' },
  { label: 'Persona engine', detail: 'persona.yaml + system_prompt.md' },
  { label: 'Rewritten commit', detail: 'Git input box updated' },
]

const knowsRows = [
  { knows: 'persona id, name, emoji', doesNotKnow: 'prompts, humor rules, tone' },
  { knows: 'when to rewrite', doesNotKnow: 'how to be funny' },
  { knows: 'user edit state', doesNotKnow: 'forbidden words, verbs' },
]

const codeSnippet = `rewrite({
  persona: "moo",
  type: "commit",
  text: "fix validation"
})
// → "🐄 fix: convince validation some manners"`

export function Architecture() {
  return (
    <section id="architecture" className="py-24">
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
            Personality-first{' '}
            <span className="text-amber">by design</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-center text-muted-foreground mb-14 max-w-xl mx-auto"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          The extension knows as little as possible about personalities. Personas are data.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Flow diagram */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-xl border border-white/[0.07] bg-card p-6 flex flex-col items-center gap-0"
          >
            <h3
              className="text-xs uppercase tracking-widest text-muted-foreground/60 mb-5"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Execution flow
            </h3>
            {flowSteps.map((step, i) => (
              <div key={step.label} className="flex flex-col items-center w-full">
                <div className="w-full rounded-lg border border-white/[0.08] bg-[#0d0d16] px-4 py-3 text-center">
                  <div
                    className="text-sm font-medium text-foreground/90 font-mono"
                    style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
                  >
                    {step.label}
                  </div>
                  {step.detail && (
                    <div
                      className="text-xs text-muted-foreground mt-0.5"
                      style={{ fontFamily: 'var(--font-inter)' }}
                    >
                      {step.detail}
                    </div>
                  )}
                </div>
                {i < flowSteps.length - 1 && (
                  <div className="flex flex-col items-center py-1">
                    <div className="w-px h-4 bg-white/10" />
                    <ArrowDown size={12} className="text-amber/50" />
                  </div>
                )}
              </div>
            ))}
          </motion.div>

          {/* Right column: table + code */}
          <div className="flex flex-col gap-6">
            {/* Knows / Does not know table */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-xl border border-white/[0.07] bg-card overflow-hidden"
            >
              <div className="grid grid-cols-2 bg-[#0d0d16] border-b border-white/[0.06]">
                <div
                  className="px-4 py-2.5 text-xs font-semibold text-teal/80 uppercase tracking-widest"
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  Extension knows
                </div>
                <div
                  className="px-4 py-2.5 text-xs font-semibold text-muted-foreground/60 uppercase tracking-widest border-l border-white/[0.06]"
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  Does not know
                </div>
              </div>
              {knowsRows.map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-2 border-b border-white/[0.04] last:border-0"
                >
                  <div
                    className="px-4 py-3 text-sm text-foreground/80"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {row.knows}
                  </div>
                  <div
                    className="px-4 py-3 text-sm text-muted-foreground border-l border-white/[0.04]"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {row.doesNotKnow}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Code snippet */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-xl border border-white/[0.07] bg-[#0a0a0f] overflow-hidden"
            >
              {/* Code chrome */}
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.06] bg-[#0d0d16]">
                <span className="text-xs text-muted-foreground/60 font-mono">
                  RewriteService.ts
                </span>
                <span className="ml-auto text-[10px] text-amber/50 font-mono">TypeScript</span>
              </div>
              <pre className="p-5 text-sm leading-relaxed overflow-x-auto">
                <code style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>
                  {codeSnippet.split('\n').map((line, i) => {
                    if (line.startsWith('//')) {
                      return (
                        <span key={i} className="text-muted-foreground/50">
                          {line}
                          {'\n'}
                        </span>
                      )
                    }
                    if (line.includes('"')) {
                      const parts = line.split(/(\"[^"]*\")/g)
                      return (
                        <span key={i}>
                          {parts.map((part, j) =>
                            part.startsWith('"') ? (
                              <span key={j} className="text-teal">
                                {part}
                              </span>
                            ) : (
                              <span key={j} className="text-foreground/80">
                                {part}
                              </span>
                            )
                          )}
                          {'\n'}
                        </span>
                      )
                    }
                    return (
                      <span key={i} className="text-foreground/80">
                        {line}
                        {'\n'}
                      </span>
                    )
                  })}
                </code>
              </pre>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

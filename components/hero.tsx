'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { personas } from '@/lib/personas'

const demoPersona = personas.find((p) => p.id === 'moo')!

export function Hero() {
  // Typing animation state
  const [phase, setPhase] = useState<'typing' | 'rewritten'>('typing')
  const typingText = 'fix validation'
  const [displayText, setDisplayText] = useState('')

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    let charIdx = 0

    const typeChar = () => {
      charIdx++
      setDisplayText(typingText.slice(0, charIdx))
      if (charIdx < typingText.length) {
        timeout = setTimeout(typeChar, 80)
      } else {
        // Pause, then "rewrite"
        timeout = setTimeout(() => {
          setPhase('rewritten')
          // After showing, reset and loop
          timeout = setTimeout(() => {
            setPhase('typing')
            setDisplayText('')
            charIdx = 0
            timeout = setTimeout(typeChar, 300)
          }, 3200)
        }, 700)
      }
    }

    timeout = setTimeout(typeChar, 600)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 overflow-hidden hero-texture">
      {/* Ambient glow blobs */}
      <div
        className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(245,166,35,0.06) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(45,212,191,0.05) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-5 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col gap-6"
          >
            {/* Version badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-muted text-muted-foreground border border-white/[0.06]">
                v0.1.0 MVP
              </span>
              <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-muted text-muted-foreground border border-white/[0.06]">
                VS Code &amp; Cursor
              </span>
              <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-amber/10 text-amber border border-amber/20">
                40 personas included
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-5xl sm:text-6xl lg:text-[64px] font-bold leading-[1.08] tracking-tight text-balance text-foreground"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Your commits.{' '}
              <span className="text-amber">Their personality.</span>
            </h1>

            {/* Subheadline */}
            <p
              className="text-lg text-muted-foreground leading-relaxed max-w-[480px]"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Quackie is a VS Code extension that rewrites your Git commit messages through 40 bundled personas — dry seniors, sarcastic ducks, grim doomers, wise wizards, startup cowboys, and more. Install once. Works in any repo.
            </p>

            {/* One-liner subheadline */}
            <p
              className="font-mono text-sm text-teal bg-teal/5 border border-teal/15 rounded-md px-3 py-2.5 inline-block"
            >
              Install once. Pick a persona. Type{' '}
              <span className="text-foreground/80">fix validation</span> — get{' '}
              <span className="text-amber">🐄 fix: convince validation some manners</span>
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href="#install"
                className="flex items-center gap-2 px-5 py-3 rounded-md text-sm font-semibold bg-amber hover:bg-amber/90 transition-colors glow-amber-sm"
                style={{ color: '#0a0a0f', fontFamily: 'var(--font-space-grotesk)' }}
              >
                Install for VS Code
              </a>
              <a
                href="#personas"
                className="flex items-center gap-2 px-5 py-3 rounded-md text-sm font-medium border border-white/10 text-foreground/80 hover:text-foreground hover:border-white/20 transition-colors"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                See personas
              </a>
            </div>
          </motion.div>

          {/* Right — VS Code mockup */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
            className="flex justify-center lg:justify-end"
            aria-label="VS Code commit input demo"
          >
            <VSCodeMockup phase={phase} displayText={displayText} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function VSCodeMockup({
  phase,
  displayText,
}: {
  phase: 'typing' | 'rewritten'
  displayText: string
}) {
  return (
    <div
      className="w-full max-w-[480px] rounded-xl border border-white/[0.08] bg-[#0d0d16] overflow-hidden"
      style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)' }}
    >
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-[#111118]">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span
          className="ml-3 text-xs text-muted-foreground truncate"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          Source Control — Quackie Demo
        </span>
      </div>

      {/* Source Control panel */}
      <div className="p-4 space-y-3">
        {/* Panel title */}
        <div className="flex items-center justify-between">
          <span
            className="text-xs uppercase tracking-widest text-muted-foreground/60"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Source Control
          </span>
          <span className="text-xs text-muted-foreground/40 font-mono">git</span>
        </div>

        {/* Commit input */}
        <div className="rounded-md border border-white/[0.08] bg-[#0a0a0f] p-3 min-h-[80px] relative">
          <div
            className="text-sm font-mono leading-relaxed"
            style={{ fontFamily: 'var(--font-jetbrains-mono)', minHeight: '2.5rem' }}
          >
            {phase === 'typing' ? (
              <span className="text-foreground/80">
                {displayText}
                <span className="cursor-blink text-amber">|</span>
              </span>
            ) : (
              <motion.span
                key="rewritten"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-foreground"
              >
                <span
                  className="text-xl mr-1 glow-amber-sm inline-block"
                  style={{ textShadow: '0 0 12px rgba(245,166,35,0.6)' }}
                >
                  🐄
                </span>
                <span className="text-teal">fix:</span>{' '}
                <span>convince validation some manners</span>
              </motion.span>
            )}
          </div>
          {/* Label */}
          <div className="absolute top-2 right-2.5">
            <span className="text-[10px] text-muted-foreground/40 font-mono">
              {phase === 'typing' ? 'typing...' : 'quackie rewrote'}
            </span>
          </div>
        </div>

        {/* Commit button */}
        <button
          className="w-full py-2 rounded-sm text-xs font-medium bg-[#1e7e6c] text-white/90 hover:bg-[#1e7e6c]/80 transition-colors"
          style={{ fontFamily: 'var(--font-inter)' }}
          tabIndex={-1}
          aria-hidden="true"
        >
          Commit to main
        </button>

        {/* Changes list */}
        <div className="space-y-1 pt-1">
          <span
            className="text-[11px] uppercase tracking-widest text-muted-foreground/50"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Changes (3)
          </span>
          {['src/auth/validator.ts', 'src/auth/rules.ts', 'tests/auth.test.ts'].map(
            (file) => (
              <div
                key={file}
                className="flex items-center gap-2 py-0.5"
              >
                <span className="text-[11px] text-teal font-mono">M</span>
                <span
                  className="text-xs text-muted-foreground"
                  style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
                >
                  {file}
                </span>
              </div>
            )
          )}
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#0d1117] border-t border-white/[0.06]">
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground/60 font-mono">main</span>
          <span className="text-xs text-muted-foreground/40">↑0 ↓0</span>
        </div>
        {/* Persona pill */}
        <button
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-amber/10 border border-amber/20 text-amber hover:bg-amber/15 transition-colors"
          tabIndex={-1}
          aria-label="Active persona: Moo"
        >
          <span className="text-base leading-none">🐄</span>
          <span
            className="text-xs font-medium"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Moo
          </span>
        </button>
      </div>
    </div>
  )
}

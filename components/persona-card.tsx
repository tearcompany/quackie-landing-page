'use client'

import { motion } from 'framer-motion'
import type { Persona } from '@/lib/personas'

interface PersonaCardProps {
  persona: Persona
  index: number
  onSelect?: (persona: Persona) => void
  isSelected?: boolean
}

export function PersonaCard({ persona, index, onSelect, isSelected }: PersonaCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: Math.min(index * 0.04, 0.5), duration: 0.4 }}
      onClick={() => onSelect?.(persona)}
      className={`persona-card w-full text-left rounded-xl border bg-card p-5 flex flex-col gap-3 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber transition-all ${
        isSelected
          ? 'border-amber/50 glow-amber-sm'
          : 'border-white/[0.07] hover:border-amber/30'
      }`}
      aria-label={`Persona: ${persona.name}`}
      aria-pressed={isSelected}
    >
      {/* Emoji + name row */}
      <div className="flex items-center gap-3">
        <span
          className="text-3xl leading-none select-none"
          role="img"
          aria-label={persona.name}
        >
          {persona.emoji}
        </span>
        <div>
          <div
            className="text-sm font-semibold text-foreground"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            {persona.name}
          </div>
          <div
            className="text-xs text-muted-foreground"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            {persona.voice}
          </div>
        </div>
        {isSelected && (
          <span className="ml-auto text-[10px] font-mono text-amber bg-amber/10 border border-amber/20 px-1.5 py-0.5 rounded">
            active
          </span>
        )}
      </div>

      {/* Before → after */}
      <div
        className="rounded-md bg-[#0a0a0f] border border-white/[0.06] p-3 space-y-1.5"
      >
        <div className="flex items-start gap-2">
          <span className="text-[10px] text-muted-foreground/50 font-mono mt-0.5 w-10 flex-shrink-0">in</span>
          <span
            className="text-xs text-muted-foreground font-mono leading-relaxed"
            style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
          >
            {persona.exampleInput}
          </span>
        </div>
        <div className="h-px bg-white/[0.05]" />
        <div className="flex items-start gap-2">
          <span className="text-[10px] text-amber/60 font-mono mt-0.5 w-10 flex-shrink-0">out</span>
          <span
            className="text-xs text-foreground/90 font-mono leading-relaxed"
            style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
          >
            {persona.exampleOutput}
          </span>
        </div>
      </div>
    </motion.button>
  )
}

import type { ReactNode } from 'react'

interface PageHeroProps {
  eyebrow: string
  title: ReactNode
  description: string
}

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <div className="max-w-3xl mx-auto px-5 pt-6 pb-4 text-center">
      <span
        className="inline-block text-xs font-semibold uppercase tracking-widest text-teal mb-3"
        style={{ fontFamily: 'var(--font-space-grotesk)' }}
      >
        {eyebrow}
      </span>
      <h1
        className="text-4xl sm:text-5xl font-bold tracking-tight text-balance text-foreground mb-4"
        style={{ fontFamily: 'var(--font-space-grotesk)' }}
      >
        {title}
      </h1>
      <p
        className="text-muted-foreground leading-relaxed"
        style={{ fontFamily: 'var(--font-inter)' }}
      >
        {description}
      </p>
    </div>
  )
}

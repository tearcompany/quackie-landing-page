import Link from 'next/link'
import { GitBranch, BookOpen, ScrollText, Shield } from 'lucide-react'

const externalLinks = [
  { label: 'GitHub', href: '#', icon: GitBranch },
  { label: 'Docs', href: '#', icon: BookOpen },
  { label: 'Changelog', href: '#', icon: ScrollText },
  { label: 'Privacy', href: '#', icon: Shield },
]

const exploreLinks = [
  { label: 'Features', href: '/features' },
  { label: 'Personas', href: '/personas' },
  { label: 'How it works', href: '/how-it-works' },
  { label: 'Install', href: '/install' },
  { label: 'Roadmap', href: '/roadmap' },
  { label: 'FAQ', href: '/faq' },
]

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-10">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl" aria-hidden="true">🦆</span>
            <span
              className="font-bold text-foreground/90"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Quackie
            </span>
          </Link>

          {/* External links */}
          <nav className="flex items-center gap-5" aria-label="Footer navigation">
            {externalLinks.map((link) => {
              const Icon = link.icon
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  <Icon size={14} aria-hidden="true" />
                  {link.label}
                </a>
              )
            })}
          </nav>
        </div>

        {/* Explore links */}
        <nav
          className="mt-8 pt-6 border-t border-white/[0.04] flex flex-wrap items-center justify-center sm:justify-start gap-x-5 gap-y-2"
          aria-label="Explore Quackie"
        >
          {exploreLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-6 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p
            className="text-xs text-muted-foreground/60"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            &copy; 2026 Quackie. Personality-first rewrite runtime.
          </p>
          <p
            className="text-xs text-muted-foreground/40"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Not affiliated with Microsoft, VS Code, or Cursor.
          </p>
        </div>
      </div>
    </footer>
  )
}

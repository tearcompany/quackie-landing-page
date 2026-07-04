import Link from 'next/link'
import { GitBranch } from 'lucide-react'

const GITHUB_URL = 'https://github.com/tearcompany/quackie'

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-10">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl" aria-hidden="true">🦆</span>
            <span
              className="font-bold text-foreground/90"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Quackie
            </span>
          </Link>

          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            <GitBranch size={14} aria-hidden="true" />
            GitHub
          </a>
        </div>

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

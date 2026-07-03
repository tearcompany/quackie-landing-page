'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Features', href: '/features' },
  { label: 'Personas', href: '/personas' },
  { label: 'How it works', href: '/how-it-works' },
  { label: 'Install', href: '/install' },
  { label: 'Roadmap', href: '/roadmap' },
  { label: 'FAQ', href: '/faq' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0a0f]/90 backdrop-blur-md border-b border-white/[0.06] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group" aria-label="Quackie home">
          <span className="text-xl leading-none select-none" aria-hidden="true">
            🦆
          </span>
          <span
            className="font-sans font-bold text-lg tracking-tight text-foreground group-hover:text-amber transition-colors"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Quackie
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/install"
            className="px-4 py-2 rounded-md text-sm font-medium bg-amber text-amber-foreground hover:bg-amber/90 transition-colors"
            style={{ fontFamily: 'var(--font-space-grotesk)', color: '#0a0a0f' }}
          >
            Get Quackie
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-muted-foreground hover:text-foreground transition-colors p-1"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-[#0d0d16]/95 backdrop-blur-md border-t border-white/[0.06]">
          <nav className="max-w-6xl mx-auto px-5 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/install"
              className="mt-2 w-full text-center px-4 py-2.5 rounded-md text-sm font-medium bg-amber"
              style={{ color: '#0a0a0f' }}
              onClick={() => setMenuOpen(false)}
            >
              Get Quackie
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

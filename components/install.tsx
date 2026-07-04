'use client'

import { motion } from 'framer-motion'
import { QUACKIE_MARKETPLACE_URL, QUACKIE_VSIX_PATH } from '@/lib/site'

export function Install() {
  return (
    <section id="install" className="py-24 bg-[#0d0d16]/50">
      <div className="max-w-3xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2
            className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Get Quackie
          </h2>
          <p
            className="text-muted-foreground max-w-md mx-auto"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Download the extension, install it, pick a persona. Works in VS Code and Cursor.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={QUACKIE_VSIX_PATH}
              download
              className="flex items-center gap-2 px-5 py-3 rounded-md text-sm font-semibold bg-amber hover:bg-amber/90 transition-colors glow-amber-sm"
              style={{ color: '#0a0a0f', fontFamily: 'var(--font-space-grotesk)' }}
            >
              Download
            </a>
            <a
              href={QUACKIE_MARKETPLACE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-md text-sm font-medium border border-white/10 text-foreground/80 hover:text-foreground hover:border-white/20 transition-colors"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Get on Marketplace
            </a>
          </div>

          <p
            className="text-sm text-muted-foreground text-center max-w-lg"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            After downloading the VSIX:{' '}
            <kbd className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded border border-white/10">
              Cmd+Shift+P
            </kbd>{' '}
            →{' '}
            <span className="text-foreground/80">Extensions: Install from VSIX...</span>{' '}
            → reload window.
          </p>

          <div className="w-full rounded-lg border border-white/[0.07] bg-card px-5 py-4 flex flex-col sm:flex-row gap-4">
            <span
              className="text-xs uppercase tracking-widest text-muted-foreground/60 sm:w-28 flex-shrink-0 pt-0.5"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Requirements
            </span>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal flex-shrink-0" />
                <span className="text-sm text-muted-foreground" style={{ fontFamily: 'var(--font-inter)' }}>
                  VS Code 1.85+ or Cursor
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal flex-shrink-0" />
                <span className="text-sm text-muted-foreground" style={{ fontFamily: 'var(--font-inter)' }}>
                  Built-in Git extension enabled (
                  <code className="font-mono text-xs text-teal">vscode.git</code>)
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, GitBranch, BookOpen } from 'lucide-react'

const vsixSteps = `# Build from source
cd extension
npm install
npm run package
npx @vscode/vsce package`

const devSteps = `cd extension
npm install
npm run watch
# Press F5 in VS Code`

function CodeBlock({ code, label }: { code: string; label: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#0a0a0f] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06] bg-[#0d0d16]">
        <span className="text-xs text-muted-foreground/60 font-mono">{label}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check size={12} className="text-teal" />
              <span className="text-teal">Copied</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-5 text-sm leading-relaxed overflow-x-auto">
        <code style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>
          {code.split('\n').map((line, i) =>
            line.startsWith('#') ? (
              <span key={i} className="text-muted-foreground/50">
                {line}
                {'\n'}
              </span>
            ) : (
              <span key={i} className="text-foreground/85">
                {line}
                {'\n'}
              </span>
            )
          )}
        </code>
      </pre>
    </div>
  )
}

export function Install() {
  const [activeTab, setActiveTab] = useState<'vsix' | 'dev'>('vsix')

  return (
    <section id="install" className="py-24 bg-[#0d0d16]/50">
      <div className="max-w-3xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2
            className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Get Quackie
          </h2>
          <p
            className="text-muted-foreground"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Two ways to install. Both take under two minutes.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Tabs */}
          <div className="flex rounded-lg border border-white/[0.07] bg-card p-1 mb-5 w-fit mx-auto">
            <button
              onClick={() => setActiveTab('vsix')}
              className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'vsix'
                  ? 'bg-amber text-amber-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              style={{
                fontFamily: 'var(--font-space-grotesk)',
                color: activeTab === 'vsix' ? '#0a0a0f' : undefined,
              }}
            >
              VSIX (recommended)
            </button>
            <button
              onClick={() => setActiveTab('dev')}
              className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'dev'
                  ? 'bg-amber text-amber-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              style={{
                fontFamily: 'var(--font-space-grotesk)',
                color: activeTab === 'dev' ? '#0a0a0f' : undefined,
              }}
            >
              Development
            </button>
          </div>

          {/* Tab content */}
          {activeTab === 'vsix' ? (
            <div className="space-y-4">
              <CodeBlock code={vsixSteps} label="terminal" />
              <p
                className="text-sm text-muted-foreground px-1"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Then:{' '}
                <kbd className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded border border-white/10">
                  Cmd+Shift+P
                </kbd>{' '}
                →{' '}
                <span className="text-foreground/80">Extensions: Install from VSIX...</span>{' '}
                → reload window.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <CodeBlock code={devSteps} label="terminal" />
              <p
                className="text-sm text-muted-foreground px-1"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                A new Extension Development Host window opens with Quackie active.
              </p>
            </div>
          )}

          {/* Requirements */}
          <div className="mt-6 rounded-lg border border-white/[0.07] bg-card px-5 py-4 flex flex-col sm:flex-row gap-4">
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

          {/* CTAs */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <a
              href="https://github.com/tearcompany/quackie"
              className="flex items-center gap-2 px-5 py-3 rounded-md text-sm font-semibold bg-foreground/5 border border-white/10 text-foreground hover:bg-foreground/10 transition-colors"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              <GitBranch size={16} />
              View on GitHub
            </a>
            <a
              href="https://github.com/tearcompany/quackie/blob/main/README.md"
              target="_blank"
              className="flex items-center gap-2 px-5 py-3 rounded-md text-sm font-medium border border-white/10 text-muted-foreground hover:text-foreground transition-colors"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              <BookOpen size={16} />
              Read the docs
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

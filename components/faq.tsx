'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'

const faqs = [
  {
    q: 'Is Quackie a commit message generator?',
    a: 'No. It\'s a personality runtime. Commits are the first integration target. Quackie rewrites what you write — it doesn\'t generate from nothing.',
  },
  {
    q: 'Do I need persona files in my repo?',
    a: 'No. All 22 personas ship bundled inside the extension. Zero config files committed to your project.',
  },
  {
    q: 'Does it work in Cursor?',
    a: 'Yes. Cursor supports VS Code extensions including Git integration. Install the VSIX the same way.',
  },
  {
    q: 'Will it overwrite my edits?',
    a: 'Not if you manually changed a generated commit. Quackie enters a frozen state until you clear the input or trigger Rewrite Now.',
  },
  {
    q: 'Does it use AI right now?',
    a: 'v0.1 ships with a deterministic mock rewrite service. Real LLM backend is planned for v0.2.',
  },
  {
    q: 'Conventional Commits — preserved?',
    a: 'Yes. Semantic meaning and format are preserved. One emoji prefix is added. Max 72 characters enforced.',
  },
]

function FaqItem({ item, index }: { item: (typeof faqs)[0]; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      className="border-b border-white/[0.07] last:border-0"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
        aria-expanded={open}
      >
        <span
          className="text-[15px] font-medium text-foreground/90 group-hover:text-foreground transition-colors"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          {item.q}
        </span>
        <Plus
          size={16}
          className={`flex-shrink-0 text-muted-foreground transition-transform duration-200 ${
            open ? 'rotate-45 text-amber' : ''
          }`}
          aria-hidden="true"
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p
              className="pb-5 text-[15px] text-muted-foreground leading-relaxed"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function FAQ() {
  return (
    <section id="faq" className="py-24">
      <div className="max-w-2xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2
            className="text-4xl font-bold tracking-tight text-foreground"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Questions
          </h2>
        </motion.div>

        <div className="rounded-xl border border-white/[0.07] bg-card px-6">
          {faqs.map((faq, i) => (
            <FaqItem key={faq.q} item={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

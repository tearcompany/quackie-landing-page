'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import { faqs, type FaqItem as FaqItemData } from '@/lib/faqs'

function FaqItem({ item, index }: { item: FaqItemData; index: number }) {
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
            <FaqItem key={faq.id} item={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

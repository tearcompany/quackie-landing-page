/**
 * FAQ content, shared between the FAQ section component and the
 * FAQPage structured data emitted on /faq.
 */

export interface FaqItem {
  id: string
  q: string
  a: string
}

export const faqs: FaqItem[] = [
  {
    id: 'commit-message-generator',
    q: 'Is Quackie a commit message generator?',
    a: "No. It's a personality runtime. Commits are the first integration target. Quackie rewrites what you write — it doesn't generate from nothing.",
  },
  {
    id: 'persona-files-in-repo',
    q: 'Do I need persona files in my repo?',
    a: 'No. All 40 personas ship bundled inside the extension. Zero config files committed to your project.',
  },
  {
    id: 'cursor-support',
    q: 'Does it work in Cursor?',
    a: 'Yes. Cursor supports VS Code extensions including Git integration. Install the VSIX the same way.',
  },
  {
    id: 'overwrite-edits',
    q: 'Will it overwrite my edits?',
    a: 'Not if you manually changed a generated commit. Quackie enters a frozen state until you clear the input or trigger Rewrite Now.',
  },
  {
    id: 'uses-ai',
    q: 'Does it use AI right now?',
    a: 'v0.1 ships with a deterministic mock rewrite service. Real LLM backend is planned for v0.2.',
  },
  {
    id: 'conventional-commits',
    q: 'Conventional Commits — preserved?',
    a: 'Yes. Semantic meaning and format are preserved. One emoji prefix is added. Max 72 characters enforced.',
  },
]

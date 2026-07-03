/**
 * Quackie personas — all 22 bundled personalities.
 * Each persona ships inside the extension. The extension knows only
 * `id`, `name`, and `emoji` — prompts and humor rules live in persona data.
 */

export type PersonaPack = 'classic' | 'archetype'

export interface Persona {
  id: string
  emoji: string
  name: string
  pack: PersonaPack
  voice: string
  exampleInput: string
  exampleOutput: string
}

export const personas: Persona[] = [
  // ── Classic pack ──────────────────────────────────────────────
  {
    id: 'cat',
    emoji: '🐱',
    name: 'Cat',
    pack: 'classic',
    voice: 'aloof reviewer',
    exampleInput: 'fix lint',
    exampleOutput: '🐱 fix: ignore lint again',
  },
  {
    id: 'chaos',
    emoji: '🌀',
    name: 'Chaos',
    pack: 'classic',
    voice: 'controlled entropy',
    exampleInput: 'refactor auth',
    exampleOutput: '🌀 refactor(auth): shuffle the deck',
  },
  {
    id: 'doom',
    emoji: '💀',
    name: 'Doom',
    pack: 'classic',
    voice: 'grim but funny',
    exampleInput: 'fix timeout',
    exampleOutput: '💀 fix: postpone timeout a bit longer',
  },
  {
    id: 'duck',
    emoji: '🦆',
    name: 'Duck',
    pack: 'classic',
    voice: 'mild sarcasm',
    exampleInput: 'fix validation',
    exampleOutput: '🦆 fix: apparently revisit validation',
  },
  {
    id: 'gandalf',
    emoji: '🧙',
    name: 'Gandalf',
    pack: 'classic',
    voice: 'ancient mentor',
    exampleInput: 'split service',
    exampleOutput: '🧙 refactor: guide service apart',
  },
  {
    id: 'hanys',
    emoji: '🧔',
    name: 'Hanys',
    pack: 'classic',
    voice: 'regional wit',
    exampleInput: 'update deps',
    exampleOutput: '🧔 chore: bump deps before they bump you',
  },
  {
    id: 'moo',
    emoji: '🐄',
    name: 'Moo',
    pack: 'classic',
    voice: 'calm senior, dry humor',
    exampleInput: 'fix validation',
    exampleOutput: '🐄 fix: convince validation some manners',
  },
  {
    id: 'owl',
    emoji: '🦉',
    name: 'Owl',
    pack: 'classic',
    voice: 'precise architect',
    exampleInput: 'add caching',
    exampleOutput: '🦉 feat: introduce caching layer',
  },
  {
    id: 'pirate',
    emoji: '🏴‍☠️',
    name: 'Pirate',
    pack: 'classic',
    voice: 'nautical flair',
    exampleInput: 'merge branch',
    exampleOutput: '🏴‍☠️ merge: board the branch',
  },
  {
    id: 'robot',
    emoji: '🤖',
    name: 'Robot',
    pack: 'classic',
    voice: 'literal engineer',
    exampleInput: 'fix null check',
    exampleOutput: '🤖 fix: add null guard clause',
  },
  {
    id: 'sloth',
    emoji: '🦥',
    name: 'Sloth',
    pack: 'classic',
    voice: 'slow and deliberate',
    exampleInput: 'optimize query',
    exampleOutput: '🦥 perf: optimize query eventually',
  },
  {
    id: 'zen',
    emoji: '🧘',
    name: 'Zen',
    pack: 'classic',
    voice: 'minimal calm',
    exampleInput: 'remove logs',
    exampleOutput: '🧘 chore: let logs go',
  },
  // ── Archetype pack ────────────────────────────────────────────
  {
    id: 'ada',
    emoji: '⚡',
    name: 'Ada',
    pack: 'archetype',
    voice: 'inventive, Lovelace-inspired',
    exampleInput: 'add parser',
    exampleOutput: '⚡ feat: compose parser module',
  },
  {
    id: 'black-cat',
    emoji: '🐈‍⬛',
    name: 'Black Cat',
    pack: 'archetype',
    voice: 'sleek, sharp',
    exampleInput: 'fix race',
    exampleOutput: '🐈‍⬛ fix: catch the race at dusk',
  },
  {
    id: 'blossom',
    emoji: '🌸',
    name: 'Blossom',
    pack: 'archetype',
    voice: 'gentle optimism',
    exampleInput: 'improve docs',
    exampleOutput: '🌸 docs: help docs bloom a little',
  },
  {
    id: 'fox',
    emoji: '🦊',
    name: 'Fox',
    pack: 'archetype',
    voice: 'clever, quick',
    exampleInput: 'bypass cache',
    exampleOutput: '🦊 fix: slip past stale cache',
  },
  {
    id: 'moon',
    emoji: '🌙',
    name: 'Moon',
    pack: 'archetype',
    voice: 'quiet, reflective',
    exampleInput: 'reduce noise',
    exampleOutput: '🌙 refactor: quiet the noise',
  },
  {
    id: 'queen',
    emoji: '👑',
    name: 'Queen',
    pack: 'archetype',
    voice: 'commanding clarity',
    exampleInput: 'enforce lint',
    exampleOutput: '👑 chore: decree lint compliance',
  },
  {
    id: 'swan',
    emoji: '🦢',
    name: 'Swan',
    pack: 'archetype',
    voice: 'elegant precision',
    exampleInput: 'polish ui',
    exampleOutput: '🦢 style: refine ui lines',
  },
  {
    id: 'valkyrie',
    emoji: '⚔️',
    name: 'Valkyrie',
    pack: 'archetype',
    voice: 'fierce, direct',
    exampleInput: 'drop legacy',
    exampleOutput: '⚔️ chore: carry legacy to valhalla',
  },
  {
    id: 'weaver',
    emoji: '🕸️',
    name: 'Weaver',
    pack: 'archetype',
    voice: 'interconnected systems',
    exampleInput: 'wire events',
    exampleOutput: '🕸️ feat: weave event pipeline',
  },
  {
    id: 'witch',
    emoji: '🧙‍♀️',
    name: 'Witch',
    pack: 'archetype',
    voice: 'mystic engineer',
    exampleInput: 'fix migration',
    exampleOutput: '🧙‍♀️ fix: restore migration spell',
  },
]

export const getPersonasByPack = (pack: PersonaPack) =>
  personas.filter((p) => p.pack === pack)

export const defaultPersona = personas.find((p) => p.id === 'moo')!

import * as fs from 'node:fs'
import * as path from 'node:path'
import { parse as parseYaml } from 'yaml'

/**
 * Server-side canonical persona registry.
 *
 * Reads persona data bundled in this repo (synced from the shared
 * personas-male/personas-female/personas-archetypes folders at build time —
 * see scripts/sync-personas.js). This is the source of truth for the
 * `quackie` rewrite engine: fixing a persona's voice or wording here and
 * redeploying this site updates every installed extension immediately, with
 * no VSIX republish and no user action required.
 */
export interface CanonicalPersona {
  id: string
  name: string
  emoji: string
  systemPrompt: string
  metadata: Record<string, unknown>
}

const PERSONA_ROOTS = ['personas-male', 'personas-female', 'personas-archetypes']

let cache: Map<string, CanonicalPersona> | undefined

function loadPersonas(): Map<string, CanonicalPersona> {
  const personas = new Map<string, CanonicalPersona>()
  const baseDir = path.join(process.cwd(), 'personas')

  for (const root of PERSONA_ROOTS) {
    const rootPath = path.join(baseDir, root)
    let entries: string[]

    try {
      entries = fs.readdirSync(rootPath)
    } catch {
      continue
    }

    for (const entry of entries) {
      const entryPath = path.join(rootPath, entry)
      if (!fs.statSync(entryPath).isDirectory()) {
        continue
      }

      const yamlPath = path.join(entryPath, 'persona.yaml')
      let yamlContent: string
      try {
        yamlContent = fs.readFileSync(yamlPath, 'utf8')
      } catch {
        continue
      }

      let raw: unknown
      try {
        raw = parseYaml(yamlContent)
      } catch {
        continue
      }

      if (!raw || typeof raw !== 'object') {
        continue
      }

      const record = raw as Record<string, unknown>
      const name = typeof record.name === 'string' ? record.name : entry
      const emoji = typeof record.emoji === 'string' ? record.emoji : ''

      const systemPromptPath = path.join(entryPath, 'system_prompt.md')
      const systemPrompt = fs.existsSync(systemPromptPath)
        ? fs.readFileSync(systemPromptPath, 'utf8').trim()
        : ''

      // Same collision handling as the extension's PersonaRegistry: first
      // pack to claim an id wins the bare id, later duplicates get prefixed.
      let id = entry
      if (personas.has(id)) {
        id = `${root}/${entry}`
      }

      personas.set(id, { id, name, emoji, systemPrompt, metadata: record })
    }
  }

  return personas
}

function getPersonas(): Map<string, CanonicalPersona> {
  if (!cache) {
    cache = loadPersonas()
  }
  return cache
}

export function getCanonicalPersona(id: string): CanonicalPersona | undefined {
  return getPersonas().get(id)
}

/**
 * Central site constants used across metadata, structured data,
 * the sitemap, and robots.txt. Update SITE_URL once the real
 * domain is live.
 */

export const SITE_NAME = 'Quackie'
export const SITE_TITLE = 'Personality-first committing engineers been missing'
export const SITE_FULL_TITLE = `${SITE_NAME} — ${SITE_TITLE}`
export const SITE_URL = 'https://quackie.me'
export const SITE_TAGLINE = 'Your commits. Their personality.'
export const OG_IMAGE = {
  url: '/og-image.png',
  width: 1798,
  height: 923,
  alt: 'Quackie — Your commits. Their personality.',
} as const
export const SITE_DESCRIPTION =
  'Quackie is a VS Code and Cursor extension that rewrites your Git commit messages through 40 bundled personas. Install once. Pick a persona. Zero workspace setup.'
export const TWITTER_HANDLE = '@quackie_dev'

/**
 * JSON-LD structured data builders. Each function returns a plain
 * object meant to be serialized into a <script type="application/ld+json">
 * tag via JSON.stringify.
 */

import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from './site'
import type { FaqItem } from './faqs'
import type { Persona } from './personas'

export function buildBreadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  }
}

export function buildFaqJsonLd(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  }
}

export function buildPersonaListJsonLd(personas: Persona[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: personas.map((persona, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: `${persona.name} — Quackie persona`,
      description: `${persona.voice}. Example: "${persona.exampleInput}" → "${persona.exampleOutput}"`,
    })),
  }
}

export function buildSoftwareApplicationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'VS Code, Cursor',
    url: SITE_URL,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  }
}

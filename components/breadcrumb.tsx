import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { buildBreadcrumbJsonLd } from '@/lib/structured-data'

interface BreadcrumbItem {
  label: string
  href?: string
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const jsonLd = buildBreadcrumbJsonLd(
    items.map((item) => ({ name: item.label, path: item.href ?? '/' })),
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-5 pt-28 pb-2">
        <ol
          className="flex items-center gap-1.5 text-xs text-muted-foreground/70 flex-wrap"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          {items.map((item, index) => {
            const isCurrentPage = index === items.length - 1

            return (
              <li key={item.label} className="flex items-center gap-1.5">
                {index > 0 && (
                  <ChevronRight
                    size={12}
                    className="text-muted-foreground/30"
                    aria-hidden="true"
                  />
                )}
                {item.href && !isCurrentPage ? (
                  <Link href={item.href} className="hover:text-foreground transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-foreground/80" aria-current="page">
                    {item.label}
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}

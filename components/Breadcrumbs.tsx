import Link from 'next/link'

export interface Crumb { name: string; url: string }

// Migas visibles + BreadcrumbList JSON-LD (capa 2: estructura entendible por IA/buscadores).
export default function Breadcrumbs({ items, compact = false }: { items: Crumb[]; compact?: boolean }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  }
  return (
    <nav aria-label="Breadcrumb" className={`max-w-6xl mx-auto px-5 sm:px-8 pb-1 ${compact ? 'pt-2' : 'pt-24 md:pt-28'}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ol className="flex flex-wrap items-center gap-2 font-data text-xs tracking-wide" style={{ color: 'var(--ed-gray)' }}>
        {items.map((c, i) => {
          const last = i === items.length - 1
          return (
            <li key={c.url} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" style={{ color: 'var(--ed-ink)' }}>{c.name}</span>
              ) : (
                <Link href={c.url.replace('https://luxia.us', '')} className="hover:underline" style={{ color: 'var(--ed-accent)' }}>{c.name}</Link>
              )}
              {!last && <span aria-hidden="true" style={{ opacity: 0.5 }}>/</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

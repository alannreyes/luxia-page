export interface QA { q: string; a: string }

// FAQ visible + FAQPage JSON-LD (capa 3: respuestas extraíbles/citables por IA).
export default function FAQ({ items, title, eyebrow }: { items: QA[]; title: string; eyebrow?: string }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((x) => ({
      '@type': 'Question',
      name: x.q,
      acceptedAnswer: { '@type': 'Answer', text: x.a },
    })),
  }
  return (
    <section id="faq" className="py-16 md:py-24 px-5 sm:px-8" style={{ backgroundColor: 'var(--ed-paper-2)', borderTop: '1px solid var(--ed-line)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-3xl mx-auto">
        <p className="font-data text-xs tracking-[0.2em] uppercase mb-3" style={{ color: 'var(--ed-accent)' }}>{eyebrow || 'Preguntas frecuentes'}</p>
        <h2 className="font-editorial text-3xl md:text-4xl font-bold tracking-[-0.02em]" style={{ color: 'var(--ed-ink)' }}>{title}</h2>
        <div className="mt-8">
          {items.map((x, i) => (
            <div key={i} className="py-5" style={{ borderTop: '1px solid var(--ed-line)' }}>
              <h3 className="text-lg font-semibold" style={{ color: 'var(--ed-ink)' }}>{x.q}</h3>
              <p className="mt-2 leading-relaxed" style={{ color: 'var(--ed-gray)' }}>{x.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

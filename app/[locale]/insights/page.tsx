import Link from 'next/link'
import type { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import { posts } from '@/content/blog/posts'
import { ArrowRight, Clock } from 'lucide-react'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const locale = resolvedParams.locale as 'es' | 'en'
  const isSpanish = locale === 'es'

  return {
    title: isSpanish
      ? 'Insights | luxIA - Investigación sobre IA en producción'
      : 'Insights | luxIA - Research on AI in Production',
    description: isSpanish
      ? 'Análisis con fuentes reales (MIT, Stanford, GitClear, METR) sobre lo que realmente pasa cuando la IA construye software — más allá de la demo.'
      : 'Research-backed analysis (MIT, Stanford, GitClear, METR) on what actually happens when AI builds software — beyond the demo.',
  }
}

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function InsightsPage({ params }: PageProps) {
  const resolvedParams = await params
  const locale = resolvedParams.locale as 'es' | 'en'
  const isSpanish = locale === 'es'

  return (
    <div style={{ backgroundColor: 'var(--ed-paper)' }}>
      <Breadcrumbs
        items={[
          { name: isSpanish ? 'Inicio' : 'Home', url: `https://luxia.us/${locale}` },
          { name: 'Insights', url: `https://luxia.us/${locale}/insights` },
        ]}
      />

      {/* Hero */}
      <section className="px-5 sm:px-8 pt-4 pb-16 md:pt-6 md:pb-20" style={{ backgroundColor: 'var(--ed-paper)' }}>
        <div className="max-w-5xl mx-auto">
          <p className="font-data text-xs tracking-[0.2em] uppercase mb-5" style={{ color: 'var(--ed-accent)' }}>
            {isSpanish ? 'Insights · investigación, no marketing' : 'Insights · research, not marketing'}
          </p>
          <h1 className="font-editorial font-extrabold tracking-[-0.03em] leading-[0.98] text-4xl md:text-6xl mb-6 max-w-[18ch]" style={{ color: 'var(--ed-ink)' }}>
            {isSpanish ? (
              <>Lo que dicen los datos, <span style={{ color: 'var(--ed-accent)' }}>no el hype</span></>
            ) : (
              <>What the data says, <span style={{ color: 'var(--ed-accent)' }}>not the hype</span></>
            )}
          </h1>
          <p className="text-lg md:text-xl max-w-3xl" style={{ color: 'var(--ed-gray)' }}>
            {isSpanish
              ? 'Análisis con fuentes primarias citadas — estudios, no opiniones — sobre cómo construir software con IA que realmente llega a producción.'
              : 'Analysis backed by cited primary sources — studies, not opinions — on building AI software that actually reaches production.'}
          </p>
        </div>
      </section>

      {/* Grid de artículos */}
      <section className="py-16 md:py-24 px-5 sm:px-8" style={{ backgroundColor: 'var(--ed-paper-2)', borderTop: '1px solid var(--ed-line)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {posts.map((post) => {
              const p = post[locale]
              return (
                <Link
                  key={post.slug}
                  href={`/${locale}/insights/${post.slug}`}
                  className="bg-white rounded-2xl p-6 md:p-8 hover:-translate-y-0.5 transition-transform flex flex-col"
                  style={{ border: '1px solid var(--ed-line)' }}
                >
                  <span
                    className="inline-block font-data text-[11px] tracking-wide px-2.5 py-0.5 rounded-full w-fit mb-4"
                    style={{ backgroundColor: 'var(--ed-paper-2)', color: 'var(--ed-gray)', border: '1px solid var(--ed-line)' }}
                  >
                    {p.topic}
                  </span>
                  <h2 className="text-xl md:text-2xl font-editorial font-bold tracking-[-0.01em] mb-3" style={{ color: 'var(--ed-ink)' }}>
                    {p.title}
                  </h2>
                  <p className="text-sm md:text-base mb-6 flex-1" style={{ color: 'var(--ed-gray)' }}>
                    {p.excerpt}
                  </p>
                  <div className="flex items-center justify-between font-data text-xs" style={{ color: 'var(--ed-gray)' }}>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {p.readingTime}
                    </span>
                    <span className="flex items-center gap-1 font-medium" style={{ color: 'var(--ed-accent)' }}>
                      {isSpanish ? 'Leer' : 'Read'}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/Breadcrumbs'
import FAQ from '@/components/FAQ'
import { getCase, getCaseSlugs } from '@/content/cases'
import { ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react'

// Página de detalle de caso (plan GEO ago-2026): cada caso es un documento de
// autoridad con URL propia — contexto, decisiones de ingeniería, stack, negocio,
// aplicaciones y FAQ. Anonimizado: capacidad + sector, nunca la marca del cliente.

export async function generateStaticParams() {
  return getCaseSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params
  const locale = rawLocale as 'es' | 'en'
  const c = getCase(locale, slug)
  if (!c) return {}
  const url = `https://luxia.us/${locale}/cases/${slug}`

  return {
    title: `${c.seoTitle} | luxIA`,
    description: c.seoDescription,
    openGraph: {
      title: c.seoTitle,
      description: c.seoDescription,
      url,
      siteName: 'luxIA',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      type: 'article',
    },
    alternates: {
      canonical: url,
      languages: {
        'es-ES': `https://luxia.us/es/cases/${slug}`,
        'en-US': `https://luxia.us/en/cases/${slug}`,
      },
    },
  }
}

interface PageProps {
  params: Promise<{ locale: string; slug: string }>
}

export default async function CaseDetailPage({ params }: PageProps) {
  const { locale: rawLocale, slug } = await params
  const locale = rawLocale as 'es' | 'en'
  const isSpanish = locale === 'es'
  const c = getCase(locale, slug)
  if (!c) notFound()

  const url = `https://luxia.us/${locale}/cases/${slug}`
  const related = c.related.map((s) => getCase(locale, s)).filter(Boolean)

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: c.title,
    description: c.seoDescription,
    author: { '@type': 'Organization', name: 'LuxIA', url: 'https://luxia.us' },
    publisher: {
      '@type': 'Organization',
      name: 'LuxIA',
      logo: { '@type': 'ImageObject', url: 'https://luxia.us/logo.png' },
    },
    articleSection: isSpanish ? 'Casos' : 'Case studies',
    about: c.industry,
    mainEntityOfPage: url,
    inLanguage: locale,
  }

  const labels = {
    context: isSpanish ? 'El contexto' : 'The context',
    how: isSpanish ? 'Cómo funciona' : 'How it works',
    decisions: isSpanish ? 'Decisiones de ingeniería' : 'Engineering decisions',
    decision: isSpanish ? 'Decisión' : 'Decision',
    stack: isSpanish ? 'El stack' : 'The stack',
    business: isSpanish ? 'Lo que cambia para el negocio' : 'What changes for the business',
    applications: isSpanish ? 'Dónde más aplica' : 'Where else it applies',
    problem: isSpanish ? 'Problema' : 'Problem',
    result: isSpanish ? 'Resultado' : 'Result',
    production:
      c.stage === 'pilot'
        ? isSpanish ? 'En piloto con usuarios reales' : 'In pilot with real users'
        : isSpanish ? 'En producción, no demo' : 'In production, not a demo',
    related: isSpanish ? 'Casos relacionados' : 'Related cases',
    readCase: isSpanish ? 'Leer el caso' : 'Read the case',
    faqTitle: isSpanish ? 'Preguntas frecuentes sobre este caso' : 'Frequently asked questions about this case',
    ctaTitle: isSpanish ? '¿Tienes un desafío parecido?' : 'Have a similar challenge?',
    ctaSub: isSpanish
      ? 'Cuéntanos tu problema. Te diremos cómo resolverlo — y cuánto toma.'
      : "Tell us your problem. We'll tell you how to solve it — and how long it takes.",
    contact: isSpanish ? 'Contactar' : 'Contact Us',
    allCases: isSpanish ? 'Ver todos los casos' : 'View all cases',
  }

  return (
    <div style={{ backgroundColor: 'var(--ed-paper)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <Breadcrumbs
        items={[
          { name: isSpanish ? 'Inicio' : 'Home', url: `https://luxia.us/${locale}` },
          { name: isSpanish ? 'Casos' : 'Cases', url: `https://luxia.us/${locale}/cases` },
          { name: c.title, url },
        ]}
      />

      {/* ===== Hero ===== */}
      <section className="px-5 sm:px-8 pt-4 pb-12 md:pt-6 md:pb-16">
        <div className="max-w-4xl mx-auto">
          <p className="font-data text-xs tracking-[0.2em] uppercase mb-5" style={{ color: 'var(--ed-accent)' }}>
            {c.kicker}
          </p>
          <h1
            className="font-editorial font-extrabold tracking-[-0.03em] leading-[1.02] text-3xl md:text-5xl mb-6"
            style={{ color: 'var(--ed-ink)', textWrap: 'balance' }}
          >
            {c.title}
          </h1>
          <p className="text-lg md:text-xl max-w-3xl" style={{ color: 'var(--ed-gray)' }}>
            {c.lede}
          </p>
          <div className="flex flex-wrap items-center gap-2 mt-7 pt-5" style={{ borderTop: '1px solid var(--ed-line)' }}>
            <span
              className="font-data text-[11px] tracking-wide px-2.5 py-1 rounded-full"
              style={{ backgroundColor: 'rgba(37,64,255,0.08)', color: 'var(--ed-accent)', border: '1px solid rgba(37,64,255,0.18)' }}
            >
              {c.industry}
            </span>
            <span
              className="font-data text-[11px] tracking-wide px-2.5 py-1 rounded-full"
              style={{ backgroundColor: 'var(--ed-paper-2)', color: 'var(--ed-gray)', border: '1px solid var(--ed-line)' }}
            >
              {labels.production}
            </span>
          </div>
        </div>
      </section>

      {/* ===== Problema / Resultado ===== */}
      <section className="px-5 sm:px-8 pb-12 md:pb-16">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-4 md:gap-5">
          <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid var(--ed-line)' }}>
            <p className="font-data text-[11px] uppercase tracking-[0.18em] mb-2.5" style={{ color: 'var(--ed-gray)' }}>
              {labels.problem}
            </p>
            <p className="leading-relaxed" style={{ color: 'var(--ed-ink)' }}>{c.cardProblem}</p>
          </div>
          <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: 'var(--ed-ink)' }}>
            <p className="font-data text-[11px] uppercase tracking-[0.18em] mb-2.5" style={{ color: 'var(--ed-accent)' }}>
              {labels.result}
            </p>
            <p className="leading-relaxed text-white/85">{c.cardResult}</p>
          </div>
        </div>
      </section>

      {/* ===== Cuerpo: narrativa + ficha técnica ===== */}
      <section className="px-5 sm:px-8 pb-16 md:pb-20" style={{ backgroundColor: 'var(--ed-paper-2)', borderTop: '1px solid var(--ed-line)' }}>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8 lg:gap-12 pt-12 md:pt-16">
          {/* Narrativa */}
          <div className="lg:col-span-2 max-w-2xl">
            {/* Contexto */}
            <p className="font-data text-xs tracking-[0.2em] uppercase mb-5" style={{ color: 'var(--ed-accent)' }}>
              {labels.context}
            </p>
            {c.context.map((p, i) => (
              <p key={i} className="text-[17px] leading-[1.75] mb-5" style={{ color: 'var(--ed-ink)' }}>
                {p}
              </p>
            ))}

            {/* Cómo funciona */}
            <p className="font-data text-xs tracking-[0.2em] uppercase mb-5 mt-12 pt-8" style={{ color: 'var(--ed-accent)', borderTop: '1px solid var(--ed-line)' }}>
              {labels.how}
            </p>
            {c.solutionIntro.map((p, i) => (
              <p key={i} className="text-[17px] leading-[1.75] mb-5" style={{ color: 'var(--ed-ink)' }}>
                {p}
              </p>
            ))}

            {/* Decisiones de ingeniería */}
            <p className="font-data text-xs tracking-[0.2em] uppercase mb-6 mt-12 pt-8" style={{ color: 'var(--ed-accent)', borderTop: '1px solid var(--ed-line)' }}>
              {labels.decisions}
            </p>
            <div className="space-y-4">
              {c.decisions.map((d, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6"
                  style={{ border: '1px solid var(--ed-line)', borderLeft: '3px solid var(--ed-accent)' }}
                >
                  <p className="font-data text-[11px] uppercase tracking-[0.15em] mb-1.5" style={{ color: 'var(--ed-gray)' }}>
                    {labels.decision} {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="font-editorial text-xl font-bold tracking-[-0.01em] mb-2.5" style={{ color: 'var(--ed-ink)' }}>
                    {d.title}
                  </h3>
                  <p className="leading-relaxed" style={{ color: 'var(--ed-gray)' }}>{d.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Ficha técnica (sticky) */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-28 bg-white rounded-2xl p-6" style={{ border: '1px solid var(--ed-line)' }}>
              <p className="font-data text-xs tracking-[0.18em] uppercase mb-5" style={{ color: 'var(--ed-gray)' }}>
                {labels.stack}
              </p>
              <ul className="space-y-4">
                {c.stack.map((s, i) => (
                  <li key={i} className={i > 0 ? 'pt-4' : ''} style={i > 0 ? { borderTop: '1px solid var(--ed-line)' } : undefined}>
                    <p className="font-data text-sm font-semibold" style={{ color: 'var(--ed-ink)' }}>{s.name}</p>
                    <p className="text-[13px] leading-snug mt-1" style={{ color: 'var(--ed-gray)' }}>{s.role}</p>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* ===== Beneficio de negocio (bloque de tinta) ===== */}
      <section className="py-16 md:py-20 px-5 sm:px-8 text-white" style={{ backgroundColor: 'var(--ed-ink)' }}>
        <div className="max-w-4xl mx-auto">
          <p className="font-data text-xs tracking-[0.2em] uppercase mb-5" style={{ color: 'var(--ed-accent)' }}>
            {labels.business}
          </p>
          <p className="font-editorial text-2xl md:text-3xl font-bold tracking-[-0.02em] leading-snug mb-8 max-w-3xl" style={{ textWrap: 'balance' }}>
            {c.businessIntro}
          </p>
          <ul className="grid md:grid-cols-2 gap-x-8 gap-y-4">
            {c.outcomes.map((o, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--ed-accent)' }} />
                <span className="text-white/80 leading-relaxed">{o}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== Potencial aplicación ===== */}
      <section className="py-16 md:py-20 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <p className="font-data text-xs tracking-[0.2em] uppercase mb-6" style={{ color: 'var(--ed-accent)' }}>
            {labels.applications}
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {c.applications.map((a, i) => (
              <div key={i} className="bg-white rounded-2xl p-5" style={{ border: '1px solid var(--ed-line)' }}>
                <h3 className="font-semibold mb-1.5" style={{ color: 'var(--ed-ink)' }}>{a.sector}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--ed-gray)' }}>{a.use}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ (incluye FAQPage JSON-LD) ===== */}
      <FAQ
        eyebrow={isSpanish ? 'Preguntas frecuentes' : 'FAQ'}
        title={labels.faqTitle}
        items={c.faq}
      />

      {/* ===== Casos relacionados ===== */}
      {related.length > 0 && (
        <section className="py-16 md:py-20 px-5 sm:px-8" style={{ borderTop: '1px solid var(--ed-line)' }}>
          <div className="max-w-4xl mx-auto">
            <p className="font-data text-xs tracking-[0.2em] uppercase mb-6" style={{ color: 'var(--ed-gray)' }}>
              {labels.related}
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {related.map((r) => (
                <Link
                  key={r!.slug}
                  href={`/${locale}/cases/${r!.slug}`}
                  className="group bg-white rounded-2xl p-6 hover:-translate-y-0.5 transition-transform flex flex-col"
                  style={{ border: '1px solid var(--ed-line)' }}
                >
                  <span className="font-data text-[11px] tracking-wide mb-2" style={{ color: 'var(--ed-gray)' }}>
                    {r!.industry}
                  </span>
                  <h3 className="font-editorial text-lg font-bold tracking-[-0.01em] mb-3" style={{ color: 'var(--ed-ink)' }}>
                    {r!.title}
                  </h3>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium" style={{ color: 'var(--ed-accent)' }}>
                    {labels.readCase}
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== CTA de cierre ===== */}
      <section className="py-16 md:py-24 px-5 sm:px-8 text-white" style={{ backgroundColor: 'var(--ed-ink)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-editorial text-3xl md:text-5xl font-bold tracking-[-0.02em] mb-6">
            {labels.ctaTitle}
          </h2>
          <p className="text-lg md:text-xl text-white/60 mb-10 max-w-xl mx-auto">
            {labels.ctaSub}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}#contacto`}
              className="inline-flex items-center justify-center gap-2 min-h-[52px] px-8 rounded-full bg-white font-medium hover:-translate-y-0.5 transition-transform w-full sm:w-auto"
              style={{ color: 'var(--ed-ink)' }}
            >
              {labels.contact}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href={`/${locale}/cases`}
              className="inline-flex items-center justify-center gap-2 min-h-[52px] px-8 rounded-full font-medium transition-colors w-full sm:w-auto border border-white/20 text-white hover:bg-white/10"
            >
              {labels.allCases}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

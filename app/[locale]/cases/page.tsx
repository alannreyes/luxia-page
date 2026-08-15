import Link from 'next/link'
import type { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import { getAllCases } from '@/content/cases'
import {
  MapPin, ShoppingBag, Truck, AlertTriangle, FileSearch, Search,
  Mic, Users, Calculator, ArrowRight, ArrowUpRight, CheckCircle2,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

// Hub de casos: las tarjetas se derivan de content/cases (una sola fuente de
// verdad para tarjeta + página de detalle). 9 casos = 9 documentos con URL propia.

const iconBySlug: Record<string, LucideIcon> = {
  'lead-generation-insurtech': MapPin,
  'document-validation-insurtech': FileSearch,
  'semantic-search-retail': Search,
  'geo-marketing-retail': ShoppingBag,
  'logistics-dimensioning': Truck,
  'industrial-alerts-iot': AlertTriangle,
  'realtime-sales-copilot': Mic,
  'ai-recruiting-ats': Users,
  'ai-quoting-engine': Calculator,
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const locale = resolvedParams.locale as 'es' | 'en'
  const isSpanish = locale === 'es'

  return {
    title: isSpanish
      ? 'Casos de Éxito | luxIA - Soluciones de IA Generativa en Producción'
      : 'Case Studies | luxIA - Generative AI Solutions in Production',
    description: isSpanish
      ? '9 sistemas reales de IA, en producción y en piloto: búsqueda semántica (65% match exacto), validación documental (98% vs. humanos), copiloto de ventas, cotizador inteligente y más. Cada caso con stack y decisiones.'
      : '9 real AI systems, in production and in pilot: semantic search (65% exact match), document validation (98% vs. humans), sales copilot, intelligent quoting and more. Each case documented with stack and decisions.',
  }
}

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function CasesPage({ params }: PageProps) {
  const resolvedParams = await params
  const locale = resolvedParams.locale as 'es' | 'en'
  const isSpanish = locale === 'es'
  const casesList = getAllCases(locale)

  return (
    <div style={{ backgroundColor: 'var(--ed-paper)' }}>
      <Breadcrumbs items={[{ name: locale === 'es' ? 'Inicio' : 'Home', url: `https://luxia.us/${locale}` }, { name: 'Casos', url: `https://luxia.us/${locale}/cases` }]} />
      {/* Hero Section */}
      <section className="px-5 sm:px-8 pt-4 pb-16 md:pt-6 md:pb-20" style={{ backgroundColor: 'var(--ed-paper)' }}>
        <div className="max-w-5xl mx-auto">
          <p className="font-data text-xs tracking-[0.2em] uppercase mb-5" style={{ color: 'var(--ed-accent)' }}>
            {isSpanish ? 'Casos · sistemas reales, no demos' : 'Cases · real systems, not demos'}
          </p>
          <h1 className="font-editorial font-extrabold tracking-[-0.03em] leading-[0.98] text-4xl md:text-6xl mb-6" style={{ color: 'var(--ed-ink)' }}>
            {isSpanish ? (
              <>Trabajo <span style={{ color: 'var(--ed-accent)' }}>real</span>, en operación</>
            ) : (
              <><span style={{ color: 'var(--ed-accent)' }}>Real</span> work, in operation</>
            )}
          </h1>
          <p className="text-lg md:text-xl max-w-3xl" style={{ color: 'var(--ed-gray)' }}>
            {isSpanish
              ? 'Nueve sistemas construidos y operando — en producción o en piloto, con su etapa declarada — cada uno documentado: el problema, las decisiones de ingeniería, el stack y lo que cambió para el negocio.'
              : 'Nine systems built and running — in production or in pilot, each stage declared — and each one documented: the problem, the engineering decisions, the stack, and what changed for the business.'}
          </p>
        </div>
      </section>

      {/* Cases Grid */}
      <section className="py-16 md:py-24 px-5 sm:px-8" style={{ backgroundColor: 'var(--ed-paper-2)', borderTop: '1px solid var(--ed-line)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {casesList.map((caseStudy) => {
              const Icon = iconBySlug[caseStudy.slug] || Search
              return (
                <Link
                  key={caseStudy.slug}
                  href={`/${locale}/cases/${caseStudy.slug}`}
                  className="group bg-white rounded-2xl p-5 md:p-7 hover:-translate-y-0.5 transition-transform flex flex-col"
                  style={{ border: '1px solid var(--ed-line)' }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(37,64,255,0.08)' }}>
                      <Icon className="w-6 h-6" style={{ color: 'var(--ed-accent)' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-lg md:text-xl font-editorial font-bold tracking-[-0.01em] mb-1.5" style={{ color: 'var(--ed-ink)' }}>
                        {caseStudy.title}
                      </h2>
                      <span className="inline-flex flex-wrap gap-1.5">
                        <span className="inline-block font-data text-[11px] tracking-wide px-2.5 py-0.5 rounded-full" style={{ backgroundColor: 'var(--ed-paper-2)', color: 'var(--ed-gray)', border: '1px solid var(--ed-line)' }}>
                          {caseStudy.industry}
                        </span>
                        <span
                          className="inline-block font-data text-[11px] tracking-wide px-2.5 py-0.5 rounded-full"
                          style={
                            caseStudy.stage === 'pilot'
                              ? { backgroundColor: 'var(--ed-paper-2)', color: 'var(--ed-gray)', border: '1px solid var(--ed-line)' }
                              : { backgroundColor: 'rgba(37,64,255,0.08)', color: 'var(--ed-accent)', border: '1px solid rgba(37,64,255,0.18)' }
                          }
                        >
                          {caseStudy.stage === 'pilot'
                            ? isSpanish ? 'En piloto' : 'In pilot'
                            : isSpanish ? 'En producción' : 'In production'}
                        </span>
                      </span>
                      <p className="text-sm mt-2" style={{ color: 'var(--ed-gray)' }}>{caseStudy.tagline}</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div>
                      <span className="font-data text-[11px] uppercase tracking-[0.15em]" style={{ color: 'var(--ed-gray)' }}>{isSpanish ? 'Problema' : 'Problem'}</span>
                      <p className="text-sm mt-1" style={{ color: 'var(--ed-gray)' }}>{caseStudy.cardProblem}</p>
                    </div>
                    <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--ed-paper)', borderLeft: '2px solid var(--ed-accent)' }}>
                      <span className="font-data text-[11px] uppercase tracking-[0.15em]" style={{ color: 'var(--ed-accent)' }}>{isSpanish ? 'Resultado' : 'Result'}</span>
                      <p className="text-sm font-medium mt-1" style={{ color: 'var(--ed-ink)' }}>{caseStudy.cardResult}</p>
                    </div>
                  </div>

                  {/* Tech & Infra tags · sistema único */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {[...caseStudy.techTerms, ...caseStudy.infraTerms].map((term, idx) => (
                      <span key={idx} className="font-data px-2.5 py-0.5 text-xs rounded-md" style={{ backgroundColor: 'var(--ed-paper-2)', color: 'var(--ed-gray)', border: '1px solid var(--ed-line)' }}>
                        {term}
                      </span>
                    ))}
                  </div>

                  <span className="mt-auto pt-3 inline-flex items-center gap-1.5 text-sm font-medium" style={{ color: 'var(--ed-accent)', borderTop: '1px solid var(--ed-line)' }}>
                    {isSpanish ? 'Leer el caso completo' : 'Read the full case'}
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-16 md:py-20 px-5 sm:px-8" style={{ backgroundColor: 'var(--ed-paper)' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="font-editorial text-2xl md:text-3xl font-bold tracking-[-0.02em] mb-8" style={{ color: 'var(--ed-ink)' }}>
            {isSpanish ? 'Cada proyecto incluye' : 'Every project includes'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {[
              isSpanish ? 'Diseño UX/UI' : 'UX/UI Design',
              isSpanish ? 'Desarrollo full-stack' : 'Full-stack development',
              isSpanish ? 'Integración con LLMs' : 'LLM integration',
              isSpanish ? 'Infraestructura cloud' : 'Cloud infrastructure',
              isSpanish ? 'Testing y QA' : 'Testing & QA',
              isSpanish ? 'Documentación técnica' : 'Technical documentation',
              isSpanish ? 'Deploy a producción' : 'Production deploy',
              isSpanish ? 'Monitoreo y alertas' : 'Monitoring & alerts',
              isSpanish ? 'Soporte post-lanzamiento' : 'Post-launch support',
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm" style={{ color: 'var(--ed-gray)' }}>
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--ed-accent)' }} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section · cierre de tinta */}
      <section className="py-16 md:py-24 px-5 sm:px-8 text-white" style={{ backgroundColor: 'var(--ed-ink)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-editorial text-3xl md:text-5xl font-bold tracking-[-0.02em] mb-6">
            {isSpanish
              ? '¿Tienes un desafío similar?'
              : 'Have a similar challenge?'}
          </h2>
          <p className="text-lg md:text-xl text-white/60 mb-10 max-w-xl mx-auto">
            {isSpanish
              ? 'Cuéntanos tu problema. Te diremos cómo resolverlo — y cuánto toma.'
              : "Tell us your problem. We'll tell you how to solve it — and how long it takes."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}#contacto`}
              className="inline-flex items-center justify-center gap-2 min-h-[52px] px-8 rounded-full bg-white font-medium hover:-translate-y-0.5 transition-transform w-full sm:w-auto"
              style={{ color: 'var(--ed-ink)' }}
            >
              {isSpanish ? 'Contactar' : 'Contact Us'}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href={`/${locale}/services`}
              className="inline-flex items-center justify-center gap-2 min-h-[52px] px-8 rounded-full font-medium transition-colors w-full sm:w-auto border border-white/20 text-white hover:bg-white/10"
            >
              {isSpanish ? 'Ver Servicios' : 'View Services'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

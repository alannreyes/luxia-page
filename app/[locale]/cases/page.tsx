import Link from 'next/link'
import type { Metadata } from 'next'
import { MapPin, ShoppingBag, Truck, AlertTriangle, FileSearch, Search, ArrowRight, CheckCircle2 } from 'lucide-react'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const locale = resolvedParams.locale as 'es' | 'en'
  const isSpanish = locale === 'es'

  return {
    title: isSpanish
      ? 'Casos de Éxito | luxIA - Soluciones de IA Generativa en Producción'
      : 'Case Studies | luxIA - Generative AI Solutions in Production',
    description: isSpanish
      ? 'Proyectos reales de IA Generativa entregados en producción: Insurtech, Retail, Logística, Industrial. Soluciones completas con LLMs, embeddings y alta disponibilidad.'
      : 'Real Generative AI projects delivered to production: Insurtech, Retail, Logistics, Industrial. Complete solutions with LLMs, embeddings and high availability.',
  }
}

// Cases data - generic capability names, not product names
const cases = {
  es: [
    {
      slug: 'lead-generation-insurtech',
      icon: MapPin,
      title: 'Generación de Leads con IA + APIs de Clima',
      industry: 'Insurtech (USA)',
      tagline: 'Identificación proactiva de oportunidades de negocio',
      problem: 'Las aseguradoras necesitan identificar propiedades con potencial daño por clima para generar leads de manera proactiva. El proceso manual pierde oportunidades.',
      result: 'Identificar oportunidades de negocio basadas en eventos climáticos reales, en tiempo real.',
      techTerms: ['LLMs', 'APIs meteorológicas', 'PostGIS', 'Firebase'],
      infraTerms: ['Multi-tenant', 'Alta disponibilidad'],
      color: 'blue'
    },
    {
      slug: 'document-validation-insurtech',
      icon: FileSearch,
      title: 'Validación Documental con IA Generativa',
      industry: 'Insurtech · Legal',
      tagline: 'Análisis automatizado de documentos complejos',
      problem: 'Los profesionales de claims y legales pasan horas revisando documentos complejos para extraer información crítica y evaluar riesgos.',
      result: 'Reducción drástica del tiempo de análisis con extracción inteligente y reportes automáticos.',
      techTerms: ['Claude', 'GPT', 'Prompt engineering', 'OCR'],
      infraTerms: ['Seguridad de datos', 'Encriptación'],
      color: 'purple'
    },
    {
      slug: 'semantic-search-retail',
      icon: Search,
      title: 'Búsqueda Semántica de Catálogos',
      industry: 'Retail · Industrial',
      tagline: 'Búsqueda que entiende contexto, no solo palabras',
      problem: 'Catálogos con +200K SKUs donde la búsqueda por keywords no encuentra lo que el usuario realmente necesita.',
      result: 'Búsqueda por significado que encuentra productos relevantes aunque el usuario no use las palabras exactas.',
      techTerms: ['Embeddings', 'pgvector', 'Qdrant', 'PostgreSQL'],
      infraTerms: ['Respaldos automáticos', 'Escalabilidad'],
      color: 'green'
    },
    {
      slug: 'geo-marketing-retail',
      icon: ShoppingBag,
      title: 'Marketing Geolocalizado con IA',
      industry: 'Retail · Comercio',
      tagline: 'Marketing que llega solo a quien está cerca',
      problem: 'Los comercios desperdician dinero en publicidad masiva que llega a personas fuera de su área de servicio.',
      result: 'Marketing eficiente con ROI medible. Solo pagas por alcance real basado en ubicación.',
      techTerms: ['APIs de ubicación', 'Next.js', 'TypeScript', 'Socket.io'],
      infraTerms: ['Observabilidad', 'Prometheus', 'Grafana'],
      color: 'orange'
    },
    {
      slug: 'logistics-dimensioning',
      icon: Truck,
      title: 'Dimensionamiento Logístico con IA + Visión',
      industry: 'Logística · Courier',
      tagline: 'Cotización instantánea para múltiples carriers',
      problem: 'Calcular peso volumétrico manualmente es lento y propenso a errores. Cada carrier tiene diferentes factores dimensionales.',
      result: 'Cotización instantánea comparando múltiples carriers nacionales e internacionales.',
      techTerms: ['Vision AI', 'APIs de carriers', 'Next.js', 'Python'],
      infraTerms: ['Integración con ERPs', 'CI/CD'],
      color: 'cyan'
    },
    {
      slug: 'industrial-alerts-iot',
      icon: AlertTriangle,
      title: 'Alertas Geolocalizadas + IoT',
      industry: 'Industrial · Minería · Oil & Gas',
      tagline: 'Saber cuándo ponerse a buen recaudo',
      problem: 'El personal en operaciones críticas no sabe si un evento de riesgo (tormenta, accidente) realmente les afecta.',
      result: 'Alertas que funcionan con app cerrada y celular bloqueado. Privacidad total.',
      techTerms: ['IoT', 'APIs meteorológicas', 'Failover entre modelos'],
      infraTerms: ['Alta disponibilidad', '24/7', 'Docker', 'Linux'],
      color: 'red'
    },
  ],
  en: [
    {
      slug: 'lead-generation-insurtech',
      icon: MapPin,
      title: 'Lead Generation with AI + Weather APIs',
      industry: 'Insurtech (USA)',
      tagline: 'Proactive business opportunity identification',
      problem: 'Insurance companies need to identify properties with potential weather damage to proactively generate leads. Manual process misses opportunities.',
      result: 'Identify business opportunities based on real weather events, in real-time.',
      techTerms: ['LLMs', 'Weather APIs', 'PostGIS', 'Firebase'],
      infraTerms: ['Multi-tenant', 'High availability'],
      color: 'blue'
    },
    {
      slug: 'document-validation-insurtech',
      icon: FileSearch,
      title: 'Document Validation with Generative AI',
      industry: 'Insurtech · Legal',
      tagline: 'Automated analysis of complex documents',
      problem: 'Claims and legal professionals spend hours reviewing complex documents to extract critical information and assess risks.',
      result: 'Drastic reduction in analysis time with intelligent extraction and automatic reports.',
      techTerms: ['Claude', 'GPT', 'Prompt engineering', 'OCR'],
      infraTerms: ['Data security', 'Encryption'],
      color: 'purple'
    },
    {
      slug: 'semantic-search-retail',
      icon: Search,
      title: 'Semantic Catalog Search',
      industry: 'Retail · Industrial',
      tagline: 'Search that understands context, not just words',
      problem: 'Catalogs with 200K+ SKUs where keyword search doesn\'t find what the user really needs.',
      result: 'Meaning-based search that finds relevant products even when users don\'t use exact words.',
      techTerms: ['Embeddings', 'pgvector', 'Qdrant', 'PostgreSQL'],
      infraTerms: ['Automatic backups', 'Scalability'],
      color: 'green'
    },
    {
      slug: 'geo-marketing-retail',
      icon: ShoppingBag,
      title: 'Geolocated Marketing with AI',
      industry: 'Retail · Commerce',
      tagline: 'Marketing that reaches only those nearby',
      problem: 'Businesses waste money on mass advertising that reaches people outside their service area.',
      result: 'Efficient marketing with measurable ROI. Pay only for real reach based on location.',
      techTerms: ['Location APIs', 'Next.js', 'TypeScript', 'Socket.io'],
      infraTerms: ['Observability', 'Prometheus', 'Grafana'],
      color: 'orange'
    },
    {
      slug: 'logistics-dimensioning',
      icon: Truck,
      title: 'Logistics Dimensioning with AI + Vision',
      industry: 'Logistics · Courier',
      tagline: 'Instant quotes for multiple carriers',
      problem: 'Calculating volumetric weight manually is slow and error-prone. Each carrier has different dimensional factors.',
      result: 'Instant quotes comparing multiple national and international carriers.',
      techTerms: ['Vision AI', 'Carrier APIs', 'Next.js', 'Python'],
      infraTerms: ['ERP integration', 'CI/CD'],
      color: 'cyan'
    },
    {
      slug: 'industrial-alerts-iot',
      icon: AlertTriangle,
      title: 'Geolocated Alerts + IoT',
      industry: 'Industrial · Mining · Oil & Gas',
      tagline: 'Know when to seek shelter',
      problem: 'Personnel in critical operations don\'t know if a risk event (storm, accident) actually affects them.',
      result: 'Alerts that work with app closed and phone locked. Total privacy.',
      techTerms: ['IoT', 'Weather APIs', 'Model failover'],
      infraTerms: ['High availability', '24/7', 'Docker', 'Linux'],
      color: 'red'
    },
  ]
}

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function CasesPage({ params }: PageProps) {
  const resolvedParams = await params
  const locale = resolvedParams.locale as 'es' | 'en'
  const isSpanish = locale === 'es'
  const casesList = cases[locale]

  return (
    <div style={{ backgroundColor: 'var(--ed-paper)' }}>
      {/* Hero Section */}
      <section className="px-5 sm:px-8 pt-16 pb-16 md:pt-24 md:pb-20" style={{ backgroundColor: 'var(--ed-paper)' }}>
        <div className="max-w-5xl mx-auto">
          <p className="font-data text-xs tracking-[0.2em] uppercase mb-5" style={{ color: 'var(--ed-accent)' }}>
            {isSpanish ? 'Casos · en producción, no demos' : 'Cases · in production, not demos'}
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
              ? 'Proyectos entregados en producción, con infraestructura, seguridad y soporte continuo.'
              : 'Projects delivered to production, with infrastructure, security and ongoing support.'}
          </p>
        </div>
      </section>

      {/* Cases Grid */}
      <section className="py-16 md:py-24 px-5 sm:px-8" style={{ backgroundColor: 'var(--ed-paper-2)', borderTop: '1px solid var(--ed-line)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {casesList.map((caseStudy) => (
              <div
                key={caseStudy.slug}
                className="bg-white rounded-2xl p-5 md:p-7 hover:-translate-y-0.5 transition-transform flex flex-col"
                style={{ border: '1px solid var(--ed-line)' }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(37,64,255,0.08)' }}>
                    <caseStudy.icon className="w-6 h-6" style={{ color: 'var(--ed-accent)' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg md:text-xl font-editorial font-bold tracking-[-0.01em] mb-1.5" style={{ color: 'var(--ed-ink)' }}>
                      {caseStudy.title}
                    </h3>
                    <span className="inline-block font-data text-[11px] tracking-wide px-2.5 py-0.5 rounded-full" style={{ backgroundColor: 'var(--ed-paper-2)', color: 'var(--ed-gray)', border: '1px solid var(--ed-line)' }}>
                      {caseStudy.industry}
                    </span>
                    <p className="text-sm mt-2" style={{ color: 'var(--ed-gray)' }}>{caseStudy.tagline}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div>
                    <span className="font-data text-[11px] uppercase tracking-[0.15em]" style={{ color: 'var(--ed-gray)' }}>{isSpanish ? 'Problema' : 'Problem'}</span>
                    <p className="text-sm mt-1" style={{ color: 'var(--ed-gray)' }}>{caseStudy.problem}</p>
                  </div>
                  <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--ed-paper)', borderLeft: '2px solid var(--ed-accent)' }}>
                    <span className="font-data text-[11px] uppercase tracking-[0.15em]" style={{ color: 'var(--ed-accent)' }}>{isSpanish ? 'Resultado' : 'Result'}</span>
                    <p className="text-sm font-medium mt-1" style={{ color: 'var(--ed-ink)' }}>{caseStudy.result}</p>
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

                <p className="text-xs mt-auto pt-3" style={{ color: 'var(--ed-gray)', borderTop: '1px solid var(--ed-line)' }}>
                  {isSpanish
                    ? 'Entregado en producción, con documentación y soporte.'
                    : 'Delivered to production, with documentation and support.'}
                </p>
              </div>
            ))}
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

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

const colorClasses = {
  blue: { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'bg-blue-100 text-blue-600', tag: 'bg-blue-100 text-blue-700' },
  green: { bg: 'bg-green-50', border: 'border-green-200', icon: 'bg-green-100 text-green-600', tag: 'bg-green-100 text-green-700' },
  orange: { bg: 'bg-orange-50', border: 'border-orange-200', icon: 'bg-orange-100 text-orange-600', tag: 'bg-orange-100 text-orange-700' },
  red: { bg: 'bg-red-50', border: 'border-red-200', icon: 'bg-red-100 text-red-600', tag: 'bg-red-100 text-red-700' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', icon: 'bg-purple-100 text-purple-600', tag: 'bg-purple-100 text-purple-700' },
  cyan: { bg: 'bg-cyan-50', border: 'border-cyan-200', icon: 'bg-cyan-100 text-cyan-600', tag: 'bg-cyan-100 text-cyan-700' },
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
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-12 md:py-20 px-4 md:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block px-4 py-1.5 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-sm font-medium mb-6">
            {isSpanish ? 'Soluciones en producción, no demos' : 'Production solutions, not demos'}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            {isSpanish ? (
              <>Casos de <span className="text-blue-400">Éxito</span></>
            ) : (
              <>Case <span className="text-blue-400">Studies</span></>
            )}
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
            {isSpanish
              ? 'Proyectos reales entregados en producción con IA Generativa, infraestructura enterprise y soporte continuo.'
              : 'Real projects delivered to production with Generative AI, enterprise infrastructure and ongoing support.'}
          </p>
        </div>
      </section>

      {/* Cases Grid */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {casesList.map((caseStudy) => {
              const colors = colorClasses[caseStudy.color as keyof typeof colorClasses]
              return (
                <div
                  key={caseStudy.slug}
                  className={`bg-white rounded-2xl border ${colors.border} p-4 md:p-6 hover:shadow-lg transition-all`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`p-3 rounded-xl ${colors.icon} flex-shrink-0`}>
                      <caseStudy.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1">
                        <h3 className="text-lg md:text-xl font-bold text-slate-900">
                          {caseStudy.title}
                        </h3>
                      </div>
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${colors.tag}`}>
                        {caseStudy.industry}
                      </span>
                      <p className="text-slate-600 text-sm mt-2">{caseStudy.tagline}</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div>
                      <span className="text-xs text-slate-500 uppercase tracking-wider">{isSpanish ? 'Problema' : 'Problem'}</span>
                      <p className="text-sm text-slate-600 mt-1">{caseStudy.problem}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${colors.bg}`}>
                      <span className="text-xs text-slate-500 uppercase tracking-wider">{isSpanish ? 'Resultado' : 'Result'}</span>
                      <p className="text-sm font-medium text-slate-800 mt-1">{caseStudy.result}</p>
                    </div>
                  </div>

                  {/* Tech & Infra Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {caseStudy.techTerms.map((tech, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-md">
                        {tech}
                      </span>
                    ))}
                    {caseStudy.infraTerms.map((infra, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded-md">
                        {infra}
                      </span>
                    ))}
                  </div>

                  {/* Recurring phrase */}
                  <p className="text-xs text-slate-500 italic border-t border-slate-100 pt-3">
                    {isSpanish
                      ? 'Solución entregada en producción con documentación y soporte.'
                      : 'Solution delivered to production with documentation and support.'}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-12 md:py-16 px-4 md:px-6 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 text-center mb-6">
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
              <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-6">
            {isSpanish
              ? '¿Tienes un desafío similar?'
              : 'Have a similar challenge?'}
          </h2>
          <p className="text-lg md:text-xl text-blue-100 mb-8">
            {isSpanish
              ? 'Cuéntanos tu problema. Te diremos cómo la IA puede ayudarte a resolverlo.'
              : 'Tell us your problem. We\'ll tell you how AI can help solve it.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}#contacto`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-700 rounded-lg font-medium text-lg hover:bg-blue-50 transition w-full sm:w-auto"
            >
              {isSpanish ? 'Contactar' : 'Contact Us'}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href={`/${locale}/services`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-700 text-white rounded-lg font-medium text-lg hover:bg-blue-600 transition border border-blue-500 w-full sm:w-auto"
            >
              {isSpanish ? 'Ver Servicios' : 'View Services'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

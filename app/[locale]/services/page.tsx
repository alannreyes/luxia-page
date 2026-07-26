import Link from 'next/link'
import type { Metadata } from 'next'
import { FileSearch, Search, CloudLightning, Brain, Ruler, MapPin, Shield, Server, Eye, Database, ArrowRight, CheckCircle2 } from 'lucide-react'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const locale = resolvedParams.locale as 'es' | 'en'
  const isSpanish = locale === 'es'

  return {
    title: isSpanish
      ? 'Servicios de IA Generativa | luxIA - Soluciones End-to-End'
      : 'Generative AI Services | luxIA - End-to-End Solutions',
    description: isSpanish
      ? 'Soluciones completas de IA Generativa: LLMs, embeddings, Claude, GPT, Gemini. Infraestructura enterprise-grade con alta disponibilidad, seguridad y observabilidad.'
      : 'Complete Generative AI solutions: LLMs, embeddings, Claude, GPT, Gemini. Enterprise-grade infrastructure with high availability, security and observability.',
  }
}

// Capabilities data - generic names, not product names
const capabilities = {
  es: [
    {
      id: 'document-validation',
      icon: FileSearch,
      title: 'Validación Documental con IA',
      industry: 'Insurtech · Legal',
      description: 'Análisis automatizado de documentos complejos. Extracción inteligente de datos, evaluación de riesgos y generación de reportes usando LLMs con prompt engineering avanzado.',
      techTerms: ['Claude', 'GPT', 'Prompt engineering avanzado', 'OCR'],
      infraTerms: ['Seguridad de datos', 'Encriptación'],
    },
    {
      id: 'semantic-search',
      icon: Search,
      title: 'Búsqueda Semántica de Catálogos',
      industry: 'Retail · Industrial',
      description: 'Motores de búsqueda que entienden el contexto, no solo palabras clave. Ideal para catálogos con +200K SKUs, documentación técnica y knowledge bases empresariales.',
      techTerms: ['Embeddings', 'pgvector', 'Qdrant', 'PostgreSQL'],
      infraTerms: ['Respaldos automáticos', 'Escalabilidad'],
    },
    {
      id: 'lead-generation',
      icon: MapPin,
      title: 'Generación de Leads con IA + APIs',
      industry: 'Insurtech · Fintech',
      description: 'Plataformas que combinan datos externos (clima, geolocalización, mercado) con IA Generativa para identificar oportunidades de negocio de forma proactiva.',
      techTerms: ['LLMs', 'APIs de clima', 'Procesamiento geoespacial', 'PostGIS'],
      infraTerms: ['Infraestructura cloud', 'Failover automático'],
    },
    {
      id: 'geo-marketing',
      icon: Ruler,
      title: 'Marketing Geolocalizado con IA',
      industry: 'Retail · Comercio',
      description: 'Campañas que llegan solo a personas en tu radio de proximidad. Canal de marketing basado en ubicación real, no estimada, con análisis de resultados.',
      techTerms: ['APIs de ubicación', 'Modelos de lenguaje', 'Next.js', 'TypeScript'],
      infraTerms: ['Observabilidad', 'Prometheus', 'Grafana'],
    },
    {
      id: 'industrial-alerts',
      icon: CloudLightning,
      title: 'Alertas Geolocalizadas + IoT',
      industry: 'Industrial · Minería · Oil & Gas',
      description: 'Sistema de alertas que funciona con celular bloqueado y app cerrada. Integración con sensores IoT y APIs de clima para proteger personal en operaciones críticas.',
      techTerms: ['IoT', 'Failover entre modelos', 'APIs meteorológicas'],
      infraTerms: ['Alta disponibilidad', 'Alertas 24/7', 'Linux', 'Docker'],
    },
    {
      id: 'ai-consulting',
      icon: Brain,
      title: 'Consultoría en IA Generativa',
      industry: 'Todas las industrias',
      description: 'Evaluación, diseño e implementación de soluciones con LLMs. Desde POCs de 4 semanas hasta despliegues enterprise con estrategias de failover y control de errores.',
      techTerms: ['Claude', 'GPT', 'Gemini', 'OpenRouter', 'n8n'],
      infraTerms: ['Arquitectura cloud', 'CI/CD', 'Traefik'],
    },
  ],
  en: [
    {
      id: 'document-validation',
      icon: FileSearch,
      title: 'Document Validation with AI',
      industry: 'Insurtech · Legal',
      description: 'Automated analysis of complex documents. Intelligent data extraction, risk assessment and report generation using LLMs with advanced prompt engineering.',
      techTerms: ['Claude', 'GPT', 'Advanced prompt engineering', 'OCR'],
      infraTerms: ['Data security', 'Encryption'],
    },
    {
      id: 'semantic-search',
      icon: Search,
      title: 'Semantic Catalog Search',
      industry: 'Retail · Industrial',
      description: 'Search engines that understand context, not just keywords. Ideal for catalogs with 200K+ SKUs, technical documentation and enterprise knowledge bases.',
      techTerms: ['Embeddings', 'pgvector', 'Qdrant', 'PostgreSQL'],
      infraTerms: ['Automatic backups', 'Scalability'],
    },
    {
      id: 'lead-generation',
      icon: MapPin,
      title: 'Lead Generation with AI + APIs',
      industry: 'Insurtech · Fintech',
      description: 'Platforms combining external data (weather, geolocation, market) with Generative AI to proactively identify business opportunities.',
      techTerms: ['LLMs', 'Weather APIs', 'Geospatial processing', 'PostGIS'],
      infraTerms: ['Cloud infrastructure', 'Automatic failover'],
    },
    {
      id: 'geo-marketing',
      icon: Ruler,
      title: 'Geolocated Marketing with AI',
      industry: 'Retail · Commerce',
      description: 'Campaigns that reach only people within your proximity radius. Marketing channel based on real location, not estimated, with results analysis.',
      techTerms: ['Location APIs', 'Language models', 'Next.js', 'TypeScript'],
      infraTerms: ['Observability', 'Prometheus', 'Grafana'],
    },
    {
      id: 'industrial-alerts',
      icon: CloudLightning,
      title: 'Geolocated Alerts + IoT',
      industry: 'Industrial · Mining · Oil & Gas',
      description: 'Alert system that works with phone locked and app closed. Integration with IoT sensors and weather APIs to protect personnel in critical operations.',
      techTerms: ['IoT', 'Model failover', 'Weather APIs'],
      infraTerms: ['High availability', '24/7 alerts', 'Linux', 'Docker'],
    },
    {
      id: 'ai-consulting',
      icon: Brain,
      title: 'Generative AI Consulting',
      industry: 'All industries',
      description: 'Assessment, design and implementation of LLM solutions. From 4-week POCs to enterprise deployments with failover strategies and error handling.',
      techTerms: ['Claude', 'GPT', 'Gemini', 'OpenRouter', 'n8n'],
      infraTerms: ['Cloud architecture', 'CI/CD', 'Traefik'],
    },
  ]
}

// Tech stack mapping (Option C)
const techStack = {
  es: [
    { business: 'Alta disponibilidad', tech: 'Docker · Traefik · VPS · Linux' },
    { business: 'Búsqueda inteligente', tech: 'PostgreSQL · pgvector · Qdrant' },
    { business: 'IA Generativa', tech: 'Claude · GPT · Gemini · OpenRouter' },
    { business: 'Observabilidad', tech: 'Prometheus · Grafana · Alertas' },
    { business: 'Automatización', tech: 'n8n · Firebase Functions · CI/CD' },
    { business: 'Seguridad', tech: 'Firewalls · TLS · ISO 27001' },
  ],
  en: [
    { business: 'High availability', tech: 'Docker · Traefik · VPS · Linux' },
    { business: 'Intelligent search', tech: 'PostgreSQL · pgvector · Qdrant' },
    { business: 'Generative AI', tech: 'Claude · GPT · Gemini · OpenRouter' },
    { business: 'Observability', tech: 'Prometheus · Grafana · Alerts' },
    { business: 'Automation', tech: 'n8n · Firebase Functions · CI/CD' },
    { business: 'Security', tech: 'Firewalls · TLS · ISO 27001' },
  ]
}

// Project includes block
const projectIncludes = {
  es: {
    development: {
      title: 'Desarrollo',
      items: ['TypeScript / Python', 'Next.js / NestJS', 'Integración con LLMs (Claude, GPT, Gemini)', 'Prompt engineering avanzado']
    },
    data: {
      title: 'Datos',
      items: ['PostgreSQL + PostGIS + pgvector', 'Bases vectoriales (Qdrant)', 'Respaldos automáticos']
    },
    infrastructure: {
      title: 'Infraestructura',
      items: ['Linux · Docker Compose · Traefik', 'VPS / Cloud configurado', 'CI/CD y deploys automatizados', 'Alta disponibilidad']
    },
    security: {
      title: 'Seguridad',
      items: ['Firewalls configurados', 'HTTPS/TLS', 'Análisis de vulnerabilidades']
    },
    operations: {
      title: 'Operaciones',
      items: ['Prometheus + Grafana', 'Alertas y monitoreo', 'Documentación técnica', 'Soporte post-lanzamiento']
    }
  },
  en: {
    development: {
      title: 'Development',
      items: ['TypeScript / Python', 'Next.js / NestJS', 'LLM integration (Claude, GPT, Gemini)', 'Advanced prompt engineering']
    },
    data: {
      title: 'Data',
      items: ['PostgreSQL + PostGIS + pgvector', 'Vector databases (Qdrant)', 'Automatic backups']
    },
    infrastructure: {
      title: 'Infrastructure',
      items: ['Linux · Docker Compose · Traefik', 'VPS / Cloud configured', 'CI/CD and automated deploys', 'High availability']
    },
    security: {
      title: 'Security',
      items: ['Configured firewalls', 'HTTPS/TLS', 'Vulnerability analysis']
    },
    operations: {
      title: 'Operations',
      items: ['Prometheus + Grafana', 'Alerts and monitoring', 'Technical documentation', 'Post-launch support']
    }
  }
}

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function ServicesPage({ params }: PageProps) {
  const resolvedParams = await params
  const locale = resolvedParams.locale as 'es' | 'en'
  const isSpanish = locale === 'es'
  const capabilitiesList = capabilities[locale]
  const techStackList = techStack[locale]
  const includes = projectIncludes[locale]

  return (
    <div style={{ backgroundColor: 'var(--ed-paper)' }}>
      {/* Hero Section */}
      <section className="px-5 sm:px-8 pt-16 pb-16 md:pt-24 md:pb-20" style={{ backgroundColor: 'var(--ed-paper)' }}>
        <div className="max-w-5xl mx-auto">
          <p className="font-data text-xs tracking-[0.2em] uppercase mb-5" style={{ color: 'var(--ed-accent)' }}>
            {isSpanish ? 'Servicios · de la idea a producción' : 'Services · from idea to production'}
          </p>
          <h1 className="font-editorial font-extrabold tracking-[-0.03em] leading-[0.98] text-4xl md:text-6xl mb-6 max-w-[18ch]" style={{ color: 'var(--ed-ink)' }}>
            {isSpanish ? (
              <>Software en producción, <span style={{ color: 'var(--ed-accent)' }}>no demos</span></>
            ) : (
              <>Software in production, <span style={{ color: 'var(--ed-accent)' }}>not demos</span></>
            )}
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mb-8" style={{ color: 'var(--ed-gray)' }}>
            {isSpanish
              ? 'Construimos e integramos sistemas que funcionan 24/7 — con seguridad, autenticación, pasarela de pagos, alta disponibilidad y soporte. La IA es el método; el resultado es software que opera.'
              : "We build and integrate systems that run 24/7 — with security, authentication, payments, high availability and support. AI is the method; the result is software that operates."}
          </p>
          <Link
            href={`/${locale}#contacto`}
            className="inline-flex items-center gap-2 min-h-[52px] px-7 rounded-full text-white font-medium transition-transform hover:-translate-y-0.5"
            style={{ backgroundColor: 'var(--ed-ink)' }}
          >
            {isSpanish ? 'Empecemos tu piloto' : 'Start your pilot'}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-16 md:py-24 px-5 sm:px-8" style={{ backgroundColor: 'var(--ed-paper-2)', borderTop: '1px solid var(--ed-line)' }}>
        <div className="max-w-6xl mx-auto">
          <p className="font-data text-xs tracking-[0.2em] uppercase mb-3" style={{ color: 'var(--ed-accent)' }}>
            {isSpanish ? 'Capacidades' : 'Capabilities'}
          </p>
          <h2 className="font-editorial text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-3" style={{ color: 'var(--ed-ink)' }}>
            {isSpanish ? 'Lo que construimos' : 'What we build'}
          </h2>
          <p className="max-w-2xl mb-10 md:mb-12" style={{ color: 'var(--ed-gray)' }}>
            {isSpanish
              ? 'Soluciones probadas en producción para industrias exigentes.'
              : 'Production-tested solutions for demanding industries.'}
          </p>

          <div className="space-y-5">
            {capabilitiesList.map((capability) => (
              <div
                key={capability.id}
                id={capability.id}
                className="bg-white rounded-2xl p-5 md:p-8 hover:-translate-y-0.5 transition-transform"
                style={{ border: '1px solid var(--ed-line)' }}
              >
                <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                  <div className="md:w-16">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(37,64,255,0.08)' }}>
                      <capability.icon className="w-6 h-6 md:w-7 md:h-7" style={{ color: 'var(--ed-accent)' }} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                      <h3 className="text-xl md:text-2xl font-editorial font-bold tracking-[-0.01em]" style={{ color: 'var(--ed-ink)' }}>{capability.title}</h3>
                      <span className="font-data text-[11px] tracking-wide px-3 py-1 rounded-full w-fit" style={{ backgroundColor: 'var(--ed-paper-2)', color: 'var(--ed-gray)', border: '1px solid var(--ed-line)' }}>
                        {capability.industry}
                      </span>
                    </div>
                    <p className="mb-4" style={{ color: 'var(--ed-gray)' }}>{capability.description}</p>

                    {/* Tech / infra terms · un solo sistema de chips */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {[...capability.techTerms, ...capability.infraTerms].map((term, idx) => (
                        <span
                          key={idx}
                          className="font-data text-xs px-3 py-1 rounded-lg"
                          style={{ backgroundColor: 'var(--ed-paper)', color: 'var(--ed-gray)', border: '1px solid var(--ed-line)' }}
                        >
                          {term}
                        </span>
                      ))}
                    </div>

                    <p className="text-sm" style={{ color: 'var(--ed-gray)' }}>
                      {isSpanish
                        ? 'Entregado en producción, con documentación y soporte.'
                        : 'Delivered to production, with documentation and support.'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why We're Different */}
      <section className="py-16 md:py-24 px-5 sm:px-8" style={{ backgroundColor: 'var(--ed-paper)' }}>
        <div className="max-w-5xl mx-auto">
          <p className="font-data text-xs tracking-[0.2em] uppercase mb-3" style={{ color: 'var(--ed-accent)' }}>
            {isSpanish ? 'Por qué somos diferentes' : 'Why we\'re different'}
          </p>
          <h2 className="font-editorial text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-3 max-w-[20ch]" style={{ color: 'var(--ed-ink)' }}>
            {isSpanish ? 'La mayoría entrega código. Nosotros, un sistema que opera.' : 'Most deliver code. We deliver a system that operates.'}
          </h2>
          <p className="max-w-2xl mb-10 md:mb-12" style={{ color: 'var(--ed-gray)' }}>
            {isSpanish
              ? 'Lo que compras suena a negocio; debajo hay ingeniería real y sobria.'
              : 'What you buy sounds like business; underneath is real, sober engineering.'}
          </p>

          {/* Bloque de tinta · negocio vs. ingeniería */}
          <div className="rounded-2xl p-6 md:p-9 text-white overflow-hidden" style={{ backgroundColor: 'var(--ed-ink)' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4">
              <div className="font-data text-xs text-white/50 uppercase tracking-[0.18em]">
                {isSpanish ? 'Lo que el CTO escucha' : 'What the CTO hears'}
              </div>
              <div className="font-data text-xs text-white/50 uppercase tracking-[0.18em] hidden md:block">
                {isSpanish ? 'Lo que hay debajo' : "What's underneath"}
              </div>
            </div>

            <div className="space-y-1">
              {techStackList.map((item, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-6 py-3.5 border-t border-white/10">
                  <div className="font-medium text-white">{item.business}</div>
                  <div className="text-white/55 text-sm md:text-base font-data">{item.tech}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <span className="font-data text-xs tracking-wide" style={{ color: 'var(--ed-accent)' }}>
                {isSpanish ? 'Filosofía open source · Soluciones prácticas · Sin sobre-ingeniería' : 'Open source philosophy · Practical solutions · No over-engineering'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Project Includes Block */}
      <section className="py-16 md:py-24 px-5 sm:px-8" style={{ backgroundColor: 'var(--ed-paper-2)', borderTop: '1px solid var(--ed-line)' }}>
        <div className="max-w-5xl mx-auto">
          <p className="font-data text-xs tracking-[0.2em] uppercase mb-3" style={{ color: 'var(--ed-accent)' }}>
            {isSpanish ? 'Alcance' : 'Scope'}
          </p>
          <h2 className="font-editorial text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-10 md:mb-12" style={{ color: 'var(--ed-ink)' }}>
            {isSpanish ? 'Cada proyecto incluye' : 'Every project includes'}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {Object.entries(includes).map(([key, section]) => {
              const icons: Record<string, typeof Server> = {
                development: Brain,
                data: Database,
                infrastructure: Server,
                security: Shield,
                operations: Eye
              }
              const Icon = icons[key] || Server

              return (
                <div key={key} className="bg-white rounded-xl p-5 md:p-6" style={{ border: '1px solid var(--ed-line)' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(37,64,255,0.08)' }}>
                      <Icon className="w-5 h-5" style={{ color: 'var(--ed-accent)' }} />
                    </div>
                    <h3 className="font-editorial font-bold" style={{ color: 'var(--ed-ink)' }}>{section.title}</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {section.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--ed-gray)' }}>
                        <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--ed-accent)' }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section · cierre de tinta */}
      <section className="py-16 md:py-24 px-5 sm:px-8 text-white" style={{ backgroundColor: 'var(--ed-ink)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-editorial text-3xl md:text-5xl font-bold tracking-[-0.02em] mb-6">
            {isSpanish
              ? '¿Listo para llevar tu idea a producción?'
              : 'Ready to take your idea to production?'}
          </h2>
          <p className="text-lg md:text-xl text-white/60 mb-10 max-w-xl mx-auto">
            {isSpanish
              ? 'Cuéntanos tu desafío. Sin compromisos, solo ideas concretas para tu caso.'
              : 'Tell us your challenge. No commitments, just concrete ideas for your case.'}
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
              href={`/${locale}/cases`}
              className="inline-flex items-center justify-center gap-2 min-h-[52px] px-8 rounded-full font-medium transition-colors w-full sm:w-auto border border-white/20 text-white hover:bg-white/10"
            >
              {isSpanish ? 'Ver Casos' : 'View Cases'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

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
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-12 md:py-20 px-4 md:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block px-4 py-1.5 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-sm font-medium mb-6">
            {isSpanish ? 'Soluciones completas · De la idea a producción' : 'Complete solutions · From idea to production'}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            {isSpanish ? (
              <>Soluciones de <span className="text-blue-400">IA Generativa</span> con infraestructura enterprise-grade</>
            ) : (
              <><span className="text-blue-400">Generative AI</span> solutions with enterprise-grade infrastructure</>
            )}
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            {isSpanish
              ? 'No entregamos demos. Entregamos sistemas que funcionan 24/7 con seguridad, alta disponibilidad y soporte.'
              : "We don't deliver demos. We deliver systems that work 24/7 with security, high availability and support."}
          </p>
          <Link
            href={`/${locale}#contacto`}
            className="inline-flex items-center gap-2 px-6 md:px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium text-lg transition w-full sm:w-auto justify-center"
          >
            {isSpanish ? 'Solicitar Información' : 'Request Information'}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-4">
            {isSpanish ? 'Capacidades' : 'Capabilities'}
          </h2>
          <p className="text-slate-600 text-center max-w-2xl mx-auto mb-8 md:mb-12">
            {isSpanish
              ? 'Soluciones probadas en producción para industrias reguladas'
              : 'Production-tested solutions for regulated industries'}
          </p>

          <div className="space-y-6">
            {capabilitiesList.map((capability) => (
              <div
                key={capability.id}
                id={capability.id}
                className="bg-white rounded-2xl p-4 md:p-8 shadow-sm border border-slate-200 hover:shadow-md transition"
              >
                <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                  <div className="md:w-16">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                      <capability.icon className="w-6 h-6 md:w-7 md:h-7 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900">{capability.title}</h3>
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full w-fit">
                        {capability.industry}
                      </span>
                    </div>
                    <p className="text-slate-600 mb-4">{capability.description}</p>

                    {/* Tech Terms */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {capability.techTerms.map((term, idx) => (
                        <span
                          key={idx}
                          className="px-2 md:px-3 py-1 bg-blue-50 text-blue-700 text-xs md:text-sm rounded-full"
                        >
                          {term}
                        </span>
                      ))}
                      {capability.infraTerms.map((term, idx) => (
                        <span
                          key={idx}
                          className="px-2 md:px-3 py-1 bg-green-50 text-green-700 text-xs md:text-sm rounded-full"
                        >
                          {term}
                        </span>
                      ))}
                    </div>

                    {/* Recurring phrase */}
                    <p className="text-sm text-slate-500 italic">
                      {isSpanish
                        ? 'Solución entregada en producción con documentación y soporte.'
                        : 'Solution delivered to production with documentation and support.'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why We're Different - Option C */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-white border-y border-slate-200">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-4">
            {isSpanish ? 'Por qué somos diferentes' : 'Why we\'re different'}
          </h2>
          <p className="text-slate-600 text-center max-w-2xl mx-auto mb-8 md:mb-12">
            {isSpanish
              ? 'La mayoría de agencias de IA te entregan código. Nosotros te entregamos un sistema que funciona 24/7.'
              : 'Most AI agencies deliver code. We deliver a system that works 24/7.'}
          </p>

          {/* Option C: Two columns - Business vs Technical */}
          <div className="bg-slate-900 rounded-2xl p-4 md:p-8 text-white overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
              <div className="text-sm font-medium text-slate-400 uppercase tracking-wider">
                {isSpanish ? 'Lo que el CTO escucha' : 'What the CTO hears'}
              </div>
              <div className="text-sm font-medium text-slate-400 uppercase tracking-wider hidden md:block">
                {isSpanish ? 'Lo que hay debajo' : "What's underneath"}
              </div>
            </div>

            <div className="space-y-3">
              {techStackList.map((item, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6 py-3 border-t border-slate-700">
                  <div className="font-medium text-white">{item.business}</div>
                  <div className="text-slate-400 text-sm md:text-base font-mono">{item.tech}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-slate-700 text-center">
              <span className="inline-flex items-center gap-2 text-green-400 text-sm">
                <span className="text-lg">🌱</span>
                {isSpanish ? 'Filosofía open source · Soluciones prácticas · Sin sobre-ingeniería' : 'Open source philosophy · Practical solutions · No over-engineering'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Project Includes Block */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-8 md:mb-12">
            {isSpanish ? 'Cada proyecto incluye' : 'Every project includes'}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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
                <div key={key} className="bg-white rounded-xl p-4 md:p-6 border border-slate-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-slate-900">{section.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {section.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
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

      {/* CTA Section */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-6">
            {isSpanish
              ? '¿Listo para implementar IA en tu organización?'
              : 'Ready to implement AI in your organization?'}
          </h2>
          <p className="text-lg md:text-xl text-blue-100 mb-8">
            {isSpanish
              ? 'Cuéntanos tu desafío. Sin compromisos, solo ideas concretas para tu caso.'
              : 'Tell us your challenge. No commitments, just concrete ideas for your case.'}
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
              href={`/${locale}/cases`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-700 text-white rounded-lg font-medium text-lg hover:bg-blue-600 transition border border-blue-500 w-full sm:w-auto"
            >
              {isSpanish ? 'Ver Casos de Éxito' : 'View Case Studies'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

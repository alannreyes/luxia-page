'use client'
import { motion } from 'framer-motion'
import { Award, Shield, Building, Landmark, Linkedin, Github, ExternalLink, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { siteConfig } from '@/lib/config'
import CredlyBadge from './CredlyBadge'
import type { BaseComponentProps } from '@/types'

const iconMap: { [key: string]: React.ComponentType<{ className?: string; style?: React.CSSProperties }> } = {
  Award, Shield, Building, Landmark
}

interface Credential { icon: string; title: string; subtitle: string }
interface Experience { company: string; role: string; highlight?: string; years: string }
interface Certification { badgeId: string; name: string; issuer: string; summary: string }

export default function Founder({ locale, dictionary }: BaseComponentProps) {
  const isSpanish = locale === 'es'
  const certifications = dictionary.founder.certifications as Certification[]

  // JSON-LD: describe las credenciales para buscadores y LLMs (SEO/GEO). El contenido
  // dentro del iframe de Credly no es indexable; este bloque + el texto visible sí.
  const credentialSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: dictionary.founder.name,
    jobTitle: dictionary.founder.role,
    url: 'https://luxia.us',
    sameAs: [siteConfig.contact.linkedinUrl, 'https://github.com/alannreyes'],
    worksFor: { '@type': 'Organization', name: 'LuxIA', url: 'https://luxia.us' },
    knowsAbout: isSpanish
      ? ['IA generativa', 'Búsqueda semántica', 'Agentes de IA', 'Arquitectura de software', 'Seguridad de la información', 'ISO 27001']
      : ['Generative AI', 'Semantic search', 'AI agents', 'Software architecture', 'Information security', 'ISO 27001'],
    hasCredential: certifications.map((c) => ({
      '@type': 'EducationalOccupationalCredential',
      name: c.name,
      credentialCategory: 'certification',
      recognizedBy: { '@type': 'Organization', name: c.issuer },
      description: c.summary,
    })),
  }

  return (
    <section id="fundador" className="py-20 md:py-28 px-5 sm:px-8" style={{ backgroundColor: 'var(--ed-paper-2)', borderTop: '1px solid var(--ed-line)' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-12 md:mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <p className="font-data text-xs tracking-[0.2em] uppercase mb-3" style={{ color: 'var(--ed-accent)' }}>
            {isSpanish ? 'Fundador' : 'Founder'}
          </p>
          <h2 className="font-editorial text-3xl md:text-5xl font-bold tracking-[-0.02em] mb-4 max-w-[16ch]" style={{ color: 'var(--ed-ink)' }}>
            {dictionary.founder.title}
          </h2>
          <p className="text-lg max-w-2xl" style={{ color: 'var(--ed-gray)' }}>
            {dictionary.founder.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8 items-start">
          {/* Profile Card · un bloque de tinta, retrato nítido (foto 400px, sin sobre-escalar) */}
          <motion.div
            className="lg:col-span-2 rounded-3xl overflow-hidden text-white flex flex-col lg:sticky lg:top-28"
            style={{ backgroundColor: 'var(--ed-ink)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="p-7 md:p-8 flex flex-col flex-1">
              {/* Retrato cuadrado, ancho de la tarjeta */}
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden ring-1 ring-white/10 mb-6">
                <Image
                  src="/alann-profile.jpg"
                  alt="Alann Reyes"
                  fill
                  sizes="(max-width: 1024px) 90vw, 40vw"
                  className="object-cover"
                  priority
                />
              </div>

              <h3 className="font-editorial text-3xl font-bold tracking-[-0.02em] leading-none mb-1.5">
                {dictionary.founder.name}
              </h3>
              <p className="font-data text-xs tracking-[0.15em] uppercase mb-5" style={{ color: 'var(--ed-accent)' }}>
                {dictionary.founder.role}
              </p>

              <p className="leading-relaxed text-white/65 text-[15px] mb-7">
                {dictionary.founder.bio}
              </p>

              <div className="mt-auto space-y-2.5">
                <a
                  href={siteConfig.contact.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center px-6 py-3 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-all duration-300 group min-h-[48px]"
                >
                  <Linkedin className="w-5 h-5 mr-2" />
                  {dictionary.founder.cta}
                  <ExternalLink className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a
                  href="https://github.com/alannreyes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center px-6 py-3 rounded-full border border-white/10 hover:bg-white/5 hover:border-white/25 transition-all duration-300 group min-h-[48px] text-white/70 hover:text-white"
                >
                  <Github className="w-5 h-5 mr-2" />
                  {isSpanish ? 'Código en GitHub' : 'Code on GitHub'}
                  <ExternalLink className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Credentials & Experience */}
          <div className="lg:col-span-3 space-y-5">
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {dictionary.founder.credentials.map((credential: Credential, index: number) => {
                const Icon = iconMap[credential.icon] || Award
                return (
                  <motion.div
                    key={index}
                    className="rounded-2xl p-5 bg-white hover:-translate-y-1 transition-all duration-300"
                    style={{ border: '1px solid var(--ed-line)' }}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: 'rgba(37,64,255,0.08)' }}>
                      <Icon className="w-5 h-5" style={{ color: 'var(--ed-accent)' }} />
                    </div>
                    <h4 className="font-semibold" style={{ color: 'var(--ed-ink)' }}>{credential.title}</h4>
                    <p className="font-data text-xs mt-0.5 uppercase tracking-wide" style={{ color: 'var(--ed-gray)' }}>{credential.subtitle}</p>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Trayectoria */}
            <motion.div
              className="rounded-2xl p-6 bg-white"
              style={{ border: '1px solid var(--ed-line)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p className="font-data text-xs tracking-[0.18em] uppercase mb-4" style={{ color: 'var(--ed-gray)' }}>
                {isSpanish ? 'Trayectoria' : 'Career'}
              </p>
              <div className="space-y-4">
                {dictionary.founder.experience.map((exp: Experience, index: number) => (
                  <div key={index} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full mt-2 mr-4 flex-shrink-0" style={{ backgroundColor: 'var(--ed-accent)' }} />
                    <div className="flex-1">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <span className="font-semibold" style={{ color: 'var(--ed-ink)' }}>{exp.company}</span>
                          <p className="text-sm" style={{ color: 'var(--ed-gray)' }}>{exp.role}</p>
                        </div>
                        <span className="font-data text-[11px] px-2 py-1 rounded-md flex-shrink-0" style={{ color: 'var(--ed-gray)', backgroundColor: 'var(--ed-paper-2)' }}>
                          {exp.years}
                        </span>
                      </div>
                      {exp.highlight && (
                        <p className="text-[13px] leading-snug mt-1.5" style={{ color: 'var(--ed-accent)' }}>{exp.highlight}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Prueba de constructor: los sistemas hablan por él → /cases */}
            <motion.div
              className="rounded-2xl p-6 bg-white"
              style={{ border: '1px solid var(--ed-line)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              <p className="font-data text-xs tracking-[0.18em] uppercase mb-3" style={{ color: 'var(--ed-gray)' }}>
                {isSpanish ? 'Construye, no solo dirige' : 'Builds, not just manages'}
              </p>
              <p className="leading-relaxed mb-4" style={{ color: 'var(--ed-ink)' }}>
                {isSpanish
                  ? 'Nueve sistemas de IA construidos — en producción y en piloto, con su etapa declarada — documentados caso por caso: qué problema resolvían, qué decisiones de ingeniería se tomaron y qué cambió para el negocio.'
                  : 'Nine AI systems built — in production and in pilot, each stage declared — documented case by case: the problem they solved, the engineering decisions behind them, and what changed for the business.'}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {(isSpanish
                  ? ['Búsqueda semántica', 'Copiloto de ventas', 'Validación documental', 'Cotizador con IA', 'Alertas IoT']
                  : ['Semantic search', 'Sales copilot', 'Document validation', 'AI quoting', 'IoT alerts']
                ).map((t) => (
                  <span key={t} className="font-data px-2.5 py-0.5 text-xs rounded-md" style={{ backgroundColor: 'var(--ed-paper-2)', color: 'var(--ed-gray)', border: '1px solid var(--ed-line)' }}>
                    {t}
                  </span>
                ))}
              </div>
              <Link
                href={`/${locale}/cases`}
                className="group inline-flex items-center gap-1.5 text-sm font-medium"
                style={{ color: 'var(--ed-accent)' }}
              >
                {isSpanish ? 'Ver los 9 casos documentados' : 'See the 9 documented cases'}
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </motion.div>

            {/* Credenciales verificadas · Credly (oficiales: Anthropic + Google Cloud) */}
            <motion.div
              className="rounded-2xl p-6 bg-white"
              style={{ border: '1px solid var(--ed-line)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <p className="font-data text-xs tracking-[0.18em] uppercase mb-5" style={{ color: 'var(--ed-gray)' }}>
                {isSpanish ? 'Credenciales verificadas' : 'Verified credentials'}
              </p>
              <ul className="space-y-6">
                {certifications.map((c, i) => (
                  <li
                    key={c.badgeId}
                    className={i > 0 ? 'pt-6' : ''}
                    style={i > 0 ? { borderTop: '1px solid var(--ed-line)' } : undefined}
                  >
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                      <div className="shrink-0">
                        <CredlyBadge badgeId={c.badgeId} title={`${c.name} · ${c.issuer}`} />
                      </div>
                      <div className="min-w-0 text-center sm:text-left">
                        <h4 className="font-editorial text-lg md:text-xl font-bold tracking-[-0.01em]" style={{ color: 'var(--ed-ink)' }}>
                          {c.name}
                        </h4>
                        <p className="font-data text-[11px] tracking-[0.12em] uppercase mt-1" style={{ color: 'var(--ed-accent)' }}>
                          {isSpanish ? 'Emitida por' : 'Issued by'} {c.issuer}
                        </p>
                        <p className="text-sm leading-relaxed mt-2.5" style={{ color: 'var(--ed-gray)' }}>
                          {c.summary}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(credentialSchema) }} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

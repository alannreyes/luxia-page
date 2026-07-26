'use client'
import { motion } from 'framer-motion'
import { Award, Shield, Building, Landmark, Linkedin, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import { siteConfig } from '@/lib/config'
import CredlyBadge from './CredlyBadge'
import type { BaseComponentProps } from '@/types'

const iconMap: { [key: string]: React.ComponentType<{ className?: string; style?: React.CSSProperties }> } = {
  Award, Shield, Building, Landmark
}

interface Credential { icon: string; title: string; subtitle: string }
interface Experience { company: string; role: string; years: string }

export default function Founder({ locale, dictionary }: BaseComponentProps) {
  const isSpanish = locale === 'es'

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

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Profile Card · un solo bloque de tinta, como una feature editorial */}
          <motion.div
            className="relative rounded-3xl p-8 md:p-10 text-white overflow-hidden"
            style={{ backgroundColor: 'var(--ed-ink)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* acento eléctrico superior */}
            <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--ed-accent), transparent)' }} />
            <div className="relative z-10">
              <div className="w-24 h-24 rounded-2xl overflow-hidden mb-6 ring-1 ring-white/15">
                <Image
                  src="/alann-profile.jpg"
                  alt="Alann Reyes"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>

              <h3 className="font-editorial text-3xl font-bold tracking-[-0.02em] mb-1">{dictionary.founder.name}</h3>
              <p className="font-data text-sm tracking-wide mb-6" style={{ color: 'var(--ed-accent)' }}>
                {dictionary.founder.role}
              </p>

              <p className="leading-relaxed mb-8 text-white/70">
                {dictionary.founder.bio}
              </p>

              <a
                href={siteConfig.contact.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-all duration-300 group min-h-[48px]"
              >
                <Linkedin className="w-5 h-5 mr-2" />
                {dictionary.founder.cta}
                <ExternalLink className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </motion.div>

          {/* Credentials & Experience */}
          <div className="space-y-5">
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
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Credencial verificada · Credly (oficial, issued by Anthropic) */}
            <motion.div
              className="rounded-2xl p-6 bg-white"
              style={{ border: '1px solid var(--ed-line)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <p className="font-data text-xs tracking-[0.18em] uppercase mb-4" style={{ color: 'var(--ed-gray)' }}>
                {isSpanish ? 'Credencial verificada' : 'Verified credential'}
              </p>
              <div className="flex justify-center">
                <CredlyBadge />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

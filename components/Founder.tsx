'use client'
import { motion } from 'framer-motion'
import { Award, Shield, Building, Landmark, Linkedin, ExternalLink } from 'lucide-react'
import { siteConfig } from '@/lib/config'
import type { BaseComponentProps } from '@/types'

// Mapeo de iconos
const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Award,
  Shield,
  Building,
  Landmark
}

interface Credential {
  icon: string
  title: string
  subtitle: string
}

interface Experience {
  company: string
  role: string
  years: string
}

export default function Founder({ dictionary }: BaseComponentProps) {
  return (
    <section id="fundador" className="py-24 px-6 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
            {dictionary.founder.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {dictionary.founder.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Card */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-3xl p-8 md:p-10 text-white relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl" />

              <div className="relative z-10">
                {/* Avatar placeholder */}
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
                  <span className="text-4xl font-bold text-white">AR</span>
                </div>

                <h3 className="text-3xl font-bold mb-2">{dictionary.founder.name}</h3>
                <p className="text-blue-300 font-medium mb-6">{dictionary.founder.role}</p>

                <p className="text-gray-300 leading-relaxed mb-8">
                  {dictionary.founder.bio}
                </p>

                {/* LinkedIn CTA */}
                <a
                  href={siteConfig.contact.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 group"
                >
                  <Linkedin className="w-5 h-5 mr-2" />
                  {dictionary.founder.cta}
                  <ExternalLink className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Credentials & Experience */}
          <div className="space-y-8">
            {/* Credentials Grid */}
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {dictionary.founder.credentials.map((credential: Credential, index: number) => {
                const Icon = iconMap[credential.icon] || Award
                return (
                  <motion.div
                    key={index}
                    className="bg-white rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                    whileHover={{ y: -5 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <h4 className="font-bold text-gray-900">{credential.title}</h4>
                    <p className="text-sm text-gray-600">{credential.subtitle}</p>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Experience Timeline */}
            <motion.div
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="font-bold text-gray-900 mb-4 text-lg">Trayectoria</h4>
              <div className="space-y-4">
                {dictionary.founder.experience.map((exp: Experience, index: number) => (
                  <div
                    key={index}
                    className="flex items-start"
                  >
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-4 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-semibold text-gray-900">{exp.company}</span>
                          <p className="text-sm text-gray-600">{exp.role}</p>
                        </div>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600 flex-shrink-0 ml-2">
                          {exp.years}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

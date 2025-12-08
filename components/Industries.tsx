'use client'
import { motion } from 'framer-motion'
import { Banknote, Shield, HardHat, Factory } from 'lucide-react'
import type { BaseComponentProps } from '@/types'

// Mapeo de iconos
const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Banknote,
  Shield,
  HardHat,
  Factory
}

// Colores para cada industria
const industryColors = [
  { bg: 'from-emerald-500 to-emerald-600', light: 'bg-emerald-100', text: 'text-emerald-600' },
  { bg: 'from-blue-500 to-blue-600', light: 'bg-blue-100', text: 'text-blue-600' },
  { bg: 'from-amber-500 to-amber-600', light: 'bg-amber-100', text: 'text-amber-600' },
  { bg: 'from-purple-500 to-purple-600', light: 'bg-purple-100', text: 'text-purple-600' }
]

interface IndustryItem {
  icon: string
  title: string
  description: string
  clients: string
}

export default function Industries({ dictionary }: BaseComponentProps) {
  return (
    <section id="industrias" className="py-24 px-6 bg-gradient-to-b from-slate-900 to-slate-800 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
            {dictionary.industries.title}
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {dictionary.industries.subtitle}
          </p>
        </motion.div>

        {/* Industries Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dictionary.industries.items.map((industry: IndustryItem, index: number) => {
            const Icon = iconMap[industry.icon] || Factory
            const colors = industryColors[index % industryColors.length]

            return (
              <motion.div
                key={index}
                className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                {/* Hover glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`} />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colors.bg} flex items-center justify-center mb-5 shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3">
                    {industry.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {industry.description}
                  </p>

                  {/* Clients */}
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Clientes</p>
                    <p className="text-sm text-gray-300">
                      {industry.clients}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Trust indicators */}
        <motion.div
          className="mt-16 flex flex-wrap justify-center items-center gap-8 text-gray-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2" />
            <span className="text-sm">ISO 27001 Compliant</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-400 rounded-full mr-2" />
            <span className="text-sm">SOC 2 Ready</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-purple-400 rounded-full mr-2" />
            <span className="text-sm">GDPR Compatible</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

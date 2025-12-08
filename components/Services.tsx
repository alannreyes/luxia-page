'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import AppointmentModal from './AppointmentModal'
import { FileSearch, Search, CloudLightning, Brain, ArrowRight } from 'lucide-react'
import type { BaseComponentProps } from '@/types'

// Mapeo de nombres de iconos a componentes
const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  FileSearch,
  Search,
  CloudLightning,
  Brain
}

interface ServiceItem {
  id: string
  icon: string
  title: string
  tagline: string
  description: string
  features: string[]
  badge: string
}

export default function Services({ dictionary }: BaseComponentProps) {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const handleExploreClick = (serviceId: string) => {
    setIsAppointmentModalOpen(true)

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'services_cta_click', {
        service_id: serviceId,
        button_text: dictionary.services.cta
      })
    }
  }

  // Colores para los badges
  const badgeColors: { [key: string]: string } = {
    Insurtech: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    Enterprise: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    Industrial: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    Strategy: 'bg-purple-500/10 text-purple-400 border-purple-500/30'
  }

  return (
    <section id="servicios" className="py-24 px-6 bg-gradient-to-b from-slate-50 to-white">
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
            {dictionary.services.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {dictionary.services.subtitle}
          </p>
        </motion.div>

        {/* Services Grid - 2x2 */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {dictionary.services.items.map((service: ServiceItem, index: number) => {
            const Icon = iconMap[service.icon] || Brain
            const isHovered = hoveredCard === service.id

            return (
              <motion.div
                key={service.id}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
                whileHover={{ y: -8 }}
              >
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative z-10">
                  {/* Badge */}
                  <div className="flex justify-between items-start mb-6">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/25`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${badgeColors[service.badge] || 'bg-gray-100 text-gray-600'}`}>
                      {service.badge}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-blue-600 font-medium mb-4">
                    {service.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.features.map((feature: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <motion.button
                    onClick={() => handleExploreClick(service.id)}
                    className="flex items-center text-blue-600 font-semibold group/btn"
                    whileHover={{ x: 5 }}
                  >
                    {dictionary.services.cta}
                    <ArrowRight className={`w-5 h-5 ml-2 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                  </motion.button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Modal de cita */}
      {isAppointmentModalOpen && (
        <AppointmentModal
          isOpen={isAppointmentModalOpen}
          onClose={() => setIsAppointmentModalOpen(false)}
        />
      )}
    </section>
  )
}

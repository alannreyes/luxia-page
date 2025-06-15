'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Clock, Users, Zap } from 'lucide-react'
import AppointmentModal from './AppointmentModal'
import { siteConfig } from '@/lib/config'

const benefits = [
  {
    icon: Clock,
    title: 'Consulta de 30 minutos',
    description: 'Tiempo suficiente para entender tu negocio'
  },
  {
    icon: CheckCircle,
    title: 'Sin compromisos',
    description: 'Solo ideas y recomendaciones honestas'
  },
  {
    icon: Users,
    title: 'Expertos en IA',
    description: 'Habla directamente con nuestro equipo técnico'
  },
  {
    icon: Zap,
    title: 'Resultados inmediatos',
    description: 'Plan de acción personalizado al final de la llamada'
  }
]

export default function CTA() {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false)

  const handleAppointmentClick = () => {
    setIsAppointmentModalOpen(true)
    
    // Tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', siteConfig.tracking.events.heroCtaClick, {
        button_text: 'CTA Final',
        source: 'bottom_cta'
      })
    }
  }

  return (
    <>
      <section className="py-20 px-6 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500 rounded-full blur-3xl opacity-20" />
        </div>

        <div className="max-w-6xl mx-auto relative">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
              Comienza tu transformación
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Agenda una consulta gratuita y descubre cómo la IA puede revolucionar 
              tus procesos, reducir costos y acelerar tu crecimiento.
            </p>
          </motion.div>

          {/* Benefits grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-blue-300" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-300 text-sm">{benefit.description}</p>
                </motion.div>
              )
            })}
          </div>

          {/* Main CTA */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <motion.button 
              onClick={handleAppointmentClick}
              className="bg-blue-600 text-white px-12 py-4 rounded-lg hover:bg-blue-700 transition text-lg font-semibold shadow-2xl hover:shadow-blue-500/25 mb-6"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Agendar Consulta Gratuita →
            </motion.button>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-400">
              <span className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2" />
                Respuesta en 24 horas
              </span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2" />
                Consulta 100% gratuita
              </span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-2" />
                También disponible en <span className="underline ml-1">English</span>
              </span>
            </div>
          </motion.div>

          {/* Contact info */}
          <motion.div
            className="text-center mt-12 pt-8 border-t border-white/20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-gray-400 text-sm mb-2">
              ¿Prefieres escribirnos directamente?
            </p>
            <a 
              href={`mailto:${siteConfig.contact.email}`}
              className="text-blue-400 hover:text-blue-300 transition font-medium"
            >
              {siteConfig.contact.email}
            </a>
          </motion.div>
        </div>
      </section>

      <AppointmentModal 
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
      />
    </>
  )
}

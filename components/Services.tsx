'use client'
import { motion } from 'framer-motion'
import { siteConfig } from '@/lib/config'
import { useState } from 'react'
import AppointmentModal from './AppointmentModal'

export default function Services() {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false)

  const handleReserveClick = () => {
    setIsAppointmentModalOpen(true)
    
    // Tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'services_cta_click', {
        button_text: 'Reserva 30 minutos'
      })
    }
  }

  return (
    <section id="servicios" className="py-20 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-light text-gray-900 mb-6">
            Potencia tu empresa con IA a medida
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Integración directa con tus sistemas actuales
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {siteConfig.services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              {/* Icon */}
              <div className="text-4xl mb-6">{service.icon}</div>
              
              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {service.title}
              </h3>
              
              {/* Subtitle */}
              <p className="text-lg font-medium text-blue-600 mb-4">
                {service.subtitle}
              </p>
              
              {/* Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              
              {/* Features */}
              <div className="space-y-3">
                <ul className="space-y-2">
                  {service.results.map((result, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-gray-700 text-sm font-medium">{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Principal */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.button
            onClick={handleReserveClick}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Reserva 30 minutos
          </motion.button>
        </motion.div>
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

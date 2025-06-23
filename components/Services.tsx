'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import AppointmentModal from './AppointmentModal'
import type { BaseComponentProps } from '@/types'

export default function Services({ dictionary }: BaseComponentProps) {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false)

  const handleReserveClick = () => {
    setIsAppointmentModalOpen(true)
    
    // Tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'services_cta_click', {
        button_text: dictionary.services.cta
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
            {dictionary.services.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {dictionary.services.subtitle}
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* ERP Service */}
          <motion.div
            className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0 }}
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <div className="text-4xl mb-6">🚀</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {dictionary.services.erp.title}
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {dictionary.services.erp.description}
            </p>
          </motion.div>

          {/* Search Service */}
          <motion.div
            className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <div className="text-4xl mb-6">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {dictionary.services.search.title}
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {dictionary.services.search.description}
            </p>
          </motion.div>

          {/* Assistant Service */}
          <motion.div
            className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <div className="text-4xl mb-6">🤖</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {dictionary.services.assistant.title}
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {dictionary.services.assistant.description}
            </p>
          </motion.div>
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
            {dictionary.services.cta}
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

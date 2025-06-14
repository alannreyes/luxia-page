'use client'
import { motion } from 'framer-motion'

export default function CTA() {
  return (
    <section className="py-20 px-6 bg-gray-900">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-light text-white mb-6">
            ¿Listo para transformar tu empresa?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Agenda una consulta gratuita de 30 minutos. Sin compromisos, solo ideas.
          </p>
          <motion.button 
            className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Agendar Ahora →
          </motion.button>
          <p className="text-sm text-gray-400 mt-4">
            También disponible en <a href="#" className="underline">English</a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

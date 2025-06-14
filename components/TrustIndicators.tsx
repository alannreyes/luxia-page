'use client'
import { motion } from 'framer-motion'

const indicators = [
  { value: '70-90%', label: 'Reducción de errores con RAG' },
  { value: '3 idiomas', label: 'Procesamiento multilingüe' },
  { value: '< 2 seg', label: 'Tiempo de respuesta' },
  { value: '100%', label: 'On-premise disponible' },
]

export default function TrustIndicators() {
  return (
    <section className="py-12 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {indicators.map((indicator, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-3xl font-bold gradient-text">{indicator.value}</div>
              <div className="text-sm text-gray-600 mt-1">{indicator.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

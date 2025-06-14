'use client'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-light text-gray-900 leading-tight mb-6">
            Tus datos tienen respuestas.
            <span className="block text-3xl md:text-4xl text-gray-600 mt-4">
              Nosotros las encontramos con IA.
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Transformamos la complejidad de tu empresa en decisiones inteligentes. 
            Desde chatbots que entienden tu ERP hasta búsquedas que predicen lo que necesitas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button 
              className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explorar Soluciones →
            </motion.button>
            <motion.button 
              className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-gray-400 transition text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ver Demo
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

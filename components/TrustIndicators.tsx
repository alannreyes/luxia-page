'use client'
import { motion } from 'framer-motion'
import { siteConfig } from '@/lib/config'

export default function TrustIndicators() {
  return (
    <section className="py-16 bg-gradient-to-r from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Resultados que Respaldan Nuestra Experiencia
          </h2>
          <p className="text-gray-600">
            Métricas reales de nuestras implementaciones de IA empresarial
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {siteConfig.trustIndicators.map((indicator, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 text-center group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="text-2xl md:text-3xl font-bold gradient-text mb-2 group-hover:scale-110 transition-transform">
                {indicator.value}
              </div>
              <div className="text-xs md:text-sm text-gray-600 leading-tight">
                {indicator.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technology partners */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-sm text-gray-500 mb-6">
            Tecnologías que potencian nuestras soluciones
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {siteConfig.technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                className="text-gray-400 font-medium text-sm hover:text-gray-600 transition-colors"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                {tech.name}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

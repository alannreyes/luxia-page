'use client'
import { motion } from 'framer-motion'
import { siteConfig } from '@/lib/config'

export default function Services() {
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
            Cómo potenciamos tu equipo
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Soluciones que multiplican el talento humano
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
              
              {/* Results */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                  Resultados que importan:
                </h4>
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

        {/* Diferencial Humano */}
        <motion.div
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold mb-4">
            {siteConfig.humanDifferential.emphasis}
          </h3>
          <p className="text-xl md:text-2xl font-light leading-relaxed max-w-4xl mx-auto">
            &ldquo;{siteConfig.humanDifferential.quote}&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  )
}

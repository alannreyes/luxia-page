'use client'
import { motion } from 'framer-motion'
import { MessageSquare, Search, Zap } from 'lucide-react'

const services = [
  {
    icon: MessageSquare,
    title: 'Chat Inteligente + ERP',
    description: 'Interactúa con tu ERP en lenguaje natural. Consultas, reportes y acciones mediante conversación.',
    features: [
      'Integración SAP, Oracle, Microsoft',
      'Procesamiento multiidioma',
      'Contexto empresarial completo'
    ]
  },
  {
    icon: Search,
    title: 'Búsqueda Semántica RAG',
    description: 'Encuentra exactamente lo que necesitas. Búsqueda que entiende contexto, no solo palabras clave.',
    features: [
      'Precisión superior al 95%',
      'Fuentes verificables',
      'Escalable a TB de datos'
    ]
  },
  {
    icon: Zap,
    title: 'Automatización n8n + IA',
    description: 'Workflows inteligentes que conectan todas tus herramientas. Decisiones automáticas basadas en IA.',
    features: [
      '+400 integraciones disponibles',
      'Agentes autónomos',
      'ROI medible desde día 1'
    ]
  }
]

export default function Services() {
  return (
    <section id="servicios" className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-4xl font-light text-gray-900 text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Soluciones que escalan con tu negocio
        </motion.h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-xl hover-lift"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="text-sm text-gray-500 space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>• {feature}</li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

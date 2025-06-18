'use client'
import { motion } from 'framer-motion'

const cases = [
  {
    industry: 'Fintech',
    title: 'Sistema de Resúmenes Inteligentes',
    description: 'Integración con ERP para generar resúmenes automáticos de documentos en 2 idiomas y 3 formatos distintos. Imposible sin IA.',
    impact: 'Menos tiempo de procesamiento',
    tags: ['ERP Integration', 'Webhooks', 'OpenAI','API','N8N']
  },
  {
    industry: 'Empresa Comercial',
    title: 'Búsqueda Semántica de Alta Precisión',
    description: 'Motor de búsqueda que comprende intención y contexto para recuperación de información de catálogo de productos. Imposible sin IA.',
    impact: 'Precisión en búsquedas y menor tiempo de procesamiento',
    tags: ['Embedding', 'Vector Search', 'OpenAI']
  }
]



export default function Proof() {
  return (
    <section id="casos" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-light text-gray-900 mb-4">
            Casos reales, resultados medibles
          </h2>
          <p className="text-xl text-gray-600">
            Lo que antes era imposible, ahora en producción
          </p>
        </motion.div>


        
        {/* Casos de estudio */}
        <div className="grid md:grid-cols-2 gap-12">
          {cases.map((case_, index) => (
            <motion.div
              key={index}
              className="border-l-4 border-blue-600 pl-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="text-sm text-gray-500 uppercase tracking-wide mb-2">
                {case_.industry}
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                {case_.title}
              </h3>
              <p className="text-gray-600 mb-3">
                {case_.description}
              </p>
              <div className="text-lg font-semibold text-blue-600 mb-4">
                {case_.impact}
              </div>
              <div className="flex gap-4 text-sm">
                {case_.tags.map((tag, idx) => (
                  <span key={idx} className="bg-gray-100 px-3 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 
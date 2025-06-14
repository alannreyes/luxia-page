'use client'
import { motion } from 'framer-motion'

const articles = [
  {
    category: 'Guía Técnica',
    title: 'Implementando RAG en Producción: Mejores Prácticas',
    excerpt: 'Cómo escalar sistemas RAG empresariales manteniendo precisión y velocidad...',
    gradient: 'from-blue-600 to-blue-800'
  },
  {
    category: 'Caso de Uso',
    title: 'n8n + LLMs: Automatización Inteligente para Fintech',
    excerpt: 'Workflow completo para detección de fraude y análisis predictivo...',
    gradient: 'from-purple-600 to-purple-800'
  },
  {
    category: 'Tendencias 2025',
    title: 'El Futuro de los Agentes de IA en Empresas',
    excerpt: 'Por qué 2025 será el año de la adopción masiva de agentes autónomos...',
    gradient: 'from-green-600 to-green-800'
  }
]

export default function Insights() {
  return (
    <section id="insights" className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-4xl font-light text-gray-900 text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Insights y conocimiento
        </motion.h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.article
              key={index}
              className="hover-lift cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-white rounded-xl overflow-hidden">
                <div className={`h-48 bg-gradient-to-br ${article.gradient}`}></div>
                <div className="p-6">
                  <div className="text-sm text-blue-600 mb-2">{article.category}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {article.excerpt}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

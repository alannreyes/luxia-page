'use client'
import { motion } from 'framer-motion'
import type { BaseComponentProps } from '@/types'

export default function Insights({ dictionary }: BaseComponentProps) {
  return (
    <section id="insights" className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-light text-gray-900 mb-4">
            {dictionary.insights.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {dictionary.insights.subtitle}
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {dictionary.insights.articles.map((article: { category: string; title: string; excerpt: string; readTime: string }, index: number) => {
            const gradients = [
              'from-blue-600 to-blue-800',
              'from-purple-600 to-purple-800',
              'from-green-600 to-green-800'
            ]
            
            return (
              <motion.article
                key={index}
                className="hover-lift cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className={`h-48 bg-gradient-to-br ${gradients[index]}`}></div>
                  <div className="p-6">
                    <div className="text-sm text-blue-600 mb-2">{article.category}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {article.excerpt}
                    </p>
                    <div className="text-xs text-gray-500">
                      {article.readTime}
                    </div>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

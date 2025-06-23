'use client'
import { motion } from 'framer-motion'
import type { BaseComponentProps } from '@/types'

export default function Proof({ dictionary }: BaseComponentProps) {
  return (
    <section id="casos" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
            {dictionary.cases.title}
            <span className="block text-blue-600 mt-2">
              {dictionary.cases.subtitle}
            </span>
          </h2>
        </motion.div>


        
        {/* Casos de estudio */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Fintech Case */}
          <motion.div
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0 }}
          >
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">
              {dictionary.cases.fintech.industry}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight">
              {dictionary.cases.fintech.challenge}
            </h3>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              {dictionary.cases.fintech.solution}
            </p>
            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
              {dictionary.cases.fintech.badge}
            </span>
          </motion.div>

          {/* Healthcare Case */}
          <motion.div
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">
              {dictionary.cases.healthcare.industry}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight">
              {dictionary.cases.healthcare.challenge}
            </h3>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              {dictionary.cases.healthcare.solution}
            </p>
            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
              {dictionary.cases.healthcare.badge}
            </span>
          </motion.div>

          {/* E-commerce Case */}
          <motion.div
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">
              {dictionary.cases.ecommerce.industry}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight">
              {dictionary.cases.ecommerce.challenge}
            </h3>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              {dictionary.cases.ecommerce.solution}
            </p>
            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
              {dictionary.cases.ecommerce.badge}
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 
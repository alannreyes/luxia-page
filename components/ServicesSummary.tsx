'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FileSearch, MapPin, Bell, ArrowRight } from 'lucide-react'
import type { BaseComponentProps } from '@/types'

const icons = [FileSearch, MapPin, Bell]

export default function ServicesSummary({ locale, dictionary }: BaseComponentProps) {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
            {dictionary.servicesSummary.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {dictionary.servicesSummary.subtitle}
          </p>
        </motion.div>

        {/* 3 Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {dictionary.servicesSummary.items.map((item: { title: string; description: string }, index: number) => {
            const Icon = icons[index]
            return (
              <motion.div
                key={index}
                className="bg-slate-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* CTA Link */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            href={`/${locale}/services`}
            className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors"
          >
            {dictionary.servicesSummary.cta}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

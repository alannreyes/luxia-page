'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FileSearch, Wind, Bell, ArrowRight } from 'lucide-react'
import type { BaseComponentProps } from '@/types'

const icons = [FileSearch, Wind, Bell]

export default function ServicesSummary({ locale, dictionary }: BaseComponentProps) {
  const isSpanish = locale === 'es'

  return (
    <section className="py-20 md:py-28 px-5 sm:px-8" style={{ backgroundColor: 'var(--ed-paper)' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-12 md:mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <p className="font-data text-xs tracking-[0.2em] uppercase mb-3" style={{ color: 'var(--ed-accent)' }}>
            {isSpanish ? 'Capacidades' : 'Capabilities'}
          </p>
          <h2 className="font-editorial text-3xl md:text-5xl font-bold tracking-[-0.02em] mb-4 max-w-[18ch]" style={{ color: 'var(--ed-ink)' }}>
            {dictionary.servicesSummary.title}
          </h2>
          <p className="text-lg max-w-2xl" style={{ color: 'var(--ed-gray)' }}>
            {dictionary.servicesSummary.subtitle}
          </p>
        </motion.div>

        {/* 3 Cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-12">
          {dictionary.servicesSummary.items.map((item: { title: string; description: string }, index: number) => {
            const Icon = icons[index]
            return (
              <motion.div
                key={index}
                className="group relative rounded-2xl p-6 md:p-7 bg-white hover:-translate-y-1 transition-all duration-300"
                style={{ border: '1px solid var(--ed-line)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: 'rgba(37,64,255,0.08)' }}
                >
                  <Icon className="w-5 h-5" style={{ color: 'var(--ed-accent)' }} />
                </div>
                <h3 className="font-editorial text-xl font-bold tracking-[-0.01em] mb-2" style={{ color: 'var(--ed-ink)' }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--ed-gray)' }}>
                  {item.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* CTA Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            href={`/${locale}/services`}
            className="inline-flex items-center gap-2 font-medium transition-all hover:gap-3"
            style={{ color: 'var(--ed-accent)' }}
          >
            {dictionary.servicesSummary.cta}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

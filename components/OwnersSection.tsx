'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { BaseComponentProps } from '@/types'

interface Row { wound: string; answer: string }

export default function OwnersSection({ locale, dictionary }: BaseComponentProps) {
  const { eyebrow, title, subtitle, rows, closer, cta } = dictionary.ownersSection

  return (
    <section
      className="py-20 md:py-28 px-5 sm:px-8"
      style={{ backgroundColor: 'var(--ed-paper-2)', borderTop: '1px solid var(--ed-line)' }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-14 md:mb-16 max-w-3xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <p className="font-data text-xs tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--ed-accent)' }}>
            {eyebrow}
          </p>
          <h2 className="font-editorial font-bold text-3xl md:text-5xl tracking-[-0.02em] leading-[1.05] mb-5" style={{ color: 'var(--ed-ink)' }}>
            {title}
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: 'var(--ed-gray)' }}>{subtitle}</p>
        </motion.div>

        {/* Confesión → respuesta */}
        <div>
          {rows.map((row: Row, i: number) => (
            <motion.div
              key={i}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 md:py-9"
              style={{ borderTop: '1px solid var(--ed-line)' }}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="md:col-span-5">
                <p className="font-editorial text-xl md:text-2xl italic leading-snug" style={{ color: 'var(--ed-gray)' }}>
                  {row.wound}
                </p>
              </div>
              <div className="md:col-span-7 flex items-start gap-3">
                <span className="mt-2.5 h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: 'var(--ed-accent)' }} />
                <p className="text-base md:text-lg leading-relaxed font-medium" style={{ color: 'var(--ed-ink)' }}>
                  {row.answer}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cierre · conversación de encaje */}
        <motion.div
          className="mt-12 md:mt-14 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8 pt-10"
          style={{ borderTop: '1px solid var(--ed-line)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-base md:text-lg leading-relaxed max-w-xl" style={{ color: 'var(--ed-ink)' }}>{closer}</p>
          <Link
            href={`/${locale}#contacto`}
            className="inline-flex items-center gap-2 min-h-[52px] px-8 rounded-full font-medium text-white transition-transform hover:-translate-y-0.5 whitespace-nowrap self-start sm:self-auto sm:ml-auto"
            style={{ backgroundColor: 'var(--ed-ink)' }}
          >
            {cta}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

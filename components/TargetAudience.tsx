'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { BaseComponentProps } from '@/types'

export default function TargetAudience({ locale, dictionary }: BaseComponentProps) {
  const { eyebrow, title, doorA, doorB } = dictionary.targetAudience

  return (
    <section
      className="py-20 md:py-28 px-5 sm:px-8"
      style={{ backgroundColor: 'var(--ed-paper-2)', borderTop: '1px solid var(--ed-line)' }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-12 md:mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <p className="font-data text-xs tracking-[0.2em] uppercase mb-3" style={{ color: 'var(--ed-accent)' }}>
            {eyebrow}
          </p>
          <h2 className="font-editorial font-bold text-3xl md:text-5xl tracking-[-0.02em] max-w-[16ch]" style={{ color: 'var(--ed-ink)' }}>
            {title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
          {/* Puerta A — primaria (piloto rápido, el más rentable) */}
          <motion.div
            className="md:col-span-3 relative rounded-2xl p-7 md:p-9 overflow-hidden bg-white"
            style={{ border: '1px solid var(--ed-line)', boxShadow: '0 30px 60px -30px rgba(15,27,45,0.18)' }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <div className="absolute inset-y-0 left-0 w-1" style={{ backgroundColor: 'var(--ed-accent)' }} />
            <span
              className="inline-block font-data text-[10px] tracking-[0.18em] uppercase px-3 py-1 rounded-full mb-4"
              style={{ color: 'var(--ed-accent)', backgroundColor: 'rgba(37,64,255,0.08)' }}
            >
              {doorA.tag}
            </span>
            <h3 className="font-editorial text-2xl md:text-3xl font-bold tracking-[-0.02em] mb-3" style={{ color: 'var(--ed-ink)' }}>
              {doorA.title}
            </h3>
            <p className="leading-relaxed mb-6 max-w-lg" style={{ color: 'var(--ed-gray)' }}>{doorA.description}</p>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3 mb-8">
              {doorA.points.map((p: string, i: number) => (
                <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--ed-ink)' }}>
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: 'var(--ed-accent)' }} />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <Link
              href={`/${locale}#contacto`}
              className="inline-flex items-center gap-2 min-h-[48px] px-6 rounded-full font-medium text-white transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: 'var(--ed-ink)' }}
            >
              {doorA.cta}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Puerta B — secundaria (IA para una tarea) */}
          <motion.div
            className="md:col-span-2 rounded-2xl p-7 md:p-9 flex flex-col bg-white"
            style={{ border: '1px solid var(--ed-line)' }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <h3 className="font-editorial text-xl md:text-2xl font-bold tracking-[-0.02em] mb-3" style={{ color: 'var(--ed-ink)' }}>
              {doorB.title}
            </h3>
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--ed-gray)' }}>{doorB.description}</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {doorB.tasks.map((t: string, i: number) => (
                <span
                  key={i}
                  className="font-data text-xs px-3 py-1.5 rounded-lg"
                  style={{ border: '1px solid var(--ed-line)', color: 'var(--ed-gray)', backgroundColor: 'var(--ed-paper)' }}
                >
                  {t}
                </span>
              ))}
            </div>
            <Link
              href={`/${locale}/services`}
              className="mt-auto inline-flex items-center gap-2 text-sm font-medium transition-all hover:gap-3"
              style={{ color: 'var(--ed-accent)' }}
            >
              {doorB.cta}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { BaseComponentProps } from '@/types'

export default function Hero({ locale, dictionary }: BaseComponentProps) {
  const [ready, setReady] = useState(false)
  const router = useRouter()
  useEffect(() => setReady(true), [])

  const go = (label: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'hero_cta_click', { button_text: label })
    }
  }

  const ease = [0.22, 1, 0.36, 1] as const

  return (
    <section
      className="relative overflow-hidden px-5 sm:px-8 pt-16 pb-20 md:pt-24 md:pb-28"
      style={{ backgroundColor: 'var(--ed-paper)', color: 'var(--ed-ink)' }}
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Eyebrow / índice */}
        <motion.div
          className="flex items-center gap-3 mb-8"
          initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }} transition={{ duration: 0.5 }}
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: 'var(--ed-accent)' }} />
          <span className="font-data text-[11px] sm:text-xs tracking-[0.22em] uppercase" style={{ color: 'var(--ed-gray)' }}>
            {dictionary.hero.badge}
          </span>
        </motion.div>

        {/* Titular editorial sobredimensionado */}
        <motion.h1
          className="font-editorial font-extrabold tracking-[-0.03em] leading-[0.95] text-[2.6rem] sm:text-6xl md:text-[4.7rem] max-w-[15ch]"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}
        >
          {dictionary.hero.mainTitle}{' '}
          <span style={{ color: 'var(--ed-accent)' }}>{dictionary.hero.mainTitleHighlight}</span>
        </motion.h1>

        <motion.p
          className="mt-7 text-lg md:text-xl leading-relaxed max-w-2xl"
          style={{ color: 'var(--ed-gray)' }}
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease }}
        >
          {dictionary.hero.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-9 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2, ease }}
        >
          <button
            onClick={() => { go(dictionary.hero.primaryCTA); router.push(`/${locale}/services`) }}
            className="group inline-flex items-center gap-2 min-h-[52px] px-7 rounded-full text-white font-medium transition-transform hover:-translate-y-0.5"
            style={{ backgroundColor: 'var(--ed-ink)' }}
          >
            {dictionary.hero.primaryCTA}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
          <button
            onClick={() => { go(dictionary.hero.secondaryCTA); document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="inline-flex items-center gap-2 min-h-[52px] font-medium border-b-2 pb-0.5 transition-colors"
            style={{ borderColor: 'var(--ed-ink)', color: 'var(--ed-ink)' }}
          >
            {dictionary.hero.secondaryCTA}
          </button>
        </motion.div>

        {/* Hairline + credenciales como pie editorial */}
        <motion.div
          className="mt-14 md:mt-20 pt-6"
          style={{ borderTop: '1px solid var(--ed-line)' }}
          initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }} transition={{ duration: 0.6, delay: 0.35 }}
        >
          <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
            {dictionary.hero.stats.map((s: { value: string; label: string }, i: number) => (
              <div key={i} className="flex items-baseline gap-2">
                <span className="font-editorial font-bold text-lg" style={{ color: 'var(--ed-ink)' }}>{s.value}</span>
                <span className="font-data text-[10px] tracking-[0.12em] uppercase" style={{ color: 'var(--ed-gray)' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FileSearch, Ruler, BellRing, Search, ArrowRight, ArrowUp } from 'lucide-react'
import type { BaseComponentProps } from '@/types'

const iconMap: Record<string, typeof FileSearch> = {
  FileSearch,
  Ruler,
  BellRing,
  Search,
}

interface GalleryItem {
  id: string
  icon: string
  title: string
  tag: string
  line: string
}

export default function BuiltGallery({ locale, dictionary }: BaseComponentProps) {
  const { eyebrow, title, subtitle, items, live, cta } = dictionary.builtGallery

  return (
    <section
      className="py-20 md:py-28 px-5 sm:px-8"
      style={{ backgroundColor: 'var(--ed-paper)', borderTop: '1px solid var(--ed-line)' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-12 md:mb-14 max-w-2xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <p className="font-data text-xs tracking-[0.2em] uppercase mb-3" style={{ color: 'var(--ed-accent)' }}>
            {eyebrow}
          </p>
          <h2 className="font-editorial font-bold text-3xl md:text-5xl tracking-[-0.02em] mb-4" style={{ color: 'var(--ed-ink)' }}>
            {title}
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: 'var(--ed-gray)' }}>{subtitle}</p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item: GalleryItem, index: number) => {
            const Icon = iconMap[item.icon] ?? FileSearch
            return (
              <motion.div
                key={item.id}
                className="group relative rounded-2xl p-6 md:p-7 bg-white flex flex-col hover:-translate-y-1 transition-transform duration-300"
                style={{ border: '1px solid var(--ed-line)', boxShadow: '0 24px 48px -32px rgba(15,27,45,0.16)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: 'rgba(37,64,255,0.08)' }}
                >
                  <Icon className="w-5 h-5" style={{ color: 'var(--ed-accent)' }} />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-editorial text-xl font-bold tracking-[-0.01em]" style={{ color: 'var(--ed-ink)' }}>
                    {item.title}
                  </h3>
                </div>
                <span
                  className="self-start font-data text-[10px] tracking-[0.16em] uppercase px-2.5 py-1 rounded-full mb-4"
                  style={{ color: 'var(--ed-accent)', backgroundColor: 'rgba(37,64,255,0.08)' }}
                >
                  {item.tag}
                </span>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--ed-gray)' }}>{item.line}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Live note + CTA */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <p className="flex items-center gap-2 text-sm" style={{ color: 'var(--ed-gray)' }}>
            <ArrowUp className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--ed-accent)' }} />
            <span>{live}</span>
          </p>
          <Link
            href={`/${locale}/services`}
            className="inline-flex items-center gap-2 font-medium transition-all hover:gap-3 self-start sm:self-auto"
            style={{ color: 'var(--ed-accent)' }}
          >
            {cta}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

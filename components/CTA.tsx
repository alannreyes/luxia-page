'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle, MapPin } from 'lucide-react'
import { siteConfig } from '@/lib/config'
import type { BaseComponentProps } from '@/types'

export default function CTA({ locale, dictionary }: BaseComponentProps) {
  const isSpanish = locale === 'es'
  const [formState, setFormState] = useState({ name: '', email: '', company: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      })
      if (!response.ok) throw new Error('Error sending message')
      setIsSubmitted(true)
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', siteConfig.tracking.events.contactFormSubmit, { source: 'cta_section' })
      }
    } catch {
      setError(dictionary.cta.form.error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClass = 'w-full px-4 py-3 rounded-lg outline-none transition-all bg-white border border-[var(--ed-line)] focus:border-[#2540FF] focus:ring-2 focus:ring-[#2540FF]/15'

  return (
    <section id="contacto" className="relative py-20 md:py-28 px-5 sm:px-8" style={{ backgroundColor: 'var(--ed-paper)', borderTop: '1px solid var(--ed-line)' }}>
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="font-data text-xs tracking-[0.2em] uppercase mb-3" style={{ color: 'var(--ed-accent)' }}>
            {isSpanish ? 'Hablemos' : "Let's talk"}
          </p>
          <h2 className="font-editorial text-3xl md:text-5xl font-bold tracking-[-0.02em] mb-4 max-w-[16ch]" style={{ color: 'var(--ed-ink)' }}>
            {dictionary.cta.title}
          </h2>
          <p className="text-lg max-w-xl" style={{ color: 'var(--ed-gray)' }}>
            {dictionary.cta.subtitle}
          </p>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl p-8"
          style={{ border: '1px solid var(--ed-line)', boxShadow: '0 30px 60px -30px rgba(15,27,45,0.18)' }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {isSubmitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(37,64,255,0.1)' }}>
                <CheckCircle className="w-8 h-8" style={{ color: 'var(--ed-accent)' }} />
              </div>
              <h3 className="font-editorial text-xl font-bold" style={{ color: 'var(--ed-ink)' }}>
                {dictionary.cta.form.success}
              </h3>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--ed-ink)' }}>{dictionary.cta.form.name} *</label>
                  <input type="text" required value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--ed-ink)' }}>{dictionary.cta.form.email} *</label>
                  <input type="email" required value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })} className={inputClass} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--ed-ink)' }}>{dictionary.cta.form.company}</label>
                <input type="text" value={formState.company} onChange={(e) => setFormState({ ...formState, company: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--ed-ink)' }}>{dictionary.cta.form.message}</label>
                <textarea rows={4} value={formState.message} onChange={(e) => setFormState({ ...formState, message: e.target.value })} className={`${inputClass} resize-none`} />
              </div>
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full min-h-[52px] text-white px-8 rounded-full font-medium hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center disabled:opacity-70"
                style={{ backgroundColor: 'var(--ed-ink)' }}
              >
                {isSubmitting ? dictionary.cta.form.sending : (<><Send className="w-5 h-5 mr-2" />{dictionary.cta.form.submit}</>)}
              </button>
            </form>
          )}
        </motion.div>

        <div className="mt-8 flex justify-center">
          <span className="flex items-center font-data text-xs tracking-wide" style={{ color: 'var(--ed-gray)' }}>
            <MapPin className="w-4 h-4 mr-2" />
            Lima, Perú · EE. UU.
          </span>
        </div>
      </div>
    </section>
  )
}

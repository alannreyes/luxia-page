'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Calendar, CheckCircle } from 'lucide-react'
import AppointmentModal from './AppointmentModal'
import { siteConfig } from '@/lib/config'
import type { BaseComponentProps } from '@/types'

export default function CTA({ locale, dictionary }: BaseComponentProps) {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false)
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleAppointmentClick = () => {
    setIsAppointmentModalOpen(true)

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', siteConfig.tracking.events.heroCtaClick, {
        button_text: 'CTA Final',
        source: 'bottom_cta'
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1500))
      setIsSubmitted(true)

      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'contact_form_submit', {
          source: 'cta_section'
        })
      }
    } catch {
      setError(dictionary.cta.form.error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <section id="contacto" className="py-24 px-6 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              {dictionary.cta.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {dictionary.cta.subtitle}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <motion.div
              className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {dictionary.cta.form.success}
                  </h3>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {dictionary.cta.form.name}
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {dictionary.cta.form.email}
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {dictionary.cta.form.company}
                    </label>
                    <input
                      type="text"
                      value={formState.company}
                      onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {dictionary.cta.form.message}
                    </label>
                    <textarea
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none"
                    />
                  </div>

                  {error && (
                    <p className="text-red-600 text-sm">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl flex items-center justify-center disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      dictionary.cta.form.sending
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        {dictionary.cta.form.submit}
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Schedule Call Card */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-2xl p-8 text-white relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />

                <div className="relative z-10">
                  <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6">
                    <Calendar className="w-7 h-7 text-blue-300" />
                  </div>

                  <h3 className="text-2xl font-bold mb-4">
                    {locale === 'es' ? 'Agenda una llamada' : 'Schedule a call'}
                  </h3>

                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {locale === 'es'
                      ? 'Conversemos 30 minutos sobre tu proyecto. Sin compromisos, solo ideas concretas para tu negocio.'
                      : 'Let\'s chat 30 minutes about your project. No commitments, just concrete ideas for your business.'}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {[
                      locale === 'es' ? 'Consulta 100% gratuita' : '100% free consultation',
                      locale === 'es' ? 'Respuesta en 24 horas' : '24-hour response',
                      locale === 'es' ? 'Sin compromisos' : 'No commitments'
                    ].map((item, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    onClick={handleAppointmentClick}
                    className="w-full bg-white text-slate-900 px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 font-semibold shadow-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {dictionary.cta.primary}
                  </motion.button>
                </div>
              </div>

              {/* Trust indicator */}
              <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2" />
                  {locale === 'es' ? 'Disponible esta semana' : 'Available this week'}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
      />
    </>
  )
}

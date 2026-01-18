'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, CheckCircle, Loader2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import type { Locale } from '@/middleware'

interface AppointmentModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AppointmentModal({ isOpen, onClose }: AppointmentModalProps) {
  const params = useParams()
  const locale = (params?.locale as Locale) || 'es'
  const isSpanish = locale === 'es'

  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    industry: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: ''
  })

  const industries = isSpanish
    ? ['Seguros', 'Fintech', 'Retail', 'Industrial', 'Logística', 'Salud', 'Otra']
    : ['Insurance', 'Fintech', 'Retail', 'Industrial', 'Logistics', 'Healthcare', 'Other']

  const projectTypes = isSpanish
    ? ['Búsqueda con IA', 'Chatbot / Asistente', 'Automatización', 'App Móvil', 'Consultoría', 'Otro']
    : ['AI Search', 'Chatbot / Assistant', 'Automation', 'Mobile App', 'Consulting', 'Other']

  const budgets = isSpanish
    ? ['< $5,000', '$5,000 - $15,000', '$15,000 - $50,000', '> $50,000', 'Por definir']
    : ['< $5,000', '$5,000 - $15,000', '$15,000 - $50,000', '> $50,000', 'To be defined']

  const timelines = isSpanish
    ? ['Urgente (< 1 mes)', '1-3 meses', '3-6 meses', 'Flexible']
    : ['Urgent (< 1 month)', '1-3 months', '3-6 months', 'Flexible']

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Error sending message')
      }

      setIsSubmitted(true)

      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'consultation_request', {
          industry: formData.industry,
          project_type: formData.projectType,
          budget: formData.budget
        })
      }
    } catch {
      setError(isSpanish ? 'Error al enviar. Intenta de nuevo.' : 'Error sending. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    onClose()
    // Reset after animation
    setTimeout(() => {
      setStep(1)
      setIsSubmitted(false)
      setError('')
      setFormData({
        name: '',
        email: '',
        company: '',
        industry: '',
        projectType: '',
        budget: '',
        timeline: '',
        message: ''
      })
    }, 300)
  }

  const canProceedStep1 = formData.name && formData.email
  const canProceedStep2 = formData.industry && formData.projectType

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 rounded-t-2xl flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {isSpanish ? 'Solicitar Consulta' : 'Request Consultation'}
                </h3>
                {!isSubmitted && (
                  <p className="text-sm text-gray-500">
                    {isSpanish ? `Paso ${step} de 3` : `Step ${step} of 3`}
                  </p>
                )}
              </div>
              <button
                onClick={handleClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition"
                aria-label={isSpanish ? 'Cerrar' : 'Close'}
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              {isSubmitted ? (
                /* Success State */
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    {isSpanish ? '¡Mensaje enviado!' : 'Message sent!'}
                  </h4>
                  <p className="text-gray-600 mb-6">
                    {isSpanish
                      ? 'Te responderé en menos de 24 horas.'
                      : "I'll respond within 24 hours."}
                  </p>
                  <button
                    onClick={handleClose}
                    className="px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition"
                  >
                    {isSpanish ? 'Cerrar' : 'Close'}
                  </button>
                </div>
              ) : (
                <>
                  {/* Step 1: Contact Info */}
                  {step === 1 && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          {isSpanish ? 'Nombre *' : 'Name *'}
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
                          placeholder={isSpanish ? 'Tu nombre' : 'Your name'}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          {isSpanish ? 'Email *' : 'Email *'}
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
                          placeholder={isSpanish ? 'tu@email.com' : 'you@email.com'}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          {isSpanish ? 'Empresa' : 'Company'}
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
                          placeholder={isSpanish ? 'Nombre de tu empresa' : 'Company name'}
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 2: Project Info */}
                  {step === 2 && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {isSpanish ? 'Industria *' : 'Industry *'}
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {industries.map((industry) => (
                            <button
                              key={industry}
                              type="button"
                              onClick={() => setFormData({ ...formData, industry })}
                              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                                formData.industry === industry
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {industry}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {isSpanish ? 'Tipo de proyecto *' : 'Project type *'}
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {projectTypes.map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setFormData({ ...formData, projectType: type })}
                              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                                formData.projectType === type
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Budget & Timeline */}
                  {step === 3 && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {isSpanish ? 'Presupuesto estimado' : 'Estimated budget'}
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {budgets.map((budget) => (
                            <button
                              key={budget}
                              type="button"
                              onClick={() => setFormData({ ...formData, budget })}
                              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                                formData.budget === budget
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {budget}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {isSpanish ? 'Timeline' : 'Timeline'}
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {timelines.map((timeline) => (
                            <button
                              key={timeline}
                              type="button"
                              onClick={() => setFormData({ ...formData, timeline })}
                              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                                formData.timeline === timeline
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {timeline}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          {isSpanish ? 'Cuéntame más (opcional)' : 'Tell me more (optional)'}
                        </label>
                        <textarea
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          rows={3}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition resize-none"
                          placeholder={isSpanish ? '¿Qué problema quieres resolver?' : 'What problem do you want to solve?'}
                        />
                      </div>
                    </div>
                  )}

                  {error && (
                    <p className="mt-4 text-red-600 text-sm text-center">{error}</p>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex gap-3 mt-6">
                    {step > 1 && (
                      <button
                        type="button"
                        onClick={() => setStep(step - 1)}
                        className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
                      >
                        {isSpanish ? 'Atrás' : 'Back'}
                      </button>
                    )}
                    {step < 3 ? (
                      <button
                        type="button"
                        onClick={() => setStep(step + 1)}
                        disabled={step === 1 ? !canProceedStep1 : !canProceedStep2}
                        className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSpanish ? 'Siguiente' : 'Next'}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-70 flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            {isSpanish ? 'Enviando...' : 'Sending...'}
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            {isSpanish ? 'Enviar solicitud' : 'Send request'}
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

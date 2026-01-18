'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle, Loader2, Calendar, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function CalRedirectPage() {
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

  const industries = ['Seguros', 'Fintech', 'Retail', 'Industrial', 'Logística', 'Salud', 'Otra']
  const projectTypes = ['Búsqueda con IA', 'Chatbot / Asistente', 'Automatización', 'App Móvil', 'Consultoría', 'Otro']
  const budgets = ['< $5,000', '$5,000 - $15,000', '$15,000 - $50,000', '> $50,000', 'Por definir']
  const timelines = ['Urgente (< 1 mes)', '1-3 meses', '3-6 meses', 'Flexible']

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
          source: 'cal_redirect',
          industry: formData.industry,
          project_type: formData.projectType,
        })
      }
    } catch {
      setError('Error al enviar. Intenta de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const canProceedStep1 = formData.name && formData.email
  const canProceedStep2 = formData.industry && formData.projectType

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        {/* Header Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-t-2xl p-6 text-center border-b border-white/10">
          <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-blue-300" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Solicitar Consulta Gratuita
          </h1>
          <p className="text-blue-200 text-sm">
            Cuéntame sobre tu proyecto y te respondo en menos de 24 horas
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-b-2xl shadow-2xl">
          {/* Progress indicator */}
          {!isSubmitted && (
            <div className="px-6 pt-4">
              <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                <span>Paso {step} de 3</span>
                <span>{Math.round((step / 3) * 100)}%</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-blue-600 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${(step / 3) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          )}

          <div className="p-6">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  ¡Mensaje enviado!
                </h2>
                <p className="text-gray-600 mb-8">
                  Te responderé en menos de 24 horas con ideas concretas para tu proyecto.
                </p>
                <Link
                  href="/es"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Ir al inicio
                </Link>
              </motion.div>
            ) : (
              <>
                {/* Step 1: Contact Info */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Nombre *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
                        placeholder="Tu nombre"
                        autoFocus
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
                        placeholder="tu@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Empresa <span className="text-gray-400">(opcional)</span>
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
                        placeholder="Nombre de tu empresa"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Project Info */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-5"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ¿En qué industria estás? *
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
                        ¿Qué tipo de proyecto necesitas? *
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
                  </motion.div>
                )}

                {/* Step 3: Budget & Timeline */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-5"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Presupuesto estimado
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
                        ¿Para cuándo lo necesitas?
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
                        Cuéntame más <span className="text-gray-400">(opcional)</span>
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition resize-none"
                        placeholder="¿Qué problema quieres resolver con IA?"
                      />
                    </div>
                  </motion.div>
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
                      className="flex-1 px-6 py-3.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
                    >
                      Atrás
                    </button>
                  )}
                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={() => setStep(step + 1)}
                      disabled={step === 1 ? !canProceedStep1 : !canProceedStep2}
                      className="flex-1 px-6 py-3.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Siguiente
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="flex-1 px-6 py-3.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-70 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Enviar solicitud
                        </>
                      )}
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <Link
            href="/es"
            className="text-blue-200 hover:text-white text-sm transition inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a luxia.us
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

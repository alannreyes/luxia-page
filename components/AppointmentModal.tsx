'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, Clock, User, Building, MessageSquare } from 'lucide-react'
import { siteConfig } from '@/lib/config'

interface AppointmentModalProps {
  isOpen: boolean
  onClose: () => void
}

interface FormData {
  fullName: string
  email: string
  company: string
  companySize: string
  problem: string
  budget: string
  selectedDate: string
  selectedTime: string
}

export default function AppointmentModal({ isOpen, onClose }: AppointmentModalProps) {
  const [step, setStep] = useState(1) // 1: Info, 2: Date/Time, 3: Confirmation
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    company: '',
    companySize: '',
    problem: '',
    budget: '',
    selectedDate: '',
    selectedTime: ''
  })
  const [availableDates, setAvailableDates] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Generar fechas disponibles (próximos 14 días laborales)
  useEffect(() => {
    const dates: string[] = []
    const today = new Date()
    let currentDate = new Date(today)
    
    while (dates.length < 14) {
      currentDate.setDate(currentDate.getDate() + 1)
      const dayOfWeek = currentDate.getDay()
      
      if (siteConfig.appointment.workingDays.includes(dayOfWeek)) {
        dates.push(currentDate.toISOString().split('T')[0])
      }
    }
    
    setAvailableDates(dates)
  }, [])

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    // Simular envío de email
    try {
      const emailData = {
        to: siteConfig.contact.email,
        subject: `Nueva Cita Agendada - ${formData.company}`,
        body: `
          Nueva consulta agendada:
          
          Nombre: ${formData.fullName}
          Email: ${formData.email}
          Empresa: ${formData.company}
          Tamaño: ${formData.companySize}
          Fecha: ${formData.selectedDate}
          Hora: ${formData.selectedTime}
          
          Problema/Necesidad:
          ${formData.problem}
          
          Presupuesto: ${formData.budget || 'No especificado'}
        `
      }
      
      // Aquí integrarías con tu servicio de email preferido
      console.log('Enviando cita:', emailData)
      
      // Tracking
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', siteConfig.tracking.events.appointmentBooked, {
          company: formData.company,
          company_size: formData.companySize
        })
      }
      
      setStep(3)
    } catch (error) {
      console.error('Error al agendar cita:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
          Agenda tu Consulta Gratuita
        </h3>
        <p className="text-gray-600">
          30 minutos para explorar cómo la IA puede transformar tu empresa
        </p>
      </div>

      <div className="space-y-4">
        {siteConfig.appointment.formFields.map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            
            {field.type === 'select' ? (
              <select
                value={formData[field.name as keyof FormData]}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required={field.required}
              >
                <option value="">Seleccionar...</option>
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : field.type === 'textarea' ? (
              <textarea
                value={formData[field.name as keyof FormData]}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                required={field.required}
              />
            ) : (
              <input
                type={field.type}
                value={formData[field.name as keyof FormData]}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required={field.required}
              />
            )}
          </div>
        ))}
      </div>

      <button
        onClick={() => setStep(2)}
        disabled={!formData.fullName || !formData.email || !formData.company || !formData.companySize || !formData.problem}
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
      >
        Continuar → Seleccionar Fecha
      </button>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
          Selecciona Fecha y Hora
        </h3>
        <p className="text-gray-600">
          Todas las horas están en zona horaria de México (GMT-6)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Fechas */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3 flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            Fecha Disponible
          </h4>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {availableDates.map((date) => (
              <button
                key={date}
                onClick={() => handleInputChange('selectedDate', date)}
                className={`w-full text-left px-4 py-3 rounded-lg border transition ${
                  formData.selectedDate === date
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {formatDate(date)}
              </button>
            ))}
          </div>
        </div>

        {/* Horarios */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3 flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            Hora Disponible
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {siteConfig.appointment.timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => handleInputChange('selectedTime', time)}
                disabled={!formData.selectedDate}
                className={`px-3 py-2 rounded-lg border text-sm transition ${
                  formData.selectedTime === time
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300 disabled:bg-gray-50 disabled:text-gray-400'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => setStep(1)}
          className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:border-gray-400 transition"
        >
          ← Volver
        </button>
        <button
          onClick={handleSubmit}
          disabled={!formData.selectedDate || !formData.selectedTime || isSubmitting}
          className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
        >
          {isSubmitting ? 'Agendando...' : 'Confirmar Cita'}
        </button>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="text-center space-y-6">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      <div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
          ¡Cita Confirmada!
        </h3>
        <p className="text-gray-600 mb-4">
          Hemos enviado los detalles a tu email y a nuestro equipo.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-4 text-left">
          <h4 className="font-medium text-gray-900 mb-2">Detalles de tu cita:</h4>
          <div className="space-y-1 text-sm text-gray-600">
            <p><strong>Fecha:</strong> {formatDate(formData.selectedDate)}</p>
            <p><strong>Hora:</strong> {formData.selectedTime} (GMT-6)</p>
            <p><strong>Duración:</strong> 30 minutos</p>
            <p><strong>Contacto:</strong> {siteConfig.contact.email}</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm text-gray-500">
          Te enviaremos el enlace de la videollamada 24 horas antes de la cita.
        </p>
        <button
          onClick={onClose}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition"
        >
          Perfecto, ¡Nos vemos pronto!
        </button>
      </div>
    </div>
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${step >= 1 ? 'bg-blue-600' : 'bg-gray-300'}`} />
                <div className={`w-2 h-2 rounded-full ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`} />
                <div className={`w-2 h-2 rounded-full ${step >= 3 ? 'bg-blue-600' : 'bg-gray-300'}`} />
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              {step === 1 && renderStep1()}
              {step === 2 && renderStep2()}
              {step === 3 && renderStep3()}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
} 
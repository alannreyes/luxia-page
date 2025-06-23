'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, ArrowRight } from 'lucide-react'
import { siteConfig } from '@/lib/config'
import { useParams } from 'next/navigation'
import { getDictionary } from '@/lib/i18n/dictionaries'
import type { Locale } from '@/middleware'

interface AppointmentModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AppointmentModal({ isOpen, onClose }: AppointmentModalProps) {
  const params = useParams()
  const locale = (params?.locale as Locale) || 'es'
  const dictionary = getDictionary(locale)
  
  const handleScheduleClick = () => {
    // Tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', siteConfig.tracking.events.appointmentBooked, {
        method: 'Cal.com'
      })
    }
    window.open(siteConfig.contact.calcomUrl, '_blank')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="relative w-full max-w-lg p-8 bg-white rounded-2xl shadow-xl m-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
              aria-label={locale === 'es' ? 'Cerrar modal' : 'Close modal'}
            >
              <X size={24} />
            </button>

            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-6">
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                {locale === 'es' ? 'Agenda tu Consulta Gratuita' : 'Schedule Your Free Consultation'}
              </h3>

              <p className="text-gray-600 mb-8 max-w-sm mx-auto">
                {locale === 'es' 
                  ? 'Selecciona un horario directamente en nuestro calendario. Es la forma más rápida y fácil de asegurar tu espacio.'
                  : 'Select a time directly on our calendar. It\'s the fastest and easiest way to secure your spot.'
                }
              </p>

              <motion.button
                onClick={handleScheduleClick}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{locale === 'es' ? 'Ir a Calendario' : 'Go to Calendar'}</span>
                <ArrowRight size={20} />
              </motion.button>
              
              <div className="mt-6 text-sm text-gray-500">
                <p>{locale === 'es' 
                  ? 'Serás redirigido a Cal.com, nuestro socio de confianza para agendamiento.'
                  : 'You will be redirected to Cal.com, our trusted scheduling partner.'
                }</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 
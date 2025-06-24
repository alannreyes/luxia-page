'use client'
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Globe, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { LOCALE_LABELS, trackLanguageEvent } from '@/lib/i18n'
import type { Locale } from '@/middleware'

interface LanguageSelectorProps {
  currentLocale: Locale
  className?: string
}

export default function LanguageSelector({ currentLocale, className = '' }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Cerrar dropdown cuando se hace click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('[data-language-selector]')) {
        setIsOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const handleLanguageChange = (newLocale: Locale) => {
    // Guardar preferencia en cookie
    document.cookie = `preferred-locale=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}` // 1 año

    // Construir nueva URL
    const currentPathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/'
    const newPath = `/${newLocale}${currentPathWithoutLocale === '/' ? '' : currentPathWithoutLocale}`

    // Debug log
    console.log('🌐 Language change:', {
      current: currentLocale,
      new: newLocale,
      pathname,
      currentPathWithoutLocale,
      newPath
    })

    // Track cambio de idioma
    trackLanguageEvent(newLocale, 'manual')

    // Navegar con router primero, luego recarga si es necesario
    router.push(newPath)
    
    // Forzar recarga después de un pequeño delay para asegurar el cambio
    setTimeout(() => {
      if (window.location.pathname !== newPath) {
        window.location.href = newPath
      }
    }, 100)
    setIsOpen(false)
  }

  const currentLanguage = LOCALE_LABELS[currentLocale]

  return (
    <div className={`relative ${className}`} data-language-selector>
      {/* Botón principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-50"
        aria-label="Seleccionar idioma"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{currentLanguage.name}</span>
        <span className="sm:hidden">{currentLanguage.flag}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-3 h-3"
        >
          <svg viewBox="0 0 12 12" fill="currentColor">
            <path d="M3 5l3 3 3-3H3z" />
          </svg>
        </motion.div>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
            role="menu"
          >
            {Object.entries(LOCALE_LABELS).map(([locale, label]) => (
              <button
                key={locale}
                onClick={() => handleLanguageChange(locale as Locale)}
                className={`w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                  locale === currentLocale 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700'
                }`}
                role="menuitem"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{label.flag}</span>
                  <div className="text-left">
                    <div className="font-medium">{label.name}</div>
                    <div className="text-xs text-gray-500">{label.nativeName}</div>
                  </div>
                </div>
                {locale === currentLocale && (
                  <Check className="w-4 h-4 text-blue-600" />
                )}
              </button>
            ))}
            
            {/* Detección automática */}
            <div className="border-t border-gray-100 mt-2 pt-2">
              <div className="px-4 py-2 text-xs text-gray-500">
                💡 El idioma se detecta automáticamente según tu navegador
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Hook para usar en otros componentes
export function useLanguageDetection() {
  const [detectedLanguage, setDetectedLanguage] = useState<Locale | null>(null)

  useEffect(() => {
    // Detectar idioma del navegador
    const browserLanguage = navigator.language.toLowerCase()
    const detected = browserLanguage.startsWith('en') ? 'en' : 'es'
    setDetectedLanguage(detected)
  }, [])

  return detectedLanguage
}
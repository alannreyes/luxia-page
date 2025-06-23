'use client'
import { useEffect } from 'react'
import { initializeAnalytics, initializeAdvancedTracking, usePageTracking } from '@/lib/analytics'
import type { Locale } from '@/middleware'

interface AnalyticsProviderProps {
  children: React.ReactNode
  locale?: Locale
}

export default function AnalyticsProvider({ children, locale = 'es' }: AnalyticsProviderProps) {
  useEffect(() => {
    // Inicializar Google Analytics
    initializeAnalytics()
    
    // Track idioma de la página
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_language', {
        event_category: 'internationalization',
        event_label: locale,
        page_language: locale
      })
    }
    
    // Inicializar tracking avanzado (scroll, secciones, engagement, etc.)
    const cleanupAdvanced = initializeAdvancedTracking()
    
    // Inicializar tracking de tiempo en página
    const cleanupPageTracking = usePageTracking()
    
    // Cleanup
    return () => {
      if (cleanupAdvanced) cleanupAdvanced()
      if (cleanupPageTracking) cleanupPageTracking()
    }
  }, [locale])

  return <>{children}</>
} 
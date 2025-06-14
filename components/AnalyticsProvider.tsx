'use client'
import { useEffect } from 'react'
import { initializeAnalytics, initializeScrollTracking, usePageTracking } from '@/lib/analytics'

interface AnalyticsProviderProps {
  children: React.ReactNode
}

export default function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  useEffect(() => {
    // Inicializar Google Analytics
    initializeAnalytics()
    
    // Inicializar tracking de scroll
    const cleanupScroll = initializeScrollTracking()
    
    // Inicializar tracking de tiempo en página
    const cleanupPageTracking = usePageTracking()
    
    // Cleanup
    return () => {
      if (cleanupScroll) cleanupScroll()
      if (cleanupPageTracking) cleanupPageTracking()
    }
  }, [])

  return <>{children}</>
} 
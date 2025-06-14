import { siteConfig } from './config'

// Tipos para eventos de tracking
export interface TrackingEvent {
  action: string
  category?: string
  label?: string
  value?: number
  [key: string]: any
}

// Función para enviar eventos a Google Analytics
export const trackEvent = (event: TrackingEvent) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', event.action, {
      event_category: event.category || 'engagement',
      event_label: event.label,
      value: event.value,
      ...event
    })
  }
  
  // También log en desarrollo
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Analytics Event:', event)
  }
}

// Eventos predefinidos para facilitar el uso
export const analytics = {
  // Hero section
  heroCtaClick: (buttonText: string, source?: string) => {
    trackEvent({
      action: siteConfig.tracking.events.heroCtaClick,
      category: 'cta',
      label: buttonText,
      source
    })
  },

  // Citas
  appointmentStarted: (source?: string) => {
    trackEvent({
      action: 'appointment_started',
      category: 'conversion',
      label: source
    })
  },

  appointmentCompleted: (companySize: string, source?: string) => {
    trackEvent({
      action: siteConfig.tracking.events.appointmentBooked,
      category: 'conversion',
      label: source,
      company_size: companySize
    })
  },

  // Demos
  demoViewed: (demoName: string) => {
    trackEvent({
      action: siteConfig.tracking.events.demoViewed,
      category: 'engagement',
      label: demoName
    })
  },

  demoInteraction: (demoName: string, interactionType: string) => {
    trackEvent({
      action: 'demo_interaction',
      category: 'engagement',
      label: `${demoName}_${interactionType}`
    })
  },

  // Navegación
  sectionView: (sectionName: string) => {
    trackEvent({
      action: 'section_view',
      category: 'navigation',
      label: sectionName
    })
  },

  // Contacto
  contactFormSubmit: (source?: string) => {
    trackEvent({
      action: siteConfig.tracking.events.contactFormSubmit,
      category: 'conversion',
      label: source
    })
  },

  // Engagement
  timeOnPage: (seconds: number) => {
    trackEvent({
      action: 'time_on_page',
      category: 'engagement',
      value: seconds
    })
  },

  scrollDepth: (percentage: number) => {
    trackEvent({
      action: 'scroll_depth',
      category: 'engagement',
      value: percentage
    })
  }
}

// Hook para tracking automático de tiempo en página
export const usePageTracking = () => {
  if (typeof window !== 'undefined') {
    const startTime = Date.now()
    
    const trackTimeOnPage = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000)
      if (timeSpent > 10) { // Solo trackear si estuvo más de 10 segundos
        analytics.timeOnPage(timeSpent)
      }
    }

    // Trackear cuando el usuario sale de la página
    window.addEventListener('beforeunload', trackTimeOnPage)
    
    // Cleanup
    return () => {
      window.removeEventListener('beforeunload', trackTimeOnPage)
    }
  }
}

// Función para inicializar Google Analytics
export const initializeAnalytics = () => {
  if (typeof window !== 'undefined' && siteConfig.tracking.googleAnalytics) {
    // Cargar Google Analytics
    const script = document.createElement('script')
    script.src = `https://www.googletagmanager.com/gtag/js?id=${siteConfig.tracking.googleAnalytics}`
    script.async = true
    document.head.appendChild(script)

    // Configurar gtag
    ;(window as any).dataLayer = (window as any).dataLayer || []
    ;(window as any).gtag = function() {
      ;(window as any).dataLayer.push(arguments)
    }
    ;(window as any).gtag('js', new Date())
    ;(window as any).gtag('config', siteConfig.tracking.googleAnalytics, {
      page_title: document.title,
      page_location: window.location.href
    })
  }
}

// Función para trackear scroll depth automáticamente
export const initializeScrollTracking = () => {
  if (typeof window === 'undefined') return

  let maxScroll = 0
  const thresholds = [25, 50, 75, 90, 100]
  const tracked = new Set<number>()

  const handleScroll = () => {
    const scrollTop = window.pageYOffset
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollPercent = Math.round((scrollTop / docHeight) * 100)
    
    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent
      
      // Trackear thresholds
      thresholds.forEach(threshold => {
        if (scrollPercent >= threshold && !tracked.has(threshold)) {
          tracked.add(threshold)
          analytics.scrollDepth(threshold)
        }
      })
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  
  return () => {
    window.removeEventListener('scroll', handleScroll)
  }
} 
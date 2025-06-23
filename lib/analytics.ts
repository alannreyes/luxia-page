import { siteConfig } from './config'
import type { TrackingEvent, WebVitals, ScrollDepthEvent, UserSession } from '@/types'

// Función para enviar eventos a Google Analytics
export const trackEvent = (event: TrackingEvent) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', event.action, {
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
    window.dataLayer = window.dataLayer || []
    window.gtag = function() {
      window.dataLayer.push(arguments)
    }
    window.gtag('js', new Date())
    window.gtag('config', siteConfig.tracking.googleAnalytics, {
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

// Función para trackear visibilidad de secciones
export const initializeSectionTracking = () => {
  if (typeof window === 'undefined') return

  const sections = ['hero', 'servicios', 'casos-reales', 'insights', 'contacto']
  const tracked = new Set<string>()

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !tracked.has(entry.target.id)) {
          tracked.add(entry.target.id)
          analytics.sectionView(entry.target.id)
        }
      })
    },
    {
      threshold: 0.3, // 30% de la sección visible
      rootMargin: '0px 0px -10% 0px'
    }
  )

  sections.forEach(sectionId => {
    const element = document.getElementById(sectionId)
    if (element) {
      observer.observe(element)
    }
  })

  return () => {
    observer.disconnect()
  }
}

// Función helper para métricas básicas
const basicPerfTracking = () => {
  if (typeof window === 'undefined') return
  
  const perfObserver = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.entryType === 'navigation') {
        const navEntry = entry as PerformanceNavigationTiming
        
        // Trackear tiempo de carga
        const loadTime = navEntry.loadEventEnd - navEntry.fetchStart
        if (loadTime > 0) {
          trackEvent({
            action: 'page_load_time',
            category: 'performance',
            value: Math.round(loadTime)
          })
        }
        
        // Trackear tiempo de renderizado
        const renderTime = navEntry.domContentLoadedEventEnd - navEntry.fetchStart
        if (renderTime > 0) {
          trackEvent({
            action: 'page_render_time',
            category: 'performance',
            value: Math.round(renderTime)
          })
        }
      }
    })
  })
  
  try {
    perfObserver.observe({ entryTypes: ['navigation'] })
  } catch (e) {
    // PerformanceObserver no soportado
  }
}

// Trackear Core Web Vitals
export const initializeWebVitalsTracking = () => {
  if (typeof window === 'undefined') return

  // Función para enviar métricas
  const sendMetric = (metric: WebVitals) => {
    if (window.gtag) {
      window.gtag('event', metric.name, {
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        event_category: 'Web Vitals',
        event_label: metric.id,
        non_interaction: true,
        custom_map: {
          metric_rating: metric.rating
        }
      })
    }
  }

  // Intentar importar web-vitals si está disponible
  if (typeof window !== 'undefined') {
    import('web-vitals').then((webVitals) => {
      if (webVitals.onCLS) webVitals.onCLS(sendMetric)
      if (webVitals.onINP) webVitals.onINP(sendMetric) // INP replaced FID
      if (webVitals.onFCP) webVitals.onFCP(sendMetric)
      if (webVitals.onLCP) webVitals.onLCP(sendMetric)
      if (webVitals.onTTFB) webVitals.onTTFB(sendMetric)
    }).catch(() => {
      // Fallback a métricas básicas
      basicPerfTracking()
    })
  } else {
    basicPerfTracking()
  }
}

// Trackear errores JavaScript
export const initializeErrorTracking = () => {
  if (typeof window === 'undefined') return

  // Errores de JavaScript
  window.addEventListener('error', (event) => {
    if (window.gtag) {
      window.gtag('event', 'exception', {
        description: `${event.message} at ${event.filename}:${event.lineno}`,
        fatal: false,
        source: 'javascript_error'
      })
    }
  })

  // Promesas rechazadas
  window.addEventListener('unhandledrejection', (event) => {
    if (window.gtag) {
      window.gtag('event', 'exception', {
        description: `Unhandled promise rejection: ${event.reason}`,
        fatal: false,
        source: 'promise_rejection'
      })
    }
  })
}

// Trackear engagement avanzado
export const initializeEngagementTracking = () => {
  if (typeof window === 'undefined') return

  let mouseMovements = 0
  let clicks = 0
  let keyPresses = 0
  let startTime = Date.now()

  // Trackear movimientos del mouse
  const handleMouseMove = () => {
    mouseMovements++
  }

  // Trackear clicks
  const handleClick = (event: MouseEvent) => {
    clicks++
    
    // Trackear clicks en elementos específicos
    const target = event.target as HTMLElement
    if (target.tagName === 'BUTTON' || target.tagName === 'A') {
      trackEvent({
        action: 'element_click',
        category: 'engagement',
        label: target.textContent?.trim() || target.tagName,
        element_type: target.tagName
      })
    }
  }

  // Trackear teclas presionadas
  const handleKeyPress = () => {
    keyPresses++
  }

  // Enviar métricas de engagement cada 30 segundos
  const sendEngagementMetrics = () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000)
    
    if (timeSpent > 30) {
      trackEvent({
        action: 'engagement_metrics',
        category: 'engagement',
        value: timeSpent,
        mouse_movements: mouseMovements,
        clicks: clicks,
        key_presses: keyPresses
      })
      
      // Reset counters
      mouseMovements = 0
      clicks = 0
      keyPresses = 0
      startTime = Date.now()
    }
  }

  // Event listeners
  window.addEventListener('mousemove', handleMouseMove, { passive: true })
  window.addEventListener('click', handleClick, { passive: true })
  window.addEventListener('keypress', handleKeyPress, { passive: true })
  
  const interval = setInterval(sendEngagementMetrics, 30000)

  return () => {
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('click', handleClick)
    window.removeEventListener('keypress', handleKeyPress)
    clearInterval(interval)
  }
}

// Inicializar todo el tracking avanzado
export const initializeAdvancedTracking = () => {
  if (typeof window === 'undefined') return

  const cleanupFunctions: (() => void)[] = []

  // Inicializar todos los trackings
  const scrollCleanup = initializeScrollTracking()
  const sectionCleanup = initializeSectionTracking()
  const engagementCleanup = initializeEngagementTracking()
  
  if (scrollCleanup) cleanupFunctions.push(scrollCleanup)
  if (sectionCleanup) cleanupFunctions.push(sectionCleanup)
  if (engagementCleanup) cleanupFunctions.push(engagementCleanup)

  // Inicializar trackings sin cleanup
  initializeWebVitalsTracking()
  initializeErrorTracking()

  // Return cleanup function
  return () => {
    cleanupFunctions.forEach(cleanup => cleanup())
  }
} 
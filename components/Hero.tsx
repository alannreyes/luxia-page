'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import AppointmentModal from './AppointmentModal'
import { Info } from 'lucide-react'
import type { Metric, MetricCardProps, MetricInfoModalProps, BaseComponentProps } from '@/types'

// Hook para animar números
function useCountUp(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    let startTime: number
    let animationFrame: number
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      setCount(Math.floor(progress * end))
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }
    
    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration])
  
  return count
}

export default function Hero({ locale, dictionary }: BaseComponentProps) {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [currentMetricIndex] = useState(0)
  const [selectedMetric, setSelectedMetric] = useState<Metric | null>(null)
  const [showMetricModal, setShowMetricModal] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Métricas estáticas (evitamos rotación para simplificar por ahora)
  const metrics: Metric[] = [
    { 
      value: "80%", 
      label: locale === 'es' ? "de organizaciones ya implementaron IA en al menos una función" : "of organizations already implemented AI in at least one function",
      description: locale === 'es' ? "Estadística relevante para la adopción de IA empresarial." : "Relevant statistic for enterprise AI adoption.",
      source: locale === 'es' ? "Estudios de mercado de IA empresarial" : "Enterprise AI market studies"
    },
    { 
      value: "2x", 
      label: locale === 'es' ? "de CEOs están implementando software de IA" : "faster implementation with AI tools",
      description: locale === 'es' ? "Aceleración en procesos empresariales." : "Acceleration in business processes.",
      source: locale === 'es' ? "Estudios de mercado de IA empresarial" : "Enterprise AI market studies"
    },
    { 
      value: "40%", 
      label: locale === 'es' ? "incremento en productividad con herramientas IA" : "productivity increase with AI tools",
      description: locale === 'es' ? "Mejora medible en eficiencia operacional." : "Measurable improvement in operational efficiency.",
      source: locale === 'es' ? "Estudios de mercado de IA empresarial" : "Enterprise AI market studies"
    },
    { 
      value: "60%", 
      label: locale === 'es' ? "reducción en tiempo de programación con IA" : "reduction in programming time with AI",
      description: locale === 'es' ? "Optimización en desarrollo de software." : "Optimization in software development.",
      source: locale === 'es' ? "Estudios de mercado de IA empresarial" : "Enterprise AI market studies"
    }
  ]

  const handleMetricClick = (metric: Metric) => {
    setSelectedMetric(metric)
    setShowMetricModal(true)
  }

  // Obtener métricas para mostrar según el tamaño de pantalla
  const getDisplayMetrics = () => {
    // En móvil: solo una métrica rotativa
    // En desktop: 4 métricas con rotación en lote
    const metricsToShow = 4
    const startIndex = Math.floor(currentMetricIndex / metricsToShow) * metricsToShow
    return metrics.slice(startIndex, startIndex + metricsToShow)
  }

  const handleDemoClick = () => {
    // Scroll to demos section when it exists
    const demosSection = document.getElementById('demos')
    if (demosSection) {
      demosSection.scrollIntoView({ behavior: 'smooth' })
    } else {
      // For now, show appointment modal
      setIsAppointmentModalOpen(true)
    }
    
    // Tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'hero_cta_click', {
        button_text: dictionary.hero.primaryCTA
      })
    }
  }

  const handleAppointmentClick = () => {
    setIsAppointmentModalOpen(true)
    
    // Tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'hero_cta_click', {
        button_text: dictionary.hero.secondaryCTA
      })
    }
  }

  return (
    <>
      <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 via-transparent to-purple-100/30" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div 
              className="max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1 
                className="text-5xl md:text-6xl font-light text-gray-900 leading-tight mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {dictionary.hero.mainTitle}
                <span className="block text-3xl md:text-4xl text-gray-600 mt-4">
                  {dictionary.hero.subtitle}
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-lg text-gray-600 leading-relaxed mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {dictionary.hero.description}
              </motion.p>
              

              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <motion.button 
                  onClick={handleDemoClick}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {dictionary.hero.primaryCTA} →
                </motion.button>
                <motion.button 
                  onClick={handleAppointmentClick}
                  className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 text-lg font-semibold bg-white/80 backdrop-blur-sm"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {dictionary.hero.secondaryCTA}
                </motion.button>
              </motion.div>

              {/* Benefits with checkmarks */}
              <motion.div 
                className="flex flex-wrap items-center gap-6 text-sm text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {dictionary.hero.benefits.map((benefit: string, index: number) => (
                  <span key={index} className="flex items-center">
                    <div className="w-4 h-4 bg-green-500 rounded-full mr-2 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    {benefit}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            {/* Metrics - Responsive Design */}
            <motion.div 
              className="w-full"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Mobile: Single rotating metric */}
              <div className="block md:hidden">
                <MetricCard 
                  key={currentMetricIndex}
                  metric={metrics[currentMetricIndex % metrics.length]}
                  delay={0}
                  isVisible={isVisible}
                  onClick={() => handleMetricClick(metrics[currentMetricIndex % metrics.length])}
                  showIndicator={true}
                  currentIndex={currentMetricIndex}
                  totalMetrics={metrics.length}
                />
              </div>

              {/* Desktop: Grid of 4 rotating metrics */}
              <div className="hidden md:grid grid-cols-2 gap-4 lg:gap-6">
                {getDisplayMetrics().map((metric, index) => (
                  <MetricCard 
                    key={`${Math.floor(currentMetricIndex / 4)}-${index}`}
                    metric={metric} 
                    delay={index * 0.1}
                    isVisible={isVisible}
                    onClick={() => handleMetricClick(metric)}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 right-10 w-20 h-20 bg-blue-100 rounded-full opacity-20 animate-pulse" />
        <div className="absolute bottom-20 left-10 w-16 h-16 bg-purple-100 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
      </section>

      {/* Modal solo se muestra cuando isAppointmentModalOpen es true */}
      {isAppointmentModalOpen && (
        <AppointmentModal 
          isOpen={isAppointmentModalOpen}
          onClose={() => setIsAppointmentModalOpen(false)}
        />
      )}

      {/* Modal de información de métricas */}
      {showMetricModal && selectedMetric && (
        <MetricInfoModal 
          metric={selectedMetric}
          isOpen={showMetricModal}
          onClose={() => setShowMetricModal(false)}
          locale={locale}
        />
      )}
    </>
  )
}

// Componente para métricas animadas
function MetricCard(props: MetricCardProps) {
  const { 
    metric, 
    delay, 
    isVisible, 
    onClick,
    showIndicator = false,
    currentIndex = 0,
    totalMetrics = 0
  } = props
  // Extraer número para animación
  const numericValue = parseInt(metric.value.replace(/[^\d]/g, '')) || 0
  const animatedValue = useCountUp(numericValue, 2000)
  
  // Reconstruir el valor con formato
  const displayValue = isVisible 
    ? metric.value.replace(/\d+/, animatedValue.toString()) 
    : '0'

  return (
    <motion.div
      className={`bg-white/90 backdrop-blur-sm rounded-xl p-4 lg:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 text-center relative ${onClick ? 'cursor-pointer' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5, scale: 1.02 }}
      onClick={onClick}
    >
      {/* Icono de información */}
      {onClick && (
        <div className="absolute top-3 right-3">
          <Info className="w-4 h-4 text-gray-400 hover:text-blue-600 transition-colors" />
        </div>
      )}

      <div className="text-2xl lg:text-3xl font-bold gradient-text mb-2">
        {displayValue}
      </div>
      <div className="text-xs lg:text-sm text-gray-600 leading-tight">
        {metric.label}
      </div>

      {/* Indicador de progreso para móvil */}
      {showIndicator && (
        <div className="mt-4 flex justify-center">
          <div className="flex space-x-1">
            {Array.from({ length: Math.min(totalMetrics, 5) }).map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex % 5 ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
            {totalMetrics > 5 && (
              <span className="text-xs text-gray-400 ml-2">
                {currentIndex + 1}/{totalMetrics}
              </span>
            )}
          </div>
        </div>
      )}
    </motion.div>
  )
}

// Modal para mostrar información detallada de métricas
function MetricInfoModal({ metric, isOpen, onClose, locale }: MetricInfoModalProps & { locale: string }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {locale === 'es' ? 'Estadística de IA Empresarial' : 'Enterprise AI Statistic'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {metric.value}
            </div>
            <div className="text-sm text-gray-700">
              {metric.label}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">
              {locale === 'es' ? 'Descripción' : 'Description'}
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              {metric.description || (locale === 'es' ? 'Estadística relevante para la adopción de IA empresarial.' : 'Relevant statistic for enterprise AI adoption.')}
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-1">
              {locale === 'es' ? 'Fuente' : 'Source'}
            </h4>
            <p className="text-sm text-blue-600 font-medium">
              {metric.source || (locale === 'es' ? 'Estudios de mercado de IA empresarial' : 'Enterprise AI market studies')}
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={onClose}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {locale === 'es' ? 'Cerrar' : 'Close'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

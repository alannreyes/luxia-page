'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { siteConfig } from '@/lib/config'
import AppointmentModal from './AppointmentModal'

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

export default function Hero() {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

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
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', siteConfig.tracking.events.heroCtaClick, {
        button_text: siteConfig.hero.primaryCTA
      })
    }
  }

  const handleAppointmentClick = () => {
    setIsAppointmentModalOpen(true)
    
    // Tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', siteConfig.tracking.events.heroCtaClick, {
        button_text: siteConfig.hero.secondaryCTA
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
                {siteConfig.hero.mainTitle}
                <span className="block text-3xl md:text-4xl text-gray-600 mt-4">
                  {siteConfig.hero.subtitle}
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-gray-600 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {siteConfig.hero.description}
              </motion.p>
              
              {/* Call to Action */}
              <motion.p 
                className="text-2xl font-semibold text-gray-900 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {siteConfig.hero.callToAction}
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <motion.button 
                  onClick={handleDemoClick}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {siteConfig.hero.primaryCTA} →
                </motion.button>
                <motion.button 
                  onClick={handleAppointmentClick}
                  className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 text-lg font-semibold bg-white/80 backdrop-blur-sm"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {siteConfig.hero.secondaryCTA}
                </motion.button>
              </motion.div>

              {/* Trust badges */}
              <motion.div 
                className="flex flex-wrap items-center gap-6 text-sm text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                  Consulta gratuita de 30 min
                </span>
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
                  Sin compromisos
                </span>
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2" />
                  Respuesta en 24h
                </span>
              </motion.div>
            </motion.div>

            {/* Metrics */}
            <motion.div 
              className="grid grid-cols-2 gap-4 lg:gap-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {siteConfig.hero.metrics.map((metric, index) => (
                <MetricCard 
                  key={index} 
                  metric={metric} 
                  delay={index * 0.1}
                  isVisible={isVisible}
                />
              ))}
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
    </>
  )
}

// Componente para métricas animadas
function MetricCard({ metric, delay, isVisible }: { 
  metric: typeof siteConfig.hero.metrics[0], 
  delay: number,
  isVisible: boolean 
}) {
  // Extraer número para animación
  const numericValue = parseInt(metric.value.replace(/[^\d]/g, '')) || 0
  const animatedValue = useCountUp(numericValue, 2000)
  
  // Reconstruir el valor con formato
  const displayValue = isVisible 
    ? metric.value.replace(/\d+/, animatedValue.toString()) 
    : '0'

  return (
    <motion.div
      className="bg-white/90 backdrop-blur-sm rounded-xl p-4 lg:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5, scale: 1.02 }}
    >
      <div className="text-2xl lg:text-3xl font-bold gradient-text mb-2">
        {displayValue}
      </div>
      <div className="text-xs lg:text-sm text-gray-600 leading-tight">
        {metric.label}
      </div>
    </motion.div>
  )
}

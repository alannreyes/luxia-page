'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Award, Building, Shield, Landmark } from 'lucide-react'
import type { BaseComponentProps } from '@/types'

export default function Hero({ locale, dictionary }: BaseComponentProps) {
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleSolutionsClick = () => {
    router.push(`/${locale}/services`)

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'hero_cta_click', {
        button_text: dictionary.hero.primaryCTA
      })
    }
  }

  const handleContactClick = () => {
    const contactSection = document.getElementById('contacto')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'hero_cta_click', {
        button_text: dictionary.hero.secondaryCTA
      })
    }
  }

  // Iconos para los stats
  const statIcons = [Award, Building, Shield, Landmark]

  return (
    <>
      <section className="relative min-h-screen pt-24 pb-16 px-4 sm:px-6 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex flex-col justify-center">
        {/* Background pattern - simplified for mobile */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-0 w-48 sm:w-72 h-48 sm:h-72 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 w-full">
          {/* Tagline - simplified, no bullet */}
          <motion.p
            className="text-center text-blue-300/80 text-sm sm:text-base font-medium mb-6 sm:mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {dictionary.hero.badge}
          </motion.p>

          {/* Main Title */}
          <motion.div
            className="text-center max-w-4xl mx-auto mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-tight mb-4 sm:mb-6">
              {dictionary.hero.mainTitle}{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-medium block sm:inline">
                {dictionary.hero.mainTitleHighlight}
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto px-2">
              {dictionary.hero.subtitle}
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-10 sm:mb-16 px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.button
              onClick={handleSolutionsClick}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-base sm:text-lg font-semibold shadow-lg shadow-blue-500/25"
              whileTap={{ scale: 0.95 }}
            >
              {dictionary.hero.primaryCTA}
            </motion.button>
            <motion.button
              onClick={handleContactClick}
              className="w-full sm:w-auto border-2 border-white/30 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-white/10 transition-all duration-300 text-base sm:text-lg font-semibold"
              whileTap={{ scale: 0.95 }}
            >
              {dictionary.hero.secondaryCTA}
            </motion.button>
          </motion.div>

          {/* Stats Grid - Credentials del Fundador */}
          <motion.div
            className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {dictionary.hero.stats.map((stat: { value: string; label: string }, index: number) => {
              const Icon = statIcons[index % statIcons.length]
              return (
                <motion.div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-3 sm:p-4 md:p-6 text-center border border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                  </div>
                  <div className="text-lg sm:text-2xl md:text-3xl font-bold text-white mb-0.5 sm:mb-1">
                    {stat.value}
                  </div>
                  <div className="text-[10px] sm:text-xs md:text-sm text-gray-400 leading-tight">
                    {stat.label}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* Scroll indicator - hidden on small screens */}
        <motion.div
          className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <motion.div
              className="w-1.5 h-3 bg-white/50 rounded-full mt-2"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </section>
    </>
  )
}

'use client'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { siteConfig } from '@/lib/config'
import AppointmentModal from './AppointmentModal'
import Logo from './Logo'
import LanguageSelector from './LanguageSelector'
import type { BaseComponentProps } from '@/types'

export default function Navigation({ locale, dictionary }: BaseComponentProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false)

  const handleAppointmentClick = () => {
    setIsAppointmentModalOpen(true)
    setIsOpen(false) // Close mobile menu if open
    
    // Tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', siteConfig.tracking.events.contactFormSubmit, {
        source: 'navigation'
      })
    }
  }

  return (
    <>
      <nav className="fixed w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Logo />
            
            <div className="hidden md:flex space-x-8 items-center">
              <a href="#servicios" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                {dictionary.nav.services}
              </a>
              <a href="#casos-reales" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                {dictionary.nav.cases}
              </a>
              <a href="#insights" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                {dictionary.nav.insights}
              </a>
              <a href="#contacto" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                {dictionary.nav.contact}
              </a>
              <LanguageSelector currentLocale={locale} />
              <button 
                onClick={handleAppointmentClick}
                className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-all font-medium shadow-sm hover:shadow-md"
              >
                {dictionary.nav.schedule}
              </button>
            </div>
            
            <button 
              className="md:hidden text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          
          {/* Mobile menu */}
          {isOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-4 border-t border-gray-100 pt-4">
              <a href="#servicios" className="block text-gray-600 hover:text-gray-900 transition-colors font-medium" onClick={() => setIsOpen(false)}>
                {dictionary.nav.services}
              </a>
              <a href="#casos-reales" className="block text-gray-600 hover:text-gray-900 transition-colors font-medium" onClick={() => setIsOpen(false)}>
                {dictionary.nav.cases}
              </a>
              <a href="#insights" className="block text-gray-600 hover:text-gray-900 transition-colors font-medium" onClick={() => setIsOpen(false)}>
                {dictionary.nav.insights}
              </a>
              <a href="#contacto" className="block text-gray-600 hover:text-gray-900 transition-colors font-medium" onClick={() => setIsOpen(false)}>
                {dictionary.nav.contact}
              </a>
              <div className="pt-2">
                <LanguageSelector currentLocale={locale} />
              </div>
              <button 
                onClick={handleAppointmentClick}
                className="w-full bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-all font-medium"
              >
                {dictionary.nav.schedule}
              </button>
            </div>
          )}
        </div>
      </nav>

      <AppointmentModal 
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
      />
    </>
  )
}

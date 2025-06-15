'use client'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { siteConfig } from '@/lib/config'
import AppointmentModal from './AppointmentModal'
import Logo from './Logo'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false)

  const handleAppointmentClick = () => {
    setIsAppointmentModalOpen(true)
    setIsOpen(false) // Close mobile menu if open
    
    // Tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', siteConfig.tracking.events.contactFormSubmit, {
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
              {siteConfig.navigation.links.map((link) => (
                <a 
                  key={link.href}
                  href={link.href} 
                  className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
                >
                  {link.label}
                </a>
              ))}
              <button 
                onClick={handleAppointmentClick}
                className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-all font-medium shadow-sm hover:shadow-md"
              >
                Agendar Consulta
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
              {siteConfig.navigation.links.map((link) => (
                <a 
                  key={link.href}
                  href={link.href} 
                  className="block text-gray-600 hover:text-gray-900 transition-colors font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <button 
                onClick={handleAppointmentClick}
                className="w-full bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-all font-medium"
              >
                Agendar Consulta
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

'use client'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { siteConfig } from '@/lib/config'
import AppointmentModal from './AppointmentModal'
import Logo from './Logo'
import LanguageSelector from './LanguageSelector'
import type { BaseComponentProps } from '@/types'

export default function Navigation({ locale, dictionary }: BaseComponentProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleAppointmentClick = () => {
    setIsAppointmentModalOpen(true)
    setIsOpen(false)

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', siteConfig.tracking.events.contactFormSubmit, {
        source: 'navigation'
      })
    }
  }

  const navLinks = [
    { href: '#servicios', label: dictionary.nav.services },
    { href: '#fundador', label: dictionary.nav.about },
    { href: '#industrias', label: dictionary.nav.cases },
    { href: '#contacto', label: dictionary.nav.contact }
  ]

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm'
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Logo variant={isScrolled ? 'default' : 'white'} />

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8 items-center">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`font-medium transition-colors ${
                    isScrolled
                      ? 'text-slate-600 hover:text-blue-600'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <LanguageSelector currentLocale={locale} />
              <button
                onClick={handleAppointmentClick}
                className={`px-6 py-2.5 rounded-lg font-medium transition-all shadow-sm hover:shadow-md ${
                  isScrolled
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800'
                    : 'bg-white/10 border border-white/30 text-white hover:bg-white/20'
                }`}
              >
                {dictionary.nav.schedule}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden p-2 rounded-lg transition-colors ${
                isScrolled ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' : 'text-white hover:bg-white/10'
              }`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className={`md:hidden mt-4 pb-4 space-y-4 border-t pt-4 ${
              isScrolled ? 'border-gray-100' : 'border-white/20'
            }`}>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`block font-medium transition-colors ${
                    isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white/80 hover:text-white'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
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

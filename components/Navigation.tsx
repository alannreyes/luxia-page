'use client'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'
import LanguageSelector from './LanguageSelector'
import type { BaseComponentProps } from '@/types'

export default function Navigation({ locale, dictionary }: BaseComponentProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: `/${locale}/services`, label: dictionary.nav.services },
    { href: `/${locale}/cases`, label: dictionary.nav.cases },
    { href: `/${locale}#fundador`, label: dictionary.nav.about },
  ]

  const eduLinks = [
    { href: `/${locale}/learning`, label: dictionary.nav.learning, icon: '📖' },
    { href: `/${locale}/cooking`, label: dictionary.nav.cooking, icon: '👨‍🍳' }
  ]

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled || isOpen
        ? 'bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Logo variant={isScrolled || isOpen ? 'default' : 'white'} />

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
            {/* Learning & Cooking Links */}
            <div className="flex items-center gap-2 border-l border-gray-300/30 pl-4">
              {eduLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1 px-2 py-1 rounded-lg font-medium transition-colors ${
                    isScrolled
                      ? 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span>{link.icon}</span>
                  <span className="text-sm">{link.label}</span>
                </a>
              ))}
            </div>
            <LanguageSelector currentLocale={locale} />
            <a
              href={`/${locale}#contacto`}
              className={`px-6 py-2.5 rounded-lg font-medium transition-all shadow-sm hover:shadow-md ${
                isScrolled
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800'
                  : 'bg-white/10 border border-white/30 text-white hover:bg-white/20'
              }`}
            >
              {dictionary.nav.schedule}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled || isOpen ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 border-t border-gray-200 pt-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block font-medium text-gray-700 hover:text-blue-600 transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            {/* Learning & Cooking Links Mobile */}
            <div className="flex gap-2 pt-2 border-t border-gray-100">
              {eduLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-slate-100 text-slate-700 hover:bg-blue-100 hover:text-blue-700 transition-colors font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  <span>{link.icon}</span>
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
            <div className="pt-2">
              <LanguageSelector currentLocale={locale} />
            </div>
            <a
              href={`/${locale}#contacto`}
              className="block w-full text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all font-medium shadow-md"
              onClick={() => setIsOpen(false)}
            >
              {dictionary.nav.schedule}
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}

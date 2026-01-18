'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

interface EnterpriseLayoutProps {
  children: React.ReactNode
  locale: 'es' | 'en'
  section: 'services' | 'cases'
}

export default function EnterpriseLayout({ children, locale, section }: EnterpriseLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isSpanish = locale === 'es'

  const navLinks = [
    { href: `/${locale}`, label: isSpanish ? 'Inicio' : 'Home' },
    { href: `/${locale}/services`, label: isSpanish ? 'Servicios' : 'Services' },
    { href: `/${locale}/cases`, label: isSpanish ? 'Casos' : 'Cases' },
    { href: `/${locale}#fundador`, label: isSpanish ? 'Fundador' : 'Founder' },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header - Professional/Enterprise style */}
      <header className="bg-slate-900 text-white py-4 px-4 md:px-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <span className="text-xl font-bold">luxIA</span>
            <span className="text-slate-400">/</span>
            <span className="text-blue-400 flex items-center gap-1">
              {section === 'services' ? (isSpanish ? 'servicios' : 'services') : (isSpanish ? 'casos' : 'cases')}
            </span>
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 -mr-2 text-white hover:bg-slate-800 rounded-lg transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-slate-300 hover:text-white transition"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={isSpanish ? `/en/${section}` : `/es/${section}`}
              className="text-sm text-slate-300 hover:text-white transition"
            >
              {isSpanish ? 'English' : 'Español'}
            </Link>
            <Link
              href={`/${locale}#contacto`}
              className="px-4 py-2.5 min-h-[44px] flex items-center bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition"
            >
              {isSpanish ? 'Contactar' : 'Contact'}
            </Link>
          </nav>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-slate-800 pt-4">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="py-3 px-4 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={isSpanish ? `/en/${section}` : `/es/${section}`}
                className="py-3 px-4 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition"
                onClick={() => setIsMenuOpen(false)}
              >
                {isSpanish ? 'English' : 'Español'}
              </Link>
              <Link
                href={`/${locale}#contacto`}
                className="mt-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-center font-medium transition"
                onClick={() => setIsMenuOpen(false)}
              >
                {isSpanish ? 'Contactar' : 'Contact'}
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Main content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10 md:py-12 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">luxIA</h3>
              <p className="text-sm">
                {isSpanish
                  ? 'Boutique de IA Generativa para industrias reguladas'
                  : 'Generative AI boutique for regulated industries'}
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">{isSpanish ? 'Navegación' : 'Navigation'}</h4>
              <ul className="space-y-1 text-sm">
                <li><Link href={`/${locale}`} className="hover:text-white transition py-2 block">{isSpanish ? 'Inicio' : 'Home'}</Link></li>
                <li><Link href={`/${locale}/services`} className="hover:text-white transition py-2 block">{isSpanish ? 'Servicios' : 'Services'}</Link></li>
                <li><Link href={`/${locale}/cases`} className="hover:text-white transition py-2 block">{isSpanish ? 'Casos de Éxito' : 'Case Studies'}</Link></li>
                <li><Link href={`/${locale}#fundador`} className="hover:text-white transition py-2 block">{isSpanish ? 'Fundador' : 'Founder'}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">{isSpanish ? 'Comunidad' : 'Community'}</h4>
              <ul className="space-y-1 text-sm">
                <li><Link href={`/${locale}/learning`} className="hover:text-white transition py-2 block">Learning</Link></li>
                <li><Link href={`/${locale}/cooking`} className="hover:text-white transition py-2 block">Cooking</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">{isSpanish ? 'Contacto' : 'Contact'}</h4>
              <ul className="space-y-1 text-sm">
                <li className="py-2">alann@luxia.us</li>
                <li className="py-2">Florida, USA | Lima, Peru</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm">
            <p>© 2026 luxIA.us - {isSpanish ? 'Todos los derechos reservados' : 'All rights reserved'}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

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
  const sectionLabel = section === 'services' ? (isSpanish ? 'servicios' : 'services') : (isSpanish ? 'casos' : 'cases')

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--lux-niebla)' }}>
      {/* Header instrument-grade */}
      <header className="sticky top-0 z-50 text-white border-b border-white/10 backdrop-blur" style={{ backgroundColor: 'rgba(10,20,36,0.9)' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4 md:px-6">
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <span className="font-display text-xl font-semibold">luxIA</span>
            <span className="text-slate-600">/</span>
            <span className="font-data text-xs tracking-[0.18em] uppercase" style={{ color: 'var(--lux-alba)' }}>{sectionLabel}</span>
          </Link>

          <button
            className="md:hidden p-2 -mr-2 text-white hover:bg-white/10 rounded-lg transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-slate-300 hover:text-white transition">
                {link.label}
              </Link>
            ))}
            <Link href={isSpanish ? `/en/${section}` : `/es/${section}`} className="font-data text-xs tracking-wide text-slate-400 hover:text-white transition">
              {isSpanish ? 'EN' : 'ES'}
            </Link>
            <Link
              href={`/${locale}#contacto`}
              className="px-5 py-2.5 min-h-[44px] flex items-center rounded-lg text-sm font-medium text-white transition hover:-translate-y-0.5"
              style={{ backgroundColor: 'var(--lux-senal)', boxShadow: '0 8px 24px -10px rgba(59,130,246,0.6)' }}
            >
              {isSpanish ? 'Contactar' : 'Contact'}
            </Link>
          </nav>
        </div>

        {isMenuOpen && (
          <div className="md:hidden px-4 pb-4 border-t border-white/10 pt-4">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="py-3 px-4 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition" onClick={() => setIsMenuOpen(false)}>
                  {link.label}
                </Link>
              ))}
              <Link href={isSpanish ? `/en/${section}` : `/es/${section}`} className="py-3 px-4 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition" onClick={() => setIsMenuOpen(false)}>
                {isSpanish ? 'English' : 'Español'}
              </Link>
              <Link href={`/${locale}#contacto`} className="mt-2 py-3 px-4 rounded-lg text-center font-medium text-white" style={{ backgroundColor: 'var(--lux-senal)' }} onClick={() => setIsMenuOpen(false)}>
                {isSpanish ? 'Contactar' : 'Contact'}
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main>{children}</main>

      {/* Footer instrument-grade */}
      <footer className="text-slate-400 py-12 px-4 md:px-6 border-t border-white/5" style={{ backgroundColor: 'var(--lux-noche)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-display text-white text-lg font-semibold mb-3">luxIA</h3>
              <p className="text-sm text-slate-400">
                {isSpanish ? 'Estudio de IA · software a producción, rápido' : 'AI studio · software to production, fast'}
              </p>
            </div>
            <div>
              <p className="font-data text-xs tracking-[0.18em] uppercase text-slate-500 mb-3">{isSpanish ? 'Navegación' : 'Navigation'}</p>
              <ul className="space-y-1 text-sm">
                {navLinks.map((l) => (
                  <li key={l.href}><Link href={l.href} className="hover:text-white transition py-2 block">{l.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-data text-xs tracking-[0.18em] uppercase text-slate-500 mb-3">{isSpanish ? 'Comunidad' : 'Community'}</p>
              <ul className="space-y-1 text-sm">
                <li><Link href={`/${locale}/learning`} className="hover:text-white transition py-2 block">Learning</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-data text-xs tracking-[0.18em] uppercase text-slate-500 mb-3">{isSpanish ? 'Contacto' : 'Contact'}</p>
              <p className="font-data text-xs tracking-wide text-slate-400 py-2">Florida, USA · Lima, Perú</p>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="font-data text-xs text-slate-500">© {new Date().getFullYear()} luxIA.us — {isSpanish ? 'Todos los derechos reservados' : 'All rights reserved'}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

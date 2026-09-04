'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'
import LanguageSelector from './LanguageSelector'
import type { BaseComponentProps } from '@/types'

export default function Navigation({ locale, dictionary }: BaseComponentProps) {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { href: `/${locale}/services`, label: dictionary.nav.services },
    { href: `/${locale}/cases`, label: dictionary.nav.cases },
    { href: `/${locale}/insights`, label: dictionary.nav.insights },
    { href: `/${locale}#fundador`, label: dictionary.nav.about },
  ]
  const linkClass = 'text-sm font-medium transition-colors'

  return (
    <nav
      className="sticky top-0 z-50 backdrop-blur"
      style={{ backgroundColor: 'rgba(247,248,250,0.82)', borderBottom: '1px solid var(--ed-line)', color: 'var(--ed-ink)' }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4">
        <div className="flex justify-between items-center gap-4">
          <Link href={`/${locale}`} className="flex items-center shrink-0">
            <Logo variant="default" />
          </Link>

          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={linkClass} style={{ color: 'var(--ed-ink)' }}>
                {link.label}
              </Link>
            ))}
            <LanguageSelector currentLocale={locale} />
            <Link
              href={`/${locale}#contacto`}
              className="px-5 py-2.5 min-h-[44px] flex items-center rounded-full text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: 'var(--ed-ink)' }}
            >
              {dictionary.nav.schedule}
            </Link>
          </div>

          <button
            className="md:hidden p-2 -mr-2 rounded-lg transition-colors hover:bg-black/5"
            style={{ color: 'var(--ed-ink)' }}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden mt-3 pb-3 space-y-1 pt-3" style={{ borderTop: '1px solid var(--ed-line)' }}>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="block font-medium rounded-lg transition-colors py-3 px-4 hover:bg-black/5" style={{ color: 'var(--ed-ink)' }} onClick={() => setIsOpen(false)}>
                {link.label}
              </Link>
            ))}
            <div className="pt-2"><LanguageSelector currentLocale={locale} /></div>
            <Link href={`/${locale}#contacto`} className="block w-full text-center text-white px-6 py-3 rounded-full font-medium mt-1" style={{ backgroundColor: 'var(--ed-ink)' }} onClick={() => setIsOpen(false)}>
              {dictionary.nav.schedule}
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

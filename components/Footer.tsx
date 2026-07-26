import { siteConfig } from '@/lib/config'
import Link from 'next/link'
import Logo from './Logo'
import { Linkedin, Mail, MapPin } from 'lucide-react'
import type { BaseComponentProps } from '@/types'

export default function Footer({ locale, dictionary }: BaseComponentProps) {
  return (
    <footer className="text-white pt-16 pb-8 px-5 sm:px-8" style={{ backgroundColor: 'var(--ed-ink)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 md:gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Logo variant="white" />
            <p className="text-white/60 mt-4 max-w-md leading-relaxed">
              {dictionary.footer.description}
            </p>
            <div className="flex items-center mt-4 font-data text-xs tracking-wide text-white/40">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{dictionary.footer.location}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="font-data text-xs tracking-[0.18em] uppercase text-white/40 mb-4">{dictionary.footer.quickLinks}</p>
            <nav className="space-y-1">
              {[
                { href: `/${locale}/services`, label: dictionary.nav.services },
                { href: `/${locale}/cases`, label: dictionary.nav.cases },
                { href: `/${locale}#fundador`, label: dictionary.nav.about },
                { href: `/${locale}#contacto`, label: dictionary.footer.contact },
                { href: `/${locale}/learning`, label: 'Learning' },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="block py-2 text-sm text-white/60 hover:text-white transition-colors">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="font-data text-xs tracking-[0.18em] uppercase text-white/40 mb-4">{dictionary.footer.contact}</p>
            <div className="space-y-1">
              <Link href={`/${locale}#contacto`} className="flex items-center py-2 text-sm text-white/60 hover:text-white transition-colors">
                <Mail className="w-4 h-4 mr-2" />
                {dictionary.footer.contactForm}
              </Link>
              <a href={siteConfig.contact.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center py-2 text-sm text-white/60 hover:text-white transition-colors">
                <Linkedin className="w-4 h-4 mr-2" />
                {dictionary.footer.linkedin}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-data text-xs text-white/40">
              &copy; {new Date().getFullYear()} LuxIA. {dictionary.footer.rights}.
            </p>
            <div className="flex gap-6 text-sm">
              <span className="text-white/40 hover:text-white/70 transition-colors cursor-pointer">{dictionary.footer.privacy}</span>
              <span className="text-white/40 hover:text-white/70 transition-colors cursor-pointer">{dictionary.footer.terms}</span>
            </div>
            <p className="font-data text-xs tracking-wide text-white/40">
              {dictionary.footer.tagline}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

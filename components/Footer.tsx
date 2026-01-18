import { siteConfig } from '@/lib/config'
import Logo from './Logo'
import { Linkedin, Mail, MapPin } from 'lucide-react'
import type { BaseComponentProps } from '@/types'

export default function Footer({ locale, dictionary }: BaseComponentProps) {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <Logo variant="white" />
            <p className="text-gray-400 mt-4 max-w-md leading-relaxed">
              {dictionary.footer.description}
            </p>
            <div className="flex items-center mt-4 text-gray-400">
              <MapPin className="w-4 h-4 mr-2" />
              <span className="text-sm">{dictionary.footer.location}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">{dictionary.footer.quickLinks}</h4>
            <nav className="space-y-3">
              <a href={`/${locale}/services`} className="block text-gray-400 hover:text-white transition-colors text-sm">
                {dictionary.nav.services}
              </a>
              <a href={`/${locale}/cases`} className="block text-gray-400 hover:text-white transition-colors text-sm">
                {dictionary.nav.cases}
              </a>
              <a href={`/${locale}#fundador`} className="block text-gray-400 hover:text-white transition-colors text-sm">
                {dictionary.nav.about}
              </a>
              <a href={`/${locale}#contacto`} className="block text-gray-400 hover:text-white transition-colors text-sm">
                {dictionary.footer.contact}
              </a>
              <a href={`/${locale}/learning`} className="block text-gray-400 hover:text-white transition-colors text-sm">
                Learning
              </a>
              <a href={`/${locale}/cooking`} className="block text-gray-400 hover:text-white transition-colors text-sm">
                Cooking
              </a>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">{dictionary.footer.contact}</h4>
            <div className="space-y-3">
              <a
                href={`mailto:${dictionary.footer.email}`}
                className="flex items-center text-gray-400 hover:text-white transition-colors text-sm"
              >
                <Mail className="w-4 h-4 mr-2" />
                {dictionary.footer.email}
              </a>
              <a
                href={siteConfig.contact.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-400 hover:text-white transition-colors text-sm"
              >
                <Linkedin className="w-4 h-4 mr-2" />
                {dictionary.footer.linkedin}
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} LuxIA. {dictionary.footer.rights}.
            </p>

            {/* Legal Links */}
            <div className="flex space-x-6 text-sm">
              <span className="text-gray-500 hover:text-gray-300 transition-colors cursor-pointer">
                {dictionary.footer.privacy}
              </span>
              <span className="text-gray-500 hover:text-gray-300 transition-colors cursor-pointer">
                {dictionary.footer.terms}
              </span>
            </div>

            {/* Tagline */}
            <p className="text-sm text-gray-500">
              {dictionary.footer.tagline}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

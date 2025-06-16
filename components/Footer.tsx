import { siteConfig } from '@/lib/config'
import Logo from './Logo'
import { Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <Logo variant="white" />
          
          <nav className="flex space-x-6">
            <a href="#servicios" className="text-gray-300 hover:text-white transition-colors">
              Servicios
            </a>
            <a href="#casos" className="text-gray-300 hover:text-white transition-colors">
              Casos
            </a>
            <a href="#insights" className="text-gray-300 hover:text-white transition-colors">
              Insights
            </a>
          </nav>

          <div className="flex space-x-4">
            <a href={siteConfig.contact.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin size={24} />
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} luxIA. Transformación digital inteligente.</p>
          <p className="mt-2">{siteConfig.contact.phone}</p>
        </div>
      </div>
    </footer>
  )
}

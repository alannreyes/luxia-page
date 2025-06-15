import { siteConfig } from '@/lib/config'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Logo variant="white" />
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#servicios" className="text-gray-300 hover:text-white transition-colors">
              Servicios
            </a>
            <a href="#casos" className="text-gray-300 hover:text-white transition-colors">
              Casos
            </a>
            <a href="#insights" className="text-gray-300 hover:text-white transition-colors">
              Insights
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          © 2025 luxIA. Transformación digital inteligente.
        </div>
      </div>
    </footer>
  )
}

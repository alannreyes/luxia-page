import { Mail, Linkedin, MessageCircle } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="py-12 px-6 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-2xl font-bold gradient-text mb-4 md:mb-0">Luxia</div>
          <div className="flex space-x-6 text-sm text-gray-600">
            <a href="#" className="hover:text-gray-900 flex items-center gap-2">
              <Linkedin size={18} /> LinkedIn
            </a>
            <a href="#" className="hover:text-gray-900 flex items-center gap-2">
              <Mail size={18} /> Email
            </a>
            <a href="#" className="hover:text-gray-900 flex items-center gap-2">
              <MessageCircle size={18} /> WhatsApp Business
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-500">
          © 2025 Luxia. Transformación digital inteligente.
        </div>
      </div>
    </footer>
  )
}

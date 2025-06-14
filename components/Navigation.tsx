'use client'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold gradient-text">Luxia</div>
          
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#servicios" className="text-gray-600 hover:text-gray-900 transition">
              Servicios
            </a>
            <a href="#casos" className="text-gray-600 hover:text-gray-900 transition">
              Casos de Éxito
            </a>
            <a href="#insights" className="text-gray-600 hover:text-gray-900 transition">
              Insights
            </a>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
              Agendar Consulta
            </button>
          </div>
          
          <button 
            className="md:hidden text-gray-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <a href="#servicios" className="block text-gray-600 hover:text-gray-900">
              Servicios
            </a>
            <a href="#casos" className="block text-gray-600 hover:text-gray-900">
              Casos de Éxito
            </a>
            <a href="#insights" className="block text-gray-600 hover:text-gray-900">
              Insights
            </a>
            <button className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
              Agendar Consulta
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

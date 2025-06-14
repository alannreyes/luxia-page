'use client'
import { motion } from 'framer-motion'
import { MessageSquare, Database, FileText, Utensils, Workflow, Calendar } from 'lucide-react'
import { useState } from 'react'
import AppointmentModal from './AppointmentModal'

const demoPreview = [
  {
    icon: Database,
    title: 'Chat Fintech + ERP',
    description: 'Consulta ventas, métricas y análisis de precios con gráficos en tiempo real',
    features: ['Consultas en lenguaje natural', 'Gráficos interactivos', 'Análisis predictivo'],
    status: 'Próximamente',
    color: 'blue'
  },
  {
    icon: Utensils,
    title: 'Chat Restaurante',
    description: 'Sistema de pedidos inteligente con recomendaciones personalizadas',
    features: ['Pedidos por voz/texto', 'Recomendaciones IA', 'Gestión de alergias'],
    status: 'Próximamente',
    color: 'green'
  },
  {
    icon: FileText,
    title: 'Analizador de Documentos',
    description: 'Sube PDFs y obtén resúmenes, insights y extracción de datos',
    features: ['Drag & drop', 'Resúmenes automáticos', 'Extracción de datos'],
    status: 'Próximamente',
    color: 'purple'
  },
  {
    icon: Workflow,
    title: 'Integración n8n + IA',
    description: 'Workflows automatizados que conectan todas tus herramientas',
    features: ['400+ integraciones', 'Agentes autónomos', 'ROI medible'],
    status: 'Próximamente',
    color: 'orange'
  }
]

const colorClasses = {
  blue: {
    bg: 'bg-blue-100',
    text: 'text-blue-600',
    border: 'border-blue-200',
    gradient: 'from-blue-50 to-blue-100'
  },
  green: {
    bg: 'bg-green-100',
    text: 'text-green-600',
    border: 'border-green-200',
    gradient: 'from-green-50 to-green-100'
  },
  purple: {
    bg: 'bg-purple-100',
    text: 'text-purple-600',
    border: 'border-purple-200',
    gradient: 'from-purple-50 to-purple-100'
  },
  orange: {
    bg: 'bg-orange-100',
    text: 'text-orange-600',
    border: 'border-orange-200',
    gradient: 'from-orange-50 to-orange-100'
  }
}

export default function DemoPreview() {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false)

  return (
    <>
      <section id="demos" className="py-20 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-light text-gray-900 mb-4">
              Experimenta el Poder de la IA
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              Demos interactivas que muestran cómo la IA puede transformar tu negocio
            </p>
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
              <Calendar className="w-4 h-4 mr-2" />
              Demos disponibles próximamente
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {demoPreview.map((demo, index) => {
              const Icon = demo.icon
              const colors = colorClasses[demo.color as keyof typeof colorClasses]
              
              return (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {demo.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {demo.description}
                  </p>
                  
                  <ul className="space-y-1 mb-4">
                    {demo.features.map((feature, idx) => (
                      <li key={idx} className="text-xs text-gray-500 flex items-center">
                        <div className="w-1.5 h-1.5 bg-gray-300 rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${colors.border} ${colors.text} bg-gradient-to-r ${colors.gradient}`}>
                    {demo.status}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Call to Action */}
          <motion.div 
            className="text-center bg-white rounded-2xl p-8 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              ¿Quieres ser el primero en probar nuestras demos?
            </h3>
            <p className="text-gray-600 mb-6">
              Agenda una consulta personalizada y te mostraremos estas demos en acción, 
              adaptadas a las necesidades específicas de tu empresa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                onClick={() => setIsAppointmentModalOpen(true)}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-medium shadow-md hover:shadow-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Agendar Demo Personalizada
              </motion.button>
              <motion.button 
                onClick={() => {
                  const contactSection = document.getElementById('contacto')
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition font-medium"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Más Información
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <AppointmentModal 
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
      />
    </>
  )
} 
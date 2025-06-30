'use client'
import { motion } from 'framer-motion'
import { MessageSquare, Cpu, Database, LineChart, ArrowRight } from 'lucide-react'

const steps = [
  {
    icon: MessageSquare,
    title: 'Tu Pregunta',
    description: '"¿Cuáles fueron las ventas de octubre?"',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  {
    icon: Cpu,
    title: 'Procesamiento IA',
    description: 'GPT-4o entiende tu intención',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  },
  {
    icon: Database,
    title: 'Query Optimizado',
    description: 'Consulta PostgreSQL automática',
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  {
    icon: LineChart,
    title: 'Visualización',
    description: 'Gráficos interactivos instantáneos',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100'
  }
]

export default function HowItWorksPanel({ isVisible }: { isVisible: boolean }) {
  if (!isVisible) return null

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        ¿Cómo funciona la magia? 🪄
      </h3>
      
      <div className="space-y-4">
        {steps.map((step, index) => {
          const Icon = step.icon
          return (
            <motion.div
              key={index}
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`${step.bgColor} p-2 rounded-lg`}>
                <Icon className={`w-5 h-5 ${step.color}`} />
              </div>
              
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-900">{step.title}</h4>
                <p className="text-xs text-gray-600">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <ArrowRight className="w-4 h-4 text-gray-400" />
              )}
            </motion.div>
          )
        })}
      </div>
      
      <motion.div
        className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-xs text-gray-700">
          <span className="font-semibold">Resultado:</span> Tu equipo obtiene insights 
          empresariales complejos sin necesidad de conocimientos técnicos.
        </p>
      </motion.div>
    </motion.div>
  )
}
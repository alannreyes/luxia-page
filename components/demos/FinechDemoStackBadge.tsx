'use client'
import { motion } from 'framer-motion'
import { Database, Cpu, Zap, Brain } from 'lucide-react'

const techStack = [
  { name: 'PostgreSQL', icon: Database, color: 'text-blue-600' },
  { name: 'Redis', icon: Zap, color: 'text-red-600' },
  { name: 'GPT-4o', icon: Brain, color: 'text-purple-600' },
  { name: 'Pinecone', icon: Cpu, color: 'text-green-600' }
]

export default function FintechDemoStackBadge() {
  return (
    <motion.div 
      className="bg-gray-900/95 backdrop-blur-sm rounded-lg p-3 border border-gray-700"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="flex items-center space-x-4">
        <span className="text-xs text-gray-400 font-medium">Powered by:</span>
        <div className="flex items-center space-x-3">
          {techStack.map((tech, index) => {
            const Icon = tech.icon
            return (
              <motion.div
                key={tech.name}
                className="group relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <div className="flex items-center space-x-1.5 cursor-pointer">
                  <Icon className={`w-4 h-4 ${tech.color}`} />
                  <span className="text-xs text-gray-300 font-medium hidden sm:inline">
                    {tech.name}
                  </span>
                </div>
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {tech.name}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
      
      {/* Performance Metrics */}
      <motion.div 
        className="mt-2 pt-2 border-t border-gray-700 flex items-center justify-between text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-gray-400">Latencia: &lt;2s</span>
        </div>
        <div className="text-gray-500">
          vs SQL manual: 3-5 min
        </div>
      </motion.div>
    </motion.div>
  )
}
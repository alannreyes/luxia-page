'use client'
import { motion } from 'framer-motion'
import { Shield, Eye, Lock, Crown } from 'lucide-react'

interface AccessLevelBadgeProps {
  userRole: string
  userName: string
}

const roleConfig = {
  sales_rep: {
    label: 'Sales Rep',
    icon: Eye,
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    description: 'Basic metrics, client lists, sales pipeline'
  },
  manager: {
    label: 'Manager',
    icon: Shield,
    color: 'bg-green-100 text-green-800 border-green-200', 
    description: 'Team performance, department budgets'
  },
  director: {
    label: 'Director',
    icon: Lock,
    color: 'bg-purple-100 text-purple-800 border-purple-200',
    description: 'Financial statements, salary ranges, expenses'
  },
  executive: {
    label: 'Executive',
    icon: Crown,
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    description: 'Full access including personal & competitive data'
  }
}

export default function AccessLevelBadge({ userRole, userName }: AccessLevelBadgeProps) {
  const config = roleConfig[userRole as keyof typeof roleConfig] || roleConfig.sales_rep
  const Icon = config.icon

  return (
    <motion.div
      className="mb-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`inline-flex items-center space-x-2 px-3 py-2 rounded-lg border text-sm ${config.color}`}>
        <Icon className="w-4 h-4" />
        <span className="font-medium">{userName}</span>
        <span className="text-xs opacity-75">•</span>
        <span className="text-xs">{config.label}</span>
      </div>
      
      <div className="mt-1 text-xs text-gray-600">
        <span className="font-medium">Access Level:</span> {config.description}
      </div>
      
      <div className="mt-2 text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded border border-orange-200">
        💡 <strong>Demo Note:</strong> User role changes every 30 seconds to showcase different access levels
      </div>
    </motion.div>
  )
}
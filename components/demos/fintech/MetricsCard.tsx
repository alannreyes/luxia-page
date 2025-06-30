'use client'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface MetricProps {
  metric: {
    label: string
    value: string
    change?: string
    positive?: boolean
  }
  delay?: number
}

export default function MetricsCard({ metric, delay = 0 }: MetricProps) {
  return (
    <motion.div
      className="bg-gray-50 rounded-lg p-3 border border-gray-200"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.02 }}
    >
      <p className="text-xs text-gray-600 mb-1">{metric.label}</p>
      <div className="flex items-end justify-between">
        <p className="text-lg font-semibold text-gray-900">{metric.value}</p>
        {metric.change && (
          <div className={`flex items-center space-x-1 text-xs ${
            metric.positive ? 'text-green-600' : 'text-red-600'
          }`}>
            {metric.positive ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            <span>{metric.change}</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}
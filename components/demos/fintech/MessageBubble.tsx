'use client'
import { motion } from 'framer-motion'
import { Bot, User } from 'lucide-react'
import { Message } from './ChatInterface'
import ChartVisualization from './ChartVisualization'
import MetricsCard from './MetricsCard'

interface MessageBubbleProps {
  message: Message
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender === 'user'
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`flex items-start space-x-2 max-w-[80%] ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* Avatar */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser ? 'bg-blue-600' : 'bg-gradient-to-br from-purple-600 to-blue-600'
        }`}>
          {isUser ? (
            <User className="w-5 h-5 text-white" />
          ) : (
            <Bot className="w-5 h-5 text-white" />
          )}
        </div>
        
        {/* Message Content */}
        <div className="space-y-2">
          {/* Text Bubble */}
          <div className={`rounded-2xl px-4 py-2 ${
            isUser 
              ? 'bg-blue-600 text-white' 
              : 'bg-white border border-gray-200 text-gray-800'
          }`}>
            <p className="text-sm leading-relaxed">{message.text}</p>
          </div>
          
          {/* Metrics */}
          {message.metrics && message.metrics.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 gap-2 mt-2"
            >
              {message.metrics.map((metric, index) => (
                <MetricsCard key={index} metric={metric} delay={index * 0.1} />
              ))}
            </motion.div>
          )}
          
          {/* Chart */}
          {message.showChart && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <ChartVisualization 
                type={message.chartType || 'bar'} 
                data={message.chartData}
              />
            </motion.div>
          )}
          
          {/* Timestamp */}
          <p className="text-xs text-gray-500 mt-1">
            {message.timestamp.toLocaleTimeString('es-PE', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
'use client'
import { useState, useRef, useEffect } from 'react'
import { Send, Sparkles, Info } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import MessageBubble from './MessageBubble'
import QuestionSuggestions from './QuestionSuggestions'
import FintechDemoStackBadge from '../FinechDemoStackBadge'
import HowItWorksPanel from '../HowItWorksPanel'
import { aiResponses } from '@/lib/mockData/techflowData'
import type { Dictionary } from '@/lib/i18n/dictionaries'
import type { Locale } from '@/middleware'

export interface Message {
  id: string
  text: string
  sender: 'user' | 'ai'
  timestamp: Date
  chartData?: any[]
  metrics?: any[]
  showChart?: boolean
  chartType?: 'bar' | 'line' | 'pie'
}

interface ChatInterfaceProps {
  locale: Locale
  dictionary: Dictionary
}

export default function ChatInterface({ locale, dictionary }: ChatInterfaceProps) {
  const initialMessage: Message = {
    id: '1',
    text: dictionary.demos.fintech.initialMessage,
    sender: 'ai',
    timestamp: new Date()
  }
  const [messages, setMessages] = useState<Message[]>([initialMessage])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showHowItWorks, setShowHowItWorks] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    try {
      // Call real AI API
      const response = await fetch('/api/chat/fintech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          locale: locale
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      
      console.log('API Response:', data) // Debug log

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || data.error || 'Lo siento, no pude procesar tu pregunta.',
        sender: 'ai',
        timestamp: new Date(),
        metrics: data.metrics || [],
        chartData: data.chartData,
        showChart: data.showChart || false,
        chartType: data.chartType || 'bar'
      }

      setIsTyping(false)
      setMessages(prev => [...prev, aiResponse])

    } catch (error) {
      console.error('Error calling AI API:', error)
      
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: locale === 'es' 
          ? 'Lo siento, experimenté un error técnico. Por favor intenta de nuevo.' 
          : 'Sorry, I experienced a technical error. Please try again.',
        sender: 'ai',
        timestamp: new Date()
      }

      setIsTyping(false)
      setMessages(prev => [...prev, errorResponse])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSendMessage(inputValue)
  }

  const handleSuggestionClick = (question: string) => {
    handleSendMessage(question)
  }

  return (
    <div className="bg-gray-50 rounded-2xl shadow-xl overflow-hidden h-[600px] flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold">TechFlow AI Assistant</h3>
              <p className="text-xs text-white/80">Powered by Luxia</p>
            </div>
          </div>
          <button
            onClick={() => setShowHowItWorks(!showHowItWorks)}
            className="p-2 hover:bg-white/10 rounded-lg transition"
            title="¿Cómo funciona?"
          >
            <Info className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Stack Badge */}
      <div className="p-4 border-b border-gray-200">
        <FintechDemoStackBadge />
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center space-x-2 text-gray-500"
            >
              <div className="bg-gray-200 rounded-full px-4 py-2">
                <div className="flex space-x-1">
                  <motion.div
                    className="w-2 h-2 bg-gray-500 rounded-full"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-gray-500 rounded-full"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-gray-500 rounded-full"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Question Suggestions */}
      <QuestionSuggestions onSuggestionClick={handleSuggestionClick} dictionary={dictionary} />

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-white">
        <div className="flex space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={dictionary.demos.fintech.placeholder}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isTyping}
          />
          <motion.button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isTyping || !inputValue.trim()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
      </form>

      {/* How It Works Panel */}
      <AnimatePresence>
        {showHowItWorks && (
          <motion.div
            className="absolute top-20 right-4 z-50 max-w-sm"
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.95, x: 20 }}
          >
            <HowItWorksPanel isVisible={showHowItWorks} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
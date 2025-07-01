'use client'
import { useState, useEffect, useRef } from 'react'
import { Send, Sparkles } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface Message {
  id: string
  text: string
  sender: 'user' | 'ai'
  timestamp: Date
  chartData?: any
  showChart?: boolean
}

export default function SimpleChatDemo() {
  const [messages, setMessages] = useState<Message[]>([])
  const [initialGreeting, setInitialGreeting] = useState<string>('')
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Load initial greeting from API (ZERO HARDCODING)
  useEffect(() => {
    const loadInitialGreeting = async () => {
      try {
        const response = await fetch('/api/chat/fintech-mcp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: 'saludo inicial', locale: 'es' })
        })
        
        if (response.ok) {
          const data = await response.json()
          const greeting = data.response || '¡Hola! Soy tu asistente de TechFlow.'
          
          setMessages([{
            id: '1',
            text: greeting,
            sender: 'ai' as const,
            timestamp: new Date()
          }])
        }
      } catch (error) {
        console.error('Error loading greeting:', error)
        // Fallback only if API fails
        setMessages([{
          id: '1',
          text: '¡Hola! Soy tu asistente de TechFlow. ¿En qué puedo ayudarte con nuestra empresa de factoring?',
          sender: 'ai' as const,
          timestamp: new Date()
        }])
      }
    }
    
    loadInitialGreeting()
  }, [])

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    // Use setTimeout to ensure DOM has updated
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }, [messages])

  // Keep input focused after sending - improved focus management
  useEffect(() => {
    if (!isLoading) {
      // Delay focus to prevent interference with scroll
      setTimeout(() => {
        inputRef.current?.focus()
      }, 200)
    }
  }, [isLoading, messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('🎯 Form submitted with:', inputValue)
    console.log('🔄 Loading state:', isLoading)
    
    if (!inputValue.trim() || isLoading) {
      console.log('❌ Blocked: empty input or loading')
      return
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      sender: 'user' as const,
      timestamp: new Date()
    }

    // Store the input value before clearing it
    const currentInput = inputValue.trim()
    
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)
    
    // Immediately refocus input to prevent cursor issues
    inputRef.current?.focus()

    try {
      console.log('🚀 Sending request:', currentInput)
      
      const response = await fetch('/api/chat/fintech-mcp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentInput,
          locale: 'es'
        })
      })

      console.log('📡 Response status:', response.status)
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const data = await response.json()
      console.log('📊 API Response:', data)

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || 'Sorry, I could not process your question.',
        sender: 'ai' as const,
        timestamp: new Date(),
        chartData: data.chartData,
        showChart: data.showChart
      }

      setMessages(prev => [...prev, aiMessage])
      
      // Focus input again after response
      setTimeout(() => {
        inputRef.current?.focus()
      }, 300)

    } catch (error) {
      console.error('❌ Error:', error)
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered a technical error. Please try again.',
        sender: 'ai' as const,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, errorMessage])
    }

    setIsLoading(false)
  }

  const quickQuestions = [
    '¿Quién es el CEO?',
    'Ventas de los últimos años',
    '¿Qué hago si una factura es falsa?',
    '¿Cuál es el proceso de due diligence?'
  ]

  return (
    <div className="bg-white rounded-lg shadow-lg max-w-2xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5" />
            <h3 className="font-medium">TechFlow AI Assistant</h3>
            <span className="text-xs bg-green-500 px-2 py-1 rounded-full">🟢 Live</span>
          </div>
          <div className="text-xs bg-black/20 px-2 py-1 rounded-full">
            MCP + GPT-4o
          </div>
        </div>
        <div className="text-xs mt-1 opacity-90">
          💡 Pregúntame sobre TechFlow Factoring - datos reales, procedimientos, finanzas
        </div>
      </div>

      {/* Messages */}
      <div className="min-h-[300px] max-h-96 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-lg px-4 py-2 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              
              {/* Chart Display */}
              {message.showChart && message.chartData && (
                <div className="mt-3 bg-white p-3 rounded-lg border">
                  <div className="text-xs text-gray-600 mb-2">📊 Gráfico de datos:</div>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={message.chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="label" 
                          fontSize={10}
                          angle={-45}
                          textAnchor="end"
                          height={60}
                        />
                        <YAxis fontSize={10} />
                        <Tooltip 
                          formatter={(value: any) => [`$${(value/1000000).toFixed(1)}M`, 'Ventas']}
                          labelStyle={{ color: '#374151' }}
                        />
                        <Bar dataKey="value" fill="#3B82F6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
        
        {/* Invisible div to scroll to */}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick questions */}
      <div className="px-4 py-2 border-t border-gray-200">
        <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
        <div className="flex flex-wrap gap-2">
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => {
                console.log('📌 Quick question clicked:', question)
                setInputValue(question)
              }}
              className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded text-gray-700 transition"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
        <div className="flex flex-col space-y-2">
          <div className="flex space-x-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Pregúntame sobre TechFlow: CEO, ventas, procedimientos..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          
        </div>
      </form>
    </div>
  )
}
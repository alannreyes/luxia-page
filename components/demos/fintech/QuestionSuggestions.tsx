'use client'
import { motion } from 'framer-motion'
import { TrendingUp, Users, DollarSign, Calendar } from 'lucide-react'
import type { Dictionary } from '@/lib/i18n/dictionaries'

interface QuestionSuggestionsProps {
  onSuggestionClick: (question: string) => void
  dictionary: Dictionary
}

export default function QuestionSuggestions({ onSuggestionClick, dictionary }: QuestionSuggestionsProps) {
  const suggestions = [
    {
      icon: DollarSign,
      text: dictionary.demos.fintech.suggestions.sales,
      color: 'text-green-600'
    },
    {
      icon: Users,
      text: dictionary.demos.fintech.suggestions.bestSeller,
      color: 'text-blue-600'
    },
    {
      icon: TrendingUp,
      text: dictionary.demos.fintech.suggestions.projection,
      color: 'text-purple-600'
    },
    {
      icon: Calendar,
      text: dictionary.demos.fintech.suggestions.payments,
      color: 'text-red-600'
    }
  ]
  return (
    <div className="px-4 pb-2">
      <p className="text-xs text-gray-500 mb-2">{dictionary.demos.fintech.suggestions.title}</p>
      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
        {suggestions.map((suggestion, index) => {
          const Icon = suggestion.icon
          return (
            <motion.button
              key={index}
              onClick={() => onSuggestionClick(suggestion.text)}
              className="flex items-center space-x-2 bg-white border border-gray-200 rounded-full px-3 py-1.5 text-xs whitespace-nowrap hover:bg-gray-50 transition flex-shrink-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className={`w-3.5 h-3.5 ${suggestion.color}`} />
              <span className="text-gray-700">{suggestion.text}</span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
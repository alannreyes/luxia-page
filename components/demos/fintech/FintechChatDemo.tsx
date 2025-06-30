'use client'
import ChatInterface from './ChatInterface'
import type { Dictionary } from '@/lib/i18n/dictionaries'
import type { Locale } from '@/middleware'

interface FintechChatDemoProps {
  locale: Locale
  dictionary: Dictionary
}

export default function FintechChatDemo({ locale, dictionary }: FintechChatDemoProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
          {dictionary.demos.fintech.title}
        </h3>
        <p className="text-gray-600">
          {dictionary.demos.fintech.description}
        </p>
        <div className="flex flex-wrap justify-center gap-2 mt-3">
          {dictionary.demos.fintech.features.map((feature, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
      
      <ChatInterface locale={locale} dictionary={dictionary} />
    </div>
  )
}
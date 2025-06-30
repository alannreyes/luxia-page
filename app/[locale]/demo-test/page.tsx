import FintechChatDemo from '@/components/demos/fintech/FintechChatDemo'
import { getDictionary } from '@/lib/i18n/dictionaries'
import type { Locale } from '@/middleware'

interface DemoTestPageProps {
  params: {
    locale: Locale
  }
}

export default async function DemoTestPage({ params }: DemoTestPageProps) {
  const dictionary = await getDictionary(params.locale)

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🚀 Demo de IA Real - TechFlow Factoring
          </h1>
          <p className="text-gray-600 mb-2">
            Esta es una demo con IA REAL conectada a base de datos SQLite
          </p>
          
          {/* Status indicators */}
          <div className="flex justify-center space-x-4 mb-4">
            <div className="bg-green-100 border border-green-200 rounded-lg px-3 py-2">
              <span className="text-green-800 text-sm">✅ API Funcionando</span>
            </div>
            <div className="bg-blue-100 border border-blue-200 rounded-lg px-3 py-2">
              <span className="text-blue-800 text-sm">🤖 OpenAI Activo</span>
            </div>
            <div className="bg-purple-100 border border-purple-200 rounded-lg px-3 py-2">
              <span className="text-purple-800 text-sm">🔐 Control de Acceso</span>
            </div>
          </div>
          
          <div className="bg-blue-100 border border-blue-200 rounded-lg p-4 mb-6 max-w-2xl mx-auto">
            <h3 className="font-semibold text-blue-900 mb-2">Preguntas de prueba:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• "How many clients do we have?"</li>
              <li>• "What is the company name?"</li>
              <li>• "Show me employee salaries" (bloqueado por seguridad)</li>
              <li>• "Who works in sales?"</li>
              <li>• "What were our fees in May 2025?"</li>
            </ul>
          </div>
          
          <div className="bg-yellow-100 border border-yellow-200 rounded-lg p-3 mb-6 max-w-2xl mx-auto">
            <p className="text-yellow-800 text-sm">
              <strong>💡 Nota:</strong> Si hay problemas, abre Developer Tools (F12) y revisa la consola para logs de debug.
            </p>
          </div>
        </div>
        
        <FintechChatDemo locale={params.locale} dictionary={dictionary} />
      </div>
    </div>
  )
}
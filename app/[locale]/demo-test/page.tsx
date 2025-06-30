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
          <div className="bg-blue-100 border border-blue-200 rounded-lg p-4 mb-6 max-w-2xl mx-auto">
            <h3 className="font-semibold text-blue-900 mb-2">Preguntas de prueba:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• "¿Cuántos clientes tenemos?"</li>
              <li>• "¿Cuáles fueron nuestras tarifas totales en mayo de 2025?"</li>
              <li>• "Muéstrame la tendencia de crecimiento mensual"</li>
              <li>• "¿Qué empleados trabajan en ventas?"</li>
              <li>• "¿Cuál es nuestra tasa de factoring promedio?"</li>
            </ul>
          </div>
        </div>
        
        <FintechChatDemo locale={params.locale} dictionary={dictionary} />
      </div>
    </div>
  )
}
import SimpleChatDemo from '@/components/demos/fintech/SimpleChatDemo'

export default function SimpleTestPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🔧 Simple Chat Test
          </h1>
          <p className="text-gray-600 mb-4">
            Versión simplificada para debuggear problemas
          </p>
          
          <div className="bg-yellow-100 border border-yellow-200 rounded-lg p-3 mb-6 max-w-xl mx-auto">
            <p className="text-yellow-800 text-sm">
              <strong>🔍 Debug Mode:</strong> Abre Developer Tools (F12) y ve a Console para ver logs detallados
            </p>
          </div>
        </div>
        
        <SimpleChatDemo />
      </div>
    </div>
  )
}
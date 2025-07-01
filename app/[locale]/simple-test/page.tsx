import SimpleChatDemo from '@/components/demos/fintech/SimpleChatDemo'

export default function SimpleTestPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
            Demo Live
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
            Asistente IA conectado al ERP en tiempo real
          </p>
        </div>
      </div>

      {/* Demo Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              TechFlow AI Assistant
            </h2>
            <p className="text-gray-600 mb-6">
              Datos reales • MCP + GPT-4o
            </p>
          </div>
          
          <SimpleChatDemo />
        </div>
      </div>
    </div>
  )
}
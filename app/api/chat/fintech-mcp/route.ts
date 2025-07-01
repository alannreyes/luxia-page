import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Simple TechFlow company data for demo
const TECHFLOW_DATA = {
  ceo: 'Alan Reyes',
  headquarters: 'Miami, FL',
  founded: 'November 2023',
  employees: 8,
  clients: 10,
  mrr: '$517K',
  business: 'AI-powered invoice factoring'
}

export async function POST(request: NextRequest) {
  try {
    const { message, locale = 'es' } = await request.json()
    
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid message' }, 
        { status: 400 }
      )
    }

    console.log('🚀 User message:', message)
    
    // Simple greeting detection
    const isGreeting = message.toLowerCase().includes('hola') || 
                      message.toLowerCase().includes('hello') ||
                      message.toLowerCase().includes('saludo')
    
    let response = ''
    
    if (isGreeting) {
      response = `¡Hola! 👋 Soy tu asistente de TechFlow Factoring.

🏢 **Información de la empresa:**
👨‍💼 **CEO:** ${TECHFLOW_DATA.ceo}
📍 **Sede:** ${TECHFLOW_DATA.headquarters}  
📅 **Fundada:** ${TECHFLOW_DATA.founded}
👥 **Empleados:** ${TECHFLOW_DATA.employees}
🏢 **Clientes activos:** ${TECHFLOW_DATA.clients}
💰 **MRR:** ${TECHFLOW_DATA.mrr}
🚀 **Negocio:** ${TECHFLOW_DATA.business}

¿En qué puedo ayudarte hoy? Puedo contarte sobre nuestra empresa, procedimientos, finanzas y más.`
    } else {
      // Use OpenAI for other queries
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `Eres un asistente AI de TechFlow Factoring. 
            
Información de la empresa:
- CEO: ${TECHFLOW_DATA.ceo}
- Sede: ${TECHFLOW_DATA.headquarters}
- Fundada: ${TECHFLOW_DATA.founded}
- Empleados: ${TECHFLOW_DATA.employees}
- Clientes: ${TECHFLOW_DATA.clients}
- MRR: ${TECHFLOW_DATA.mrr}
- Negocio: ${TECHFLOW_DATA.business}

Responde en español de manera profesional y útil. Si no tienes información específica, di que puedes ayudar con información general de la empresa.`
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
      
      response = completion.choices[0]?.message?.content || 'Lo siento, no pude procesar tu pregunta.'
    }

    console.log('✅ Response generated:', response)
    
    return NextResponse.json({
      response: response,
      chartData: null,
      explanation: locale === 'es' 
        ? `Análisis profesional con información de TechFlow`
        : `Professional analysis with TechFlow information`,
      source: 'techflow-assistant'
    })

  } catch (error) {
    console.error('❌ API Error:', error)
    return NextResponse.json(
      { 
        error: 'Error interno del servidor',
        response: 'Lo siento, hubo un error procesando tu pregunta. Por favor intenta de nuevo.'
      }, 
      { status: 500 }
    )
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    service: 'TechFlow Assistant API',
    message: 'API ready for business queries'
  })
}
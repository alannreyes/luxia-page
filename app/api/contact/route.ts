import { Resend } from 'resend'
import { NextResponse } from 'next/server'

interface ContactFormData {
  name: string
  email: string
  company?: string
  message?: string
  industry?: string
  projectType?: string
  budget?: string
  timeline?: string
}

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const data: ContactFormData = await request.json()

    // Validate required fields
    if (!data.name || !data.email) {
      return NextResponse.json(
        { error: 'Nombre y email son requeridos' },
        { status: 400 }
      )
    }

    // Build email content
    const emailContent = `
Nueva consulta desde luxia.us

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DATOS DE CONTACTO
• Nombre: ${data.name}
• Email: ${data.email}
${data.company ? `• Empresa: ${data.company}` : ''}

${data.industry || data.projectType || data.budget || data.timeline ? `
DETALLES DEL PROYECTO
${data.industry ? `• Industria: ${data.industry}` : ''}
${data.projectType ? `• Tipo de proyecto: ${data.projectType}` : ''}
${data.budget ? `• Presupuesto: ${data.budget}` : ''}
${data.timeline ? `• Timeline: ${data.timeline}` : ''}
` : ''}

${data.message ? `
MENSAJE
${data.message}
` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Enviado desde luxia.us
`

    // Remitente y destinatario configurables por entorno (sin tocar código).
    // Para entrega FIABLE: verificar el dominio luxia.us en Resend y usar RESEND_FROM=LuxIA <contacto@luxia.us>.
    const from = process.env.RESEND_FROM || 'luxIA Contact <onboarding@resend.dev>'
    const to = (process.env.RESEND_TO || 'alann@luxia.us').split(',').map((s) => s.trim())

    const { data: sent, error } = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: `[luxIA] Nueva consulta de ${data.name}${data.company ? ` - ${data.company}` : ''}`,
      text: emailContent,
    })

    if (error) {
      console.error('[contact] Resend error:', JSON.stringify(error))
      return NextResponse.json({ error: 'Error enviando el mensaje' }, { status: 500 })
    }

    // Rastro para verificar entregas en el dashboard de Resend
    console.log('[contact] enviado id=%s to=%s', sent?.id, to.join(','))
    return NextResponse.json({ success: true, id: sent?.id ?? null })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Error procesando la solicitud' },
      { status: 500 }
    )
  }
}

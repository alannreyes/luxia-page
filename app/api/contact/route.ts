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

    const { error } = await resend.emails.send({
      from: 'luxIA Contact <onboarding@resend.dev>',
      to: ['alann@luxia.us'],
      replyTo: data.email,
      subject: `[luxIA] Nueva consulta de ${data.name}${data.company ? ` - ${data.company}` : ''}`,
      text: emailContent,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Error enviando el mensaje' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Error procesando la solicitud' },
      { status: 500 }
    )
  }
}

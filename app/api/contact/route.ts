import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const emailContent = {
  pt: {
    subject: 'Obrigado pelo seu interesse nos Serviços Legais AIMA',
    html: (name: string) => `
      <h1>Obrigado pelo seu interesse, ${name}!</h1>
      <p>Recebemos seu pedido de assistência com os serviços de agendamento da AIMA.</p>
      <p>Um de nossos especialistas jurídicos entrará em contato em breve para discutir como podemos ajudá-lo a garantir seu agendamento.</p>
      <p>Atenciosamente,</p>
      <p>Carlos Almeida</p>
    `
  },
  en: {
    subject: 'Thank you for your interest in AIMA Legal Services',
    html: (name: string) => `
      <h1>Thank you for your interest, ${name}!</h1>
      <p>We have received your request for assistance with AIMA appointment services.</p>
      <p>One of our legal experts will contact you shortly to discuss how we can help you secure your appointment.</p>
      <p>Best regards,</p>
      <p>Carlos Almeida</p>
    `
  }
}

export async function POST(request: Request) {
  try {
    const resendApiKey = process.env.RESEND_API_KEY
    if (!resendApiKey) {
      console.error('Missing RESEND_API_KEY environment variable')
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    const resend = new Resend(resendApiKey)
    const { name, email, language = 'pt' } = await request.json()
    const content = emailContent[language as keyof typeof emailContent]
    
    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Legal Support <help@aima-legal.hexgeta.com>',
      to: [email],
      subject: content.subject,
      html: content.html(name)
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
} 
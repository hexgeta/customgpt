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
      <p>Miguel Almeida</p>
    `
  },
  en: {
    subject: 'Thank you for your interest in AIMA Legal Services',
    html: (name: string) => `
      <h1>Thank you for your interest, ${name}!</h1>
      <p>We have received your request for assistance with AIMA appointment services.</p>
      <p>One of our legal experts will contact you shortly to discuss how we can help you secure your appointment.</p>
      <p>Best regards,</p>
      <p>Miguel Almeida</p>
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
    
    // Send email to the user
    const { data: userData, error: userError } = await resend.emails.send({
      from: 'Subpoena AIMA <contact@aima-legal.hexgeta.com>',
      to: [email],
      subject: content.subject,
      html: content.html(name),
      replyTo: 'contact@aima-legal.hexgeta.com'
    })

    // Send notification email to admin
    const { data: adminData, error: adminError } = await resend.emails.send({
      from: 'Subpoena AIMA <contact@aima-legal.hexgeta.com>',
      to: ['michael+aima-notification@twospouts.com'],
      subject: `New Form Submission: ${name}`,
      html: `
        <h1>New Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Language:</strong> ${language}</p>
      `,
      replyTo: 'contact@aima-legal.hexgeta.com'
    })

    if (userError || adminError) {
      console.error('Email error:', { userError, adminError })
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
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const emailContent = {
  pt: {
    subject: (name: string, email: string) => `Apoiojurídico Imigração Portugal | ${name} | ${email}`,
    html: (name: string) => `
      <p>Obrigado pelo seu interesse, ${name}!</p>
      <p>Recebemos o seu pedido de assistência jurídica para obter uma consulta na AIMA.</p>
      <p>Entraremos em contacto brevemente para discutir como podemos ajudá-lo.</p>
      <p>Atenciosamente,</p>
      <p>Miguel Pires</p>
    `
  },
  en: {
    subject: (name: string, email: string) => `Legal Support for Immigration Portugal | ${name} | ${email}`,
    html: (name: string) => `
      <p>Thank you for your interest, ${name}!</p>
      <p>We have received your request for legal assistance to get an appointment with AIMA.</p>
      <p>We will contact you shortly to discuss how we can help you.</p>
      <p>Best regards,</p>
      <p>Miguel Pires</p>
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
    const { name, email, phone, language = 'pt', visaType, isNewApplication, currentExpiry, contactAttempts } = await request.json()
    const content = emailContent[language as keyof typeof emailContent]
    
    // Send email to the user
    const { data: userData, error: userError } = await resend.emails.send({
      from: 'Apoiojurídico Imigração<contact@apoiojuridico-imigracao.com>',
      to: [email],
      subject: content.subject(name, email),
      html: content.html(name),
      replyTo: 'mk.mscsp@gmail.com'
    })

    // Send notification email to admin
    const { data: adminData, error: adminError } = await resend.emails.send({
      from: 'NEW LEAD<contact@apoiojuridico-imigracao.com>',
      to: ['michael+aima-notification@twospouts.com'],
      cc: ['mk.mscsp@gmail.com'],
      subject: `New Lead (Apoiojurídico Imigração) | ${name} | ${email}`,
      html: `
        <h1>New Lead (Apoiojurídico Imigração)</h1>
        <p><strong>Is New Application:</strong> ${isNewApplication ? 'Yes' : 'No'}</p>
        <p><strong>Visa Type:</strong> ${visaType}</p>
                ${!isNewApplication ? `<p><strong>Current Visa Expiry:</strong> ${currentExpiry}</p>` : ''}
        <p><strong>Number of AIMA Contact Attempts:</strong> ${contactAttempts}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email || 'Not provided'}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Language:</strong> ${language}</p>
      `
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
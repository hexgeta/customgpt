import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { name, email } = await request.json()

    await resend.emails.send({
      from: 'Legal Assistance <onboarding@resend.dev>',
      to: 'michael@twospouts.com',
      subject: 'New Legal Assistance Request',
      text: `New contact form submission:\n\nName: ${name}\nEmail: ${email}`,
    })
    
    return NextResponse.json({ message: 'Success' })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Error sending email' }, { status: 500 })
  }
} 
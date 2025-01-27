import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email } = body

    // You'll need to set up an email service like Nodemailer, SendGrid, or similar
    // For now, let's console.log the data
    console.log('Form submission:', { name, email, to: 'michael@twospouts.com' })

    // Here you would typically send an email
    // For example, using SendGrid or another email service

    return NextResponse.json({ message: 'Success' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error sending message' }, { status: 500 })
  }
} 
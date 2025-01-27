import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { name, email } = await request.json()
    
    // For now, just log the data since email is not set up
    console.log('Form submission:', { name, email })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
  }
} 
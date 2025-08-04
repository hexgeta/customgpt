import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// This API route will be called by Vercel's cron job
export async function POST(request: NextRequest) {
  try {
    // Check environment variables and log status
    const envStatus = {
      OPENAI_API_KEY: !!process.env.OPENAI_API_KEY,
      NEWS_API_KEY: !!process.env.NEWS_API_KEY,
      RESEND_API_KEY: !!process.env.RESEND_API_KEY,
      FROM_EMAIL: !!process.env.FROM_EMAIL,
      NOTIFICATION_EMAIL: !!process.env.NOTIFICATION_EMAIL,
      CRON_SECRET: !!process.env.CRON_SECRET
    };
    
    console.log('🔍 Environment Variables Status:', envStatus);
    
    // Verify the request is coming from Vercel Cron (optional security)
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      console.log('❌ CRON_SECRET mismatch or missing');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if this is a test request
    const isTest = request.nextUrl.searchParams.get('test') === 'true';
    
    console.log(`🚀 Starting ${isTest ? 'TEST' : 'PRODUCTION'} blog generation...`);
    
    // Warn about missing email configuration
    if (!process.env.RESEND_API_KEY) {
      console.log('⚠️ RESEND_API_KEY missing - email notifications will be skipped');
    }
    
    // Run the blog generation script
    const { stdout, stderr } = await execAsync('node scripts/blog-generator.js', {
      cwd: process.cwd(),
      env: { 
        ...process.env,
        NODE_ENV: isTest ? 'test' : process.env.NODE_ENV
      }
    });

    console.log('Blog generation output:', stdout);
    if (stderr) {
      console.error('Blog generation errors:', stderr);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Blog generation completed successfully',
      output: stdout,
      envStatus: envStatus
    });

  } catch (error) {
    console.error('Failed to generate blog posts:', error);
    
    return NextResponse.json({ 
      error: 'Blog generation failed', 
      details: error instanceof Error ? error.message : 'Unknown error',
      envStatus: {
        OPENAI_API_KEY: !!process.env.OPENAI_API_KEY,
        NEWS_API_KEY: !!process.env.NEWS_API_KEY,
        RESEND_API_KEY: !!process.env.RESEND_API_KEY,
        FROM_EMAIL: !!process.env.FROM_EMAIL,
        NOTIFICATION_EMAIL: !!process.env.NOTIFICATION_EMAIL,
        CRON_SECRET: !!process.env.CRON_SECRET
      }
    }, { status: 500 });
  }
}

// Optional: Allow manual triggering via GET request
export async function GET() {
  return NextResponse.json({ 
    message: 'Blog generation endpoint is active. Use POST to trigger generation.',
    time: new Date().toISOString()
  });
}
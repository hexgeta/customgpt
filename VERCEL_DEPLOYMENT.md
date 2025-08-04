# Deploying Blog Automation to Vercel

## Overview

Your blog automation will run automatically in the cloud using Vercel's cron job functionality. The system will generate 1 new blog post every 10 minutes.

## Setup Steps

### 1. Deploy to Vercel

```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Deploy your project
vercel --prod
```

### 2. Configure Environment Variables in Vercel

Go to your Vercel dashboard → Project → Settings → Environment Variables

Add all variables from your `.env.local`:

```bash
# Required API Keys
OPENAI_API_KEY=your_openai_api_key_here
NEWS_API_KEY=your_news_api_key_here
RESEND_API_KEY=your_resend_api_key_here

# Email Configuration
FROM_EMAIL=notifications@lookintomaxi.com
NOTIFICATION_EMAIL=michael+notification@twospouts.com

# Security (generate a random string)
CRON_SECRET=abc123xyz789randomsecret
```

### 3. Update Domain Settings

**In Vercel Environment Variables:**

- Email links are hardcoded to use `https://www.apoiojuridico-imigracao.com`
- No additional domain configuration needed

### 4. Verify Cron Job Setup

The `vercel.json` file configures:

- **Schedule:** Every 10 minutes (`*/10 * * * *`)
- **Endpoint:** `/api/generate-blog`
- **Timeout:** 5 minutes (enough for blog generation)

## How It Works

### Automated Flow

1. **Vercel cron job** triggers every 10 minutes
2. **API endpoint** (`/api/generate-blog`) executes
3. **Blog generation script** runs in serverless function
4. **New posts** are created in your repository
5. **Email notification** sent to you automatically
6. **Website updates** immediately with new content

### Manual Triggering

You can also trigger blog generation manually:

```bash
# Test the endpoint
curl -X POST https://your-domain.vercel.app/api/generate-blog \
  -H "Authorization: Bearer your_cron_secret"
```

## Monitoring & Troubleshooting

### Check Cron Job Status

1. Go to Vercel Dashboard → Functions
2. View logs for `/api/generate-blog`
3. Check execution history and any errors

### View Logs

```bash
# View Vercel function logs
vercel logs your-project-name
```

### Common Issues

**"Unauthorized" Error:**

- Check `CRON_SECRET` environment variable is set
- Ensure the secret matches between Vercel and your API

**"Function Timeout":**

- Current limit is 5 minutes (300 seconds)
- If generation takes longer, consider reducing `POSTS_PER_DAY`

**"API Key Not Found":**

- Verify all environment variables are set in Vercel dashboard
- Check variable names match exactly

## Cron Schedule Options

Edit `vercel.json` to change the schedule:

```json
{
  "crons": [
    {
      "path": "/api/generate-blog",
      "schedule": "0 9 * * *" // Daily at 9 AM UTC
    }
  ]
}
```

**Schedule Examples:**

- `0 9 * * *` - Daily at 9 AM UTC
- `0 9 * * 1-5` - Weekdays only at 9 AM UTC
- `0 */6 * * *` - Every 6 hours
- `0 9,18 * * *` - Twice daily at 9 AM and 6 PM UTC

## Alternative Deployment Options

### Option 1: GitHub Actions (Free)

- Set up GitHub Actions workflow
- Runs on GitHub's infrastructure
- Free for public repositories

### Option 2: Railway/Render

- Deploy Node.js scripts directly
- Built-in cron job support
- Slightly more complex setup

### Option 3: External Cron Services

- Use services like EasyCron or cron-job.org
- Hit your Vercel API endpoint on schedule
- Good backup option

## Security Best Practices

1. **Use CRON_SECRET** to secure your endpoint
2. **Verify domain** in Resend for email sending
3. **Monitor logs** for any suspicious activity
4. **Rate limit** your API endpoints if needed

## Cost Considerations

**Vercel Pro Plan Features:**

- Longer function execution time (5 minutes)
- More function invocations
- Better performance

**Free Tier Limits:**

- 100GB bandwidth/month
- 100GB-hrs function execution
- Should be sufficient for daily blog generation

Your blog automation will run completely automatically in the cloud, generating fresh content daily and emailing you the results! 🚀

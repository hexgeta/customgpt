# Testing Blog Automation Guide

## Local Testing

### Test 1: Generate Single Blog Post

```bash
# Generate just 1 post locally (faster testing)
npm run blog:test-1
```

### Test 2: Test Email System

```bash
# Send test email with latest 5 posts
npm run blog:test-email
```

### Test 3: Test API Endpoint Locally

```bash
# Start your Next.js development server
npm run dev

# In another terminal, test the API endpoint
npm run blog:test-api
```

## Production Testing (Vercel)

### Test 1: Test Deployed API Endpoint

```bash
# Test with 1 post generation
npm run blog:test-api https://your-domain.vercel.app

# Test with full 10 post generation
npm run blog:test-api https://your-domain.vercel.app --production
```

### Test 2: Manual Trigger via cURL

```bash
# Test mode (1 post)
curl -X POST "https://your-domain.vercel.app/api/generate-blog?test=true" \
  -H "Authorization: Bearer your_cron_secret" \
  -H "Content-Type: application/json"

# Production mode (10 posts)
curl -X POST "https://your-domain.vercel.app/api/generate-blog" \
  -H "Authorization: Bearer your_cron_secret" \
  -H "Content-Type: application/json"
```

### Test 3: Check Vercel Function Logs

1. Go to Vercel Dashboard
2. Navigate to your project
3. Click "Functions" tab
4. View logs for `/api/generate-blog`

## Test Modes

### Test Mode Features

- ✅ **Generates only 1 post** (faster, cheaper)
- ✅ **Same email notification**
- ✅ **Full duplicate prevention**
- ✅ **Real content generation**

### Production Mode Features

- 🚀 **Generates 10 posts** (full automation)
- 📧 **Email with all new posts**
- 🔄 **Daily schedule via cron**

## Expected Outputs

### Successful Test (1 post):

```
🚀 Starting TEST blog generation...
📰 Fetching trending immigration topics...
📋 Found 1 topics to process
📝 Processing 1/1: [Topic Title]
✍️ Generating content for: [Topic Title]
✅ Successfully generated 1 blog posts!
📧 Sending completion notification for 1 new posts...
✅ Email notification sent successfully
```

### Successful Production (10 posts):

```
🚀 Starting PRODUCTION blog generation...
📰 Fetching trending immigration topics...
📋 Found 10 topics to process
📝 Processing 1/10: [Topic 1]
📝 Processing 2/10: [Topic 2]
...
✅ Successfully generated 10 blog posts!
📧 Sending completion notification for 10 new posts...
✅ Email notification sent successfully
```

## Troubleshooting

### Common Test Issues

**"Unauthorized" Error:**

```bash
# Add CRON_SECRET to your .env.local
echo "CRON_SECRET=test-secret-123" >> .env.local
```

**"API Key Not Found":**

- Verify `OPENAI_API_KEY` is in `.env.local`
- Check Vercel environment variables

**"Function Timeout":**

- Test mode should complete in ~30 seconds
- Production mode may take 2-5 minutes

### Local Development Setup

```bash
# Make sure all dependencies are installed
npm install

# Verify environment variables
cat .env.local

# Start development server
npm run dev

# Test in another terminal
npm run blog:test-api
```

### Vercel Deployment Verification

```bash
# Deploy to Vercel
vercel --prod

# Test immediately after deployment
npm run blog:test-api https://your-domain.vercel.app

# Check function logs in Vercel dashboard
```

## Cron Job Testing

### Test Cron Schedule

The cron job runs daily at 9:00 AM UTC. To test:

1. **Change schedule** temporarily in `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/generate-blog",
      "schedule": "*/5 * * * *"
    }
  ]
}
```

2. **Deploy changes:**

```bash
vercel --prod
```

3. **Wait 5 minutes** and check Vercel logs

4. **Revert schedule** back to daily:

```json
{
  "crons": [
    {
      "path": "/api/generate-blog",
      "schedule": "0 9 * * *"
    }
  ]
}
```

### Monitor Cron Execution

- Vercel Dashboard → Functions → `/api/generate-blog`
- Check execution history and logs
- Verify email notifications are received

## Cost Optimization for Testing

### Test Mode Benefits:

- 🏷️ **90% less OpenAI usage** (1 post vs 10)
- ⚡ **Faster execution** (~30s vs 5min)
- 📧 **Same email testing**
- 🔄 **Full system validation**

### Testing Strategy:

1. **Use test mode** for frequent testing
2. **Use production mode** only for final validation
3. **Monitor API usage** in OpenAI dashboard
4. **Test emails** separately with `npm run blog:test-email`

This testing setup lets you validate the entire system quickly and cheaply! 🚀

# Automated Blog Generation System

This system automatically generates SEO-optimized blog posts every 10 minutes based on trending immigration and AIMA-related topics.

## Features

- 🔍 **Smart Topic Discovery**: Monitors news APIs and social media for trending immigration topics
- 🤖 **AI Content Generation**: Uses OpenAI GPT-4 to create high-quality, comprehensive blog posts
- 📝 **SEO Optimization**: Generates optimized titles, meta descriptions, and content structure
- ⏰ **Automated Scheduling**: Runs every 10 minutes to generate fresh content
- 🚫 **Duplicate Prevention**: Intelligent tracking system prevents writing on the same topics twice
- 📊 **Topic Analytics**: Tracks all generated content and provides statistics
- 🎯 **Niche Focus**: Specializes in Portuguese immigration, AIMA procedures, and visa topics
- 🔄 **Topic Variations**: Automatically generates fresh angles when topics run low

## Quick Start

### 1. Initial Setup

```bash
# Run the automated setup
npm run blog:setup

# This will:
# - Install required dependencies
# - Create .env file
# - Set up directories and scripts
# - Add NPM commands
```

### 2. Configure API Keys

Edit `.env` file and add your API keys:

```env
OPENAI_API_KEY=your_openai_api_key_here
NEWS_API_KEY=your_news_api_key_here
```

**Get API Keys:**

- OpenAI: https://platform.openai.com/api-keys
- News API: https://newsapi.org/register

### 3. Test the System

```bash
# Test generation with a single post
npm run blog:test

# Generate posts immediately
npm run blog:now
```

### 4. Start Daily Automation

```bash
# Start the scheduler (runs in background)
npm run blog:schedule
```

## Available Commands

| Command                   | Description                       |
| ------------------------- | --------------------------------- |
| `npm run blog:setup`      | One-time setup and configuration  |
| `npm run blog:generate`   | Generate posts once manually      |
| `npm run blog:test`       | Test generation with validation   |
| `npm run blog:now`        | Generate posts immediately        |
| `npm run blog:schedule`   | Start daily automated scheduler   |
| `npm run blog:topics`     | View all tracked topics and stats |
| `npm run blog:test-email` | Test email notification system    |

## How It Works

### 1. Topic Discovery

- Monitors trending news using News API
- Searches for immigration-related keywords
- Includes evergreen topics for consistent content
- Removes duplicates and prioritizes by relevance

### 2. Content Generation

- Uses OpenAI GPT-4 for high-quality content
- Generates 1500-2000 word articles
- Includes proper SEO structure
- Creates table of contents
- Focuses on actionable immigration advice

### 3. File Creation

- Automatically creates Next.js page files
- Generates proper React components
- Includes metadata and SEO tags
- Uses your existing BlogPost component
- Creates URL-friendly slugs

### 4. Quality Control

- Validates content before publishing
- Ensures proper formatting
- Checks for duplicate topics
- Maintains consistent branding

## Configuration

### Environment Variables

```env
# Required
OPENAI_API_KEY=your_key
NEWS_API_KEY=your_key

# Optional Customization
POSTS_PER_DAY=10
GENERATION_TIME=09:00
TIMEZONE=Europe/Lisbon
MIN_WORD_COUNT=1500
MAX_WORD_COUNT=2500
```

### Content Topics

The system focuses on these keywords:

- immigration, visa, AIMA, Portugal
- residency, permit, SEF, golden visa
- digital nomad, EU citizenship, Schengen
- work permit, student visa, family reunification
- Portuguese immigration, Brexit immigration

## File Structure

```
scripts/
├── blog-generator.js    # Main generation logic
├── scheduler.js         # Automated scheduling
├── setup.js            # One-time setup script
├── README.md           # This documentation
├── logs/               # Generated logs
├── cache/              # Temporary cache files
└── crontab-entry.txt   # System cron job template

app/blog/
├── components/
│   └── BlogPost.tsx    # Your existing blog component
└── [generated-posts]/  # Auto-generated blog posts
    └── page.tsx
```

## Monitoring & Logs

### View Logs

```bash
# Scheduler logs
tail -f scripts/scheduler.log

# Check last run status
cat scripts/last-run.json
```

### Generated Content

- Each post is created in `app/blog/[slug]/page.tsx`
- Metadata includes SEO optimization
- Content follows your existing BlogPost structure
- Automatic URL routing through Next.js

## Troubleshooting

### Common Issues

**"API key not found"**

- Check `.env` file exists and has correct keys
- Ensure `.env` is in project root (not scripts folder)

**"No topics found"**

- Check News API key and quota
- Verify internet connection
- System will use evergreen topics as fallback

**"Content generation failed"**

- Check OpenAI API key and credits
- Verify API quota limits
- System includes fallback content generation

**"File creation failed"**

- Check write permissions in app/blog/ directory
- Ensure Next.js structure is correct
- Verify BlogPost component exists

### Debug Mode

Run with debug output:

```bash
DEBUG=true npm run blog:generate
```

### Reset System

```bash
# Clear cache and logs
rm -rf scripts/logs scripts/cache scripts/last-run.json

# Regenerate setup
npm run blog:setup
```

## Production Deployment

### Server Deployment

1. **Environment Setup**

```bash
# On your server
git clone your-repo
cd your-repo
npm install
npm run blog:setup
```

2. **Configure Environment**

```bash
# Add production API keys
vim .env
```

3. **Start Scheduler**

```bash
# Option 1: PM2 (recommended)
npm install -g pm2
pm2 start scripts/scheduler.js --name "blog-scheduler"
pm2 save
pm2 startup

# Option 2: System service
sudo systemctl create blog-scheduler.service
```

4. **Monitor**

```bash
pm2 logs blog-scheduler
```

### System Cron (Alternative)

Add to system crontab for daily generation at 9 AM:

```cron
0 9 * * * cd /path/to/your/project && npm run blog:generate
```

## Performance

- **Generation time**: ~2-3 minutes for 10 posts
- **API costs**: ~$2-5 per day (OpenAI + News API)
- **Storage**: ~50KB per post
- **Rate limits**: Built-in delays to respect API limits

## Customization

### Content Templates

Edit `blog-generator.js` to customize:

- Content structure and style
- SEO optimization approach
- Table of contents generation
- Topic selection criteria

### Scheduling

Modify `scheduler.js` for:

- Different generation times
- Multiple runs per day
- Custom timezone handling
- Advanced error handling

### Topics & Keywords

Update keyword arrays in `blog-generator.js`:

```javascript
this.keywords = ["your", "custom", "keywords"];
```

## Support

For issues or questions:

1. Check the troubleshooting section above
2. Review logs in `scripts/scheduler.log`
3. Test individual components with debug mode
4. Ensure all API keys are valid and have quota

## Costs

**Estimated monthly costs:**

- OpenAI API: $60-150 (varies by usage)
- News API: Free tier usually sufficient
- **Total**: ~$60-150/month for 300 posts

**ROI Considerations:**

- 300 high-quality blog posts per month
- Improved SEO and organic traffic
- Automated content marketing
- Time savings vs manual writing

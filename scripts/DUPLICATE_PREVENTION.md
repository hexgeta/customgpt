# Duplicate Prevention System

## Overview

The automated blog generation system includes a sophisticated duplicate prevention mechanism that ensures you never write about the same topic twice.

## How It Works

### Topic Tracking Database

The system maintains a persistent database (`scripts/generated-topics.json`) that tracks:

```json
{
  "topics": [
    {
      "title": "Complete Guide to Getting an AIMA Appointment in 2024",
      "keyword": "AIMA appointments",
      "slug": "aima-appointment-guide",
      "dateGenerated": "2024-02-20T10:30:00.000Z",
      "id": "aima-appointment-guide"
    }
  ],
  "lastUpdated": "2024-02-20T10:30:00.000Z"
}
```

### Similarity Detection Algorithm

Topics are considered duplicates if they exceed a **70% similarity threshold** using:

1. **Jaccard Similarity** on word sets
2. **Title comparison** (normalized and cleaned)
3. **Keyword overlap** analysis

#### Example Similarity Checks:

- "AIMA Appointment Guide" vs "Complete AIMA Appointment Tutorial" = **85% similar** ❌ (blocked)
- "AIMA Appointments" vs "Golden Visa Process" = **15% similar** ✅ (allowed)
- "Work Permit Portugal" vs "Portugal Work Visa Guide" = **75% similar** ❌ (blocked)

### Automatic Initialization

On first run, the system:

1. **Scans existing blog posts** in `app/blog/` directory
2. **Extracts titles and keywords** from each post
3. **Populates the tracker** with current content
4. **Prevents future duplicates** based on existing content

### Topic Variations

When original topics are exhausted, the system generates fresh angles:

```javascript
const angles = [
  "2024 Update: ",
  "Complete Guide to ",
  "Common Mistakes in ",
  "Expert Tips for ",
  "Latest Changes in ",
  "Step-by-Step Guide to ",
  "Troubleshooting ",
  "Advanced Strategies for ",
];
```

## Usage Commands

### View All Tracked Topics

```bash
npm run blog:topics
```

**Output:**

```
📊 Topic Tracker Statistics
==================================================
Total Topics: 15
Unique Keywords: 12
Date Range: 2/15/2024 - 2/20/2024

🗂️ All Tracked Topics
==================================================
1. Complete Guide to Getting an AIMA Appointment in 2024
   Keyword: AIMA appointments
   Slug: aima-appointment-guide
   Date: 2/20/2024

2. Portugal Golden Visa Program Changes
   Keyword: golden visa
   Slug: portugal-golden-visa-program-changes
   Date: 2/20/2024

[... continues for all topics]
```

### Generate New Content

The system automatically checks for duplicates during generation:

```bash
npm run blog:now
```

**Console Output:**

```
🔍 Checking for duplicate topics...
📊 Topic Analysis:
   - Original topics found: 8
   - After deduplication: 6
   - After duplicate check: 4
🚫 Duplicate topic detected:
   New: "AIMA Appointment Process Guide"
   Existing: "Complete Guide to Getting an AIMA Appointment in 2024"
   Title similarity: 85.7%
⚡ Generating topic variations to reach target...
✅ Successfully generated 10 blog posts!
```

## Configuration

### Similarity Threshold

Adjust the similarity threshold in `scripts/topic-tracker.js`:

```javascript
constructor() {
  this.similarityThreshold = 0.7; // 70% threshold
}
```

**Recommended values:**

- **0.6 (60%)**: More permissive, allows closer topics
- **0.7 (70%)**: Balanced (default)
- **0.8 (80%)**: Stricter, prevents very similar topics

### Topic Cleanup

Remove old topics automatically:

```javascript
// Clean topics older than 1 year (default)
this.topicTracker.cleanOldTopics(365);

// Clean topics older than 6 months
this.topicTracker.cleanOldTopics(180);
```

## Advanced Features

### Manual Topic Management

#### Remove Specific Topic

```javascript
const TopicTracker = require("./scripts/topic-tracker");
const tracker = new TopicTracker();

// Remove by slug
tracker.removeTopic("old-topic-slug");
```

#### Check if Topic is Duplicate

```javascript
const isDuplicate = tracker.isDuplicateTopic(
  "New AIMA Guide",
  "AIMA procedures"
);
console.log(isDuplicate); // true/false
```

### Integration with Custom Sources

Add custom topic sources while maintaining duplicate prevention:

```javascript
// In blog-generator.js
const customTopics = await fetchCustomTopics();
const uniqueTopics = this.topicTracker.getUncoveredTopics(customTopics);
```

## File Structure

```
scripts/
├── topic-tracker.js           # Core tracking logic
├── generated-topics.json      # Persistent topic database
├── view-topics.js             # CLI topic viewer
└── blog-generator.js          # Main generator (integrated)
```

## Benefits

✅ **Never duplicate content**  
✅ **Automatic topic tracking**  
✅ **Intelligent similarity detection**  
✅ **Fresh content angles**  
✅ **Persistent across restarts**  
✅ **Scalable topic management**

## Troubleshooting

### Reset Topic Database

```bash
# Remove topic database to start fresh
rm scripts/generated-topics.json

# Next run will reinitialize from existing posts
npm run blog:now
```

### False Positive Duplicates

If the system incorrectly flags topics as duplicates:

1. **Lower similarity threshold** (0.6 instead of 0.7)
2. **Check topic wording** for unexpected overlaps
3. **Use more specific keywords** to differentiate topics

### Topic Variations Not Generated

If the system can't generate enough unique topics:

1. **Add more source keywords** in `this.keywords` array
2. **Expand topic variation angles** in `generateTopicVariations()`
3. **Include more news sources** for broader topic discovery

The duplicate prevention system ensures your blog maintains high-quality, unique content while scaling efficiently over time.

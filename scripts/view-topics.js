#!/usr/bin/env node

const TopicTracker = require('./topic-tracker');

function displayTopics() {
  const tracker = new TopicTracker();
  const stats = tracker.getStats();
  const topics = tracker.listAllTopics();
  
  console.log('📊 Topic Tracker Statistics');
  console.log('=' .repeat(50));
  console.log(`Total Topics: ${stats.totalTopics}`);
  console.log(`Unique Keywords: ${stats.uniqueKeywords}`);
  console.log(`Date Range: ${stats.oldestTopic ? new Date(stats.oldestTopic).toLocaleDateString() : 'N/A'} - ${stats.newestTopic ? new Date(stats.newestTopic).toLocaleDateString() : 'N/A'}`);
  console.log('');
  
  if (topics.length === 0) {
    console.log('No topics tracked yet. Run blog generation to start tracking.');
    return;
  }
  
  console.log('🗂️ All Tracked Topics');
  console.log('=' .repeat(50));
  
  topics.forEach((topic, index) => {
    const date = new Date(topic.dateGenerated).toLocaleDateString();
    console.log(`${index + 1}. ${topic.title}`);
    console.log(`   Keyword: ${topic.keyword || 'N/A'}`);
    console.log(`   Slug: ${topic.slug}`);
    console.log(`   Date: ${date}`);
    console.log('');
  });
}

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log('Topic Tracker Viewer');
    console.log('');
    console.log('Usage:');
    console.log('  node view-topics.js          Show all tracked topics');
    console.log('  node view-topics.js --help   Show this help');
    console.log('');
  } else {
    displayTopics();
  }
}

module.exports = { displayTopics };
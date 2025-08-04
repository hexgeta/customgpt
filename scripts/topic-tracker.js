const fs = require('fs');
const path = require('path');

class TopicTracker {
  constructor() {
    this.trackerFile = path.join(__dirname, 'generated-topics.json');
    this.similarityThreshold = 0.7; // 70% similarity threshold
  }

  // Load existing topics from file
  loadExistingTopics() {
    try {
      if (fs.existsSync(this.trackerFile)) {
        const data = fs.readFileSync(this.trackerFile, 'utf8');
        return JSON.parse(data);
      }
    } catch (error) {
      console.log('No existing topics file found, starting fresh');
    }
    return { topics: [], lastUpdated: new Date().toISOString() };
  }

  // Save topics to file
  saveTopics(topicsData) {
    topicsData.lastUpdated = new Date().toISOString();
    fs.writeFileSync(this.trackerFile, JSON.stringify(topicsData, null, 2));
  }

  // Calculate similarity between two strings
  calculateSimilarity(str1, str2) {
    const s1 = str1.toLowerCase().trim();
    const s2 = str2.toLowerCase().trim();
    
    // Exact match
    if (s1 === s2) return 1.0;
    
    // Jaccard similarity based on words
    const words1 = new Set(s1.split(/\s+/));
    const words2 = new Set(s2.split(/\s+/));
    
    const intersection = new Set([...words1].filter(x => words2.has(x)));
    const union = new Set([...words1, ...words2]);
    
    return intersection.size / union.size;
  }

  // Check if topic is too similar to existing ones
  isDuplicateTopic(newTitle, newKeyword) {
    const existingData = this.loadExistingTopics();
    
    for (const existingTopic of existingData.topics) {
      // Check title similarity
      const titleSimilarity = this.calculateSimilarity(newTitle, existingTopic.title);
      
      // Check keyword similarity
      const keywordSimilarity = this.calculateSimilarity(
        newKeyword || '', 
        existingTopic.keyword || ''
      );
      
      // Check if either title or keyword similarity exceeds threshold
      if (titleSimilarity >= this.similarityThreshold || 
          keywordSimilarity >= this.similarityThreshold) {
        console.log(`🚫 Duplicate topic detected:`);
        console.log(`   New: "${newTitle}" (${newKeyword})`);
        console.log(`   Existing: "${existingTopic.title}" (${existingTopic.keyword})`);
        console.log(`   Title similarity: ${(titleSimilarity * 100).toFixed(1)}%`);
        console.log(`   Keyword similarity: ${(keywordSimilarity * 100).toFixed(1)}%`);
        return true;
      }
    }
    
    return false;
  }

  // Add topic to tracking
  addTopic(title, keyword, slug, date = null) {
    const existingData = this.loadExistingTopics();
    
    const newTopic = {
      title: title,
      keyword: keyword || '',
      slug: slug,
      dateGenerated: date || new Date().toISOString(),
      id: this.generateTopicId(title, keyword)
    };
    
    existingData.topics.push(newTopic);
    this.saveTopics(existingData);
    
    console.log(`✅ Added topic to tracker: "${title}"`);
    return newTopic;
  }

  // Generate unique ID for topic
  generateTopicId(title, keyword) {
    const combined = `${title}-${keyword || ''}`;
    return combined.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .substring(0, 50);
  }

  // Get topic suggestions that haven't been covered
  getUncoveredTopics(candidateTopics) {
    return candidateTopics.filter(topic => 
      !this.isDuplicateTopic(topic.title, topic.keyword)
    );
  }

  // Clean old topics (optional - remove topics older than X days)
  cleanOldTopics(daysOld = 365) {
    const existingData = this.loadExistingTopics();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);
    
    const filteredTopics = existingData.topics.filter(topic => {
      const topicDate = new Date(topic.dateGenerated);
      return topicDate >= cutoffDate;
    });
    
    if (filteredTopics.length < existingData.topics.length) {
      console.log(`🧹 Cleaned ${existingData.topics.length - filteredTopics.length} old topics`);
      existingData.topics = filteredTopics;
      this.saveTopics(existingData);
    }
  }

  // Get statistics
  getStats() {
    const existingData = this.loadExistingTopics();
    const topics = existingData.topics;
    
    const stats = {
      totalTopics: topics.length,
      uniqueKeywords: [...new Set(topics.map(t => t.keyword).filter(k => k))].length,
      oldestTopic: topics.length > 0 ? topics[0].dateGenerated : null,
      newestTopic: topics.length > 0 ? topics[topics.length - 1].dateGenerated : null
    };
    
    return stats;
  }

  // List all tracked topics
  listAllTopics() {
    const existingData = this.loadExistingTopics();
    return existingData.topics;
  }

  // Remove topic by slug (if needed)
  removeTopic(slug) {
    const existingData = this.loadExistingTopics();
    const initialLength = existingData.topics.length;
    
    existingData.topics = existingData.topics.filter(topic => topic.slug !== slug);
    
    if (existingData.topics.length < initialLength) {
      this.saveTopics(existingData);
      console.log(`🗑️ Removed topic with slug: ${slug}`);
      return true;
    }
    
    console.log(`❌ Topic with slug "${slug}" not found`);
    return false;
  }
}

module.exports = TopicTracker;
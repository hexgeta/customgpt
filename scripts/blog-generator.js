#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Try to load .env.local first, then .env
const envLocalPath = path.join(__dirname, '../.env.local');
const envPath = path.join(__dirname, '../.env');

if (fs.existsSync(envLocalPath)) {
  require('dotenv').config({ path: envLocalPath });
} else if (fs.existsSync(envPath)) {
  require('dotenv').config({ path: envPath });
}

const https = require('https');
const crypto = require('crypto');
const TopicTracker = require('./topic-tracker');
const EmailNotifier = require('./email-notifier');

class AutomatedBlogGenerator {
  constructor() {
    this.config = {
      openaiApiKey: process.env.OPENAI_API_KEY,
      newsApiKey: process.env.NEWS_API_KEY,
      postsPerDay: process.env.NODE_ENV === 'test' ? 1 : (parseInt(process.env.POSTS_PER_DAY) || 1),
      blogPath: path.join(__dirname, '../app/blog'),
      topicsFile: path.join(__dirname, 'topics.json'),
      lastRunFile: path.join(__dirname, 'last-run.json')
    };
    
    this.topicTracker = new TopicTracker();
    this.emailNotifier = new EmailNotifier();
    
    this.newsApiUrl = 'https://newsapi.org/v2/everything';
    this.openaiApiUrl = 'https://api.openai.com/v1/chat/completions';
    
    // Immigration-related keywords for monitoring
    this.keywords = [
      'immigration', 'visa', 'AIMA', 'Portugal', 'residency', 'permit',
      'SEF', 'golden visa', 'digital nomad', 'EU citizenship', 'Schengen',
      'work permit', 'student visa', 'family reunification', 'Portuguese immigration',
      'Brexit immigration', 'non-EU citizens', 'residence permit renewal'
    ];
  }

  // Fetch trending topics from multiple sources
  async fetchTrendingTopics() {
    console.log('📰 Fetching trending immigration topics...');
    
    const topics = [];
    
    // Fetch from News API
    for (const keyword of this.keywords.slice(0, 5)) { // Limit API calls
      try {
        const newsData = await this.fetchFromNewsAPI(keyword);
        topics.push(...newsData);
      } catch (error) {
        console.error(`Error fetching news for ${keyword}:`, error.message);
      }
    }
    
    // Add some evergreen topics if we don't have enough
    const evergreenTopics = this.getEvergreenTopics();
    topics.push(...evergreenTopics);
    
    // Remove duplicates and limit
    const uniqueTopics = this.removeDuplicateTopics(topics);
    
    // Filter out topics that have already been covered
    console.log('🔍 Checking for duplicate topics...');
    const uncoveredTopics = this.topicTracker.getUncoveredTopics(uniqueTopics);
    
    console.log(`📊 Topic Analysis:`);
    console.log(`   - Original topics found: ${topics.length}`);
    console.log(`   - After deduplication: ${uniqueTopics.length}`);
    console.log(`   - After duplicate check: ${uncoveredTopics.length}`);
    
    // If we don't have enough uncovered topics, generate some variations
    if (uncoveredTopics.length < this.config.postsPerDay) {
      console.log('⚡ Generating topic variations to reach target...');
      const variations = this.generateTopicVariations(uncoveredTopics);
      uncoveredTopics.push(...variations);
    }
    
    return uncoveredTopics.slice(0, this.config.postsPerDay);
  }

  async fetchFromNewsAPI(keyword) {
    return new Promise((resolve, reject) => {
      const params = new URLSearchParams({
        q: keyword,
        language: 'en',
        sortBy: 'publishedAt',
        from: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        pageSize: '5'
      });
      
      const url = `${this.newsApiUrl}?${params.toString()}`;
      
      const options = {
        headers: {
          'X-API-Key': this.config.newsApiKey
        }
      };

      const req = https.get(url, options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const parsed = JSON.parse(data);
            if (parsed.articles) {
              const topics = parsed.articles.map(article => ({
                title: article.title,
                description: article.description,
                url: article.url,
                publishedAt: article.publishedAt,
                source: article.source.name,
                keyword: keyword
              }));
              resolve(topics);
            } else {
              resolve([]);
            }
          } catch (error) {
            reject(error);
          }
        });
      });

      req.on('error', reject);
      req.setTimeout(10000, () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });
    });
  }

  getEvergreenTopics() {
    return [
      {
        title: "AIMA Appointment Updates and New Procedures",
        description: "Latest changes in AIMA appointment booking system",
        keyword: "AIMA appointments",
        category: "AIMA Update",
        type: "evergreen",
        source: "AIMA official procedures"
      },
      {
        title: "Portugal Golden Visa Program Changes",
        description: "Recent updates to Portugal's Golden Visa regulations",
        keyword: "golden visa",
        category: "Visa News",
        type: "evergreen",
        source: "Portuguese government updates"
      },
      {
        title: "Digital Nomad Visa Portugal Requirements",
        description: "Complete guide to Portugal's Digital Nomad Visa",
        keyword: "digital nomad",
        category: "Visa Guide",
        type: "evergreen",
        source: "Official visa requirements"
      },
      {
        title: "Family Reunification in Portugal Process",
        description: "Step-by-step guide to family reunification procedures",
        keyword: "family reunification",
        category: "Legal Guide",
        type: "evergreen",
        source: "EU family reunification directive"
      },
      {
        title: "Portugal Work Permit Application Guide",
        description: "How to apply for work permits in Portugal",
        keyword: "work permit",
        category: "Work Visa",
        type: "evergreen",
        source: "Portuguese labor law"
      }
    ];
  }

  removeDuplicateTopics(topics) {
    const seen = new Set();
    return topics.filter(topic => {
      const key = topic.title.toLowerCase().slice(0, 50);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  // Generate topic variations when we need more content
  generateTopicVariations(existingTopics) {
    const variations = [];
    const angles = [
      "2024 Update: ",
      "Complete Guide to ",
      "Common Mistakes in ",
      "Expert Tips for ",
      "Latest Changes in ",
      "Step-by-Step Guide to ",
      "Troubleshooting ",
      "Advanced Strategies for "
    ];
    
    const topics = [
      "AIMA Appointment Scheduling",
      "Portugal Visa Processing",
      "Residence Permit Renewal",
      "Immigration Document Preparation",
      "Portuguese Tax Requirements for Immigrants",
      "Healthcare Access for New Residents",
      "Banking for Immigrants in Portugal",
      "Language Requirements for Immigration",
      "Housing Requirements for Visa Applications",
      "Employment Rights for Immigrants"
    ];
    
    for (let i = 0; i < Math.min(5, this.config.postsPerDay - existingTopics.length); i++) {
      const angle = angles[i % angles.length];
      const topic = topics[i % topics.length];
      
      variations.push({
        title: angle + topic,
        description: `Professional guidance on ${topic.toLowerCase()}`,
        keyword: topic.toLowerCase().replace(/\s+/g, ' '),
        type: "variation"
      });
    }
    
    return variations;
  }

  // Scan existing blog posts and populate tracker (run once)
  async initializeTopicTracker() {
    console.log('🔄 Initializing topic tracker with existing posts...');
    
    const stats = this.topicTracker.getStats();
    if (stats.totalTopics > 0) {
      console.log(`✅ Topic tracker already initialized with ${stats.totalTopics} topics`);
      return;
    }
    
    const blogDir = this.config.blogPath;
    if (!fs.existsSync(blogDir)) {
      console.log('📁 Blog directory not found, creating...');
      fs.mkdirSync(blogDir, { recursive: true });
      return;
    }
    
    const entries = fs.readdirSync(blogDir, { withFileTypes: true });
    let addedCount = 0;
    
    for (const entry of entries) {
      if (!entry.isDirectory() || entry.name === 'components') continue;
      
      const postPath = path.join(blogDir, entry.name, 'page.tsx');
      if (!fs.existsSync(postPath)) continue;
      
      try {
        const fileContent = fs.readFileSync(postPath, 'utf-8');
        
        // Extract title from file
        const titleMatch = fileContent.match(/title="([^"]+)"/);
        const title = titleMatch?.[1];
        
        if (title) {
          // Try to extract keyword from content
          const keywordGuess = this.extractKeywordFromContent(title, fileContent);
          
          this.topicTracker.addTopic(title, keywordGuess, entry.name);
          addedCount++;
        }
      } catch (error) {
        console.error(`Error reading ${entry.name}:`, error.message);
      }
    }
    
    console.log(`✅ Added ${addedCount} existing posts to topic tracker`);
  }

  // Extract likely keyword from content
  extractKeywordFromContent(title, content) {
    const titleLower = title.toLowerCase();
    
    // Look for immigration-related keywords in title
    for (const keyword of this.keywords) {
      if (titleLower.includes(keyword.toLowerCase())) {
        return keyword;
      }
    }
    
    // Fallback: use first significant words from title
    const words = title.split(' ').filter(word => 
      word.length > 3 && 
      !['the', 'and', 'for', 'with', 'your'].includes(word.toLowerCase())
    );
    
    return words.slice(0, 2).join(' ').toLowerCase();
  }

  // Generate blog post content using OpenAI
  async generateBlogContent(topic) {
    console.log(`✍️ Generating content for: ${topic.title}`);
    
    const prompt = `You are a certified Portuguese immigration lawyer with 15+ years of experience. Create an extremely detailed, comprehensive blog post about "${topic.title}" for people dealing with Portuguese immigration.

Context: ${topic.description || 'Recent developments in Portuguese immigration'}
Primary focus: ${topic.keyword}

CRITICAL REQUIREMENTS:
- Write 2500-3500 words of substantive content
- Include specific legal references, procedures, and timelines
- Provide step-by-step instructions where applicable
- Include real-world examples and case scenarios
- Address common problems and solutions
- Include specific AIMA procedures and requirements
- Mention relevant Portuguese laws and regulations
- Include practical tips from years of legal practice
- Address frequently asked questions
- Include warnings about common mistakes
- Provide actionable advice that people can immediately use

CONTENT STRUCTURE:
1. Compelling introduction explaining why this matters now
2. 6-8 detailed sections with practical information
3. Specific procedures and requirements
4. Timeline expectations and processing details
5. Common challenges and how to overcome them
6. Expert tips and insider knowledge
7. Troubleshooting section
8. Conclusion with next steps

TONE: Expert but accessible, authoritative, helpful, practical

Structure as JSON:
{
  "title": "SEO-optimized title (45-60 chars)",
  "description": "Compelling meta description (140-160 chars)", 
  "slug": "url-friendly-slug-max-50-chars",
  "category": "Choose appropriate category: 'AIMA Update', 'Visa Guide', 'Legal Process', 'Document Checklist', 'Visa News', 'Work Visa', 'Student Visa', 'Family Visa', 'Legal Guide', 'Process Guide'",
  "estimatedReadTime": number,
  "tableOfContents": [{"title": "Detailed section name", "id": "kebab-case-id"}],
  "content": "Full HTML content with <h2>, <h3>, <p>, <ul>, <li>, <strong>, <em> tags. Include specific details, procedures, timelines, requirements, and actionable advice."
}`;

    try {
      const response = await this.callOpenAI(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Error generating content:', error);
      return this.generateFallbackContent(topic);
    }
  }

  async callOpenAI(prompt) {
    return new Promise((resolve, reject) => {
      const data = JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an expert immigration lawyer specializing in Portuguese immigration law and AIMA procedures. Create comprehensive, accurate blog content."
          },
          {
            role: "user", 
            content: prompt
          }
        ],
        max_tokens: 4000,
        temperature: 0.7
      });

      const options = {
        hostname: 'api.openai.com',
        port: 443,
        path: '/v1/chat/completions',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.openaiApiKey}`,
          'Content-Length': Buffer.byteLength(data)
        }
      };

      const req = https.request(options, (res) => {
        let responseData = '';
        res.on('data', chunk => responseData += chunk);
        res.on('end', () => {
          try {
            const parsed = JSON.parse(responseData);
            if (parsed.choices && parsed.choices[0]) {
              resolve(parsed.choices[0].message.content);
            } else {
              reject(new Error('Invalid OpenAI response'));
            }
          } catch (error) {
            reject(error);
          }
        });
      });

      req.on('error', reject);
      req.write(data);
      req.end();
    });
  }

  generateFallbackContent(topic) {
    const slug = this.createSlug(topic.title);
    
    // Generate detailed content based on topic type
    const detailedContent = this.generateDetailedFallbackContent(topic);
    
    // Determine category based on topic content
    const category = this.determineCategory(topic);
    
    return {
      title: topic.title,
      description: topic.description || `Comprehensive guide to ${topic.keyword} in Portugal with AIMA procedures and legal requirements`,
      slug: slug,
      category: category, 
      estimatedReadTime: 12,
      tableOfContents: [
        { title: "Introduction", id: "introduction" },
        { title: "Current Legal Framework", id: "legal-framework" },
        { title: "AIMA Requirements and Procedures", id: "aima-requirements" },
        { title: "Step-by-Step Application Process", id: "application-process" },
        { title: "Required Documentation", id: "documentation" },
        { title: "Processing Times and Expectations", id: "processing-times" },
        { title: "Common Challenges and Solutions", id: "challenges" },
        { title: "Expert Tips and Best Practices", id: "expert-tips" },
        { title: "Frequently Asked Questions", id: "faq" },
        { title: "Conclusion and Next Steps", id: "conclusion" }
      ],
      content: detailedContent
    };
  }

  determineCategory(topic) {
    const title = topic.title.toLowerCase();
    const keyword = (topic.keyword || '').toLowerCase();
    
    if (title.includes('aima') || keyword.includes('aima')) {
      return 'AIMA Update';
    } else if (title.includes('checklist') || title.includes('document')) {
      return 'Document Checklist';
    } else if (title.includes('work') || keyword.includes('work')) {
      return 'Work Visa';
    } else if (title.includes('student') || keyword.includes('student')) {
      return 'Student Visa';
    } else if (title.includes('family') || keyword.includes('family')) {
      return 'Family Visa';
    } else if (title.includes('golden') || title.includes('investment')) {
      return 'Investment Visa';
    } else if (title.includes('digital nomad') || keyword.includes('nomad')) {
      return 'Digital Nomad';
    } else if (title.includes('guide') || title.includes('how to')) {
      return 'Process Guide';
    } else if (title.includes('update') || title.includes('change') || title.includes('new')) {
      return 'Visa News';
    } else if (title.includes('legal') || keyword.includes('legal')) {
      return 'Legal Guide';
    } else {
      return 'Visa Guide';
    }
  }

  generateDetailedFallbackContent(topic) {
    const keyword = topic.keyword || 'immigration procedure';
    const title = topic.title.toLowerCase();
    
    return `
      <h2 id="introduction">Introduction</h2>
      <p>Portugal's immigration landscape continues to evolve, with significant implications for those seeking to navigate ${keyword} procedures. This comprehensive guide provides essential information about ${title}, offering practical insights gained from years of legal practice in Portuguese immigration law.</p>
      
      <p>Recent changes in Portuguese immigration policy have created new opportunities and challenges for applicants. Understanding the current requirements and procedures is crucial for a successful application, whether you're applying for the first time or renewing an existing permit.</p>

      <h2 id="legal-framework">Current Legal Framework</h2>
      <p>The legal framework governing ${keyword} in Portugal is primarily established under Law 23/2007 (Legal Regime for the Entry, Stay, Exit and Removal of Foreign Citizens), as amended, and various implementing regulations issued by AIMA (Agência para a Integração, Migrações e Asilo).</p>
      
      <p><strong>Key Legal Provisions:</strong></p>
      <ul>
        <li>Immigration and Borders Act (Lei de Estrangeiros)</li>
        <li>AIMA Regulatory Decree-Law</li>
        <li>Schengen Agreement provisions</li>
        <li>EU directive implementations</li>
        <li>Bilateral agreements with third countries</li>
      </ul>

      <h2 id="aima-requirements">AIMA Requirements and Procedures</h2>
      <p>AIMA has established specific requirements for ${keyword} applications. These requirements ensure compliance with Portuguese and European Union immigration standards while protecting both applicants and the Portuguese state's interests.</p>
      
      <h3>Primary Requirements</h3>
      <ul>
        <li><strong>Valid Documentation:</strong> All documents must be current, properly authenticated, and translated by certified translators</li>
        <li><strong>Proof of Legal Entry:</strong> Evidence of lawful entry into Portuguese territory</li>
        <li><strong>Financial Sustainability:</strong> Demonstration of adequate financial means for self-support</li>
        <li><strong>Health Insurance:</strong> Comprehensive health coverage valid in Portugal</li>
        <li><strong>Criminal Record:</strong> Clean criminal background from country of origin and countries of residence</li>
        <li><strong>Accommodation Proof:</strong> Verified housing arrangement in Portugal</li>
      </ul>

      <h3>AIMA Appointment System</h3>
      <p>The AIMA appointment system operates on a digital platform requiring advance booking. Current waiting times vary between 3-8 months depending on the type of application and regional office capacity.</p>

      <h2 id="application-process">Step-by-Step Application Process</h2>
      <p>The application process for ${keyword} involves several distinct phases, each with specific requirements and timelines. Following the correct sequence is essential for avoiding delays or rejections.</p>

      <h3>Phase 1: Initial Preparation (4-6 weeks)</h3>
      <ol>
        <li><strong>Document Collection:</strong> Gather all required documentation from country of origin</li>
        <li><strong>Apostille/Legalization:</strong> Authenticate documents according to Hague Convention or consular legalization</li>
        <li><strong>Translation:</strong> Have documents translated by certified Portuguese translators</li>
        <li><strong>Financial Planning:</strong> Prepare proof of financial sustainability</li>
      </ol>

      <h3>Phase 2: AIMA Appointment Booking (1-8 months)</h3>
      <ol>
        <li>Access the AIMA online booking system</li>
        <li>Select appropriate appointment type</li>
        <li>Choose available date and time</li>
        <li>Receive confirmation and instructions</li>
      </ol>

      <h3>Phase 3: Application Submission</h3>
      <p>During your AIMA appointment, you'll submit your complete application package and undergo biometric data collection. The appointment typically lasts 30-60 minutes.</p>

      <h2 id="documentation">Required Documentation</h2>
      <p>Proper documentation is fundamental to a successful ${keyword} application. Each document must meet specific formatting and authentication requirements.</p>

      <h3>Core Documentation Package</h3>
      <ul>
        <li><strong>Valid Passport:</strong> With at least 6 months validity remaining</li>
        <li><strong>Birth Certificate:</strong> Recent issuance (less than 6 months old)</li>
        <li><strong>Criminal Record Certificate:</strong> From all countries of residence in past 5 years</li>
        <li><strong>Medical Certificate:</strong> Confirming absence of diseases threatening public health</li>
        <li><strong>Proof of Accommodation:</strong> Rental contract, property deed, or accommodation declaration</li>
        <li><strong>Financial Proof:</strong> Bank statements, employment contracts, or other income verification</li>
        <li><strong>Travel Insurance:</strong> Minimum €30,000 coverage for initial period</li>
      </ul>

      <h3>Document Authentication Requirements</h3>
      <p>All foreign documents must be properly authenticated through apostille (Hague Convention countries) or consular legalization (non-Hague Convention countries) and translated into Portuguese by certified translators.</p>

      <h2 id="processing-times">Processing Times and Expectations</h2>
      <p>Understanding realistic processing timeframes helps applicants plan effectively and manage expectations throughout the ${keyword} process.</p>

      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr style="background-color: #f5f5f5;">
          <th style="border: 1px solid #ddd; padding: 12px; text-align: left;"><strong>Stage</strong></th>
          <th style="border: 1px solid #ddd; padding: 12px; text-align: left;"><strong>Expected Timeline</strong></th>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 12px;">Document Preparation</td>
          <td style="border: 1px solid #ddd; padding: 12px;">4-8 weeks</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 12px;">AIMA Appointment Booking</td>
          <td style="border: 1px solid #ddd; padding: 12px;">3-8 months</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 12px;">Application Processing</td>
          <td style="border: 1px solid #ddd; padding: 12px;">2-6 months</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 12px;">Decision Notification</td>
          <td style="border: 1px solid #ddd; padding: 12px;">1-2 weeks</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 12px;">Permit Collection</td>
          <td style="border: 1px solid #ddd; padding: 12px;">2-4 weeks</td>
        </tr>
      </table>

      <h2 id="challenges">Common Challenges and Solutions</h2>
      <p>Based on extensive legal practice, several challenges frequently arise during ${keyword} applications. Understanding these issues and their solutions can significantly improve success rates.</p>

      <h3>Most Common Issues</h3>
      <ul>
        <li><strong>Incomplete Documentation:</strong> Missing or improperly authenticated documents</li>
        <li><strong>AIMA Appointment Delays:</strong> Extended waiting times for appointments</li>
        <li><strong>Language Barriers:</strong> Communication difficulties during the process</li>
        <li><strong>Financial Requirements:</strong> Proving adequate financial means</li>
        <li><strong>Document Validity:</strong> Expired or soon-to-expire documents</li>
      </ul>

      <h3>Professional Solutions</h3>
      <p><strong>Legal Representation:</strong> Engaging qualified immigration lawyers can streamline the process and avoid common pitfalls. Legal professionals can also file administrative subpoenas (intimação para prestação de informações) to expedite delayed applications.</p>

      <p><strong>Document Management:</strong> Maintain organized files with multiple copies of all documents. Start renewal processes well before expiration dates.</p>

      <h2 id="expert-tips">Expert Tips and Best Practices</h2>
      <p>Drawing from years of immigration law practice, these professional insights can significantly improve your application's success probability.</p>

      <h3>Before Applying</h3>
      <ul>
        <li>Begin document preparation at least 6 months before your planned application</li>
        <li>Maintain detailed records of all immigration-related activities</li>
        <li>Establish Portuguese bank accounts early in the process</li>
        <li>Learn basic Portuguese to facilitate communication with authorities</li>
        <li>Research regional differences in AIMA office procedures</li>
      </ul>

      <h3>During the Process</h3>
      <ul>
        <li>Always bring original documents and certified copies to appointments</li>
        <li>Arrive at AIMA appointments 30 minutes early</li>
        <li>Maintain respectful, professional communication with AIMA staff</li>
        <li>Keep detailed records of all interactions and correspondence</li>
        <li>Follow up proactively on application status</li>
      </ul>

      <h2 id="faq">Frequently Asked Questions</h2>
      
      <h3>How long is the permit valid?</h3>
      <p>Initial permits are typically valid for 1-2 years, with renewal periods extending to 2-3 years depending on the specific permit type and applicant circumstances.</p>

      <h3>Can I travel while my application is pending?</h3>
      <p>Travel during pending applications is generally permitted within Schengen area limits, but should be coordinated with AIMA to avoid complications.</p>

      <h3>What happens if my application is denied?</h3>
      <p>Applicants have the right to appeal negative decisions within 20 working days. Appeals must be substantiated with additional evidence or legal arguments addressing the denial reasons.</p>

      <h3>Can I work while waiting for my permit?</h3>
      <p>Work authorization depends on your current legal status and permit type. Some permits allow immediate work authorization, while others require specific authorization from IEFP (Portuguese Employment Institute).</p>

      <h2 id="conclusion">Conclusion and Next Steps</h2>
      <p>Successfully navigating ${keyword} requires careful preparation, thorough documentation, and understanding of Portuguese immigration procedures. While the process can be complex, proper planning and professional guidance significantly improve success rates.</p>

      <p><strong>Immediate Action Items:</strong></p>
      <ol>
        <li>Assess your specific situation and requirements</li>
        <li>Begin gathering required documentation</li>
        <li>Consider engaging professional legal assistance</li>
        <li>Monitor AIMA appointment availability regularly</li>
        <li>Maintain current legal status throughout the process</li>
      </ol>

      <p>For complex cases or urgent situations, consulting with experienced immigration lawyers can provide valuable guidance and potentially expedite the process through legal channels. Professional assistance is particularly beneficial for applicants facing unusual circumstances or previous application difficulties.</p>

      <p><em>Remember: Immigration law changes frequently. Always verify current requirements with AIMA or qualified legal professionals before proceeding with your application.</em></p>
    `;
  }

  // Create blog post files
  async createBlogPost(content) {
    const blogDir = path.join(this.config.blogPath, content.slug);
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(blogDir)) {
      fs.mkdirSync(blogDir, { recursive: true });
    }
    
    // Add topic to tracker to prevent future duplicates
    this.topicTracker.addTopic(
      content.title, 
      content.keyword || '', 
      content.slug
    );

    const pageContent = `import { Metadata } from 'next'
import BlogPost from '../components/BlogPost'

export const metadata: Metadata = {
  title: "${content.title.replace(/"/g, '\\"')}",
  description: "${content.description.replace(/"/g, '\\"')}",
  openGraph: {
    title: "${content.title.replace(/"/g, '\\"')}",
    description: "${content.description.replace(/"/g, '\\"')}",
  }
}

export default function ${this.toPascalCase(content.slug)}() {
  const tableOfContents = ${JSON.stringify(content.tableOfContents, null, 4)}

  return (
    <BlogPost
      title="${content.title.replace(/"/g, '\\"')}"
      description="${content.description.replace(/"/g, '\\"')}"
      date="${new Date().toISOString().split('T')[0]}"
      author="Miguel Pires"
      category="${content.category}"
      estimatedReadTime={${content.estimatedReadTime}}
      tableOfContents={tableOfContents}
      content={
        <>
          ${content.content}
        </>
      }
    />
  )
}`;

    const pagePath = path.join(blogDir, 'page.tsx');
    fs.writeFileSync(pagePath, pageContent);
    
    console.log(`✅ Created blog post: ${content.slug}`);
    return pagePath;
  }

  createSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .substring(0, 50);
  }

  toPascalCase(slug) {
    let pascalCase = slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
    
    // Ensure function name starts with a letter (JavaScript requirement)
    if (/^[0-9]/.test(pascalCase)) {
      pascalCase = 'BlogPost' + pascalCase;
    }
    
    return pascalCase;
  }

  // Main execution function
  async run() {
    try {
      console.log('🚀 Starting automated blog generation...');
      
      // Initialize topic tracker with existing posts
      await this.initializeTopicTracker();
      
      // Clean old topics (optional - remove topics older than 1 year)
      this.topicTracker.cleanOldTopics(365);
      
      // Check if we already ran today (skip check in test mode)
      if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'test') {
        if (this.alreadyRanToday()) {
          console.log('✋ Already generated posts today. Skipping...');
          
          // Show topic tracker stats
          const stats = this.topicTracker.getStats();
          console.log(`📊 Topic Tracker Stats: ${stats.totalTopics} topics tracked`);
          return;
        }
      } else {
        console.log('🧪 Test mode: Bypassing "already ran today" check');
      }

      // Fetch trending topics
      const topics = await this.fetchTrendingTopics();
      console.log(`📋 Found ${topics.length} topics to process`);

      // Generate content for each topic
      const results = [];
      for (let i = 0; i < topics.length; i++) {
        console.log(`\n📝 Processing ${i + 1}/${topics.length}: ${topics[i].title}`);
        
        const content = await this.generateBlogContent(topics[i]);
        const filePath = await this.createBlogPost(content);
        
        results.push({
          topic: topics[i],
          content: content,
          filePath: filePath
        });

        // Add delay to avoid rate limiting
        if (i < topics.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }

      // Save run info
      this.saveRunInfo(results);

      console.log(`\n🎉 Successfully generated ${results.length} blog posts!`);
      console.log('📁 Posts created:');
      results.forEach(result => {
        console.log(`   - ${result.content.slug}`);
      });

      // Send email notification with generated posts
      try {
        const postsForEmail = results.map(result => ({
          title: result.content.title,
          slug: result.content.slug,
          description: result.content.description,
          category: result.content.category,
          estimatedReadTime: result.content.estimatedReadTime || '5',
          source: result.topic.source || result.topic.title // Include source reference
        }));

        await this.emailNotifier.sendBlogCompletionNotification(postsForEmail);
      } catch (emailError) {
        console.error('⚠️ Failed to send email notification:', emailError.message);
        // Don't fail the entire process if email fails
      }

    } catch (error) {
      console.error('❌ Error in blog generation:', error);
      process.exit(1);
    }
  }

  alreadyRanToday() {
    if (!fs.existsSync(this.config.lastRunFile)) return false;
    
    try {
      const lastRun = JSON.parse(fs.readFileSync(this.config.lastRunFile, 'utf8'));
      const lastRunDate = new Date(lastRun.date).toDateString();
      const today = new Date().toDateString();
      
      return lastRunDate === today;
    } catch (error) {
      return false;
    }
  }

  saveRunInfo(results) {
    const runInfo = {
      date: new Date().toISOString(),
      postsGenerated: results.length,
      topics: results.map(r => r.topic.title)
    };
    
    fs.writeFileSync(this.config.lastRunFile, JSON.stringify(runInfo, null, 2));
  }
}

// CLI execution
if (require.main === module) {
  const generator = new AutomatedBlogGenerator();
  generator.run().catch(console.error);
}

module.exports = AutomatedBlogGenerator;
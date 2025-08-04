const { Resend } = require('resend');
const path = require('path');

class EmailNotifier {
  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
    this.fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev';
    this.toEmail = process.env.NOTIFICATION_EMAIL || 'your@email.com';
    this.baseUrl = 'https://www.apoiojuridico-imigracao.com';
  }

  async sendBlogCompletionNotification(generatedPosts) {
    if (!this.resend || !process.env.RESEND_API_KEY) {
      console.log('⚠️ Resend API key not found. Skipping email notification.');
      return;
    }

    if (!generatedPosts || generatedPosts.length === 0) {
      console.log('📧 No new posts generated. Skipping email notification.');
      return;
    }

    try {
      console.log(`📧 Sending completion notification for ${generatedPosts.length} new posts...`);

      const emailText = this.generateSimpleEmailText(generatedPosts);

      const result = await this.resend.emails.send({
        from: this.fromEmail,
        to: this.toEmail,
        subject: `Blog Automation Complete - ${generatedPosts.length} New Posts Generated`,
        text: emailText,
      });

      console.log('✅ Email notification sent successfully:', result.id);
      return result;

    } catch (error) {
      console.error('❌ Failed to send email notification:', error);
      throw error;
    }
  }

  generateEmailHtml(posts) {
    const postsList = posts.map(post => `
      <li style="margin-bottom: 16px; padding: 16px; background-color: #f9fafb; border-radius: 8px; border-left: 4px solid #3b82f6;">
        <div style="margin-bottom: 8px;">
          <a href="${this.baseUrl}/blog/${post.slug}" 
             style="color: #1d4ed8; text-decoration: none; font-weight: 600; font-size: 16px;"
             target="_blank">
            ${post.title}
          </a>
        </div>
        <div style="color: #6b7280; font-size: 14px; margin-bottom: 8px;">
          ${post.description}
        </div>
        <div style="display: flex; gap: 12px; align-items: center; font-size: 12px; color: #9ca3af;">
          <span style="background-color: #dbeafe; color: #1e40af; padding: 4px 8px; border-radius: 12px;">
            ${post.category}
          </span>
          <span>${post.estimatedReadTime} min read</span>
        </div>
      </li>
    `).join('');

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Blog Automation Complete</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #374151; max-width: 600px; margin: 0 auto; padding: 20px;">
          
          <div style="text-align: center; margin-bottom: 32px; padding: 24px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; color: white;">
            <h1 style="margin: 0; font-size: 24px; font-weight: 700;">
              🚀 Blog Automation Complete!
            </h1>
            <p style="margin: 8px 0 0 0; opacity: 0.9; font-size: 16px;">
              ${posts.length} new blog post${posts.length === 1 ? '' : 's'} successfully generated
            </p>
          </div>

          <div style="margin-bottom: 24px;">
            <h2 style="color: #1f2937; font-size: 20px; margin-bottom: 16px; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">
              📝 New Posts Generated
            </h2>
            <ul style="list-style: none; padding: 0; margin: 0;">
              ${postsList}
            </ul>
          </div>

          <div style="margin-top: 32px; padding: 20px; background-color: #f3f4f6; border-radius: 8px; text-align: center;">
            <h3 style="margin: 0 0 12px 0; color: #374151; font-size: 16px;">Quick Actions</h3>
            <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
              <a href="${this.baseUrl}/blog" 
                 style="background-color: #3b82f6; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 500; display: inline-block;"
                 target="_blank">
                View Blog
              </a>
              <a href="${this.baseUrl}" 
                 style="background-color: #10b981; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 500; display: inline-block;"
                 target="_blank">
                Visit Website
              </a>
            </div>
          </div>

          <div style="margin-top: 24px; text-align: center; color: #9ca3af; font-size: 12px;">
            <p>Generated on ${new Date().toLocaleString()}</p>
            <p>Automated by Portugal Immigration Blog System</p>
          </div>

        </body>
      </html>
    `;
  }

  generateSimpleEmailText(posts) {
    const postsList = posts.map(post => {
      const sourceInfo = post.source ? ` (Source: ${post.source})` : '';
      return `• ${post.title}${sourceInfo}\n  ${this.baseUrl}/blog/${post.slug}`;
    }).join('\n\n');

    return `Blog Automation Complete - ${posts.length} new posts generated:

${postsList}

Generated: ${new Date().toLocaleString()}`;
  }

  // Send test email by generating a fresh post (to show real sources)
  async sendTestNotification() {
    console.log('🧪 Generating fresh test post to show real news sources...');
    
    try {
      // Import and run the blog generator in test mode
      const AutomatedBlogGenerator = require('../scripts/blog-generator');
      const generator = new AutomatedBlogGenerator();
      
      // Set test mode and generate 1 post
      process.env.NODE_ENV = 'test';
      
      // Get a test topic
      const topics = await generator.fetchTrendingTopics();
      if (topics.length === 0) {
        throw new Error('No topics available for testing');
      }
      
      const testTopic = topics[0];
      console.log(`📝 Generating test post: ${testTopic.title}`);
      
      // Generate content for the test topic
      const content = await generator.generateBlogContent(testTopic);
      
      // Create the test post
      await generator.createBlogPost(content);
      
      // Send email with just this new post
      const testPosts = [{
        title: content.title,
        slug: content.slug,
        description: content.description,
        category: content.category,
        estimatedReadTime: content.estimatedReadTime || '5',
        source: testTopic.source || testTopic.title
      }];
      
      console.log(`📧 Sending test email with newly generated post and real source...`);
      return await this.sendBlogCompletionNotification(testPosts);
      
    } catch (error) {
      console.error('Error generating test post:', error);
      
      // Fallback to simple test data
      const fallbackPosts = [{
        title: "Test Email - Generation Failed",
        slug: "test-blog-post", 
        description: "This is a fallback test email due to generation error.",
        category: "Test",
        estimatedReadTime: "1",
        source: "Test fallback system"
      }];
      
      return await this.sendBlogCompletionNotification(fallbackPosts);
    }
  }
}

module.exports = EmailNotifier;
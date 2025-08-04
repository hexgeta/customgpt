#!/usr/bin/env node

const https = require('https');
const http = require('http');

async function testBlogAPI(baseUrl = 'http://localhost:3000', isTest = true) {
  console.log(`🧪 Testing blog generation API at ${baseUrl}...`);
  
  const url = `${baseUrl}/api/generate-blog${isTest ? '?test=true' : ''}`;
  const isHttps = baseUrl.startsWith('https');
  
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.CRON_SECRET || 'test-secret'}`
    }
  };

  return new Promise((resolve, reject) => {
    const client = isHttps ? https : http;
    
    const req = client.request(url, options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          
          if (res.statusCode === 200) {
            console.log('✅ API test successful!');
            console.log('Response:', response.message);
            if (response.output) {
              console.log('\n📄 Generation Output:');
              console.log(response.output);
            }
            resolve(response);
          } else {
            console.error('❌ API test failed');
            console.error('Status:', res.statusCode);
            console.error('Response:', response);
            reject(new Error(`API returned ${res.statusCode}: ${response.error}`));
          }
        } catch (error) {
          console.error('❌ Failed to parse response:', data);
          reject(error);
        }
      });
    });
    
    req.on('error', (error) => {
      console.error('❌ Request failed:', error.message);
      reject(error);
    });
    
    req.end();
  });
}

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);
  const baseUrl = args[0] || 'http://localhost:3000';
  const isTest = !args.includes('--production');
  
  console.log(`Mode: ${isTest ? 'TEST (1 post)' : 'PRODUCTION (10 posts)'}`);
  
  testBlogAPI(baseUrl, isTest)
    .then(() => {
      console.log('\n🎉 Test completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Test failed:', error.message);
      process.exit(1);
    });
}

module.exports = { testBlogAPI };
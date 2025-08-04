#!/usr/bin/env node

const path = require('path');
const fs = require('fs');

// Try to load .env.local first, then .env
const envLocalPath = path.join(__dirname, '../.env.local');
const envPath = path.join(__dirname, '../.env');

if (fs.existsSync(envLocalPath)) {
  require('dotenv').config({ path: envLocalPath });
} else if (fs.existsSync(envPath)) {
  require('dotenv').config({ path: envPath });
}

const EmailNotifier = require('./email-notifier');

async function testEmailNotification() {
  console.log('🧪 Testing email notification...');
  
  const notifier = new EmailNotifier();
  
  try {
    const result = await notifier.sendTestNotification();
    console.log('✅ Test email sent successfully!');
    console.log('📧 Email ID:', result.id);
  } catch (error) {
    console.error('❌ Test email failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  testEmailNotification();
}
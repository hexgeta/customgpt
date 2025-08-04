#!/usr/bin/env node

const cron = require('node-cron');
const { spawn } = require('child_process');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '../.env') });
const fs = require('fs');

class BlogScheduler {
  constructor() {
    this.generatorScript = path.join(__dirname, 'blog-generator.js');
    this.logFile = path.join(__dirname, 'scheduler.log');
    
    // Default: Run every day at 9 AM Lisbon time
    this.cronSchedule = process.env.GENERATION_TIME 
      ? this.timeToCron(process.env.GENERATION_TIME)
      : '0 9 * * *';
  }

  timeToCron(time) {
    // Convert HH:MM to cron format
    const [hours, minutes] = time.split(':');
    return `${minutes} ${hours} * * *`;
  }

  log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    
    console.log(message);
    fs.appendFileSync(this.logFile, logMessage);
  }

  async runGenerator() {
    this.log('🔄 Starting scheduled blog generation...');
    
    return new Promise((resolve, reject) => {
      const child = spawn('node', [this.generatorScript], {
        stdio: 'pipe',
        cwd: path.dirname(this.generatorScript)
      });

      let output = '';
      let errorOutput = '';

      child.stdout.on('data', (data) => {
        const message = data.toString();
        output += message;
        console.log(message.trim());
      });

      child.stderr.on('data', (data) => {
        const message = data.toString();
        errorOutput += message;
        console.error(message.trim());
      });

      child.on('close', (code) => {
        if (code === 0) {
          this.log('✅ Blog generation completed successfully');
          resolve(output);
        } else {
          this.log(`❌ Blog generation failed with code ${code}`);
          this.log(`Error output: ${errorOutput}`);
          reject(new Error(`Process exited with code ${code}`));
        }
      });

      child.on('error', (error) => {
        this.log(`❌ Failed to start blog generation: ${error.message}`);
        reject(error);
      });
    });
  }

  start() {
    this.log(`🚀 Blog scheduler started with schedule: ${this.cronSchedule}`);
    this.log(`📅 This will run daily at ${process.env.GENERATION_TIME || '09:00'} ${process.env.TIMEZONE || 'Europe/Lisbon'}`);
    
    // Schedule the task
    cron.schedule(this.cronSchedule, async () => {
      try {
        await this.runGenerator();
      } catch (error) {
        this.log(`❌ Scheduled generation failed: ${error.message}`);
      }
    }, {
      scheduled: true,
      timezone: process.env.TIMEZONE || 'Europe/Lisbon'
    });

    // Also run immediately if --now flag is passed
    if (process.argv.includes('--now')) {
      this.log('⚡ Running generation immediately due to --now flag');
      this.runGenerator().catch(error => {
        this.log(`❌ Immediate generation failed: ${error.message}`);
      });
    }

    // Keep the process running
    process.on('SIGINT', () => {
      this.log('🛑 Scheduler stopped by user');
      process.exit(0);
    });

    this.log('⏰ Scheduler is running. Press Ctrl+C to stop.');
  }

  // Test method to run generation once
  async test() {
    this.log('🧪 Running test generation...');
    try {
      await this.runGenerator();
      this.log('✅ Test completed successfully');
    } catch (error) {
      this.log(`❌ Test failed: ${error.message}`);
      process.exit(1);
    }
  }
}

// CLI handling
if (require.main === module) {
  const scheduler = new BlogScheduler();
  
  if (process.argv.includes('--test')) {
    scheduler.test();
  } else {
    scheduler.start();
  }
}

module.exports = BlogScheduler;
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class BlogSetup {
  constructor() {
    this.projectRoot = path.join(__dirname, '..');
    this.scriptsDir = __dirname;
    this.envFile = path.join(this.projectRoot, '.env');
    this.envExampleFile = path.join(this.projectRoot, '.env.example');
  }

  log(message) {
    console.log(`[SETUP] ${message}`);
  }

  error(message) {
    console.error(`[ERROR] ${message}`);
  }

  checkRequirements() {
    this.log('Checking requirements...');
    
    // Check Node.js version
    const nodeVersion = process.version;
    const majorVersion = parseInt(nodeVersion.split('.')[0].slice(1));
    
    if (majorVersion < 18) {
      this.error(`Node.js ${majorVersion} detected. Node.js 18+ is required.`);
      process.exit(1);
    }
    
    this.log(`✅ Node.js ${nodeVersion} detected`);
  }

  installDependencies() {
    this.log('Installing required dependencies...');
    
    const dependencies = [
      'node-cron',
      'dotenv'
    ];
    
    try {
      execSync(`npm install ${dependencies.join(' ')}`, { 
        cwd: this.projectRoot,
        stdio: 'inherit'
      });
      this.log('✅ Dependencies installed successfully');
    } catch (error) {
      this.error('Failed to install dependencies');
      this.error(error.message);
      process.exit(1);
    }
  }

  setupEnvironment() {
    this.log('Setting up environment configuration...');
    
    if (!fs.existsSync(this.envFile)) {
      if (fs.existsSync(this.envExampleFile)) {
        fs.copyFileSync(this.envExampleFile, this.envFile);
        this.log('✅ Created .env file from .env.example');
        this.log('⚠️  Please edit .env file and add your API keys');
      } else {
        this.error('.env.example file not found');
        process.exit(1);
      }
    } else {
      this.log('✅ .env file already exists');
    }
  }

  createDirectories() {
    this.log('Creating required directories...');
    
    const directories = [
      path.join(this.scriptsDir, 'logs'),
      path.join(this.scriptsDir, 'cache'),
      path.join(this.projectRoot, 'app/blog')
    ];
    
    directories.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        this.log(`✅ Created directory: ${path.relative(this.projectRoot, dir)}`);
      }
    });
  }

  setupPackageScripts() {
    this.log('Adding NPM scripts...');
    
    const packageJsonPath = path.join(this.projectRoot, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    const newScripts = {
      'blog:generate': 'node scripts/blog-generator.js',
      'blog:schedule': 'node scripts/scheduler.js',
      'blog:test': 'node scripts/scheduler.js --test',
      'blog:now': 'node scripts/scheduler.js --now',
      'blog:setup': 'node scripts/setup.js'
    };
    
    packageJson.scripts = { ...packageJson.scripts, ...newScripts };
    
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    this.log('✅ Added blog generation scripts to package.json');
  }

  createCronJob() {
    this.log('Setting up system cron job (optional)...');
    
    const cronCommand = `cd ${this.projectRoot} && npm run blog:schedule`;
    const cronEntry = `# Automated blog generation
@reboot ${cronCommand}`;

    const cronPath = path.join(this.scriptsDir, 'crontab-entry.txt');
    fs.writeFileSync(cronPath, cronEntry);
    
    this.log('✅ Created crontab entry file');
    this.log('💡 To enable system-wide scheduling, run:');
    this.log(`   crontab -e`);
    this.log(`   Then add: @reboot ${cronCommand}`);
  }

  validateSetup() {
    this.log('Validating setup...');
    
    const requiredFiles = [
      'scripts/blog-generator.js',
      'scripts/scheduler.js', 
      '.env'
    ];
    
    const missingFiles = requiredFiles.filter(file => 
      !fs.existsSync(path.join(this.projectRoot, file))
    );
    
    if (missingFiles.length > 0) {
      this.error(`Missing files: ${missingFiles.join(', ')}`);
      process.exit(1);
    }
    
    this.log('✅ All required files present');
  }

  showNextSteps() {
    this.log('\n🎉 Setup complete! Next steps:');
    this.log('');
    this.log('1. Edit .env file and add your API keys:');
    this.log('   - OPENAI_API_KEY (get from https://platform.openai.com/api-keys)');
    this.log('   - NEWS_API_KEY (get from https://newsapi.org/register)');
    this.log('');
    this.log('2. Test the system:');
    this.log('   npm run blog:test');
    this.log('');
    this.log('3. Generate posts now:');
    this.log('   npm run blog:now');
    this.log('');
    this.log('4. Start daily scheduler:');
    this.log('   npm run blog:schedule');
    this.log('');
    this.log('5. Or generate posts manually:');
    this.log('   npm run blog:generate');
    this.log('');
    this.log('📖 Documentation: scripts/README.md');
  }

  run() {
    try {
      this.log('🚀 Starting blog generation setup...');
      
      this.checkRequirements();
      this.installDependencies();
      this.setupEnvironment();
      this.createDirectories();
      this.setupPackageScripts();
      this.createCronJob();
      this.validateSetup();
      
      this.showNextSteps();
      
    } catch (error) {
      this.error(`Setup failed: ${error.message}`);
      process.exit(1);
    }
  }
}

// CLI execution
if (require.main === module) {
  const setup = new BlogSetup();
  setup.run();
}

module.exports = BlogSetup;
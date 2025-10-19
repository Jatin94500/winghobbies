#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Checking deployment readiness...\n');

let score = 0;
let total = 0;
const issues = [];
const warnings = [];

// Check 1: .env.example exists
total++;
if (fs.existsSync('.env.example')) {
  console.log('✅ .env.example exists');
  score++;
} else {
  console.log('❌ .env.example missing');
  issues.push('Create .env.example file');
}

// Check 2: package.json exists
total++;
if (fs.existsSync('package.json')) {
  console.log('✅ package.json exists');
  score++;
  
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  // Check scripts
  if (pkg.scripts && pkg.scripts.build) {
    console.log('✅ Build script configured');
  } else {
    warnings.push('Build script not found in package.json');
  }
} else {
  console.log('❌ package.json missing');
  issues.push('Create package.json');
}

// Check 3: Dockerfile exists
total++;
if (fs.existsSync('Dockerfile.backend') && fs.existsSync('Dockerfile.frontend')) {
  console.log('✅ Dockerfiles exist');
  score++;
} else {
  console.log('⚠️  Dockerfiles missing (optional)');
  warnings.push('Dockerfiles not found - Docker deployment unavailable');
}

// Check 4: Backend server exists
total++;
if (fs.existsSync('src/backend/server.js')) {
  console.log('✅ Backend server exists');
  score++;
} else {
  console.log('❌ Backend server missing');
  issues.push('Create src/backend/server.js');
}

// Check 5: Frontend entry point exists
total++;
if (fs.existsSync('src/index.js')) {
  console.log('✅ Frontend entry point exists');
  score++;
} else {
  console.log('❌ Frontend entry point missing');
  issues.push('Create src/index.js');
}

// Check 6: .gitignore exists
total++;
if (fs.existsSync('.gitignore')) {
  console.log('✅ .gitignore exists');
  score++;
  
  const gitignore = fs.readFileSync('.gitignore', 'utf8');
  if (gitignore.includes('.env') && gitignore.includes('node_modules')) {
    console.log('✅ .gitignore properly configured');
  } else {
    warnings.push('.gitignore should include .env and node_modules');
  }
} else {
  console.log('❌ .gitignore missing');
  issues.push('Create .gitignore file');
}

// Check 7: Public folder exists
total++;
if (fs.existsSync('public')) {
  console.log('✅ Public folder exists');
  score++;
  
  if (fs.existsSync('public/index.html')) {
    console.log('✅ index.html exists');
  } else {
    warnings.push('public/index.html not found');
  }
} else {
  console.log('❌ Public folder missing');
  issues.push('Create public folder');
}

// Check 8: Deployment docs exist
total++;
if (fs.existsSync('DEPLOYMENT_GUIDE.md') || fs.existsSync('QUICK_DEPLOY.md')) {
  console.log('✅ Deployment documentation exists');
  score++;
} else {
  console.log('⚠️  Deployment documentation missing');
  warnings.push('Create deployment documentation');
}

// Check 9: README exists
total++;
if (fs.existsSync('README.md')) {
  console.log('✅ README.md exists');
  score++;
} else {
  console.log('⚠️  README.md missing');
  warnings.push('Create README.md');
}

// Check 10: Git repository initialized
total++;
if (fs.existsSync('.git')) {
  console.log('✅ Git repository initialized');
  score++;
} else {
  console.log('⚠️  Git not initialized');
  warnings.push('Run: git init');
}

// Calculate percentage
const percentage = Math.round((score / total) * 100);

console.log('\n' + '='.repeat(50));
console.log(`📊 Deployment Readiness Score: ${score}/${total} (${percentage}%)`);
console.log('='.repeat(50) + '\n');

// Show issues
if (issues.length > 0) {
  console.log('❌ Critical Issues:');
  issues.forEach(issue => console.log(`   - ${issue}`));
  console.log('');
}

// Show warnings
if (warnings.length > 0) {
  console.log('⚠️  Warnings:');
  warnings.forEach(warning => console.log(`   - ${warning}`));
  console.log('');
}

// Recommendation
if (percentage >= 90) {
  console.log('🎉 Your project is ready for deployment!');
  console.log('📖 Next steps: Read QUICK_DEPLOY.md\n');
} else if (percentage >= 70) {
  console.log('⚠️  Your project is mostly ready, but fix the issues above.');
  console.log('📖 Review: DEPLOYMENT_CHECKLIST.md\n');
} else {
  console.log('❌ Your project needs more work before deployment.');
  console.log('📖 Start with: DEPLOYMENT_GUIDE.md\n');
}

// Environment variables check
console.log('📋 Environment Variables Checklist:');
console.log('   - [ ] MONGODB_URI');
console.log('   - [ ] JWT_SECRET');
console.log('   - [ ] EMAIL_USER');
console.log('   - [ ] EMAIL_PASS');
console.log('   - [ ] RAZORPAY_KEY_ID');
console.log('   - [ ] RAZORPAY_KEY_SECRET');
console.log('   - [ ] GCS_PROJECT_ID');
console.log('   - [ ] GCS_BUCKET_NAME');
console.log('   - [ ] REACT_APP_API_URL\n');

console.log('💡 Tip: Copy .env.example to .env and fill in your values\n');

process.exit(percentage >= 70 ? 0 : 1);

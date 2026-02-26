#!/usr/bin/env node
/**
 * ARK Games - Pre-deploy Test
 * Esegui PRIMA di ogni deploy: node test-before-deploy.js
 */

const puppeteer = require('puppeteer');

const PAGES_TO_TEST = [
  { url: 'admin.html', functions: ['showTab', 'resetLanes', 'toggleAutoMode', 'saveCompetition'] },
  { url: 'judge.html', functions: ['selectLane', 'confirmTeam', 'submitScore'] },
  { url: 'tv.html', functions: [] }, // TV mostly listeners
];

const BASE_URL = process.argv[2] || 'http://localhost:3000';

async function testPage(browser, page, pageConfig) {
  const url = `${BASE_URL}/${pageConfig.url}`;
  console.log(`\n📄 Testing ${pageConfig.url}...`);
  
  const errors = [];
  
  page.on('pageerror', err => errors.push(err.message));
  page.on('console', msg => {
    if (msg.type() === 'error' && !msg.text().includes('404')) {
      errors.push(msg.text());
    }
  });
  
  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  } catch (e) {
    console.log(`   ❌ Failed to load: ${e.message}`);
    return false;
  }
  
  // Wait for modules to load
  await new Promise(r => setTimeout(r, 2000));
  
  // Check for JS errors
  if (errors.length > 0) {
    console.log(`   ❌ JavaScript errors:`);
    errors.forEach(e => console.log(`      - ${e}`));
    return false;
  }
  
  // Check required functions exist
  for (const fn of pageConfig.functions) {
    const exists = await page.evaluate((fnName) => {
      return typeof window[fnName] === 'function';
    }, fn);
    
    if (exists) {
      console.log(`   ✅ ${fn}()`);
    } else {
      console.log(`   ❌ ${fn}() - NOT DEFINED!`);
      return false;
    }
  }
  
  // Check clock sync
  const clockOk = await page.evaluate(() => {
    return typeof window.getSyncedTime === 'function' || 
           document.querySelector('script[type="module"]') !== null;
  });
  
  if (clockOk) {
    console.log(`   ✅ Module loaded`);
  } else {
    console.log(`   ❌ Module failed to load`);
    return false;
  }
  
  return errors.length === 0;
}

async function main() {
  console.log('🧪 ARK Games Pre-Deploy Test');
  console.log('============================');
  console.log(`Testing: ${BASE_URL}\n`);
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  let allPassed = true;
  
  for (const pageConfig of PAGES_TO_TEST) {
    const page = await browser.newPage();
    const passed = await testPage(browser, page, pageConfig);
    if (!passed) allPassed = false;
    await page.close();
  }
  
  await browser.close();
  
  console.log('\n============================');
  if (allPassed) {
    console.log('✅ ALL TESTS PASSED - Safe to deploy!');
    process.exit(0);
  } else {
    console.log('❌ TESTS FAILED - DO NOT DEPLOY!');
    process.exit(1);
  }
}

main().catch(e => {
  console.error('Test runner error:', e);
  process.exit(1);
});

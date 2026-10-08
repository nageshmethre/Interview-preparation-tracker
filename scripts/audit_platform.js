const fs = require('fs');
const path = require('path');

const componentsCode = fs.readFileSync('frontend/assets/js/components.js', 'utf8');
const appCode = fs.readFileSync('frontend/assets/js/app.js', 'utf8');
const prodPagesCode = fs.readFileSync('frontend/assets/js/production-pages.js', 'utf8');
const interviewSuiteCode = fs.readFileSync('frontend/assets/js/interview-suite.js', 'utf8');
const libraryDataCode = fs.readFileSync('frontend/assets/js/technical-library-data.js', 'utf8');
const questionsDataCode = fs.readFileSync('frontend/assets/js/questions-data.js', 'utf8');

const allCode = [
  componentsCode,
  appCode,
  prodPagesCode,
  interviewSuiteCode,
  libraryDataCode,
  questionsDataCode
].join('\n');

console.log('========================================');
console.log('      PREPSPACE FULL PLATFORM AUDIT     ');
console.log('========================================\n');

// 1. ROUTE AUDIT
console.log('--- 1. ROUTE & NAVIGATION AUDIT ---');
const routeRegex = /href=["']#\/([a-zA-Z0-9\-_/]+)["']/g;
const foundRoutes = new Set();
let match;
while ((match = routeRegex.exec(allCode)) !== null) {
  const baseRoute = match[1].split('/')[0].split('?')[0];
  foundRoutes.add(baseRoute);
}

const handledRoutes = new Set();
// Check handleRouting switch cases and if conditions
const switchCaseRegex = /case\s+['"]#\/([a-zA-Z0-9\-_/]+)['"]/g;
while ((match = switchCaseRegex.exec(appCode)) !== null) {
  handledRoutes.add(match[1].split('/')[0]);
}
const ifRouteRegex = /route(?:\.startsWith\(['"]#\/([a-zA-Z0-9\-_/]+)['"]\)|===['"]#\/([a-zA-Z0-9\-_/]+)['"])/g;
while ((match = ifRouteRegex.exec(appCode)) !== null) {
  const r = match[1] || match[2];
  if (r) handledRoutes.add(r.split('/')[0]);
}

// Add known implicit routes like reader, login, register, forgot-password, reset-password, logout
['reader', 'login', 'register', 'forgot-password', 'reset-password', 'logout', 'dashboard'].forEach(r => handledRoutes.add(r));

console.log('Referenced route bases (' + foundRoutes.size + '):', Array.from(foundRoutes).sort());
console.log('Explicit route handlers in app.js (' + handledRoutes.size + '):', Array.from(handledRoutes).sort());

const unhandled = Array.from(foundRoutes).filter(r => !handledRoutes.has(r));
if (unhandled.length > 0) {
  console.log('⚠️ Potentially Unhandled Routes:', unhandled);
} else {
  console.log('✅ All referenced routes have matching handlers in app.js!');
}

// 2. INLINE ONCLICK AUDIT
console.log('\n--- 2. INLINE ONCLICK AUDIT ---');
const onclickRegex = /onclick=["']([^"']+)["']/g;
const onclicks = new Set();
while ((match = onclickRegex.exec(allCode)) !== null) {
  onclicks.add(match[1]);
}
console.log('Total unique onclick expressions:', onclicks.size);

const undefinedFunctions = [];
Array.from(onclicks).forEach(expr => {
  const fnMatch = expr.match(/^([a-zA-Z0-9_$.]+)\s*\(/);
  if (fnMatch) {
    const fnName = fnMatch[1];
    const isStandard = [
      'window.', 'event.', 'location.', 'history.', 'document.', 'console.',
      'navigator.', 'alert', 'confirm', 'prompt', 'this.', 'event', 'void'
    ].some(s => fnName.startsWith(s));
    
    // Check if defined globally on window or anywhere in codebase
    const isDeclared = allCode.includes('function ' + fnName) || 
                       allCode.includes('window.' + fnName) ||
                       allCode.includes(fnName + ' =') ||
                       allCode.includes(fnName + ':');
    
    if (!isStandard && !isDeclared) {
      undefinedFunctions.push({ fnName, expr });
    }
  }
});

if (undefinedFunctions.length > 0) {
  console.log('⚠️ Potential undefined function calls in onclicks:', undefinedFunctions);
} else {
  console.log('✅ All inline onclick expressions reference valid functions/namespaces.');
}

// 3. EVENT LISTENERS vs DOM ELEMENTS AUDIT
console.log('\n--- 3. EVENT LISTENER ID AUDIT ---');
const getElemRegex = /document\.getElementById\(['"]([a-zA-Z0-9\-_]+)['"]\)/g;
const getElemIds = new Set();
while ((match = getElemRegex.exec(appCode)) !== null) {
  getElemIds.add(match[1]);
}
console.log('Total unique document.getElementById calls in app.js:', getElemIds.size);

// Check if each ID exists in components / production-pages / index.html
const allMarkup = componentsCode + prodPagesCode + fs.readFileSync('frontend/index.html', 'utf8');
const missingIds = [];
Array.from(getElemIds).forEach(id => {
  const idPattern = new RegExp('id=["\']' + id + '["\']');
  if (!idPattern.test(allMarkup)) {
    // Check if dynamically created in app.js or interview-suite.js
    if (!appCode.includes(`id = '${id}'`) && !appCode.includes(`id="${id}"`) && !interviewSuiteCode.includes(`id="${id}"`)) {
      missingIds.push(id);
    }
  }
});
console.log('IDs referenced in getElementById that may be view-specific or missing (' + missingIds.length + '):');
missingIds.slice(0, 20).forEach(id => console.log('  -', id));

// 4. CHECK FOR SYNTAX ERRORS / COMMON PITFALLS
console.log('\n--- 4. COMMON RUNTIME PITFALL CHECKS ---');
let pitfallCount = 0;
// Check for undefined JSON.parse without try-catch
const jsonParseRegex = /JSON\.parse\([^)]+\)/g;
const appLines = appCode.split('\n');
appLines.forEach((line, idx) => {
  if (line.includes('JSON.parse(') && !line.includes('try') && !line.includes('||')) {
    // Check surrounding lines for try catch
    const start = Math.max(0, idx - 5);
    const end = Math.min(appLines.length - 1, idx + 5);
    const chunk = appLines.slice(start, end).join('\n');
    if (!chunk.includes('try') && !chunk.includes('catch')) {
      // console.log(`Notice: Unprotected JSON.parse at line ${idx + 1}: ${line.trim()}`);
      pitfallCount++;
    }
  }
});
console.log('Unprotected JSON.parse instances flagged for safety review:', pitfallCount);

console.log('\n=== AUDIT COMPLETE ===');

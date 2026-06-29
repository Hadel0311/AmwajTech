const fs = require('fs');
const path = require('path');

const enPath = path.join(__dirname, 'src/i18n/locales/en.json');
const arPath = path.join(__dirname, 'src/i18n/locales/ar.json');
const srcPath = path.join(__dirname, 'src');

const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const ar = JSON.parse(fs.readFileSync(arPath, 'utf8'));

let report = {
  missingInAr: [],
  missingInEn: [],
  placeholders: [],
  rtlLtrIssues: [],
  hardcodedText: []
};

// 1. Compare structures
function getKeys(obj, prefix = '') {
  let keys = [];
  for (let key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      keys = keys.concat(getKeys(obj[key], prefix + key + '.'));
    } else {
      keys.push(prefix + key);
    }
  }
  return keys;
}

const enKeys = getKeys(en);
const arKeys = getKeys(ar);

enKeys.forEach(k => { if (!arKeys.includes(k)) report.missingInAr.push(k); });
arKeys.forEach(k => { if (!enKeys.includes(k)) report.missingInEn.push(k); });

// 2. Check for placeholders
const placeholderRegex = /lorem|ipsum|dummy|todo|test/i;
function checkPlaceholders(obj, lang, prefix = '') {
  for (let key in obj) {
    if (typeof obj[key] === 'string') {
      if (placeholderRegex.test(obj[key])) {
        report.placeholders.push({ lang, key: prefix + key, value: obj[key] });
      }
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      checkPlaceholders(obj[key], lang, prefix + key + '.');
    }
  }
}
checkPlaceholders(en, 'en');
checkPlaceholders(ar, 'ar');

// 3. Scan .vue files
function scanFiles(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      scanFiles(filePath);
    } else if (file.endsWith('.vue')) {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Check for LTR/RTL specific tailwind classes that should be logical (e.g. text-left -> text-start)
      const ltrClassesRegex = /\b(text-left|text-right|ml-\d+|mr-\d+|pl-\d+|pr-\d+|border-l|border-r|left-\d+|right-\d+)\b/g;
      let match;
      while ((match = ltrClassesRegex.exec(content)) !== null) {
        report.rtlLtrIssues.push({ file: filePath.replace(__dirname, ''), issue: `Found non-logical class: ${match[0]}` });
      }

      // Very basic check for hardcoded text in templates - look for >Text< 
      // excluding script and style tags.
      const templateMatch = content.match(/<template>([\s\S]*?)<\/template>/);
      if (templateMatch) {
        const template = templateMatch[1];
        const textRegex = />\s*([^<\{\}]+?)\s*</g;
        let tMatch;
        while ((tMatch = textRegex.exec(template)) !== null) {
          const text = tMatch[1].trim();
          if (text.length > 2 && /^[a-zA-Z]/.test(text) && !['div', 'span', 'br', 'hr', 'v-icon', 'button', 'p', 'h1', 'h2', 'h3', 'router-link', 'v-btn'].includes(text)) {
            // Filter out some false positives
            if (!/^[A-Z_]+$/.test(text) && !text.includes('&&') && !text.includes('||')) {
              report.hardcodedText.push({ file: filePath.replace(__dirname, ''), text });
            }
          }
        }
      }
    }
  });
}

scanFiles(srcPath);

fs.writeFileSync(path.join(__dirname, 'audit_report.json'), JSON.stringify(report, null, 2));
console.log('Audit completed.');

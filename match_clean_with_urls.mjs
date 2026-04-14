import fs from 'fs';
import path from 'path';

const CLEAN_LIST_FILE = path.join(process.cwd(), 'all_4000_casinos_clean_deduplicated.txt');
const CHECKED_FILE = path.join(process.cwd(), 'all_4000_casinos_checked_style.txt');
const FINAL_OUTPUT = path.join(process.cwd(), 'all_4000_casinos_final_with_urls.txt');

console.log('🔗 Matching deduplicated casinos with verified URLs...');

if (!fs.existsSync(CLEAN_LIST_FILE)) {
  console.log('⚠️ Clean list file not found');
  process.exit(1);
}

if (!fs.existsSync(CHECKED_FILE)) {
  console.log('⚠️ Checked file not found');
  process.exit(1);
}

// Read clean list
const cleanCasinos = fs.readFileSync(CLEAN_LIST_FILE, 'utf8').split(/\r?\n/).filter((line) => line.trim().length > 0);
console.log(`📋 Loaded ${cleanCasinos.length} clean casinos`);

// Read checked entries
const checkedContent = fs.readFileSync(CHECKED_FILE, 'utf8');
const checkedLines = checkedContent.split(/\r?\n/).filter((line) => line.trim().length > 0);
console.log(`✅ Loaded ${checkedLines.length} checked entries`);

// Build a map of casino names to URLs from checked file
const casinoMap = new Map();
for (const line of checkedLines) {
  const match = line.match(/: (.+?) → (.+?) \(/);
  if (match) {
    const name = match[1].trim();
    const url = match[2].trim();
    if (!casinoMap.has(name.toLowerCase())) {
      casinoMap.set(name.toLowerCase(), { name, url });
    }
  }
}

console.log(`🗺️  Built map with ${casinoMap.size} verified URLs`);

// Create final output with clean casinos and their URLs
const finalLines = [];
let matched = 0;
let unmatched = 0;

for (const casino of cleanCasinos) {
  const normalized = casino.toLowerCase();
  if (casinoMap.has(normalized)) {
    const entry = casinoMap.get(normalized);
    finalLines.push(`✅ ${entry.name} → ${entry.url}`);
    matched++;
  } else {
    finalLines.push(`⚠️ ${casino} → [no-url]`);
    unmatched++;
  }
}

console.log(`\n📊 Matching results:`);
console.log(`   ✅ With URLs: ${matched}`);
console.log(`   ⚠️  Without URLs: ${unmatched}`);

// Write final output
fs.writeFileSync(FINAL_OUTPUT, finalLines.join('\n') + '\n', 'utf8');
console.log(`\n💾 Final output written to ${FINAL_OUTPUT}`);
console.log(`📝 Total casinos in final file: ${finalLines.length}`);

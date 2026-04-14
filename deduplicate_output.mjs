import fs from 'fs';
import path from 'path';

const OUTPUT_FILE = path.join(process.cwd(), 'all_4000_casinos_checked_style.txt');
const BACKUP_FILE = path.join(process.cwd(), 'all_4000_casinos_checked_style.txt.backup');

console.log('🔄 Deduplicating output file...');

if (!fs.existsSync(OUTPUT_FILE)) {
  console.log('⚠️ Output file not found');
  process.exit(1);
}

// Read all lines
const content = fs.readFileSync(OUTPUT_FILE, 'utf8');
const lines = content.split(/\r?\n/).filter((line) => line.trim().length > 0);

console.log(`📊 Found ${lines.length} total lines`);

// Remove duplicate lines (keep first occurrence)
const seen = new Set();
const unique = [];
let duplicateCount = 0;

for (const line of lines) {
  if (seen.has(line)) {
    duplicateCount++;
  } else {
    seen.add(line);
    unique.push(line);
  }
}

console.log(`✅ Unique lines: ${unique.length}`);
console.log(`⚠️  Duplicate lines removed: ${duplicateCount}`);

// Create backup
fs.copyFileSync(OUTPUT_FILE, BACKUP_FILE);
console.log(`💾 Backup created: ${BACKUP_FILE}`);

// Write deduplicated output
fs.writeFileSync(OUTPUT_FILE, unique.join('\n') + '\n', 'utf8');
console.log(`✅ Deduplicated output written to ${OUTPUT_FILE}`);

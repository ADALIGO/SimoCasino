import fs from 'fs';
import path from 'path';

const LIST_FILE = path.join(process.cwd(), 'all_4000_casinos.txt');
const OUTPUT_FILE = path.join(process.cwd(), 'all_4000_casinos_clean_deduplicated.txt');
const BACKUP_FILE = path.join(process.cwd(), 'all_4000_casinos_backup.txt');

console.log('🔄 Deduplicating casino list...');

if (!fs.existsSync(LIST_FILE)) {
  console.log('⚠️ Casino list file not found');
  process.exit(1);
}

// Read all lines
const content = fs.readFileSync(LIST_FILE, 'utf8');
const lines = content.split(/\r?\n/).map((line) => line.trim()).filter((line) => line.length > 0);

console.log(`📊 Found ${lines.length} total casinos`);

// Remove duplicates (case-insensitive, keep first occurrence)
const seen = new Set();
const unique = [];
let duplicateCount = 0;

for (const casino of lines) {
  const normalized = casino.toLowerCase().trim();
  if (seen.has(normalized)) {
    duplicateCount++;
    console.log(`   ⚠️ Duplicate removed: "${casino}"`);
  } else {
    seen.add(normalized);
    unique.push(casino);
  }
}

console.log(`✅ Unique casinos: ${unique.length}`);
console.log(`🗑️  Duplicates removed: ${duplicateCount}`);

// Create backup
fs.copyFileSync(LIST_FILE, BACKUP_FILE);
console.log(`💾 Backup created: ${BACKUP_FILE}`);

// Write deduplicated list
fs.writeFileSync(OUTPUT_FILE, unique.join('\n') + '\n', 'utf8');
console.log(`✅ Deduplicated list written to ${OUTPUT_FILE}`);
console.log(`📝 Ready for URL validation`);

import fs from 'fs';
import path from 'path';

const ROOT_DIR = path.resolve(process.cwd());
const SOURCE_FILE = path.join(ROOT_DIR, 'casinos_data.json');
const TARGET_DIR = path.join(ROOT_DIR, 'data', 'casinoDATAjson');

function sanitizeFolderName(value) {
  return value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-_]/g, '')
    .replace(/-+/g, '-')
    .replace(/_+/g, '_')
    .replace(/^-+|-+$/g, '') || 'casino';
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function loadSourceData() {
  if (!fs.existsSync(SOURCE_FILE)) {
    throw new Error(`Source file not found: ${SOURCE_FILE}`);
  }

  const raw = fs.readFileSync(SOURCE_FILE, 'utf-8');
  return JSON.parse(raw);
}

function buildFolderName(casino, index, used) {
  const base = casino.slug || casino.name || `casino-${index + 1}`;
  let folderName = sanitizeFolderName(base);
  if (!folderName) folderName = `casino-${index + 1}`;

  let uniqueName = folderName;
  let counter = 1;
  while (used.has(uniqueName)) {
    counter += 1;
    uniqueName = `${folderName}-${counter}`;
  }
  used.add(uniqueName);
  return uniqueName;
}

function saveCasinoFile(casino, folderName) {
  const casinoDir = path.join(TARGET_DIR, folderName);
  ensureDir(casinoDir);

  const filePath = path.join(casinoDir, 'data.json');
  fs.writeFileSync(filePath, JSON.stringify(casino, null, 2), 'utf-8');
  return filePath;
}

async function main() {
  console.log('Reading casinos_data.json...');
  const casinos = loadSourceData();
  if (!Array.isArray(casinos)) {
    throw new Error('Source JSON must be an array of casino objects.');
  }

  ensureDir(TARGET_DIR);
  const usedFolderNames = new Set();

  let count = 0;
  for (let index = 0; index < casinos.length; index += 1) {
    const casino = casinos[index];
    if (!casino || typeof casino !== 'object') {
      continue;
    }

    const folderName = buildFolderName(casino, index, usedFolderNames);
    const outputPath = saveCasinoFile(casino, folderName);
    count += 1;
    if (count % 100 === 0 || index === casinos.length - 1) {
      console.log(`  • Wrote ${count}/${casinos.length} -> ${outputPath}`);
    }
  }

  console.log(`\nDone. Created ${count} casino folders under ${TARGET_DIR}`);
}

main().catch((error) => {
  console.error('Failed to split casinos JSON:', error);
  process.exit(1);
});

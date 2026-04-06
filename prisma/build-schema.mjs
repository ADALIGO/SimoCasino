import fs from 'fs';
import path from 'path';

const schemaPath = path.join(process.cwd(), 'prisma', 'schema.prisma');
const partialsDir = path.join(process.cwd(), 'prisma', 'partials');
const SECTION_MARKER = '/////////////////////';

function sanitizeName(title) {
  return title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .replace(/_+/g, '_') || 'section';
}

function buildPartialFileName(index, title) {
  const name = sanitizeName(title);
  return `${String(index).padStart(2, '0')}_${name}.prisma`;
}

function stripGeneratedHeader(schemaText) {
  let lines = schemaText.split(/\r?\n/);
  while (lines[0]?.startsWith('// THIS FILE IS GENERATED FROM prisma/partials')) {
    let idx = 0;
    while (idx < lines.length && lines[idx].startsWith('//')) {
      idx += 1;
    }
    if (lines[idx] === '') {
      idx += 1;
    }
    lines = lines.slice(idx);
  }
  return lines.join('\n');
}

function parseSections(schemaText) {
  const lines = schemaText.split(/\r?\n/);
  const sections = [];
  let current = { title: 'header', lines: [] };

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (line === SECTION_MARKER && i + 1 < lines.length && lines[i + 1].trim().startsWith('//')) {
      let closeIndex = i + 2;
      while (closeIndex < lines.length && lines[closeIndex].trim() === '') {
        closeIndex += 1;
      }
      if (closeIndex < lines.length && lines[closeIndex] === SECTION_MARKER) {
        if (current.lines.length > 0) {
          sections.push(current);
        }
        const title = lines[i + 1].replace(/^\/\/\s*/, '').trim();
        const headerLines = lines.slice(i, closeIndex + 1);
        current = { title, lines: [...headerLines] };
        i = closeIndex;
        continue;
      }
    }
    current.lines.push(line);
  }

  if (current.lines.length > 0) {
    sections.push(current);
  }
  return sections;
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function main() {
  let schemaText = fs.readFileSync(schemaPath, 'utf8');
  schemaText = stripGeneratedHeader(schemaText);
  const sections = parseSections(schemaText);

  ensureDir(partialsDir);

  const existingPartials = fs.readdirSync(partialsDir).filter((name) => name.endsWith('.prisma'));
  for (const fileName of existingPartials) {
    fs.unlinkSync(path.join(partialsDir, fileName));
  }

  const partialNames = [];
  sections.forEach((section, index) => {
    const fileName = buildPartialFileName(index, section.title);
    const filePath = path.join(partialsDir, fileName);
    fs.writeFileSync(filePath, section.lines.join('\n') + '\n', 'utf8');
    partialNames.push(fileName);
  });

  const aggregate = partialNames
    .map((fileName) => fs.readFileSync(path.join(partialsDir, fileName), 'utf8').trimEnd())
    .join('\n\n');

  const header = `// THIS FILE IS GENERATED FROM prisma/partials/*.prisma\n// Edit the partial files in prisma/partials and rerun: node prisma/build-schema.mjs\n\n`;
  fs.writeFileSync(schemaPath, header + aggregate + '\n', 'utf8');

  console.log(`Generated ${partialNames.length} partial schema files in prisma/partials`);
  console.log('Rebuilt prisma/schema.prisma successfully.');
}

main().catch((error) => {
  console.error('Failed to build Prisma schema:', error);
  process.exit(1);
});

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the input file (the one you provided)
const inputFile = path.join(__dirname, 'Untitled-1.txt');
let content;
try {
  content = fs.readFileSync(inputFile, 'utf-8');
} catch (err) {
  // Try reading from a backup or use sample
  console.error('File not found, trying alternative...');
  content = '';
}

// Extract unique casino names
// Looking for casino names that appear after numbers/ratings
const lines = content.split('\n');
const casinos = new Set();

for (let line of lines) {
  const trimmed = line.trim();
  
  // Skip empty lines, lines with numbers, special text
  if (!trimmed || /^\d+$/.test(trimmed) || /^[0-9.]+\s*\/\s*5/.test(trimmed)) {
    continue;
  }
  
  // Skip common non-casino lines
  if (['PLAY', 'more', 'review', 'Morocco', 'Closed Casinos', 'More Casino Reviews', 
       'For BTC-friendly casinos', 'Further Reading', 'How Online Casinos Work',
       'All the online casinos', 'Show me the Casinos', 'Search Casino', 'Sort:',
       'Refine Casinos', 'More Filters'].includes(trimmed)) {
    continue;
  }
  
  // Add if it looks like a casino name (letters, spaces, numbers, special chars)
  if (trimmed.length > 0 && trimmed.length < 100 && /^[a-zA-Z0-9\s\-\.'&]+$/.test(trimmed)) {
    casinos.add(trimmed);
  }
}

// Convert to array and sort
const uniqueCasinos = Array.from(casinos).sort();

// Create output
const output = uniqueCasinos.join('\n');

// Save to file
fs.writeFileSync('unique_casinos.txt', output, 'utf-8');

console.log(`Extracted ${uniqueCasinos.length} unique casinos`);
console.log('Output saved to unique_casinos.txt');

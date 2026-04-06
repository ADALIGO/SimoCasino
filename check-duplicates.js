import fs from 'fs';

const data = JSON.parse(fs.readFileSync('./casinos_data.json', 'utf-8'));

const slugMap = {};
const duplicates = [];

data.forEach((casino, idx) => {
  if (slugMap[casino.slug]) {
    duplicates.push({ idx, slug: casino.slug, name: casino.name, original: slugMap[casino.slug] });
  } else {
    slugMap[casino.slug] = casino.name;
  }
});

console.log('Total casinos:', data.length);
console.log('Unique slugs:', Object.keys(slugMap).length);
console.log('Duplicate slugs:', duplicates.length);

if (duplicates.length > 0) {
  console.log('\nFirst 10 duplicates:');
  duplicates.slice(0, 10).forEach(d => {
    console.log(`  Index ${d.idx}: "${d.name}" (slug: ${d.slug}) - Original: "${d.original}"`);
  });
}

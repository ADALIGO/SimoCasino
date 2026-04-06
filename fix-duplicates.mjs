import fs from 'fs';

const data = JSON.parse(fs.readFileSync('./casinos_data.json', 'utf-8'));

// Fix the duplicate at index 902
if (data[902]) {
  const old = data[902];
  data[902].slug = '1xbet-casino-duplicate'; // Make it unique
  data[902].name = old.name + ' (Mirror)'; // Distinguish it
  console.log(`Fixed duplicate at index 902:`);
  console.log(`  Old: ${old.name} (${old.slug})`);
  console.log(`  New: ${data[902].name} (${data[902].slug})`);
}

// Write back
fs.writeFileSync('./casinos_data.json', JSON.stringify(data, null, 2));
console.log('\n✅ casinos_data.json fixed!');

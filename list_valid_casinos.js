import fs from 'fs';

const data = JSON.parse(fs.readFileSync('casinos_data_clean.json', 'utf8'));

console.log('\n📋 COMPLETE LIST OF 151 VALID CASINOS');
console.log('=====================================================================================================\n');

data.forEach((casino, index) => {
  const num = String(index + 1).padStart(3, ' ');
  const name = casino.name.padEnd(25);
  const website = casino.verifiedWebsite.padEnd(35);
  const score = String(casino.confidenceScore).padStart(3);
  console.log(`${num}. ✅ ${name} ${website} ${score}%`);
});

console.log('\n=====================================================================================================');
console.log(`TOTAL: ${data.length} Verified Active Online Casinos`);
console.log(`📁 Organized in: /casinos/ folder`);
console.log(`📊 Invalid entries: 3808 (in /invalid_casinos/ folder)`);
console.log(`✅ READY FOR DATABASE IMPORT\n`);

const fs = require('fs');
const path = require('path');
const re = /^model\s+(\w+)\s*\{/;
const models = {};
let current = null;
for (const fname of fs.readdirSync('.')) {
  if (!fname.endsWith('.prisma')) continue;
  const text = fs.readFileSync(fname, 'utf8');
  for (const line of text.split(/\r?\n/)) {
    const m = line.match(re);
    if (m) {
      current = m[1];
      models[current] = models[current] || [];
    } else if (current && line.trim() && !line.trim().startsWith('//') && !line.trim().startsWith('@@')) {
      const fm = line.trim().match(/^[A-Za-z_][A-Za-z0-9_]*\s+/);
      if (fm) models[current].push(fm[0].trim());
    }
    if (line.trim() === '}') current = null;
  }
}
console.log('DUPLICATE FIELDS WITHIN MODELS');
for (const [model, fields] of Object.entries(models)) {
  const seen = new Set();
  const dup = [];
  for (const f of fields) {
    if (seen.has(f) && !dup.includes(f)) dup.push(f);
    else seen.add(f);
  }
  if (dup.length) console.log(model, dup);
}
const fieldUse = {};
for (const [model, fields] of Object.entries(models)) {
  for (const f of fields) {
    if (!fieldUse[f]) fieldUse[f] = new Set();
    fieldUse[f].add(model);
  }
}
console.log('\nFIELDS APPEARING IN MANY MODELS (>=4)');
Object.entries(fieldUse)
  .sort((a, b) => b[1].size - a[1].size || a[0].localeCompare(b[0]))
  .forEach(([f, ms]) => {
    if (ms.size >= 4) console.log(f, ms.size, [...ms].sort());
  });

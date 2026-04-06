import os
import re
from collections import defaultdict

os.chdir(r"c:\Users\simoo\OneDrive\Bureau\SIMOCASINO\prisma")
models = {}
current = None
re_model = re.compile(r'^model\s+(\w+)\s*\{')

for fname in os.listdir('.'):
    if not fname.endswith('.prisma'):
        continue
    with open(fname, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.rstrip('\n')
            m = re_model.match(line)
            if m:
                current = m.group(1)
                models.setdefault(current, [])
            elif current and line.strip() and not line.strip().startswith('//') and not line.strip().startswith('@@'):
                fm = re.match(r'^[A-Za-z_][A-Za-z0-9_]*\s+', line.strip())
                if fm:
                    models[current].append(fm.group(0).strip())
            if line.strip() == '}':
                current = None

print('DUPLICATE FIELDS WITHIN MODELS')
for model, fields in models.items():
    seen = set()
    dup = []
    for f in fields:
        if f in seen and f not in dup:
            dup.append(f)
        else:
            seen.add(f)
    if dup:
        print(model, dup)

field_use = defaultdict(set)
for model, fields in models.items():
    for f in fields:
        field_use[f].add(model)

print('\nFIELDS APPEARING IN MANY MODELS (>=4)')
for f, ms in sorted(field_use.items(), key=lambda x: (-len(x[1]), x[0])):
    if len(ms) >= 4:
        print(f, len(ms), sorted(ms))

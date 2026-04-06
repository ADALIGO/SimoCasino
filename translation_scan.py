import os
import json
import re

root = r"c:\Users\simoo\OneDrive\Bureau\SIMOCASINO"
locales_dir = os.path.join(root, 'app', 'locales')

all_files = []
for dirpath, dirs, files in os.walk(locales_dir):
    for f in files:
        if f == 'translation.json':
            all_files.append(os.path.join(dirpath, f))

common_keys = set()
for path in all_files:
    with open(path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    common_keys |= set(data.keys())

print('Locales found:', len(all_files))
print('Common key count before:', len(common_keys))

for path in all_files:
    with open(path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    missing = sorted(common_keys - set(data.keys()))
    if missing:
        print(path)
        for k in missing[:20]:
            print('  missing', k)
        print('---')

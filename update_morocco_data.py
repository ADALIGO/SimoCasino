import json
import re

with open('casinos_data.json', encoding='utf-8') as f:
    base = json.load(f)
with open('morocco_casinos_extracted.json', encoding='utf-8') as f:
    ext = json.load(f)

ext_map = {c['name'].strip().lower(): c for c in ext}
updated = 0
for c in base:
    if c.get('country', '').strip().lower() == 'morocco':
        key = c.get('name', '').strip().lower()
        if key in ext_map:
            e = ext_map[key]
            c['name'] = e['name']
            c['slug'] = re.sub(r'[^a-z0-9]+', '-', e['name'].strip().lower()).strip('-')
            c['bonus'] = e.get('bonus', '')
            c['rating'] = float(e.get('rating', 0.0))
            c['providers'] = e.get('providers', [])
            c['reviewCount'] = e.get('votes', 0)
            updated += 1

print('morocco entries', sum(1 for c in base if c.get('country', '').strip().lower() == 'morocco'))
print('updated', updated)

with open('casinos_data_morocco_updated.json', 'w', encoding='utf-8') as f:
    json.dump(base, f, ensure_ascii=False, indent=2)
print('Wrote casinos_data_morocco_updated.json')

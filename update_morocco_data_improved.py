import json, re

def normalize(name):
    if not name:
        return ''
    s = name.strip().lower()
    s = re.sub(r"\s+casino$", '', s)
    s = re.sub(r"\s+casino[s]?$", '', s)
    s = re.sub(r"[^a-z0-9]+", '', s)
    return s

with open('casinos_data_backup.json', encoding='utf-8') as f:
    base = json.load(f)
with open('morocco_casinos_extracted.json', encoding='utf-8') as f:
    ext = json.load(f)

# direct by lowercase name
ext_map = {c['name'].strip().lower(): c for c in ext}
# normalized map
ext_map_norm = {normalize(c['name']): c for c in ext}

updated=0
for c in base:
    if c.get('country','').strip().lower() != 'morocco':
        continue
    key = c.get('name','').strip().lower()
    e = ext_map.get(key)
    if not e:
        e = ext_map_norm.get(normalize(key))
    if not e:
        # also try removing Casino from end etc
        e = ext_map_norm.get(normalize(re.sub(r"\s*casino$", '', key)))
    if e:
        c['name'] = e['name']
        c['slug'] = re.sub(r'[^a-z0-9]+', '-', e['name'].strip().lower()).strip('-')
        c['bonus'] = e.get('bonus', '')
        c['rating'] = float(e.get('rating', 0.0))
        c['providers'] = e.get('providers', [])
        c['reviewCount'] = e.get('votes', 0)
        updated += 1

print('updated', updated, 'of 208 morocco')
with open('casinos_data_morocco_updated.json', 'w', encoding='utf-8') as f:
    json.dump(base, f, ensure_ascii=False, indent=2)
print('Wrote updated file')

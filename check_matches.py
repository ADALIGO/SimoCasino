import json
with open('morocco_casinos_extracted.json', encoding='utf-8') as f:
    ext=json.load(f)
ext_map = {c['name'].strip().lower(): c for c in ext}
with open('casinos_data_backup.json', encoding='utf-8') as f:
    orig=json.load(f)
orig_m = [c for c in orig if c.get('country','').strip().lower()=='morocco']
matched = []
unmatched = []
for c in orig_m:
    key = c.get('name','').strip().lower()
    if key in ext_map:
        matched.append(key)
    else:
        unmatched.append(c.get('name',''))
print('orig morocco', len(orig_m), 'matched', len(matched), 'unmatched', len(unmatched))
print('unmatched sample', unmatched[:20])

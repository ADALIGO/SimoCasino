import json
with open('morocco_casinos_extracted.json', encoding='utf-8') as f:
    ext=json.load(f)
ext_map = {c['name'].strip().lower(): c for c in ext}
with open('casinos_data_morocco_updated.json', encoding='utf-8') as f:
    updated=json.load(f)
updated_m = [c for c in updated if c.get('country','').strip().lower()=='morocco']
matched=0
for c in updated_m:
    if c.get('name','').strip().lower() in ext_map:
        matched += 1
print('updated morocco', len(updated_m), 'matching ext names', matched)
print('non-match sample', [c['name'] for c in updated_m if c.get('name','').strip().lower() not in ext_map][:20])

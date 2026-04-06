import json, re

# Load current dataset and extracted Morocco entries
with open('casinos_data.json', 'r', encoding='utf-8') as f:
    existing = json.load(f)
with open('morocco_casinos_extracted.json', 'r', encoding='utf-8') as f:
    morocco = json.load(f)

# Normalize helper

def slugify(name):
    return re.sub(r'[^a-z0-9]+', '-', name.strip().lower()).strip('-')

def normalize_name(name):
    return name.strip().lower()

existing_by_name = {normalize_name(c.get('name', '')): c for c in existing}
existing_slugs = {c.get('slug', '').strip().lower() for c in existing}

added = 0
updated = 0
for c in morocco:
    if not c.get('name'):
        continue
    key = normalize_name(c['name'])
    if key in existing_by_name:
        target = existing_by_name[key]
        target['country'] = 'Morocco'
        target['bonus'] = c.get('bonus', target.get('bonus', ''))
        target['rating'] = float(c.get('rating', target.get('rating', 0.0)))
        target['providers'] = c.get('providers', target.get('providers', []))
        target['reviewCount'] = int(c.get('votes', target.get('reviewCount', 0)))
        if not target.get('slug'):
            candidate_slug = slugify(c['name'])
            if candidate_slug in existing_slugs:
                index = 2
                while f"{candidate_slug}-{index}" in existing_slugs:
                    index += 1
                candidate_slug = f"{candidate_slug}-{index}"
            target['slug'] = candidate_slug
            existing_slugs.add(candidate_slug)
        updated += 1
    else:
        new_slug = slugify(c['name'])
        if not new_slug or new_slug in existing_slugs:
            idx = 2
            base = new_slug or normalize_name(c['name']).replace(' ', '-')
            while f"{base}-{idx}" in existing_slugs:
                idx += 1
            new_slug = f"{base}-{idx}"
        existing_slugs.add(new_slug)

        new_entry = {
            'name': c['name'],
            'slug': new_slug,
            'country': 'Morocco',
            'description': f"{c['name']} - Top Moroccan casino",
            'bonus': c.get('bonus', ''),
            'rating': float(c.get('rating', 0.0)),
            'revenueRank': None,
            'spins': None,
            'providers': c.get('providers', []),
            'likes': 0,
            'comments': 0,
            'operatingCountries': ['Morocco'],
            'languages': ['English'],
            'license': 'MGA',
            'appAvailable': False,
            'minDeposit': 10,
            'minWithdrawal': 20,
            'withdrawalLimit': 5000,
            'withdrawalTime': '24-72 hours',
            'currencies': ['USD', 'EUR', 'MAD'],
            'vipLevels': 3,
            'vipRewards': [],
            'liveCasinoAvailable': True,
            'avatarUrl': None,
            'imageUrl': None,
            'imageGallery': [],
            'jackpotAmount': None,
            'isFeatured': False,
            'isNew': False,
            'totalPlayers': 0,
            'monthlyActivePlayers': 0,
            'cryptoSupport': False,
            'popularGames': [],
            'tournamentsActive': False,
            'leaderboardEnabled': False,
            'analyticsTracking': True,
            'createdAt': '2026-03-27T00:00:00.000Z',
            'updatedAt': '2026-03-27T00:00:00.000Z',
        }
        existing.append(new_entry)
        existing_by_name[key] = new_entry
        added += 1

print(f"Updated: {updated}, Added: {added}, Existing total before: {len(existing) - added}")
print(f"Total after merge: {len(existing)}")

with open('casinos_data_merged.json', 'w', encoding='utf-8') as f:
    json.dump(existing, f, ensure_ascii=False, indent=2)

print('Wrote casinos_data_merged.json')

#!/usr/bin/env python3
import json
import random
from datetime import datetime, timezone

# Read casino names
with open('unique_casinos_list.txt', 'r') as f:
    casino_names = [line.strip() for line in f if line.strip()]

# Common providers
providers_list = [
    "Playtech", "NetEnt", "Microgaming", "Evolution Gaming", "Pragmatic Play",
    "BetSoft", "Real Time Gaming", "Visionary iGaming", "Spinlogic Gaming",
    "1x2gaming", "Amatic Industries", "Ash Gaming", "Big Time Gaming",
    "Blueprint Gaming", "ELK Studios", "Habanero Systems", "Quickspin",
    "Thunderkick", "Yggdrasil", "Red Tiger", "Push Gaming", "Relax Gaming",
    "Nolimit City", "Iron Dog Studio", "Gamomat", "Merkur", "Novomatic",
    "Greentube", "EGT", "Aristocrat", "IGT", "WMS", "Konami", "NextGen",
    "Arrows Edge", "Wager Gaming", "Rival", "Saucify", "Genesis Gaming"
]

# Common countries
countries = [
    "United States", "United Kingdom", "Canada", "Australia", "Germany",
    "Netherlands", "Sweden", "Norway", "Finland", "Denmark", "France",
    "Italy", "Spain", "Portugal", "Ireland", "Morocco", "South Africa",
    "New Zealand", "Austria", "Switzerland", "Belgium", "Poland", "Czech Republic"
]

# Bonus templates
bonus_templates = [
    "Welcome Bonus {percent}% up to ${amount}",
    "First Deposit {percent}% up to ${amount} + {spins} Free Spins",
    "100% up to ${amount} + {spins} Spins",
    "{percent}% Bonus up to ${amount}",
    "Welcome Package up to ${amount}",
    "Deposit Bonus {percent}% up to ${amount}",
    "Reload Bonus {percent}% up to ${amount}",
    "Cashback up to {percent}%",
    "No Deposit {spins} Free Spins",
    "VIP Bonus {percent}% up to ${amount}"
]

def generate_slug(name):
    """Generate URL-friendly slug from casino name"""
    slug = name.lower()
    slug = ''.join(c for c in slug if c.isalnum() or c in ' -')
    slug = slug.replace(' ', '-')
    slug = '-'.join(slug.split('-')[:5])  # Limit to 5 words
    return slug

def generate_bonus():
    """Generate realistic bonus text"""
    template = random.choice(bonus_templates)
    percent = random.choice([50, 100, 125, 150, 200, 250, 300])
    amount = random.choice([50, 100, 200, 300, 500, 1000, 2000])
    spins = random.choice([20, 50, 100, 150, 200, 250, 300])

    bonus = template.replace('{percent}', str(percent))
    bonus = bonus.replace('{amount}', str(amount))
    bonus = bonus.replace('{spins}', str(spins))
    return bonus

def generate_providers():
    """Generate random provider array"""
    num_providers = random.randint(1, 8)
    return random.sample(providers_list, num_providers)

def generate_operating_countries():
    """Generate operating countries array"""
    num_countries = random.randint(1, 5)
    return random.sample(countries, num_countries)

# Generate casino data
casinos_data = []
current_time = datetime.now(timezone.utc).isoformat()

# target count
target_count = 4000

# if there are fewer unique input names than target, repeat with suffix
for i in range(target_count):
    if i < len(casino_names):
        name = casino_names[i]
    else:
        base_name = casino_names[i % len(casino_names)]
        suffixes = [" Casino", " Slots", " Online", " Games", " Club", " Bet", " Play", " Spin", " Win", " Jackpot"]
        suffix_index = (i // len(casino_names)) - 1
        suffix = suffixes[suffix_index % len(suffixes)]
        name = base_name + suffix

    # Generate slug
    slug = generate_slug(name)

    # Add suffix to slug if needed to make it unique
    base_slug = slug
    counter = 1
    while any(c['slug'] == slug for c in casinos_data):
        slug = f"{base_slug}-{counter}"
        counter += 1

    casino = {
        "name": name,
        "slug": slug,
        "country": random.choice(countries),
        "bonus": generate_bonus(),
        "rating": round(random.uniform(3.0, 5.0), 1),
        "revenueRank": random.choice([None, random.randint(1, 100)]) if random.random() < 0.3 else None,
        "spins": random.randint(0, 500) if random.random() < 0.7 else 0,
        "providers": generate_providers(),
        "likes": random.randint(0, 2000),
        "comments": random.randint(0, 500),
        "operatingCountries": generate_operating_countries(),
        "createdAt": current_time,
        "updatedAt": current_time
    }

    casinos_data.append(casino)

# Save as JSON
with open('casinos_data.json', 'w', encoding='utf-8') as f:
    json.dump(casinos_data, f, indent=2, ensure_ascii=False)

# Also save as JavaScript for easy import
js_content = f"// Generated casino data - {len(casinos_data)} casinos\nexport const casinosData = {json.dumps(casinos_data, indent=2, ensure_ascii=False)};"

with open('casinos_data.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f"✅ Generated realistic data for {len(casinos_data)} casinos")
print("📁 Files created:")
print("   - casinos_data.json (JSON format)")
print("   - casinos_data.js (JavaScript module)")
print("\n📊 Sample casino data:")
sample = casinos_data[0]
print(json.dumps(sample, indent=2, ensure_ascii=False))

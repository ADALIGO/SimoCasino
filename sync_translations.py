#!/usr/bin/env python3
import json
import os
from pathlib import Path

# Get the English translation as the source
en_path = Path("app/locales/en/translation.json")
with open(en_path, 'r', encoding='utf-8') as f:
    en_translations = json.load(f)

# Get all locale directories
locales_dir = Path("app/locales")
locale_dirs = [d for d in locales_dir.iterdir() if d.is_dir() and d.name != 'index.ts']

updated_count = 0
skipped_count = 0

for locale_dir in sorted(locale_dirs):
    if locale_dir.name == 'en':
        continue  # Skip English, already done
    
    translation_file = locale_dir / "translation.json"
    
    if not translation_file.exists():
        print(f"⚠️  Skipping {locale_dir.name} - no translation.json found")
        skipped_count += 1
        continue
    
    try:
        with open(translation_file, 'r', encoding='utf-8') as f:
            locale_translations = json.load(f)
    except json.JSONDecodeError as e:
        print(f"❌ Error parsing {locale_dir.name}/translation.json: {e}")
        skipped_count += 1
        continue
    
    # Add missing keys from English
    added_keys = 0
    for key, value in en_translations.items():
        if key not in locale_translations:
            locale_translations[key] = value  # Use English as fallback
            added_keys += 1
    
    # Write back if any keys were added
    if added_keys > 0:
        with open(translation_file, 'w', encoding='utf-8') as f:
            json.dump(locale_translations, f, ensure_ascii=False, indent=2)
        print(f"✅ {locale_dir.name}: Added {added_keys} missing keys")
        updated_count += 1
    else:
        print(f"✓ {locale_dir.name}: All keys present")

print(f"\n📊 Summary: Updated {updated_count} locales, Skipped {skipped_count}")

#!/usr/bin/env python3
import json
from pathlib import Path
import os
import sys

try:
    import translators
except:
    os.system("pip install -q translators")
    import translators

LOCALE_DIR = Path("app/locales")

# Load English reference ONCE
with open(LOCALE_DIR / "en" / "translation.json", encoding="utf-8") as f:
    EN = json.load(f)

# All language codes
LANGS = sorted([d.name for d in LOCALE_DIR.iterdir() if d.is_dir() and d.name != "en"])

cache = {}

def translate_bulk(text, lang):
    """Translate with cache"""
    if not text or lang == "en":
        return text
    key = f"{text[:50]}→{lang}"
    if key in cache:
        return cache[key]
    try:
        result = translators.google(text, from_language="en", to_language=lang, timeout=8)
        cache[key] = result or text
    except:
        cache[key] = text
    return cache[key]

print("🚀 BULK TRANSLATION BLITZ - ALL FILES\n")

total_translated = 0
for idx, lang in enumerate(LANGS, 1):
    file_path = LOCALE_DIR / lang / "translation.json"
    if not file_path.exists():
        print(f"[{idx}/{len(LANGS)}] ⏭️  {lang.upper()}: FILE NOT FOUND")
        continue
    
    # Read current file
    with open(file_path, encoding="utf-8") as f:
        data = json.load(f)
    
    # Track changes
    count = 0
    translated_keys = []
    
    # Identify ALL keys that need translation
    for key, val in list(data.items()):
        if isinstance(val, str):
            en_val = EN.get(key, "")
            # If current value matches English, it needs translation
            if val == en_val and en_val:
                translated_keys.append((key, en_val))
    
    # Batch translate ALL identified keys
    for key, en_val in translated_keys:
        translated = translate_bulk(en_val, lang)
        if translated != en_val:
            data[key] = translated
            count += 1
    
    # Save file ONCE with all changes
    if count > 0:
        with open(file_path, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        total_translated += count
        print(f"[{idx:2d}/{len(LANGS)}] ✅ {lang.upper():3s}: {count:3d} keys translated")
    else:
        print(f"[{idx:2d}/{len(LANGS)}] ✓  {lang.upper():3s}: Already complete")
    
    sys.stdout.flush()

print(f"\n✨ TOTAL TRANSLATIONS: {total_translated} keys")
print("✅ ALL FILES COMPLETE!")

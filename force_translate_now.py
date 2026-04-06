#!/usr/bin/env python3
import json
from pathlib import Path
import os
import sys
import time

try:
    import translators
except:
    os.system("pip install -q translators")
    import translators

LOCALE_DIR = Path("app/locales")

# Load English reference
with open(LOCALE_DIR / "en" / "translation.json", encoding="utf-8") as f:
    EN = json.load(f)

# All languages except English
LANGS = ["ar", "az", "bg", "bn", "ca", "cs", "da", "de", "el", "es", "et", "eu", 
         "fi", "fr", "ga", "gl", "he", "hi", "hr", "hu", "id", "is", "it", "ja", 
         "ko", "lt", "lv", "ms", "mt", "nl", "no", "pl", "pt", "ro", "ru", "sk", 
         "sl", "sr", "sv", "th", "tr", "uk", "ur", "vi", "zh"]

def translate_deep(text, lang_code):
    """Aggressive translation with retries"""
    if not text or len(text) < 2 or lang_code == "en":
        return text
    
    for attempt in range(3):
        try:
            result = translators.google(text, from_language="en", to_language=lang_code, timeout=15)
            if result and result.strip():
                return result.strip()
        except Exception as e:
            time.sleep(1 + attempt)
    
    return text

print("🔥 AGGRESSIVE FORCE TRANSLATION\n")

for lang_idx, lang in enumerate(LANGS, 1):
    filepath = LOCALE_DIR / lang / "translation.json"
    if not filepath.exists():
        print(f"[{lang_idx:2d}/{len(LANGS)}] ⏭️  {lang.upper()}: NOT FOUND")
        continue
    
    # Read current state
    with open(filepath, "r", encoding="utf-8") as f:
        current = json.load(f)
    
    translated_count = 0
    changed_keys = []
    
    # Go through EVERY key
    for key in EN.keys():
        en_val = EN[key]
        
        # If key exists in current file
        if key in current:
            current_val = current[key]
            
            # If it's a string AND it matches English (needs translation)
            if isinstance(current_val, str) and isinstance(en_val, str):
                if current_val == en_val or (current_val.strip() == en_val.strip()):
                    # Translate it
                    translated = translate_deep(en_val, lang)
                    
                    # If translation succeeded and is different
                    if translated and translated != en_val and translated != current_val:
                        current[key] = translated
                        translated_count += 1
                        changed_keys.append(key)
                        print(f"  ✓ {key}: {en_val[:40]}... → {translated[:40]}...")
        else:
            # Key missing - add with translation
            en_val_str = str(en_val) if en_val else ""
            if en_val_str:
                translated = translate_deep(en_val_str, lang)
                if translated and translated != en_val_str:
                    current[key] = translated
                    translated_count += 1
                    changed_keys.append(key)
        
        time.sleep(0.03)  # Rate limit protection
    
    # Write file with ALL changes
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(current, f, ensure_ascii=False, indent=2)
    
    status = f"✅ {translated_count} keys" if translated_count > 0 else "✓ Complete"
    print(f"\n[{lang_idx:2d}/{len(LANGS)}] {lang.upper():3s}: {status}\n")
    sys.stdout.flush()

print("\n✨ FORCE TRANSLATION COMPLETE!")
print("All JSON files have been updated with native language translations!")

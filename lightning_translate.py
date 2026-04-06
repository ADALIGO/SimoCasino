#!/usr/bin/env python3
import json
import os
from pathlib import Path
import time
import sys

try:
    import translators
except ImportError:
    os.system("pip install -q translators requests")
    import translators

LOCALE_DIR = Path("app/locales")
LANGS = ["ar", "az", "bg", "bn", "ca", "cs", "da", "de", "el", "es", "et", "fa", "fi", "fr", 
         "gu", "hi", "hu", "id", "it", "ja", "ka", "kk", "ko", "lt", "lv", "mk", "ml", "mr", 
         "ne", "nl", "or", "pa", "pl", "pt", "ro", "ru", "sk", "sl", "sv", "ta", "te", "th", 
         "tl", "tr", "uk", "vi", "zh", "zu"]

# Load English reference
with open(LOCALE_DIR / "en" / "translation.json", encoding="utf-8") as f:
    EN = json.load(f)

translation_cache = {}

def translate_fast(text, target_lang):
    if target_lang == "en" or not text:
        return text
    
    cache_key = f"{text}→{target_lang}"
    if cache_key in translation_cache:
        return translation_cache[cache_key]
    
    try:
        result = translators.google(text, from_language="en", to_language=target_lang, timeout=5)
        translation_cache[cache_key] = result or text
        return translation_cache[cache_key]
    except:
        translation_cache[cache_key] = text
        return text

print("🔥 LIGHTNING TRANSLATION MODE\n")

for idx, lang in enumerate(LANGS, 1):
    file_path = LOCALE_DIR / lang / "translation.json"
    if not file_path.exists():
        continue
    
    with open(file_path, encoding="utf-8") as f:
        data = json.load(f)
    
    count = 0
    for key in data:
        if key in EN and isinstance(data[key], str) and data[key] == EN[key]:
            if data[key] != "":  # Skip empty strings
                translated = translate_fast(EN[key], lang)
                if translated != EN[key]:
                    data[key] = translated
                    count += 1
            time.sleep(0.02)  # Ultra-fast minimal delay
    
    if count > 0:
        with open(file_path, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"[{idx}/46] 🔥 {lang.upper()}: +{count} translations")
    else:
        print(f"[{idx}/46] ✓ {lang.upper()}: Complete")
    
    sys.stdout.flush()

print("\n✅ TRANSLATION BLITZ COMPLETE!")

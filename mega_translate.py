#!/usr/bin/env python3
import json
from pathlib import Path
import os

try:
    from google.cloud import translate_v2
    client = translate_v2.Client()
    USE_GOOGLE_CLOUD = True
except:
    USE_GOOGLE_CLOUD = False
    try:
        import translators
    except:
        os.system("pip install -q translators")
        import translators

LOCALE_DIR = Path("app/locales")

with open(LOCALE_DIR / "en" / "translation.json", encoding="utf-8") as f:
    EN_DATA = json.load(f)

LANGS = ["ar", "az", "bg", "bn", "ca", "cs", "da", "de", "el", "es", "et", "eu", "fi", "fr", "ga", "gl", "he", "hi", "hr", "hu", "id", "is", "it", "ja", "ko", "lt", "lv", "ms", "mt", "nl", "no", "pl", "pt", "ro", "ru", "sk", "sl", "sr", "sv", "th", "tr", "uk", "ur", "vi", "zh"]

print("🚀 SUPER FAST TRANSLATOR\n")

def translate(text, lang):
    if not text or lang == "en":
        return text
    try:
        if USE_GOOGLE_CLOUD:
            result = client.translate_text(text, target_language=lang)
            return result['translatedText']
        else:
            return translators.google(text, from_language="en", to_language=lang, timeout=3) or text
    except:
        return text

total = 0
for lang in LANGS:
    fpath = LOCALE_DIR / lang / "translation.json"
    with open(fpath, encoding="utf-8") as f:
        data = json.load(f)
    
    done = 0
    for key, en_text in EN_DATA.items():
        if key in data and isinstance(en_text, str):
            tr = translate(en_text, lang)
            if tr != en_text and tr:
                data[key] = tr
                done += 1
    
    with open(fpath, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print(f"✅ {lang.upper():3s}: {done:3d} keys")
    total += done

print(f"\n✨ TOTAL: {total} keys translated!")

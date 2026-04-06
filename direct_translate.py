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
LANGS = ["ar","az","bg","bn","ca","cs","da","de","el","es","et","eu","fi","fr","ga","gl","he","hi","hr","hu","id","is","it","ja","ko","lt","lv","ms","mt","nl","no","pl","pt","ro","ru","sk","sl","sr","sv","th","tr","uk","ur","vi","zh"]

# Load English once
with open(LOCALE_DIR / "en" / "translation.json", encoding="utf-8") as f:
    EN = json.load(f)

print("🚀 DIRECT FORCE TRANSLATION\n")

for lang in LANGS:
    fpath = LOCALE_DIR / lang / "translation.json"
    
    # Read current (all English)
    with open(fpath, encoding="utf-8") as f:
        data = json.load(f)
    
    count = 0
    # Translate EVERY value to target language
    for key in list(data.keys()):
        val = data[key]
        if isinstance(val, str) and val and len(val) > 1:
            try:
                # Force translate this value
                translated = translators.google(val, from_language="en", to_language=lang, timeout=6)
                if translated and translated != val:
                    data[key] = translated
                    count += 1
            except Exception as e:
                pass
    
    # Write all changes at once
    with open(fpath, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    pct = (count / len(EN)) * 100
    print(f"✅ {lang.upper():3s} → {count:3d}/{len(EN)} ({pct:5.1f}%)")
    sys.stdout.flush()

print("\n✨ ALL FILES TRANSLATED!")

#!/usr/bin/env python3
import json
from pathlib import Path
import os

try:
    import translators
except:
    os.system("pip install -q translators --quiet")
    import translators

LOCALE_DIR = Path("app/locales")

with open(LOCALE_DIR / "en" / "translation.json", encoding="utf-8") as f:
    EN_DATA = json.load(f)

LANGS = ["ar","az","bg","bn","ca","cs","da","de","el","es","et","eu","fi","fr","ga","gl","he","hi","hr","hu","id","is","it","ja","ko","lt","lv","ms","mt","nl","no","pl","pt","ro","ru","sk","sl","sr","sv","th","tr","uk","ur","vi","zh"]

print("🔥 FORCE TRANSLATE ALL FILES\n")

for lang in LANGS:
    fpath = LOCALE_DIR / lang / "translation.json"
    
    with open(fpath, encoding="utf-8") as f:
        data = json.load(f)
    
    done = 0
    for key in EN_DATA:
        en_val = EN_DATA[key]
        if key in data:
            cur_val = data[key]
            if isinstance(cur_val, str) and (cur_val == en_val or not cur_val.strip() or cur_val.startswith("Find") or cur_val.startswith("Your") or cur_val == key):
                try:
                    tr = translators.google(en_val, from_language="en", to_language=lang, timeout=5)
                    if tr and tr != en_val:
                        data[key] = tr
                        done += 1
                except:
                    pass
        else:
            try:
                tr = translators.google(en_val, from_language="en", to_language=lang, timeout=5)
                if tr and tr != en_val:
                    data[key] = tr
                    done += 1
            except:
                pass
    
    with open(fpath, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print(f"✅ {lang.upper()}: {done} translated")

print("\n✨ DONE!")

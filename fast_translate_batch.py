#!/usr/bin/env python3
import json
import os
import time
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed
import sys

try:
    import translators
except ImportError:
    print("Installing translators...")
    os.system("pip install -q translators requests")
    import translators

LOCALE_DIR = Path("app/locales")
LANG_NAMES = {
    "ar": "Arabic", "az": "Azerbaijani", "bg": "Bulgarian", "bn": "Bengali",
    "ca": "Catalan", "cs": "Czech", "da": "Danish", "de": "German",
    "el": "Greek", "en": "English", "es": "Spanish", "et": "Estonian",
    "fa": "Persian", "fi": "Finnish", "fr": "French", "gu": "Gujarati",
    "hi": "Hindi", "hu": "Hungarian", "id": "Indonesian", "it": "Italian",
    "ja": "Japanese", "ka": "Georgian", "kk": "Kazakh", "ko": "Korean",
    "lt": "Lithuanian", "lv": "Latvian", "mk": "Macedonian", "ml": "Malayalam",
    "mr": "Marathi", "ne": "Nepali", "nl": "Dutch", "or": "Oriya",
    "pa": "Punjabi", "pl": "Polish", "pt": "Portuguese", "ro": "Romanian",
    "ru": "Russian", "sk": "Slovak", "sl": "Slovenian", "sv": "Swedish",
    "ta": "Tamil", "te": "Telugu", "th": "Thai", "tl": "Filipino",
    "tr": "Turkish", "uk": "Ukrainian", "vi": "Vietnamese", "zh": "Chinese",
    "zu": "Zulu"
}

# English reference to identify what needs translation
with open(LOCALE_DIR / "en" / "translation.json", "r", encoding="utf-8") as f:
    EN_DICT = json.load(f)

def translate_text(text, target_lang_code):
    """Translate text with retries and error handling"""
    if not text or target_lang_code == "en":
        return text
    
    for attempt in range(3):
        try:
            result = translators.google(
                text,
                from_language="en",
                to_language=target_lang_code,
                timeout=10
            )
            return result if result else text
        except Exception as e:
            if attempt < 2:
                time.sleep(0.5 + attempt)
            else:
                return text
    return text

def translate_locale_file(lang_code):
    """Translate a single locale file"""
    filepath = LOCALE_DIR / lang_code / "translation.json"
    if not filepath.exists():
        return f"Skip {lang_code}: file not found"
    
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            locale_dict = json.load(f)
        
        updated = False
        translated_count = 0
        
        # Batch collect keys that need translation
        to_translate = []
        for key, value in locale_dict.items():
            env_value = EN_DICT.get(key, key)
            if isinstance(value, str) and value == env_value and key in EN_DICT:
                to_translate.append((key, value))
        
        # Translate in batch
        for key, en_value in to_translate:
            if key not in locale_dict or locale_dict[key] == en_value:
                translated = translate_text(en_value, lang_code)
                if translated != en_value:
                    locale_dict[key] = translated
                    translated_count += 1
                    updated = True
            time.sleep(0.05)  # Small delay between requests
        
        if updated:
            with open(filepath, "w", encoding="utf-8") as f:
                json.dump(locale_dict, f, ensure_ascii=False, indent=2)
            return f"✓ {lang_code}: {translated_count} keys translated"
        else:
            return f"→ {lang_code}: already complete"
            
    except Exception as e:
        return f"✗ {lang_code}: {str(e)}"

def main():
    print("🚀 FAST BATCH TRANSLATION STARTING\n")
    langs = sorted([d.name for d in LOCALE_DIR.iterdir() if d.is_dir() and d.name in LANG_NAMES])
    total = len(langs)
    
    results = []
    with ThreadPoolExecutor(max_workers=3) as executor:
        futures = {executor.submit(translate_locale_file, lang): lang for lang in langs}
        
        for i, future in enumerate(as_completed(futures), 1):
            result = future.result()
            results.append(result)
            print(f"[{i}/{total}] {result}")
            sys.stdout.flush()
    
    print("\n✅ TRANSLATION COMPLETE!")
    print(f"Processed {total} languages")

if __name__ == "__main__":
    main()

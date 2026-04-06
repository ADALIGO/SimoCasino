#!/usr/bin/env python3
"""
Translate all remaining English fallback text to native translations for all languages
"""
import json
from pathlib import Path
import translators as ts
import time

def translate_text(text, target_lang):
    """Translate text to target language using translators library (Google)"""
    if target_lang == 'en':
        return text
    try:
        # Use Google Translate via translators
        translated = ts.translate_text(text, translator='google', from_language='en', to_language=target_lang)
        return translated
    except Exception as e:
        print(f"Translation failed for {target_lang}: {e}")
        return text  # Fallback to English

def main():
    # Load English translations as source
    en_path = Path("app/locales/en/translation.json")
    with open(en_path, 'r', encoding='utf-8') as f:
        en_translations = json.load(f)

    locales_dir = Path("app/locales")
    updated_count = 0

    for locale_dir in sorted(locales_dir.iterdir()):
        if not locale_dir.is_dir() or locale_dir.name == 'en':
            continue

        lang_code = locale_dir.name
        translation_file = locale_dir / "translation.json"

        if not translation_file.exists():
            print(f"⚠️  {lang_code} → Translation file not found, skipping")
            continue

        # Load existing translations
        with open(translation_file, 'r', encoding='utf-8') as f:
            translations = json.load(f)

        # Check each key
        updated_keys = 0
        for key, en_text in en_translations.items():
            if key in translations:
                current_translation = translations[key]
                # If the translation is the same as English (fallback), translate it
                if current_translation == en_text and en_text != "":  # Avoid empty strings
                    translated_text = translate_text(en_text, lang_code)
                    if translated_text != en_text:  # Only update if different
                        translations[key] = translated_text
                        updated_keys += 1
                        print(f"✅ {lang_code} → Translated '{key}': {translated_text}")

        if updated_keys > 0:
            # Save updated translations
            with open(translation_file, 'w', encoding='utf-8') as f:
                json.dump(translations, f, ensure_ascii=False, indent=2)
            updated_count += 1
            print(f"📝 {lang_code} → Updated {updated_keys} keys with native translations")
        else:
            print(f"ℹ️  {lang_code} → All keys already have native translations")

        # Small delay to avoid rate limiting
        time.sleep(0.05)

    print(f"\n🎉 Complete translation fix complete!")
    print(f"📊 Updated {updated_count} locale files with native translations")

if __name__ == "__main__":
    main()
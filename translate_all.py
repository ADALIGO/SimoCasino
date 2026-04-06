#!/usr/bin/env python3
import json
import os
import time
from pathlib import Path
from googletrans import Translator

# Initialize translator
translator = Translator()

# Language mapping (some codes need adjustment for Google Translate)
LANG_MAPPING = {
    'ar': 'ar',  # Arabic
    'az': 'az',  # Azerbaijani
    'bg': 'bg',  # Bulgarian
    'bn': 'bn',  # Bengali
    'ca': 'ca',  # Catalan
    'cs': 'cs',  # Czech
    'da': 'da',  # Danish
    'de': 'de',  # German
    'el': 'el',  # Greek
    'es': 'es',  # Spanish
    'et': 'et',  # Estonian
    'eu': 'eu',  # Basque
    'fi': 'fi',  # Finnish
    'fr': 'fr',  # French
    'ga': 'ga',  # Irish
    'gl': 'gl',  # Galician
    'he': 'he',  # Hebrew
    'hi': 'hi',  # Hindi
    'hr': 'hr',  # Croatian
    'hu': 'hu',  # Hungarian
    'id': 'id',  # Indonesian
    'is': 'is',  # Icelandic
    'it': 'it',  # Italian
    'ja': 'ja',  # Japanese
    'ko': 'ko',  # Korean
    'lt': 'lt',  # Lithuanian
    'lv': 'lv',  # Latvian
    'ms': 'ms',  # Malay
    'mt': 'mt',  # Maltese
    'nl': 'nl',  # Dutch
    'no': 'no',  # Norwegian
    'pl': 'pl',  # Polish
    'pt': 'pt',  # Portuguese
    'ro': 'ro',  # Romanian
    'ru': 'ru',  # Russian
    'sk': 'sk',  # Slovak
    'sl': 'sl',  # Slovenian
    'sr': 'sr',  # Serbian
    'sv': 'sv',  # Swedish
    'th': 'th',  # Thai
    'tr': 'tr',  # Turkish
    'uk': 'uk',  # Ukrainian
    'ur': 'ur',  # Urdu
    'vi': 'vi',  # Vietnamese
    'zh': 'zh-cn'  # Chinese (Simplified)
}

def translate_text(text, target_lang):
    """Translate text to target language with retry logic"""
    max_retries = 3
    for attempt in range(max_retries):
        try:
            if target_lang == 'en':
                return text  # No translation needed for English

            # Skip if already translated (contains non-ASCII or looks like translation)
            if any(ord(c) > 127 for c in text):
                return text

            result = translator.translate(text, dest=target_lang)
            translated = result.text

            # Add small delay to avoid rate limits
            time.sleep(0.1)

            return translated

        except Exception as e:
            print(f"Translation error for '{text}' to {target_lang}: {e}")
            if attempt < max_retries - 1:
                time.sleep(1)  # Wait before retry
            else:
                return text  # Return original on failure

def main():
    # Load English translations as source
    en_path = Path("app/locales/en/translation.json")
    with open(en_path, 'r', encoding='utf-8') as f:
        en_translations = json.load(f)

    # Get all locale directories
    locales_dir = Path("app/locales")
    locale_dirs = [d for d in locales_dir.iterdir() if d.is_dir() and d.name != 'en']

    print(f"Starting translation of {len(en_translations)} keys to {len(locale_dirs)} languages...")

    for locale_dir in sorted(locale_dirs):
        lang_code = locale_dir.name
        google_lang = LANG_MAPPING.get(lang_code, lang_code)

        print(f"\n🔄 Translating to {lang_code} ({google_lang})...")

        translation_file = locale_dir / "translation.json"

        # Load existing translations
        if translation_file.exists():
            with open(translation_file, 'r', encoding='utf-8') as f:
                existing_translations = json.load(f)
        else:
            existing_translations = {}

        # Translate each key
        translated_count = 0
        for key, english_text in en_translations.items():
            if key not in existing_translations or existing_translations[key] == english_text:
                # Need translation
                translated = translate_text(english_text, google_lang)
                existing_translations[key] = translated
                translated_count += 1
                if translated_count % 50 == 0:
                    print(f"  Translated {translated_count} keys...")

        # Save updated translations
        with open(translation_file, 'w', encoding='utf-8') as f:
            json.dump(existing_translations, f, ensure_ascii=False, indent=2, sort_keys=True)

        print(f"✅ {lang_code}: Translated {translated_count} keys")

    print("\n🎉 Translation complete! All languages now have real translations.")

if __name__ == "__main__":
    main()
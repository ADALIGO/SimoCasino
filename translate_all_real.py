#!/usr/bin/env python3
import json
import os
import requests
from pathlib import Path
import time
from typing import Dict, Any

# Language codes and their full names
LANGUAGES = {
    'ar': 'Arabic',
    'az': 'Azerbaijani',
    'bg': 'Bulgarian',
    'bn': 'Bengali',
    'ca': 'Catalan',
    'cs': 'Czech',
    'da': 'Danish',
    'de': 'German',
    'el': 'Greek',
    'es': 'Spanish',
    'et': 'Estonian',
    'eu': 'Basque',
    'fi': 'Finnish',
    'fr': 'French',
    'ga': 'Irish',
    'gl': 'Galician',
    'he': 'Hebrew',
    'hi': 'Hindi',
    'hr': 'Croatian',
    'hu': 'Hungarian',
    'id': 'Indonesian',
    'is': 'Icelandic',
    'it': 'Italian',
    'ja': 'Japanese',
    'ko': 'Korean',
    'lt': 'Lithuanian',
    'lv': 'Latvian',
    'ms': 'Malay',
    'mt': 'Maltese',
    'nl': 'Dutch',
    'no': 'Norwegian',
    'pl': 'Polish',
    'pt': 'Portuguese',
    'ro': 'Romanian',
    'ru': 'Russian',
    'sk': 'Slovak',
    'sl': 'Slovenian',
    'sr': 'Serbian',
    'sv': 'Swedish',
    'th': 'Thai',
    'tr': 'Turkish',
    'uk': 'Ukrainian',
    'ur': 'Urdu',
    'vi': 'Vietnamese',
    'zh': 'Chinese'
}

def translate_text(text: str, target_lang: str) -> str:
    """Translate text using LibreTranslate API (free and open source)"""
    try:
        # Using LibreTranslate public instance
        url = "https://libretranslate.com/translate"
        payload = {
            "q": text,
            "source": "en",
            "target": target_lang,
            "format": "text"
        }
        headers = {"Content-Type": "application/json"}

        response = requests.post(url, json=payload, headers=headers, timeout=10)
        response.raise_for_status()

        result = response.json()
        return result.get("translatedText", text)

    except Exception as e:
        print(f"Translation failed for '{text}' to {target_lang}: {e}")
        return text  # Return original text if translation fails

def load_english_translations() -> Dict[str, Any]:
    """Load the English translation file"""
    en_file = Path("app/locales/en/translation.json")
    with open(en_file, 'r', encoding='utf-8') as f:
        return json.load(f)

def translate_language(lang_code: str, en_translations: Dict[str, Any]) -> Dict[str, Any]:
    """Translate all keys for a specific language"""
    print(f"\n🔄 Translating to {LANGUAGES[lang_code]} ({lang_code})...")

    translated = {}
    total_keys = len(en_translations)
    processed = 0

    for key, value in en_translations.items():
        if isinstance(value, str):
            # Translate string values
            translated[key] = translate_text(value, lang_code)
        else:
            # Keep non-string values as-is (numbers, booleans, etc.)
            translated[key] = value

        processed += 1
        if processed % 50 == 0:
            print(f"  📊 Progress: {processed}/{total_keys} keys translated")

        # Small delay to avoid overwhelming the API
        time.sleep(2)

    return translated

def save_translations(lang_code: str, translations: Dict[str, Any]):
    """Save translations to the appropriate language file"""
    lang_file = Path(f"app/locales/{lang_code}/translation.json")

    # Ensure directory exists
    lang_file.parent.mkdir(parents=True, exist_ok=True)

    with open(lang_file, 'w', encoding='utf-8') as f:
        json.dump(translations, f, ensure_ascii=False, indent=2, sort_keys=True)

    print(f"✅ Saved {lang_code}/translation.json")

def main():
    print("🚀 Starting comprehensive translation of all language files...")
    print("📚 Loading English translations...")

    # Load English translations
    en_translations = load_english_translations()
    total_keys = len(en_translations)
    print(f"📊 Found {total_keys} translation keys to translate")

    # Translate each language
    for lang_code in LANGUAGES.keys():
        try:
            translated = translate_language(lang_code, en_translations)
            save_translations(lang_code, translated)
            print(f"✅ Completed {LANGUAGES[lang_code]} ({lang_code})")
        except Exception as e:
            print(f"❌ Failed to translate {LANGUAGES[lang_code]} ({lang_code}): {e}")
            continue

    print("\n🎉 Translation completed for all languages!")
    print(f"📊 Translated {total_keys} keys across {len(LANGUAGES)} languages")

if __name__ == "__main__":
    main()
#!/usr/bin/env python3
import json
import requests
from pathlib import Path
import time
import random
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

def translate_with_api(text: str, target_lang: str) -> str:
    """Try multiple translation APIs with fallbacks"""
    apis = [
        {
            'url': 'https://api.mymemory.translated.net/get',
            'params': {'q': text, 'langpair': f'en|{target_lang}'},
            'response_key': lambda r: r.json().get('responseData', {}).get('translatedText', text)
        },
        {
            'url': 'https://translate.googleapis.com/translate_a/single',
            'params': {'client': 'gtx', 'sl': 'en', 'tl': target_lang, 'dt': 't', 'q': text},
            'response_key': lambda r: r.json()[0][0][0] if r.json() and r.json()[0] else text
        }
    ]

    for api in apis:
        try:
            response = requests.get(api['url'], params=api['params'], timeout=10)
            response.raise_for_status()
            translated = api['response_key'](response)
            if translated and translated != text:
                return translated
        except Exception as e:
            print(f"API failed: {e}")
            continue

    # If all APIs fail, return original text
    return text

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
            translated[key] = translate_with_api(value, lang_code)
        else:
            # Keep non-string values as-is
            translated[key] = value

        processed += 1
        if processed % 25 == 0:
            print(f"  📊 Progress: {processed}/{total_keys} keys translated")

        # Random delay to avoid rate limits
        time.sleep(random.uniform(0.5, 1.5))

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
    print("🚀 Starting comprehensive translation using multiple APIs...")
    print("📚 Loading English translations...")

    # Load English translations
    en_translations = load_english_translations()
    total_keys = len(en_translations)
    print(f"📊 Found {total_keys} translation keys to translate")

    # Translate all languages
    all_languages = list(LANGUAGES.keys())

    print(f"\n🌍 Translating to all {len(all_languages)} languages...")

    for lang_code in all_languages:
        try:
            translated = translate_language(lang_code, en_translations)
            save_translations(lang_code, translated)
            print(f"✅ Completed {LANGUAGES[lang_code]} ({lang_code})")
        except Exception as e:
            print(f"❌ Failed to translate {LANGUAGES[lang_code]} ({lang_code}): {e}")
            continue

    print(f"\n✅ Translation completed! Translated {total_keys} keys for {len(all_languages)} languages")

if __name__ == "__main__":
    main()
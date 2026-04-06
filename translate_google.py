#!/usr/bin/env python3
import json
import os
from pathlib import Path
import time
from typing import Dict, Any
from googletrans import Translator
import random

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

def translate_text_batch(translator: Translator, texts: list, target_lang: str) -> list:
    """Translate a batch of texts with error handling"""
    try:
        results = translator.translate(texts, src='en', dest=target_lang)
        return [result.text if result else text for result, text in zip(results, texts)]
    except Exception as e:
        print(f"Batch translation failed for {target_lang}: {e}")
        # Return original texts if batch fails
        return texts

def load_english_translations() -> Dict[str, Any]:
    """Load the English translation file"""
    en_file = Path("app/locales/en/translation.json")
    with open(en_file, 'r', encoding='utf-8') as f:
        return json.load(f)

def translate_language(lang_code: str, en_translations: Dict[str, Any]) -> Dict[str, Any]:
    """Translate all keys for a specific language using Google Translate"""
    print(f"\n🔄 Translating to {LANGUAGES[lang_code]} ({lang_code})...")

    translator = Translator()
    translated = {}
    total_keys = len(en_translations)

    # Get all string values to translate
    string_keys = [(key, value) for key, value in en_translations.items() if isinstance(value, str)]
    non_string_items = [(key, value) for key, value in en_translations.items() if not isinstance(value, str)]

    # Add non-string items directly
    for key, value in non_string_items:
        translated[key] = value

    # Translate strings in batches of 10
    batch_size = 10
    processed = 0

    for i in range(0, len(string_keys), batch_size):
        batch = string_keys[i:i + batch_size]
        keys = [key for key, _ in batch]
        texts = [text for _, text in batch]

        # Translate batch
        translated_texts = translate_text_batch(translator, texts, lang_code)

        # Add to results
        for key, translated_text in zip(keys, translated_texts):
            translated[key] = translated_text

        processed += len(batch)
        print(f"  📊 Progress: {processed}/{len(string_keys)} string keys translated")

        # Longer delay between batches to avoid rate limits
        delay = random.uniform(1.0, 3.0)
        time.sleep(delay)

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
    print("🚀 Starting comprehensive translation using Google Translate...")
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
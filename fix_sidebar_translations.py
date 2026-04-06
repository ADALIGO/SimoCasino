#!/usr/bin/env python3
"""
Fix sidebar translations - add missing sidebar keys with real translations for all 46 languages
"""
import json
from pathlib import Path
import translators as ts
import time

# Language mapping (ISO codes, most work directly with LibreTranslate)
lang_map = {
    'en': 'en',
    'zh': 'zh',  # Chinese
    'es': 'es',
    'fr': 'fr',
    'de': 'de',
    'ar': 'ar',
    'pt': 'pt',
    'ru': 'ru',
    'ja': 'ja',
    'ko': 'ko',
    'hi': 'hi',
    'az': 'az',
    'bg': 'bg',
    'bn': 'bn',
    'ca': 'ca',
    'cs': 'cs',
    'da': 'da',
    'el': 'el',
    'et': 'et',
    'eu': 'eu',
    'fi': 'fi',
    'ga': 'ga',
    'gl': 'gl',
    'he': 'he',
    'hr': 'hr',
    'hu': 'hu',
    'id': 'id',
    'is': 'is',
    'it': 'it',
    'lt': 'lt',
    'lv': 'lv',
    'ms': 'ms',
    'mt': 'mt',
    'nl': 'nl',
    'no': 'no',
    'pl': 'pl',
    'ro': 'ro',
    'sk': 'sk',
    'sl': 'sl',
    'sr': 'sr',
    'sv': 'sv',
    'th': 'th',
    'tr': 'tr',
    'uk': 'uk',
    'ur': 'ur',
    'vi': 'vi',
}

# Sidebar keys that need translation
sidebar_keys = {
    'account': 'Account',
    'profile': 'Profile',
    'security': 'Security',
    'bonuses': 'Bonuses',
    'dashboard': 'Dashboard',
    'settings': 'Settings',
    'gaming': 'Gaming',
    'favorite_casinos': 'Favorite Casinos',
    'recent_games': 'Recent Games',
    'game_history': 'Game History',
    'community': 'Community',
    'reviews': 'Reviews',
    'forums': 'Forums',
    'chat': 'Chat',
    'rewards': 'Rewards',
    'daily_bonus': 'Daily Bonus',
    'achievements': 'Achievements',
    'leaderboard': 'Leaderboard',
    'support': 'Support',
    'help_center': 'Help Center',
    'contact_support': 'Contact Support',
    'faq': 'FAQ',
}

def translate_text(text, target_lang):
    """Translate text to target language using translators library (Google)"""
    if target_lang == 'en':
        return text
    try:
        # Use Google Translate via translators
        translated = ts.google(text, from_language='en', to_language=target_lang)
        return translated
    except Exception as e:
        print(f"Translation failed for {target_lang}: {e}")
        return text  # Fallback to English

def main():
    locales_dir = Path("app/locales")
    updated_count = 0

    for locale_dir in sorted(locales_dir.iterdir()):
        if not locale_dir.is_dir() or locale_dir.name == 'index.ts':
            continue

        lang_code = locale_dir.name
        translation_file = locale_dir / "translation.json"

        if not translation_file.exists():
            print(f"⚠️  {lang_code} → Translation file not found, skipping")
            continue

        # Load existing translations
        with open(translation_file, 'r', encoding='utf-8') as f:
            translations = json.load(f)

        # Check if we need to add any sidebar keys
        added_keys = 0
        for key, english_text in sidebar_keys.items():
            if key not in translations:
                translated_text = translate_text(english_text, lang_code)
                translations[key] = translated_text
                added_keys += 1
                print(f"✅ {lang_code} → Added '{key}': {translated_text}")

        if added_keys > 0:
            # Save updated translations
            with open(translation_file, 'w', encoding='utf-8') as f:
                json.dump(translations, f, ensure_ascii=False, indent=2)
            updated_count += 1
            print(f"📝 {lang_code} → Updated with {added_keys} sidebar keys")
        else:
            print(f"ℹ️  {lang_code} → All sidebar keys already present")

        # Small delay to avoid rate limiting
        time.sleep(0.1)

    print(f"\n🎉 Sidebar translation fix complete!")
    print(f"📊 Updated {updated_count} locale files with sidebar translations")

if __name__ == "__main__":
    main()
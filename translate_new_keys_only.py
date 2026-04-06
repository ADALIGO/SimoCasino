#!/usr/bin/env python3
import json
import requests
from pathlib import Path
import time
import random
from typing import Dict, Any, Set

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

# New keys that were added for layout/UI translations
NEW_LAYOUT_KEYS = {
    "header_welcome_guest": "Welcome, {{guestLabel}}👋",
    "sidebar_main": "MAIN",
    "sidebar_countries": "COUNTRIES",
    "sidebar_casinos": "CASINOS",
    "sidebar_bonuses": "BONUSES",
    "sidebar_payment_methods": "PAYMENT METHODS",
    "sidebar_tools": "TOOLS",
    "sidebar_resources": "RESOURCES",
    "sidebar_top_lists": "TOP LISTS",
    "sidebar_trust_info": "TRUST & INFO",
    "home": "Home",
    "sidebar_top_casinos_2026": "Top Casinos 2026",
    "sidebar_new_casinos": "New Casinos",
    "sidebar_united_states": "United States",
    "sidebar_united_kingdom": "United Kingdom",
    "sidebar_canada": "Canada",
    "sidebar_australia": "Australia",
    "sidebar_germany": "Germany",
    "sidebar_netherlands": "Netherlands",
    "sidebar_morocco": "Morocco",
    "sidebar_view_all_countries": "View All Countries",
    "sidebar_all_online_casinos": "All Online Casinos",
    "sidebar_mobile_casinos_menu": "Mobile Casinos",
    "sidebar_live_casinos": "Live Casinos",
    "sidebar_fast_withdrawal_casinos": "Fast Withdrawal Casinos",
    "sidebar_low_deposit": "Low Deposit",
    "sidebar_no_kyc_casinos": "No KYC Casinos",
    "sidebar_no_deposit_bonus": "No Deposit Bonus",
    "sidebar_welcome_bonus": "Welcome Bonus",
    "sidebar_high_roller_bonuses": "High Roller Bonuses",
    "sidebar_cashback_offers": "Cashback Offers",
    "sidebar_crypto_bonuses_menu": "Crypto Bonuses",
    "sidebar_paypal_casinos": "PayPal Casinos",
    "sidebar_visa_mastercard": "Visa/Mastercard",
    "sidebar_bitcoin_casinos": "Bitcoin Casinos",
    "sidebar_skrill_neteller": "Skrill/Neteller",
    "sidebar_bank_transfer": "Bank Transfer",
    "sidebar_rtp_calculator": "RTP Calculator",
    "sidebar_betting_calculator": "Betting Calculator",
    "sidebar_odds_converter": "Odds Converter",
    "sidebar_bankroll_simulator": "Bankroll Simulator",
    "sidebar_blog_menu": "Blog",
    "sidebar_guides_menu": "Guides",
    "sidebar_reviews_menu": "Reviews",
    "sidebar_comparisons_menu": "Comparisons",
    "sidebar_strategies": "Strategies",
    "sidebar_best_casinos_overall": "Best Casinos Overall",
    "sidebar_best_for_beginners": "Best for Beginners",
    "sidebar_best_high_roller": "Best High Roller",
    "sidebar_fastest_payout": "Fastest Payout",
    "sidebar_trusted_casinos_menu": "Trusted Casinos",
    "sidebar_about_us_menu": "About Us",
    "sidebar_how_we_review_menu": "How We Review",
    "sidebar_responsible_gambling_menu": "Responsible Gambling",
    "sidebar_faq_menu": "FAQ",
    "sidebar_contact_menu": "Contact",
    "user_account": "ACCOUNT",
    "user_activity": "ACTIVITY",
    "user_affiliate": "AFFILIATE",
    "user_support": "SUPPORT",
    "user_dashboard": "Dashboard",
    "user_edit_profile": "Edit Profile",
    "user_settings": "Settings",
    "user_security": "Security",
    "user_notifications": "Notifications",
    "user_reward_center": "Reward Center",
    "user_bonus_history": "Bonus History",
    "user_play_history": "Play History",
    "user_reviews": "Reviews",
    "user_favorites": "Favorites",
    "user_affiliate_dashboard": "Affiliate Dashboard",
    "user_affiliate_links": "Affiliate Links",
    "user_payout_settings": "Payout Settings",
    "user_marketing_tools": "Marketing Tools",
    "user_reports": "Reports",
    "user_referrals": "Referrals",
    "user_messages": "Messages",
    "user_support_tickets": "Support Tickets",
    "user_account_activity": "Account Activity",
    "user_instructions": "Instructions",
    "user_no_email": "No email available",
    "user_loading": "Loading...",
    "user_member_tier": "Member",
    "language_all_languages": "All languages",
    "language_popular_languages": "Popular languages",
    "language_select_current": "Select language. Current language: {{currentLabel}}",
    "language_close": "Close language selector",
    "language_select_option": "Select {{language}} language",
    "resources": "Resources",
    "support": "Support",
    "all_rights_reserved": "All rights reserved."
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
            if translated and translated != text and len(translated.strip()) > 0:
                return translated
        except Exception as e:
            continue

    # If all APIs fail, return original text
    return text

def load_existing_translations(lang_code: str) -> Dict[str, Any]:
    """Load existing translations for a language"""
    lang_file = Path(f"app/locales/{lang_code}/translation.json")
    if lang_file.exists():
        with open(lang_file, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {}

def translate_new_keys(lang_code: str) -> Dict[str, Any]:
    """Translate only the new layout keys for a specific language"""
    print(f"\n🔄 Translating new keys to {LANGUAGES[lang_code]} ({lang_code})...")

    translated = {}
    total_keys = len(NEW_LAYOUT_KEYS)
    processed = 0

    for key, value in NEW_LAYOUT_KEYS.items():
        if isinstance(value, str):
            # Translate string values
            translated[key] = translate_with_api(value, lang_code)
        else:
            # Keep non-string values as-is
            translated[key] = value

        processed += 1
        if processed % 10 == 0:
            print(f"  📊 Progress: {processed}/{total_keys} new keys translated")

        # Random delay to avoid rate limits
        time.sleep(random.uniform(0.3, 0.8))

    return translated

def merge_translations(existing: Dict[str, Any], new_translations: Dict[str, Any]) -> Dict[str, Any]:
    """Merge new translations with existing ones"""
    merged = existing.copy()
    merged.update(new_translations)
    return merged

def save_translations(lang_code: str, translations: Dict[str, Any]):
    """Save translations to the appropriate language file"""
    lang_file = Path(f"app/locales/{lang_code}/translation.json")

    # Ensure directory exists
    lang_file.parent.mkdir(parents=True, exist_ok=True)

    with open(lang_file, 'w', encoding='utf-8') as f:
        json.dump(translations, f, ensure_ascii=False, indent=2, sort_keys=True)

    print(f"✅ Saved {lang_code}/translation.json")

def main():
    print("🚀 Translating only NEW layout/UI keys for all languages...")
    print(f"📊 Found {len(NEW_LAYOUT_KEYS)} new keys to translate")

    # Process each language
    for lang_code in LANGUAGES.keys():
        try:
            # Load existing translations
            existing = load_existing_translations(lang_code)

            # Translate only new keys
            new_translations = translate_new_keys(lang_code)

            # Merge with existing
            merged = merge_translations(existing, new_translations)

            # Save
            save_translations(lang_code, merged)
            print(f"✅ Completed {LANGUAGES[lang_code]} ({lang_code})")

        except Exception as e:
            print(f"❌ Failed to translate {LANGUAGES[lang_code]} ({lang_code}): {e}")
            continue

    print("\n🎉 Translation completed for all languages!")
    print(f"📊 Added {len(NEW_LAYOUT_KEYS)} new translated keys across {len(LANGUAGES)} languages")

if __name__ == "__main__":
    main()
import json
import os
import re
import time
from translate import Translator

# Language codes mapping
lang_codes = {
    'bn': 'bn',  # Bengali
    'bg': 'bg',  # Bulgarian
    'az': 'az'   # Azerbaijani
}

# English indicators - common English words
english_indicators = {
    'Write', 'User', 'Quick', 'Week', 'Month', 'Post', 'Share', 'Follow', 'Like', 'View', 
    'Comment', 'Rating', 'Award', 'Reward', 'Complete', 'Claim', 'Check', 'Level', 'XP', 
    'Coin', 'Daily', 'Weekly', 'Monthly', 'Performance', 'Track', 'See', 'Find', 'Get', 
    'Join', 'Start', 'Play', 'Learn', 'Discover', 'Browse', 'Search', 'Filter', 'Sort', 
    'Compare', 'Review', 'Casino', 'Bonus', 'Game', 'Slot', 'Table', 'Live', 'Card', 
    'Poker', 'Roulette', 'Blackjack', 'Baccarat', 'New', 'Update', 'Offer', 'Special',
    'Free', 'Today', 'Yesterday', 'Tomorrow', 'This', 'That', 'From', 'To', 'In', 'At',
    'Active', 'Inactive', 'Pending', 'Completed', 'Open', 'Closed', 'Status', 'Progress',
    'Help', 'Support', 'Terms', 'Conditions', 'Privacy', 'Policy', 'About', 'Contact',
    'Settings', 'Profile', 'Account', 'Login', 'Logout', 'Register', 'Sign', 'Password',
    'Email', 'Name', 'Phone', 'Address', 'Country', 'Language', 'Theme', 'Notification',
    'Alert', 'Warning', 'Error', 'Success', 'Message', 'Information', 'Details', 'Summary',
    'Total', 'Count', 'Amount', 'Balance', 'Cost', 'Price', 'Value', 'Rate', 'Percent',
    'Crypto', 'Bitcoin', 'Ethereum', 'Deposit', 'Withdraw', 'Transfer', 'Transaction',
    'History', 'List', 'Item', 'Option', 'Choice', 'Select', 'All', 'None', 'Some',
    'Best', 'Top', 'Popular', 'Latest', 'Recent', 'Old', 'First', 'Last', 'Next',
    'Previous', 'Home', 'Back', 'Forward', 'Up', 'Down', 'Left', 'Right', 'Center',
    'Feature', 'Description', 'Title', 'Label', 'Button', 'Link'
}

def is_english(text):
    if not text or not isinstance(text, str) or '{{' in text or len(text) < 2:
        return False
    first_word = text.split()[0].strip(':,.!?;()')
    return first_word in english_indicators or (first_word.isascii() and first_word[0].isupper())

def should_translate_key(key):
    patterns = [
        'status_', 'notification_', 'mission_', 'guide_', 'criteria_', 'bonus_', 
        'crypto_', 'help_', 'sidebar_', 'review', 'user_', 'ticket_', 'reward'
    ]
    return any(key.lower().startswith(p) for p in patterns)

def preserve_templates(text):
    template_vars = []
    temp_value = text
    vars_found = re.findall(r'\{\{[^}]+\}\}', text)
    for i, var in enumerate(vars_found):
        placeholder = f"__PLACEHOLDER_{i}__"
        temp_value = temp_value.replace(var, placeholder)
        template_vars.append((placeholder, var))
    return temp_value, template_vars

def restore_templates(text, template_vars):
    for placeholder, var in template_vars:
        text = text.replace(placeholder, var)
    return text

total_translated = 0
files_processed = []

for locale_code, target_lang in lang_codes.items():
    locale_file = f"locales/{locale_code}.json"
    
    if not os.path.exists(locale_file):
        print(f"⚠ File not found: {locale_file}")
        continue
    
    print(f"\n{'='*70}")
    print(f"Processing {locale_code.upper()}")
    print(f"{'='*70}")
    
    with open(locale_file, 'r', encoding='utf-8') as f:
        translations = json.load(f)
    
    locale_translated = 0
    shown = 0
    
    try:
        translator = Translator(from_lang="en", to_lang=target_lang)
    except:
        continue
    
    for key in list(translations.keys()):
        value = translations[key]
        
        if not isinstance(value, str) or not is_english(value) or not should_translate_key(key):
            continue
        
        temp_value, template_vars = preserve_templates(value)
        if not temp_value.strip():
            continue
        
        try:
            translated_text = translator.translate(temp_value)
            translated_text = restore_templates(translated_text, template_vars)
            
            if translated_text and translated_text != value:
                translations[key] = translated_text
                locale_translated += 1
                if shown < 5:
                    print(f"  [{locale_translated}] {key}: '{value}' → '{translated_text}'")
                    shown += 1
        except:
            pass
    
    with open(locale_file, 'w', encoding='utf-8') as f:
        json.dump(translations, f, ensure_ascii=False, indent=2)
    
    print(f"\n✓ Saved {locale_file}")
    print(f"📊 {locale_code.upper()}: {locale_translated} translations")
    
    total_translated += locale_translated
    files_processed.append((locale_code, locale_translated))

print(f"\n{'='*70}")
print(f"FINAL SUMMARY - Total Translations: {total_translated}")
print(f"{'='*70}")
for locale_code, count in files_processed:
    print(f"{locale_code.upper()}: {count}")

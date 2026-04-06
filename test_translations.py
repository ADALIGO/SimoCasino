import json
from pathlib import Path

# Bengali (BN) translations
bn_translations = {
    'quick_actions_title': 'দ্রুত ক্রিয়া',
    'quick_actions_description': 'মূল ক্রিয়া যা ব্যস্ততা চালিত করে।',
    'write_review': 'পর্যালোচনা লিখুন',
    'guides_page_title': 'ক্যাসিনো গাইড',
    'guides_page_subtitle': 'খেলতে শিখুন, বোনাস সর্বাধিক করুন এবং দায়িত্বের সাথে জুয়া খেলুন',
    'guide_slots_title': 'স্লট কীভাবে খেলতে হয়',
    'guide_slots_excerpt': 'অনলাইনে স্লট মেশিন বুঝতে এবং খেলার জন্য শিক্ষানবিস-বান্ধব গাইড।',
    'difficulty_intermediate': 'মধ্যবর্তী',
}

# Bulgarian (BG) translations
bg_translations = {
    'welcome_bonus_title': '👋 Добро дошли Бонус',
    'welcome_bonus_description': 'Получете най-добрите приветствени бонуси в онлайн казина',
    'welcome_bonus_types_title': 'Типове добро дошли бонусите',
    'bonus_match_label': '💰 Match Бонус',
    'bonus_match_desc': 'Казиното съвпада с вашия депозит (например 100% до \)',
    'bonus_spins_label': '🎰 Безплатни ротации',
    'bonus_spins_desc': 'Безплатни ротации на популярни машини',
}

# Azerbaijani (AZ) translations - Using provided BN/BG patterns to translate remaining
az_translations = {
    'quick_actions_title': 'Tez Səbətlər',
    'quick_actions_description': 'Engagement-ə gətirib çıxaran əsas hərəkətlər.',
    'write_review': 'Rəy yazın',
    'guides_page_title': 'Kazino Bələdçiləri',
    'guides_page_subtitle': 'Oynamağı öyrənin, bonusları maksimum edin və məsul qümarbazlıq edin',
    'guide_slots_title': 'Slotlar Necə Oynanır',
    'guide_slots_excerpt': 'Onlayn slot maşınlarını anlamaq və oynamaq üçün başlanğıc bələdçi.',
    'difficulty_intermediate': 'Orta',
}

print('Load translations dictionaries created')
print(f'BN: {len(bn_translations)} items')
print(f'BG: {len(bg_translations)} items')
print(f'AZ: {len(az_translations)} items')

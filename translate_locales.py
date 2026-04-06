import json
import requests
import time
import random

LIBRETRANSLATE_URL = "https://libretranslate.com/translate"

# Common gaming/casino terms translations
TERM_TRANSLATIONS = {
    'az': {
        'About': 'Haqqında', 'Account': 'Hesab', 'Account Settings': 'Hesab Parametrləri',
        'Activity': 'Fəaliyyət', 'Affiliate': 'Filialist', 'Avatar': 'Avatar',
        'Baccarat': 'Bakarat', 'Basic Information': 'Əsas Məlumat', 'Blackjack': 'Blackjack',
        'Bonus': 'Bonus', 'Bonuses': 'Bonuslar', 'Casino': 'Kazino', 'Cancel': 'Ləğv Edin',
        'Dashboard': 'İdarə Paneli', 'Delete': 'Sil', 'Email': 'E-mail', 'Game': 'Oyun',
        'Games': 'Oyunlar', 'Help': 'Kömək', 'Home': 'Ev', 'History': 'Tarix',
        'Logout': 'Çıxış', 'Members': 'Üzvlər', 'New': 'Yeni', 'Password': 'Şifrə',
        'Play': 'Oyna', 'Poker': 'Poker', 'Profile': 'Profil', 'Roulette': 'Rulet',
        'Save': 'Saxla', 'Search': 'Axtar', 'Settings': 'Parametrlər', 'Sign In': 'Daxil Olun',
        'Sign Up': 'Qeydiyyatdan Keçin', 'Slots': 'Slotlar', 'Sports': 'İdman',
        'Support': 'Dəstək', 'Update': 'Yenilə', 'Win': 'Qazanmaq', 'Your': 'Sizin'
    },
    'bg': {
        'About': 'За', 'Account': 'Профил', 'Account Settings': 'Настройки на профила',
        'Activity': 'Активност', 'Affiliate': 'Партньор', 'Avatar': 'Аватар',
        'Baccarat': 'Баккара', 'Basic Information': 'Основна информация', 'Blackjack': 'Блекджек',
        'Bonus': 'Бонус', 'Bonuses': 'Бонуси', 'Casino': 'Казино', 'Cancel': 'Отмяна',
        'Dashboard': 'Контролен панел', 'Delete': 'Изтриване', 'Email': 'Имейл', 'Game': 'Игра',
        'Games': 'Игри', 'Help': 'Помощ', 'Home': 'Начало', 'History': 'История',
        'Logout': 'Излизане', 'Members': 'Членове', 'New': 'Ново', 'Password': 'Пароля',
        'Play': 'Играй', 'Poker': 'Покер', 'Profile': 'Профил', 'Roulette': 'Рулетка',
        'Save': 'Запази', 'Search': 'Търсене', 'Settings': 'Настройки', 'Sign In': 'Влезте',
        'Sign Up': 'Регистрирайте се', 'Slots': 'Слотове', 'Sports': 'Спорт',
        'Support': 'Поддръжка', 'Update': 'Актуализирай', 'Win': 'Печелене', 'Your': 'Ваш'
    },
    'bn': {
        'About': 'সম্পর্কে', 'Account': 'অ্যাকাউন্ট', 'Account Settings': 'অ্যাকাউন্ট সেটিংস',
        'Activity': 'কার্যকলাপ', 'Affiliate': 'অ্যাফিলিয়েট', 'Avatar': 'অবতার',
        'Baccarat': 'ব্যাকারাট', 'Basic Information': 'মৌলিক তথ্য', 'Blackjack': 'ব্ল্যাকজ্যাক',
        'Bonus': 'বোনাস', 'Bonuses': 'বোনাস', 'Casino': 'ক্যাসিনো', 'Cancel': 'বাতিল করুন',
        'Dashboard': 'ড্যাশবোর্ড', 'Delete': 'মুছুন', 'Email': 'ইমেল', 'Game': 'খেলা',
        'Games': 'খেলা', 'Help': 'সাহায্য', 'Home': 'বাড়ি', 'History': 'ইতিহাস',
        'Logout': 'লগআউট', 'Members': 'সদস্য', 'New': 'নতুন', 'Password': 'পাসওয়ার্ড',
        'Play': 'খেলা', 'Poker': 'পোকার', 'Profile': 'প্রোফাইল', 'Roulette': 'রুলেট',
        'Save': 'সংরক্ষণ করুন', 'Search': 'অনুসন্ধান', 'Settings': 'সেটিংস', 'Sign In': 'সাইন ইন করুন',
        'Sign Up': 'সাইন আপ করুন', 'Slots': 'স্লট', 'Sports': 'খেলাধুলা',
        'Support': 'সহায়তা', 'Update': 'আপডেট করুন', 'Win': 'জিতুন', 'Your': 'আপনার'
    }
}

def translate_with_api(text: str, target_lang: str, attempt: int = 0) -> tuple:
    """Try to translate with API, return (translated_text, success)"""
    if attempt > 3:
        return text, False
    
    try:
        payload = {
            'q': text,
            'source': 'en',
            'target': target_lang
        }
        
        response = requests.post(LIBRETRANSLATE_URL, json=payload, timeout=10)
        
        if response.status_code == 200:
            result = response.json()
            translated = result.get('translatedText', text)
            return translated, True
        else:
            wait = 2 ** attempt
            print(f"      Waiting {wait}s (error {response.status_code})")
            time.sleep(wait + random.uniform(0, 1))
            return translate_with_api(text, target_lang, attempt + 1)
    except:
        pass
    
    return text, False

def translate_text(text: str, target_lang: str) -> str:
    """Translate using dictionary or API"""
    # Try exact match first
    if text in TERM_TRANSLATIONS.get(target_lang, {}):
        return TERM_TRANSLATIONS[target_lang][text]
    
    # Try partial match (for variations)
    for key, val in TERM_TRANSLATIONS.get(target_lang, {}).items():
        if key.lower() == text.lower():
            return val
        if key.lower() in text.lower():
            return text.replace(key, val)
    
    # Try API translation
    translated, success = translate_with_api(text, target_lang)
    
    if success and translated != text:
        return translated
    
    return text

def is_english_text(text: str) -> bool:
    """Check if text is English"""
    if not isinstance(text, str) or len(text) < 2:
        return False
    
    non_latin = sum(1 for c in text if ord(c) > 127)
    if non_latin > len(text) * 0.4:
        return False
    
    english_words = ['the', 'a', 'and', 'or', 'is', 'to', 'of', 'in', 'for', 'with', 'casino', 'game', 'play', 'bonus', 'account', 'profile']
    text_lower = text.lower()
    
    return any(word in text_lower for word in english_words) or all(ord(c) < 128 for c in text)

def process_file(file_path: str, target_lang: str, lang_name: str):
    """Process locale file"""
    print(f"\n📁 {lang_name} ({target_lang})")
    
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    english_items = [(k, v) for k, v in data.items() if isinstance(v, str) and is_english_text(v)]
    
    print(f"   Found {len(english_items)} English strings")
    
    translated = 0
    for idx, (key, value) in enumerate(english_items, 1):
        new_val = translate_text(value, target_lang)
        if new_val != value:
            data[key] = new_val
            translated += 1
            print(f"   [{idx}/{len(english_items)}] {key[:25]}: {value[:35]} -> {new_val[:35]}")
        else:
            print(f"   [{idx}/{len(english_items)}] {key[:25]}: (unchanged)")
        
        time.sleep(0.5 + random.uniform(0, 0.5))
    
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print(f"   ✅ Translated {translated}/{len(english_items)}")

def main():
    print("🌍 Casino Locale Translation")
    print("=" * 60)
    
    process_file('app/locales/az/translation.json', 'az', 'Azerbaijani')
    process_file('app/locales/bg/translation.json', 'bg', 'Bulgarian')
    process_file('app/locales/bn/translation.json', 'bn', 'Bengali')
    
    print("\n" + "=" * 60)
    print("✅ Complete!")

if __name__ == '__main__':
    main()

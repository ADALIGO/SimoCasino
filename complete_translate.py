import json
from pathlib import Path
import re

# Comprehensive Bulgarian translations
BULGARIAN_TRANSLATIONS = {
    "+50 XP": "+50 XP",
    "2m ago": "преди 2 м",
    "3h ago": "преди 3 ч",
    "58m ago": "преди 58 м",
    "A beginner-friendly guide to understanding and playing slot machines online.": "Начинаещ пътеводител за разбиране и игра на машини за плащане онлайн.",
    "A no deposit bonus allows you to play casino games for free without making an initial deposit.": "Бонус без депозит ви позволява да играете казино игри безплатно без начален депозит.",
    "ACCOUNT": "СМЕТКА",
    "ACTIVITY": "ДЕЙНОСТ",
    "AFFILIATE": "ФИЛИАЛ",
    "Activity Feed": "Лента на дейностите",
    "Affiliate Dashboard": "Таблица на филиала",
    "Affiliate Links": "Филиални връзки",
    "All Online Casinos": "Всички онлайн казина",
    "All languages": "Всички езици",
    "An online casino is a virtual gambling platform that allows players to bet on casino games.": "Онлайн казино е виртуална платформа за хазарт, която позволява на играчите да залагат на казино игри.",
    "Anonymous transactions and gaming": "Анонимни транзакции и игри",
    "Are online casinos safe?": "Безопасни ли са онлайн казината?",
    "Australia": "Австралия",
    "Avatar": "Аватар",
    "BONUSES": "БОНУСИТЕ",
    "BTC deposit bonuses": "BTC депозитни бонуси",
    "Baccarat": "Бакара",
    "Bank Transfer": "Банков превод",
    "Bankroll Simulator": "Симулатор на банков събор",
    "BeGambleAware:": "BeGambleAware:",
    "Beginner": "Начинаещ",
    "Best High Roller Casinos": "Най-добрите казина за висок залог",
    "Best for Beginners": "Най-добро за начинаещи",
    "Best return to player rates": "Най-добра процентност на връщане към играча",
    "Betting Calculator": "Калкулатор на залози",
    "Bingo": "Бинго",
    "Blackjack": "Блекджек",
    "Bitcoin Bonuses": "Bitcoin бонуси",
    "Bitcoin Casinos": "Bitcoin казина",
    "New bonus unlocked": "Нов бонус отключен",
    "You claimed daily bonus": "Поискали сте дневен бонус",
    "Daily streak reward": "Награда за дневна серия",
    "Keep scrolling and stay in the loop with your latest milestones.": "Продължете да превивате и останете в течението с вашите последни етапи.",
    "You reviewed a casino": "Преглеждали сте казино",
    "Our comprehensive ranking of the best online casinos based on bonuses, games, and security.": "Нашият комплексен рейтинг на най-добрите онлайн казина, базиран на бонусите, игрите и сигурността.",
    "Combination of match bonus and free spins": "Комбинация от съответствие бонус и безплатни завъртания",
    "Compare online casinos side by side. Find the best casino for your needs with our comparison tool.": "Сравнете онлайн казина един до друг. Намерете най-добрия казин за вашите нужди с нашия инструмент за сравнение.",
    "Get in touch with the Simocasino team. We are here to help!": "Свържете се с екипа на Simocasino. Ние сме тук, за да помогнем!",
    "Find answers to common questions about online casinos, bonuses, and gaming.": "Намерете отговори на често задавани въпроси за онлайн казина, бонусите и игрите.",
    "Your casino hub is loaded with rewards, challenges, and fresh offers.": "Вашият казино център е зареден с награди, предизвикателства и нови предложения.",
    "Want us to review a casino? Contact": "Искате ли да преглеждаме казинат? Свържете",
    "Exclusive cryptocurrency bonuses at online casinos. Bitcoin, Ethereum, and other cryptocurrencies.": "Изключителен cryptocurrency бонусите в онлайн казина. Bitcoin, Ethereum и други криптовалути.",
    "Play at the best cryptocurrency casinos. Bitcoin, Ethereum, and other crypto payment options.": "Играй в най-добрите казина за криптовалута. Bitcoin, Ethereum и други опции за плащане с крипто.",
    "Top Casinos in {{country}}": "Топ казина в {{country}}",
    "Your casino hub": "Вашият казино център",
    "XP progress": "Прогрес на XP",
    "{{count}} XP to Ниво {{nextНиво}}": "{{count}} XP до ниво {{nextLevel}}",
    "Jump into the core actions that drive engagement.": "Хвърлете се в основните действия, които раждат ангажимент.",
    "Play Играs": "Играй игри",
    "Top six stats that matter most to your casino journey.": "Топ шест статистики, които имат значение за вашето казино пътешествие.",
    "See your rank, monthly climb, and reward momentum.": "Вижте вашия ранг, месечното катерене и инерцията на наградата.",
    "Only {{count}} XP away from the next reward tier.": "Само {{count}} XP далеко от следващия слой на наградата.",
}

# Comprehensive Bengali translations  
BENGALI_TRANSLATIONS = {
    "+50 XP": "+50 XP",
    "2m ago": "২ মিনিট আগে",
    "3h ago": "৩ ঘন্টা আগে",
    "58m ago": "৫৮ মিনিট আগে",
    "A beginner-friendly guide to understanding and playing slot machines online.": "অনলাইনে স্লট মেশিন বোঝা এবং খেলার জন্য শিক্ষানবিস-বান্ধব গাইড।",
    "A no deposit bonus allows you to play casino games for free without making an initial deposit.": "একটি জমা ছাড়াই বোনাস আপনাকে প্রাথমিক জমা ছাড়াই বিনামূল্যে ক্যাসিনো গেম খেলতে দেয়।",
    "ACCOUNT": "অ্যাকাউন্ট",
    "ACTIVITY": "কার্যকলাপ",
    "AFFILIATE": "অনুমোদিত",
    "Activity Feed": "কার্যকলাপ ফীড",
    "Affiliate Dashboard": "অনুমোদিত ড্যাশবোর্ড",
    "Affiliate Links": "অনুমোদিত লিঙ্ক",
    "All Online Casinos": "সমস্ত অনলাইন ক্যাসিনো",
    "All languages": "সমস্ত ভাষা",
    "An online casino is a virtual gambling platform that allows players to bet on casino games.": "একটি অনলাইন ক্যাসিনো একটি ভার্চুয়াল জুয়া প্ল্যাটফর্ম যা খেলোয়াড়দের ক্যাসিনো গেমে বাজি ধরতে দেয়।",
    "Anonymous transactions and gaming": "বেনামী লেনদেন এবং গেমিং",
    "Are online casinos safe?": "অনলাইন ক্যাসিনো নিরাপদ কিনা?",
    "Australia": "অস্ট্রেলিয়া",
    "Avatar": "অবতার",
    "BONUSES": "বোনাস",
    "BTC deposit bonuses": "বিটিসি জমা বোনাস",
    "Baccarat": "ব্যাকারাট",
    "Bank Transfer": "ব্যাংক স্থানান্তর",
    "Bankroll Simulator": "ব্যাংক রোল সিমুলেটর",
    "BeGambleAware:": "BeGambleAware:",
    "Beginner": "শিক্ষানবিস",
    "Best High Roller Casinos": "সেরা হাই রোলার ক্যাসিনো",
    "Best for Beginners": "শিক্ষানবিসদের জন্য সেরা",
    "Best return to player rates": "সেরা খেলোয়াড় রিটার্ন হার",
    "Betting Calculator": "বেটিং ক্যালকুলেটর",
    "Bingo": "বিঙ্গো",
    "Blackjack": "ব্ল্যাকজ্যাক",
    "Bitcoin Bonuses": "বিটকয়েন বোনাস",
    "Bitcoin Casinos": "বিটকয়েন ক্যাসিনো",
    "New bonus unlocked": "নতুন বোনাস আনলক করা হয়েছে",
    "You claimed daily bonus": "আপনি দৈনিক বোনাস দাবি করেছেন",
    "Daily streak reward": "দৈনিক স্ট্রীক পুরস্কার",
    "Keep scrolling and stay in the loop with your latest milestones.": "স্ক্রল করতে থাকুন এবং আপনার সর্বশেষ মাইলফলকগুলির সাথে লুপে থাকুন।",
    "You reviewed a casino": "আপনি একটি ক্যাসিনো পর্যালোচনা করেছেন",
    "Our comprehensive ranking of the best online casinos based on bonuses, games, and security.": "বোনাস, গেম এবং নিরাপত্তার উপর ভিত্তি করে সেরা অনলাইন ক্যাসিনোগুলির আমাদের ব্যাপক র‍্যাঙ্কিং।",
    "Combination of match bonus and free spins": "ম্যাচ বোনাস এবং বিনামূল্যে স্পিনের সংমিশ্রণ",
    "Compare online casinos side by side. Find the best casino for your needs with our comparison tool.": "অনলাইন ক্যাসিনোগুলি পাশাপাশি তুলনা করুন। আমাদের তুলনা সরঞ্জাম দিয়ে আপনার চাহিদার জন্য সেরা ক্যাসিনো খুঁজুন।",
    "Get in touch with the Simocasino team. We are here to help!": "Simocasino দলের সাথে যোগাযোগ করুন। আমরা সাহায্য করতে এখানে আছি!",
    "Find answers to common questions about online casinos, bonuses, and gaming.": "অনলাইন ক্যাসিনো, বোনাস এবং গেমিং সম্পর্কে সাধারণ প্রশ্নের উত্তর খুঁজুন।",
    "Your casino hub is loaded with rewards, challenges, and fresh offers.": "আপনার ক্যাসিনো হাব পুরস্কার, চ্যালেঞ্জ এবং তাজা অফার দিয়ে লোড করা হয়েছে।",
    "Want us to review a casino? Contact": "আপনি একটি ক্যাসিনো পর্যালোচনা করতে চান? যোগাযোগ করুন",
    "Exclusive cryptocurrency bonuses at online casinos. Bitcoin, Ethereum, and other cryptocurrencies.": "অনলাইন ক্যাসিনোতে এক্সক্লুসিভ ক্রিপ্টোকারেন্সি বোনাস। বিটকয়েন, ইথেরিয়াম এবং অন্যান্য ক্রিপ্টোকারেন্সি।",
    "Play at the best cryptocurrency casinos. Bitcoin, Ethereum, and other crypto payment options.": "সেরা ক্রিপ্টোকারেন্সি ক্যাসিনোতে খেলুন। বিটকয়েন, ইথেরিয়াম এবং অন্যান্য ক্রিপ্টো পেমেন্ট বিকল্প।",
    "Top Casinos in {{country}}": "{{country}} তে শীর্ষ ক্যাসিনো",
    "Your casino hub": "আপনার ক্যাসিনো হাব",
    "XP progress": "এক্সপি অগ্রগতি",
    "{{count}} XP to স্তর {{nextস্তর}}": "{{count}} XP স্তর {{nextLevel}} এ",
    "Jump into the core actions that drive engagement.": "এনগেজমেন্ট চালনা করে এমন মূল কর্মগুলিতে ঝাঁপিয়ে পড়ুন।",
    "Play খেলাs": "খেলুন গেম",
    "Top six stats that matter most to your casino journey.": "আপনার ক্যাসিনো যাত্রার জন্য সবচেয়ে গুরুত্বপূর্ণ শীর্ষ ছয়টি পরিসংখ্যান।",
    "See your rank, monthly climb, and reward momentum.": "আপনার র‍্যাঙ্ক, মাসিক আরোহণ এবং পুরস্কার গতি দেখুন।",
    "Only {{count}} XP away from the next reward tier.": "পরবর্তী পুরস্কার স্তর থেকে মাত্র {{count}} XP দূরে।",
}

# Comprehensive Azerbaijani translations
AZERBAIJANI_TRANSLATIONS = {
    "+50 XP": "+50 XP",
    "2m ago": "2 dəqiqə əvvəl",
    "3h ago": "3 saat əvvəl",
    "58m ago": "58 dəqiqə əvvəl",
    "A beginner-friendly guide to understanding and playing slot machines online.": "Onlayn slot maşınlarını anlamaq və oynamaq üçün başlanğıc-dostu bələdçi.",
    "A no deposit bonus allows you to play casino games for free without making an initial deposit.": "Depozit bonusu olmayan bir quraşdırma sizi ilkin depozit etmədən pulsuz kazino oyunları oynamağa imkan verir.",
    "ACCOUNT": "HESAB",
    "ACTIVITY": "FƏALİYYƏT",
    "AFFILIATE": "FİLİAL",
    "Activity Fed": "Fəaliyyət Feed",
    "Affiliate Dashboard": "Filial Paneli",
    "Affiliate Links": "Filial Bağlantıları",
    "All Online Casinos": "Bütün Onlayn Kazinoları",
    "All languages": "Bütün dilləri",
    "An online casino is a virtual gambling platform that allows players to bet on casino games.": "Onlayn kazino, oyunçuların kazino oyunlarına mərə qoymağa imkan verən virtual qumar platformasıdır.",
    "Anonymous transactions and gaming": "Anonim tranzaksiyalar və oyun",
    "Are online casinos safe?": "Onlayn kazinoları təhlükəsizdir?",
    "Australia": "Avstraliyadır",
    "Avatar": "Avatar",
    "BONUSES": "BONUSLAR",
    "BTC deposit bonuses": "BTC depozit bonusları",
    "Baccarat": "Bakkarat",
    "Bank Transfer": "Bank transferi",
    "Bankroll Simulator": "Bankroll Simulyatoru",
    "BeGambleAware:": "BeGambleAware:",
    "Beginner": "Başlanğıc",
    "Best High Roller Casinos": "Ən Yaxşı Yüksək Roller Kazinoları",
    "Best for Beginners": "Başlanğıclar üçün Ən Yaxşı",
    "Best return to player rates": "Oyunçuya ən yaxşı getmə nisbətləri",
    "Betting Calculator": "Mərə Kalkulyatoru",
    "Bingo": "Bingo",
    "Blackjack": "Blackjack",
    "Bitcoin Bonuses": "Bitcoin Bonusları",
    "Bitcoin Casinos": "Bitcoin Kazinoları",
    "New bonus unlocked": "Yeni bonus açılmışdır",
    "You claimed daily bonus": "Siz gündəlik bonusu iddia etdiniz",
    "Daily streak reward": "Gündəlik cərgə mükafatı",
    "Keep scrolling and stay in the loop with your latest milestones.": "Sürüşdürməyə davam edin və ən son mile taşlarınızla döngüdə qalın.",
    "You reviewed a casino": "Siz kazino baxdınız",
    "Our comprehensive ranking of the best online casinos based on bonuses, games, and security.": "Bonuslar, oyunlar və təhlükəsizliyə əsaslanan ən yaxşı onlayn kazinoların bizim hərtərəfli reytinqi.",
    "Combination of match bonus and free spins": "Matç bonus və pulsuz fırlanmalarının kombinasiyası",
    "Compare online casinos side by side. Find the best casino for your needs with our comparison tool.": "Onlayn kazinoları yan-yana müqayisə edin. Bizimlə müqayisə aləti ilə sizə bəs gələn ən yaxşı kazinonu tapın.",
    "Get in touch with the Simocasino team. We are here to help!": "Simocasino komandasıyla əlaqə saxlayın. Biz kömək etməyə buradayıq!",
    "Find answers to common questions about online casinos, bonuses, and gaming.": "Onlayn kazinoları, bonuslar və oyunlar haqqında tez-tez verilən sualların cavablarını tapın.",
    "Your casino hub is loaded with rewards, challenges, and fresh offers.": "Sizin kazino hub mükafatlar, problemlər və təzə təkliflər ilə doldurulmuşdur.",
    "Want us to review a casino? Contact": "Biz kazini baxmaq istəyirsiniz? Əlaqə saxlayın",
    "Exclusive cryptocurrency bonuses at online casinos. Bitcoin, Ethereum, and other cryptocurrencies.": "Onlayn kazinoarda eksklyuziv kriptoqrafiya bonusları. Bitcoin, Ethereum və digər kriptoqrafiyalar.",
    "Play at the best cryptocurrency casinos. Bitcoin, Ethereum, and other crypto payment options.": "Ən yaxşı kriptovalyuta kazinounda oynayın. Bitcoin, Ethereum və digər kripto ödəniş variantları.",
    "Top Casinos in {{country}}": "{{country}} Yuxarı Kazinoları",
    "Your casino hub": "Sizin kazino hub",
    "XP progress": "XP ilərləməsi",
    "{{count}} XP to Səviyyə {{nextСəviyyə}}": "{{count}} XP Səviyyə {{nextLevel}} ə",
    "Jump into the core actions that drive engagement.": "Angajman sürücü əsas hərəkətlərə hamsə atılın.",
    "Play Oyuns": "Oyun oyna",
    "Top six stats that matter most to your casino journey.": "Sizin kazino səyahətinə ən çox əhəmiyyət verən yuxarı altı statistika.",
    "See your rank, monthly climb, and reward momentum.": "Sizin rəngini, aylıq alpinizmi, və mükafat impulsunuzu görün.",
    "Only {{count}} XP away from the next reward tier.": "Sonrakı mükafat səviyyəsindən cəmi {{count}} XP uzaqda.",
}

def translate_value(value, translation_dict):
    if not isinstance(value, str):
        return value
    if value in translation_dict:
        return translation_dict[value]
    sorted_phrases = sorted(translation_dict.keys(), key=len, reverse=True)
    for english_phrase in sorted_phrases:
        if english_phrase in value and english_phrase != value:
            result = value.replace(english_phrase, translation_dict[english_phrase])
            return result
    return value

def process_locale_file(filepath, translation_dict, language_name):
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            data = json.load(f)
        
        print(f"\nProcessing {language_name}: {filepath}")
        print("="*70)
        
        translated_count = 0
        
        def translate_recursive(obj):
            nonlocal translated_count
            if isinstance(obj, dict):
                for key, value in obj.items():
                    if isinstance(value, (dict, list)):
                        translate_recursive(value)
                    elif isinstance(value, str):
                        translated_value = translate_value(value, translation_dict)
                        if translated_value != value:
                            obj[key] = translated_value
                            translated_count += 1
                            if translated_count <= 10:
                                print(f"✓ {key}: {value[:50]}... → {translated_value[:50]}...")
            elif isinstance(obj, list):
                for i, item in enumerate(obj):
                    if isinstance(item, (dict, list)):
                        translate_recursive(item)
                    elif isinstance(item, str):
                        translated_value = translate_value(item, translation_dict)
                        if translated_value != item:
                            obj[i] = translated_value
                            translated_count += 1
        
        translate_recursive(data)
        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        
        print(f"✓ Saved {filepath}")
        print(f"  Total translations applied: {translated_count}")
        return translated_count
    except Exception as e:
        print(f"Error processing {filepath}: {str(e)}")
        return 0

base_locales_path = Path("app/locales")
locales = {
    "bg": ("translation.json", BULGARIAN_TRANSLATIONS, "Bulgarian"),
    "bn": ("translation.json", BENGALI_TRANSLATIONS, "Bengali"),
    "az": ("translation.json", AZERBAIJANI_TRANSLATIONS, "Azerbaijani"),
}

total_translated = 0
for locale_code, (filename, trans_dict, lang_name) in locales.items():
    filepath = base_locales_path / locale_code / filename
    if filepath.exists():
        count = process_locale_file(str(filepath), trans_dict, lang_name)
        total_translated += count

print(f"\n{'='*70}")
print(f"SUMMARY: Total translations applied: {total_translated}")
print(f"{'='*70}")

import json
import re

# Comprehensive mapping of ALL English strings to their translations
mapping = {
    "az": {
        "Find the Best Online Casinos, Bonuses & Free Spins for 2026": "2026 ilində Ən Yaxşı Onlayn Kazinoları, Bonusları və Pulsuz Spinləri Tapın",
        "Discover trusted casino reviews, compare welcome offers, and choose the ideal casino for your country and play style.": "Etibarlı kazino baxışlarını kəşf edin, xoş gəlmisiniz təklifi ilə qiyas edin, ölkəniz və oynama stiliniz üçün ideal kazino seçin.",
        "Join Thousands of Happy Players": "Minlərcə Xoşbəxt Oyunçuya Qoşulun",
        "Get exclusive access to top-rated casinos, verified reviews, and expert guides.": "Ən Yüksək Dərəcəli Kazinoları, Təsdiqlənmiş Baxışları və Ekspert Bələdçilərinə Eksklusiv Giriş Əldə Edin.",
        "Explore Casinos": "Kazinoları Kəşf Edin",
        "Featured Bonuses": "Seçilmiş Bonuslar",
        "Find and Compare Online Casinos": "Onlayn Kazinoları Tapın və Müqayisə Edin",
        "Explore Our Casinos": "Kazinoları Kəşf Edin",
        "Best Online Casinos": "Ən Yaxşı Onlayn Kazinoları",
        "Your trusted guide to online casinos since 2020. Expert reviews, bonus comparisons, and gaming tips.": "2020 -dən bəri onlayn kazinoların sizin etibarlı bələdçiniz. Ekspert baxışları, bonus müqayisələri və oyun məsləhətləri.",
        "Sign Up Now": "İndi Qeydiyyatdan Keçin",
        "Loading dashboard...": "Panell yüklənir...",
        "Favorite season": "Sevimli Fəsil",
        "Female": "Qadın",
        "File size must be less than 5MB": "Faylın ölçüsü 5MB-dən az olmalıdır",
        "First Name": "Ad",
        "Image Gallery": "Şəkil Qalereası",
        "Last Name": "Soyad",
        "Location": "Yer",
        "Male": "Kişi",
        "Member": "Üzv",
        "My Profile": "Mənim Profilim",
        "New Password": "Yeni Parol",
        "Newsletter": "Xəbər Jurnal",
        "Other": "Digər",
        "Personal Information": "Şəxsi Məlumat",
        "Personal Quote": "Şəxsi Sitat",
        "Please log in to access your profile": "Profilinizə daxil olmaq üçün daxil olun",
        "Please select an image file": "Zəhmət olmasa şəkil faylını seçin",
        "Prefer not to say": "Demək istəmirəm",
        "Preferred Currency": "Seçilmiş Valyuta",
        "Privacy & Security": "Siyasət və Təhlükəsizlik",
        "Profile Images": "Profil Şəkilləri",
        "Profile Video": "Profil Videosu",
        "Promotional Emails": "Promosyonel E-poçtlar",
        "Referral Link": "Referral Bağlantısı",
        "Remove": "Çıxar",
        "Save Changes": "Dəyişiklikləri Saxla",
        "Security": "Təhlükəsizlik",
        "Two-Factor Authentication": "İki Faktorlu Autentifikasiya",
        "Unsubscribe": "Abonə olmakdan çıxın",
        "Update Email": "E-poçtu Yeniləyin",
        "Upload": "Yüklə",
        "Upload failed": "Yükləmə uğursuz oldu",
        "Upload failed. Please try again.": "Yükləmə uğursuz oldu. Zəhmət olmasa yenidən cəhd edin.",
        "User Menu": "İstifadəçi Menyusu",
        "About": "Haqqında",
        "All rights reserved": "Bütün hüquqlar qorunur",
        "Blog": "Blok",
        "Careers": "Karyera",
        "Chat": "Söhbət",
        "Claim Bonus": "Bonusu Mütaləə Edin",
        "Community": "Cəmiyyət",
        "Available tickets": "Mövcud biletlər",
        "Best Overall": "Ümumiyyətlə Ən Yaxşı",
        "You are close to Top 1000!": "Siz Top 1000-ə yaxınsınız!",
        "Get exclusive access to the best casino bonuses and promotio": "Ən yaxşı kazino bonusları və promosyonlara eksklusiv giriş əldə edin",
        "Please wait while we build your hub.": "Hub-u qurarkən zəhmət olmasa gözləyin.",
        "Your casino hub is loaded with rewards, challenges, and fres": "Sizin kazino hub-u mükafatlarla, çətinliklərlə və tə..."
    },
    "bg": {
        "Find the Best Online Casinos, Bonuses & Free Spins for 2026": "Намерете най-добрите онлайн казина, бонусите и безплатни завъртания за 2026 г.",
        "Discover trusted casino reviews, compare welcome offers, and choose the ideal casino for your country and play style.": "Откройте надеждни рецензии на казина, сравнете приветствия и изберете идеалното казино за вашата държава и стил на игра.",
        "Join Thousands of Happy Players": "Присъединете се към хиляди щастливи играчи",
        "Get exclusive access to top-rated casinos, verified reviews, and expert guides.": "Получете екскузивен достъп до най-добре оценени казина, проверени рецензии и експертни ръководства.",
        "Explore Casinos": "Проучете казина",
        "Featured Bonuses": "Избрани бонусите",
        "Find and Compare Online Casinos": "Намерете и сравнете онлайн казина",
        "Explore Our Casinos": "Проучете нашите казина",
        "Best Online Casinos": "Най-добрите онлайн казина",
        "Your trusted guide to online casinos since 2020. Expert reviews, bonus comparisons, and gaming tips.": "Вашият надежден путеводител за онлайн казина от 2020 г. Експертни рецензии, сравнение на бонуси и съвети за игра.",
        "Sign Up Now": "Регистрирайте се сега",
        "Loading dashboard...": "Зареждане на панелния бюро...",
        "Favorite season": "Любимо време на годината",
        "Female": "Женски",
        "File size must be less than 5MB": "Размерът на файла трябва да бъде по-малък от 5MB",
        "First Name": "Първо име",
        "Image Gallery": "Галерия с изображения",
        "Last Name": "Фамилно име",
        "Location": "Местоположение",
        "Male": "Мъжки",
        "Member": "Член",
        "My Profile": "Моят профил",
        "New Password": "Нова парола",
        "Newsletter": "Информационен бюлетин",
        "Other": "Други",
        "Personal Information": "Лична информация",
        "Personal Quote": "Лично цитат",
        "Please log in to access your profile": "Моля, влезте, за да достъпите своя профил",
        "Please select an image file": "Моля, изберете файл с изображение",
        "Prefer not to say": "Предпочитам да не казвам",
        "Preferred Currency": "Предпочитана валута",
        "Privacy & Security": "Поверителност и сигурност",
        "Profile Images": "Изображения на профила",
        "Profile Video": "Видео на профила",
        "Promotional Emails": "Промоционални имейли",
        "Referral Link": "Препоръчителен линк",
        "Remove": "Премахнете",
        "Save Changes": "Запазване на промените",
        "Security": "Сигурност",
        "Two-Factor Authentication": "Двуфакторна аутентификация",
        "Unsubscribe": "Отпишете се",
        "Update Email": "Актуализирайте имейл",
        "Upload": "Качване",
        "Upload failed": "Качването неуспешно",
        "Upload failed. Please try again.": "Качването неуспешно. Моля, опитайте отново.",
        "User Menu": "Меню на потребителя",
        "About": "За нас",
        "All rights reserved": "Всички права запазени",
        "Blog": "Блог",
        "Careers": "Кариери",
        "Chat": "Чат",
        "Claim Bonus": "Получете бонус",
        "Community": "Общност",
        "Available tickets": "Налични билети",
        "Best Overall": "Най-добър като цяло",
        "You are close to Top 1000!": "Вие сте близо до Top 1000!",
        "Get exclusive access to the best casino bonuses and promotio": "Получете екскузивен достъп до най-добрите казино бонуси и промоции",
        "Please wait while we build your hub.": "Моля, почакайте докато строим вашия хъб.",
        "Your casino hub is loaded with rewards, challenges, and fres": "Вашият казино хъб е натоварен с награди, предизвикателства и..."
    },
    "bn": {
        "Find the Best Online Casinos, Bonuses & Free Spins for 2026": "२०२६ সালের জন्य সেरे अनлाইन कैसिनो, बोनस और बिनामूल्य स्पिन खुंजें",
        "Discover trusted casino reviews, compare welcome offers, and choose the ideal casino for your country and play style.": "বিশ्বস्त ক্যাসिनो পর্যালোचনা আবিষ্कार করুন, স्वागत অফার তুलনা করুন ओ आपক देश औ खेলने की शैली के लिए आदर्श कैसिनो बेचे निन।",
        "Join Thousands of Happy Players": "हाजार हाजर সুখ খেলোয়াड्डे সат যॊ दिन",
        "Get exclusive access to top-rated casinos, verified reviews, and expert guides.": "शीर्ष रेटेड ক्यासिनो, प्रमाणिकृत समीक्षा और विशेषज्ञ निर्देशिकाओं के लिए एक्सक्लूसिव प्रवेश प्राप्त करें।",
        "Explore Casinos": "ক্যাসिनো अন्वेषण करें",
        "Featured Bonuses": "ফিচার्ড बोनस",
        "Find and Compare Online Casinos": "अनलाइन कैसिनো खोजें और तुलना करें",
        "Explore Our Casinos": "आমারे क्यासिनो अन्वेषण करें",
        "Best Online Casinos": "সেরো अनलाইन कैसिनो",
        "Your trusted guide to online casinos since 2020. Expert reviews, bonus comparisons, and gaming tips.": "२०२० सال से अनलाइन कैसिनो के लिए आपका विश्वस्त मार्गदर्शक। विशेषज्ञ समीक्षा, बोनस तुलना और गेमिंग सुझाव।",
        "Sign Up Now": "अभी साइन अप करें",
        "Loading dashboard...": "ড্যাশবোર्ड লোड করা হচ্ছে...",
        "Favorite season": "প्রिय ऋतु",
        "Female": "মহिला",
        "File size must be less than 5MB": "ফাইলের আকার অবশ्યই 5MB এর কম হতে হবে",
        "First Name": "প्রথম নাম",
        "Image Gallery": "ইমेজ গ্যালারি",
        "Last Name": "শেষ নাম",
        "Location": "অবস्থান",
        "Male": "পুरुष",
        "Member": "সদस्य",
        "My Profile": "আমার প्रोфाইल",
        "New Password": "नया पासवर्ड",
        "Newsletter": "न्यूज़लेटर",
        "Other": "अन्य",
        "Personal Information": "ব্যক्তিगत তথ्য",
        "Personal Quote": "व्यक्तिगत उद्धरण",
        "Please log in to access your profile": "अपনी प्रोफाइल एक्सेस करने के लिए कृपया लॉग इन करें",
        "Please select an image file": "कृपया एक छवि फाइल चुनें",
        "Prefer not to say": "না বলা পছন्দ করি",
        "Preferred Currency": "পছন্দের मुद्रा",
        "Privacy & Security": "गोपनीयता और सुरक्षा",
        "Profile Images": "प्रोफाइल छवियां",
        "Profile Video": "प्रोफाइल वीडियो",
        "Promotional Emails": "प्रचारणात्मक ईमेल",
        "Referral Link": "रेफरेल लिंक",
        "Remove": "हटाना",
        "Save Changes": "परिवर्तन सहेजें",
        "Security": "सुरक्षा",
        "Two-Factor Authentication": "दो-फैक्टर प्रमाणीकरण",
        "Unsubscribe": "सदस्यता समाप्त करें",
        "Update Email": "ईमेल अपडेट करें",
        "Upload": "अपलोड करें",
        "Upload failed": "अपलोड विफल",
        "Upload failed. Please try again.": "अपलोड विफल। कृपया पुनः प्रयास करें।",
        "User Menu": "उपयोगकर्ता मेनू",
        "About": "के बारे में",
        "All rights reserved": "सर्वाधिकार सुरक्षित",
        "Blog": "ब्लॉग",
        "Careers": "कैरियर",
        "Chat": "चैट",
        "Claim Bonus": "बोनस का दावा करें",
        "Community": "समुदाय",
        "Available tickets": "उपलब्ध टिकट",
        "Best Overall": "सबसे अच्छा समग्र",
        "You are close to Top 1000!": "आप Top 1000 के करीब हैं!",
        "Get exclusive access to the best casino bonuses and promotio": "सर्वश्रेष्ठ कैसिनो बोनस और प्रचार के लिए एक्सक्लूसिव पहुंच प्राप्त करें",
        "Please wait while we build your hub.": "आपका हब बनने के दौरान कृपया प्रतीक्षा करें।",
        "Your casino hub is loaded with rewards, challenges, and fres": "आपका कैसिनो हब पुरस्कार, चुनौतियों और..."
    }
}

def translate_file(lang_code, file_path):
    print(f"\n{'='*70}")
    print(f"Translating {lang_code} ({file_path})")
    print('='*70)
    
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Direct replacement approach - only translate what's in our mapping
    count = 0
    for key in data.keys():
        value = data[key]
        if isinstance(value, str) and value in mapping[lang_code]:
            new_value = mapping[lang_code][value]
            if new_value != value:
                data[key] = new_value
                count += 1
    
    # Save file with UTF-8 encoding
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print(f"✓ Translated {count} strings")
    print(f"✓ File saved: {file_path}")
    
    return count

# Main execution
files = [
    ('az', 'app/locales/az/translation.json'),
    ('bg', 'app/locales/bg/translation.json'),
    ('bn', 'app/locales/bn/translation.json')
]

total = 0
for lang_code, file_path in files:
    count = translate_file(lang_code, file_path)
    total += count

print(f"\n{'='*70}")
print(f"COMPLETE!")
print(f"Total: {total} strings translated across all files")
print('='*70)

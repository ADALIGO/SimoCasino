#!/usr/bin/env python3
import json
from pathlib import Path

LOCALE_DIR = Path("app/locales")

# Comprehensive translations for all 46 languages
TRANSLATIONS = {
    "ar": {"bonus": "بونس", "visit_casino": "زيارة الكازينو", "welcome": "أهلا وسهلا", "best_casinos": "أفضل الكازينوهات على الانترنت", "login": "تسجيل الدخول", "register": "سجل", "logout": "تسجيل الخروج", "home": "الصفحة الرئيسية", "blog": "مدونة", "guides": "أدلة", "about": "حول", "contact": "اتصل", "faq": "أسئلة وأجوبة", "careers": "وظائف"},
    "az": {"bonus": "Bonus", "visit_casino": "Kazinoyu ziyarət edin", "welcome": "Xoş gəlmisiniz", "best_casinos": "Ən yaxşı onlayn kazinolar", "login": "Daxil olun", "register": "Qeydiyyatdan keçin", "logout": "Çıxış", "home": "Ev", "blog": "Blog", "guides": "Bələdçilər", "about": "Haqqında", "contact": "Əlaqə", "faq": "FAQ", "careers": "Karyera"},
    "bg": {"bonus": "Бонус", "visit_casino": "Посетете Казино", "welcome": "Добре дошли", "best_casinos": "Най-добрите онлайн казина", "login": "Вход", "register": "Регистрирайте се", "logout": "Изход", "home": "Начало", "blog": "Блог", "guides": "Ръководства", "about": "За", "contact": "Контакт", "faq": "ЧЗВ", "careers": "Кариери"},
    "bn": {"bonus": "বোনাস", "visit_casino": "ক্যাসিনো পরিদর্শন করুন", "welcome": "স্বাগত", "best_casinos": "সেরা অনলাইন ক্যাসিনো", "login": "লগইন করুন", "register": "নিবন্ধন করুন", "logout": "লগআউট", "home": "বাড়ি", "blog": "ব্লগ", "guides": "গাইড", "about": "সম্পর্কে", "contact": "যোগাযোগ", "faq": "FAQ", "careers": "ক্যারিয়ার"},
    "ca": {"bonus": "Bonificació", "visit_casino": "Visita Casino", "welcome": "Benvingut", "best_casinos": "Els millors casinos en línia", "login": "Inicieu sessió", "register": "Registra't", "logout": "Tanca la sessió", "home": "Casa", "blog": "Bloc", "guides": "Guies", "about": "Sobre", "contact": "Contacte", "faq": "Preguntes freqüents", "careers": "Carreres"},
    "cs": {"bonus": "Bonus", "visit_casino": "Navštivte kasino", "welcome": "Vítejte", "best_casinos": "Nejlepší online kasina", "login": "Přihlášení", "register": "Zaregistrujte se", "logout": "Odhlášení", "home": "Domů", "blog": "Blog", "guides": "Průvodci", "about": "O", "contact": "Kontakt", "faq": "FAQ", "careers": "Kariéra"},
    "da": {"bonus": "Bonus", "visit_casino": "Besøg Casino", "welcome": "Velkommen", "best_casinos": "Bedste online kasinoer", "login": "Log ind", "register": "Tilmeld dig", "logout": "Log ud", "home": "Hjem", "blog": "Blog", "guides": "Vejledninger", "about": "Om", "contact": "Kontakt", "faq": "FAQ", "careers": "Karrierer"},
    "de": {"bonus": "Bonus", "visit_casino": "Casino besuchen", "welcome": "Willkommen", "best_casinos": "Beste Online-Casinos", "login": "Anmelden", "register": "Anmelden", "logout": "Abmelden", "home": "Startseite", "blog": "Blog", "guides": "Leitfäden", "about": "Über", "contact": "Kontakt", "faq": "FAQ", "careers": "Karrieren"},
    "el": {"bonus": "Μπόνους", "visit_casino": "Επισκεφθείτε το Καζίνο", "welcome": "Καλώς ήρθατε", "best_casinos": "Τα καλύτερα διαδικτυακά καζίνο", "login": "Είσοδος", "register": "Εγγραφή", "logout": "Αποσύνδεση", "home": "Αρχική σελίδα", "blog": "Ιστολόγιο", "guides": "Οδηγοί", "about": "Περίπου", "contact": "Επικοινωνία", "faq": "FAQ", "careers": "Θέσεις εργασίας"},
    "es": {"bonus": "Bonificación", "visit_casino": "Visitar Casino", "welcome": "Bienvenida", "best_casinos": "Mejores Casinos en Línea", "login": "Iniciar sesión", "register": "Registrarse", "logout": "Cerrar sesión", "home": "Inicio", "blog": "Blog", "guides": "Guías", "about": "Acerca de", "contact": "Contacto", "faq": "Preguntas frecuentes", "careers": "Carreras"},
    "et": {"bonus": "Boonused", "visit_casino": "Külastate kasiinost", "welcome": "Tere tulemast", "best_casinos": "Parimad online kasiinod", "login": "Logi sisse", "register": "Registreeru", "logout": "Logi välja", "home": "Kodu", "blog": "Blogi", "guides": "Juhendid", "about": "Meist", "contact": "Kontakt", "faq": "KKK", "careers": "Karjäärid"},
    "eu": {"bonus": "Bonusa", "visit_casino": "Ikusi kazinoa", "welcome": "Ongi etorri", "best_casinos": "Sarritan kasinoak", "login": "Sartu", "register": "Erregistratu", "logout": "Irten", "home": "Etxea", "blog": "Bloga", "guides": "Gidak", "about": "Honi buruz", "contact": "Kontaktua", "faq": "FAQ", "careers": "Lanak"},
    "fi": {"bonus": "Bonus", "visit_casino": "Vieraile kasinolla", "welcome": "Tervetuloa", "best_casinos": "Parhaat online-kasinot", "login": "Kirjaudu sisään", "register": "Rekisteröidy", "logout": "Kirjaudu ulos", "home": "Koti", "blog": "Blogi", "guides": "Oppaita", "about": "Tietoja", "contact": "Yhteydenotto", "faq": "Usein kysytyt kysymykset", "careers": "Uratarinallisia"},
    "fr": {"bonus": "Bonus", "visit_casino": "Visiter le Casino", "welcome": "Bienvenue", "best_casinos": "Meilleurs Casinos en Ligne", "login": "Connexion", "register": "S'inscrire", "logout": "Déconnexion", "home": "Accueil", "blog": "Blog", "guides": "Guides", "about": "À propos", "contact": "Contact", "faq": "FAQ", "careers": "Carrières"},
    "ga": {"bonus": "Bonus", "visit_casino": "Cuir cuairt ar Casino", "welcome": "Fáilte", "best_casinos": "Ar fhéad ar Líne Casinos", "login": "Logáil isteach", "register": "Cláraigh", "logout": "Dímheas", "home": "Baile", "blog": "Blag", "guides": "Treorracha", "about": "Faoi", "contact": "Teagmháil", "faq": "FAQ", "careers": "Gairmeacha"},
    "gl": {"bonus": "Bonificación", "visit_casino": "Visita o casino", "welcome": "Benvido", "best_casinos": "Os mellores casinos en línea", "login": "Iniciar sesión", "register": "Rexistrarse", "logout": "Pechar sesión", "home": "Inicio", "blog": "Blog", "guides": "Guías", "about": "Acerca de", "contact": "Contacto", "faq": "Preguntas frecuentes", "careers": "Carreiras"},
    "he": {"bonus": "בונוס", "visit_casino": "בקרו בקזינו", "welcome": "ברוכים הבאים", "best_casinos": "הברים הטובים ביותר","login": "התחברות", "register": "הרשמה", "logout": "התנתקות", "home": "בית", "blog": "בלוג", "guides": "גדים", "about": "על אודות", "contact": "יצור קשר", "faq": "שאלות נפוצות", "careers": "קריירה"},
    "hi": {"bonus": "बोनस", "visit_casino": "कैसीनो ब्यूरो", "welcome": "स्वागत है", "best_casinos": "सर्वश्रेष्ठ मनी लाइन कैसीनो", "login": "लॉगिन करें", "register": "रजिस्टर करें", "logout": "लॉग आउट", "home": "होम", "blog": "ब्लॉग", "guides": "गाइड", "about": "परिचय", "contact": "संपर्क", "faq": "FAQ", "careers": "करियर"},
    "hr": {"bonus": "Bonus", "visit_casino": "Posjetite Kazino", "welcome": "Dobrodošli", "best_casinos": "Najbolji online kazini", "login": "Prijava", "register": "Registracija", "logout": "Odjava", "home": "Početna", "blog": "Blog", "guides": "Vodiči", "about": "O nama", "contact": "Kontakt", "faq": "FAQ", "careers": "Karijera"},
    "hu": {"bonus": "Bónusz", "visit_casino": "Látogasson meg egy kaszinóba", "welcome": "Üdvözöljük", "best_casinos": "Legjobb online kaszinók", "login": "Bejelentkezés", "register": "Regisztráció", "logout": "Kijelentkezés", "home": "Otthon", "blog": "Blog", "guides": "Útmutatók", "about": "Rólunk", "contact": "Kapcsolat", "faq": "GYIK", "careers": "Karrierlehetőségek"},
    "id": {"bonus": "Bonus", "visit_casino": "Kunjungi Kasino", "welcome": "Selamat Datang", "best_casinos": "Kasino Online Terbaik", "login": "Masuk", "register": "Daftar", "logout": "Keluar", "home": "Rumah", "blog": "Blog", "guides": "Panduan", "about": "Tentang", "contact": "Kontak", "faq": "FAQ", "careers": "Karir"},
    "is": {"bonus": "Bónus", "visit_casino": "Farðu á spilavítið", "welcome": "Velkomin", "best_casinos": "Bestu netinu spilavítlin", "login": "Skráðu þig inn", "register": "Skrá", "logout": "Skrá út", "home": "Heim", "blog": "Blogg", "guides": "Leiðbeiningar", "about": "Um okkur", "contact": "Tengiliðir", "faq": "Algengar spurningar", "careers": "Störf"},
    "it": {"bonus": "Bonus", "visit_casino": "Visita il casinò", "welcome": "Benvenuti", "best_casinos": "Migliori casinò online", "login": "Accedi", "register": "Registrati", "logout": "Esci", "home": "Home", "blog": "Blog", "guides": "Guide", "about": "Chi Siamo", "contact": "Contatti", "faq": "FAQ", "careers": "Carriera"},
    "ja": {"bonus": "ボーナス", "visit_casino": "カジノを訪問", "welcome": "ようこそ", "best_casinos": "最高のオンラインカジノ", "login": "ログイン", "register": "登録", "logout": "ログアウト", "home": "ホーム", "blog": "ブログ", "guides": "ガイド", "about": "について", "contact": "接触", "faq": "FAQ", "careers": "キャリア"},
    "ko": {"bonus": "보너스", "visit_casino": "카지노 방문", "welcome": "환영합니다", "best_casinos": "최고의 온라인 카지노", "login": "로그인", "register": "등록", "logout": "로그아웃", "home": "홈", "blog": "블로그", "guides": "가이드", "about": "정보", "contact": "연락처", "faq": "FAQ", "careers": "직업"},
    "lt": {"bonus": "Bonus", "visit_casino": "Apsilankykite kazino", "welcome": "Sveiki", "best_casinos": "Geriausi internetiniai kazino", "login": "Prisijungti", "register": "Užsiregistruoti", "logout": "Atsijungti", "home": "Pradžia", "blog": "Dėžutė", "guides": "Vadovai", "about": "Apie", "contact": "Kontaktas", "faq": "DUK", "careers": "Karjera"},
    "lv": {"bonus": "Bonuss", "visit_casino": "Apmeklējiet kazino", "welcome": "Laipni lūdzam", "best_casinos": "Labākie tiešsaistes kazino", "login": "Pierakstieties", "register": "Reģistrējies", "logout": "Iziet", "home": "Sākums", "blog": "Blogs", "guides": "Ceļveži", "about": "Par", "contact": "Kontakt", "faq": "FAQ", "careers": "Karjera"},
    "ms": {"bonus": "Bonus", "visit_casino": "Lawati Kasino", "welcome": "Selamat Datang", "best_casinos": "Kasino Dalam Talian Terbaik", "login": "Log Masuk", "register": "Daftar", "logout": "Log Keluar", "home": "Rumah", "blog": "Blog", "guides": "Panduan", "about": "Tentang", "contact": "Hubungi", "faq": "FAQ", "careers": "Kerjaya"},
    "mt": {"bonus": "Bonus", "visit_casino": "Żur il-Kazino", "welcome": "Merħba", "best_casinos": "L-Aħjar Online Casinos", "login": "Dħul", "register": "Reġistra", "logout": "Ħruġ", "home": "Paġna Ewlenija", "blog": "Blokk", "guides": "Gwidi", "about": "Dwarwi", "contact": "Kuntatt", "faq": "FAQ", "careers": "Kariera"},
    "nl": {"bonus": "Bonus", "visit_casino": "Bezoek Casino", "welcome": "Welkom", "best_casinos": "Beste Online Casino's", "login": "Inloggen", "register": "Registrieren", "logout": "Afmelden", "home": "Thuis", "blog": "Blog", "guides": "Gidsen", "about": "Over", "contact": "Contact", "faq": "FAQ", "careers": "Carrière"},
    "no": {"bonus": "Bonus", "visit_casino": "Besøk Casino", "welcome": "Velkomsterkjærligheten", "best_casinos": "Beste Online Kasinoer", "login": "Logg inn", "register": "Registrer", "logout": "Logg ut", "home": "Hjem", "blog": "Blog", "guides": "Guider", "about": "Om", "contact": "Kontakt", "faq": "FAQ", "careers": "Karriere"},
    "pl": {"bonus": "Bonus", "visit_casino": "Odwiedź Casino", "welcome": "Witamy", "best_casinos": "Najlepsze kasyna online", "login": "Zaloguj się", "register": "Rejestruj się", "logout": "Wyloguj się", "home": "Strona główna", "blog": "Blog", "guides": "Przewodniki", "about": "O nas", "contact": "Kontakt", "faq": "FAQ", "careers": "Kariera"},
    "pt": {"bonus": "Bônus", "visit_casino": "Visitar Cassino", "welcome": "Bem-vindo", "best_casinos": "Melhores Cassinos Online", "login": "Fazer login", "register": "Registre-se", "logout": "Logout", "home": "Início", "blog": "Blog", "guides": "Guias", "about": "Sobre", "contact": "Contato", "faq": "FAQ", "careers": "Carreiras"},
    "ro": {"bonus": "Bonus", "visit_casino": "Vizitați Casino", "welcome": "Bienvenue", "best_casinos": "Cele mai bune cazinouri online", "login": "Conectare", "register": "Înregistrare", "logout": "Deconectare", "home": "Acasă", "blog": "Blog", "guides": "Ghiduri", "about": "Despre", "contact": "Contact", "faq": "FAQ", "careers": "Cariere"},
    "ru": {"bonus": "Бонус", "visit_casino": "Посетить казино", "welcome": "Добро пожаловать", "best_casinos": "Лучшие онлайн казино", "login": "Вход", "register": "Регистрация", "logout": "Выход", "home": "Главная", "blog": "Блог", "guides": "Гайды", "about": "О сайте", "contact": "Контакт", "faq": "FAQ", "careers": "Карьера"},
    "sk": {"bonus": "Bonus", "visit_casino": "Navštívte Kasino", "welcome": "Vitajte", "best_casinos": "Najlepšie online kasína", "login": "Prihlásiť sa", "register": "Zaregistrujte sa", "logout": "Odhlásiť sa", "home": "Domov", "blog": "Blog", "guides": "Príručky", "about": "O nás", "contact": "Kontakt", "faq": "FAQ", "careers": "Kariéra"},
    "sl": {"bonus": "Bonus", "visit_casino": "Obiščite Casino", "welcome": "Dobrodošli", "best_casinos": "Najboljša spletna igralnica", "login": "Prijava", "register": "Registracija", "logout": "Odjava", "home": "Domov", "blog": "Blog", "guides": "Priročniki", "about": "O nas", "contact": "Stik", "faq": "Pogosta vprašanja", "careers": "Kariera"},
    "sr": {"bonus": "Бонус", "visit_casino": "Посетите казино", "welcome": "Добро дошли", "best_casinos": "Најбољи онлајн казини", "login": "Пријава", "register": "Регистрација", "logout": "Одјава", "home": "Почетна", "blog": "Блог", "guides": "Водичи", "about": "О нама", "contact": "Контакт", "faq": "FAQ", "careers": "Каријера"},
    "sv": {"bonus": "Bonus", "visit_casino": "Besök Casino", "welcome": "Välkommen", "best_casinos": "Bästa Online Casinon", "login": "Logga in", "register": "Registrera", "logout": "Logga ut", "home": "Hem", "blog": "Blogg", "guides": "Guider", "about": "Om", "contact": "Kontakt", "faq": "FAQ", "careers": "Karriär"},
    "th": {"bonus": "โบนัส", "visit_casino": "ชมคาสิโน", "welcome": "ยินดีต้อนรับ", "best_casinos": "คาสิโนออนไลน์ที่เลือด", "login": "เข้าสู่ระบบ", "register": "ลงทะเบียน", "logout": "ออกจากระบบ", "home": "หน้าแรก", "blog": "บล็อก", "guides": "คำแนะนำ", "about": "เกี่ยวกับ", "contact": "ติดต่อ", "faq": "FAQ", "careers": "อาชีพ"},
    "tr": {"bonus": "Bonus", "visit_casino": "Kasino Ziyaret Edin", "welcome": "Hoşgeldiniz", "best_casinos": "En İyi Çevrimiçi Kumarhaneler", "login": "Giriş Yap", "register": "Kaydol", "logout": "Çıkış Yap", "home": "Anasayfa", "blog": "Blog", "guides": "Rehberler", "about": "Hakkında", "contact": "İletişim", "faq": "FAQ", "careers": "Kariyer"},
    "uk": {"bonus": "Бонус", "visit_casino": "Відвідайте казино", "welcome": "Ласкаво просимо", "best_casinos": "Найкращі онлайн казино", "login": "Вхід", "register": "Реєстрація", "logout": "Вихід", "home": "Головна", "blog": "Блог", "guides": "Посібники", "about": "Про нас", "contact": "Контакт", "faq": "FAQ", "careers": "Кар'єра"},
    "ur": {"bonus": "بونس", "visit_casino": "کیسینو ملاحظہ کریں", "welcome": "خوش آمدید", "best_casinos": "بہترین آن لائن کیسینو", "login": "لاگ ان", "register": "رجسٹر کریں", "logout": "لاگ آؤٹ", "home": "گھر", "blog": "بلاگ", "guides": "گائیڈز", "about": "کے بارے میں", "contact": "رابطہ کریں", "faq": "FAQ", "careers": "کیریئر"},
    "vi": {"bonus": "Tiền thưởng", "visit_casino": "Truy cập Sòng bạc", "welcome": "Chào mừng", "best_casinos": "Các sòng bạc trực tuyến tốt nhất", "login": "Đăng nhập", "register": "Đăng ký", "logout": "Đăng xuất", "home": "Trang chủ", "blog": "Blog", "guides": "Hướng dẫn", "about": "Về chúng tôi", "contact": "Liên hệ", "faq": "FAQ", "careers": "Sự nghiệp"},
    "zh": {"bonus": "奖金", "visit_casino": "访问赌场", "welcome": "欢迎", "best_casinos": "最佳在线赌场", "login": "登录", "register": "注册", "logout": "登出", "home": "家", "blog": "博客", "guides": "指南", "about": "关于", "contact": "接触", "faq": "常见问题", "careers": "职业"},
}

print("🔥 COMPREHENSIVE TRANSLATION UPDATE FOR ALL 46 LANGUAGES\n")

total = 0
for lang, trans_dict in TRANSLATIONS.items():
    fpath = LOCALE_DIR / lang / "translation.json"
    
    if not fpath.exists():
        print(f"⏭️  {lang.upper()}: FILE NOT FOUND")
        continue
    
    with open(fpath, encoding="utf-8") as f:
        data = json.load(f)
    
    count = 0
    for key, translation in trans_dict.items():
        if key in data:
            data[key] = translation
            count += 1
    
    with open(fpath, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    total += count
    print(f"✅ {lang.upper():3s}: {count:2d} keys")

print(f"\n✨ TOTAL: {total} translations applied across all 46 languages!")

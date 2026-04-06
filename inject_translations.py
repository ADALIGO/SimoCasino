#!/usr/bin/env python3
import json
from pathlib import Path

LOCALE_DIR = Path("app/locales")

# Pre-built translation dictionary for major languages
MANUAL_TRANS = {
    "ar": {
        "bonus": "بونس", "visit_casino": "زيارة الكازينو", "welcome": "أهلا وسهلا",
        "best_casinos": "أفضل الكازينوهات على الانترنت", "login": "تسجيل الدخول",
        "register": "سجل", "logout": "تسجيل الخروج", "home": "الصفحة الرئيسية",
        "blog": "مدونة", "guides": "أدلة", "about": "حول", "contact": "اتصل",
        "play_responsibly": "اللعب بمسؤولية", "select_language": "اختر اللغة",
        "welcome_back": "أهلا وسهلا أنت عائد", "contact_us": "اتصل بنا"
    },
    "de": {
        "bonus": "Bonus", "visit_casino": "Casino besuchen", "welcome": "Willkommen",
        "best_casinos": "Beste Online-Casinos", "login": "Anmelden", "register": "Anmelden",
        "logout": "Abmelden", "home": "Startseite", "blog": "Blog", "guides": "Leitfäden",
        "about": "Über", "contact": "Kontakt", "play_responsibly": "Verantwortungsvoll spielen",
        "select_language": "Sprache auswählen", "welcome_back": "Willkommen zurück", "contact_us": "Kontaktieren Sie uns"
    },
    "es": {
        "bonus": "Bonificación", "visit_casino": "Visitar Casino", "welcome": "Bienvenida",
        "best_casinos": "Mejores Casinos en Línea", "login": "Iniciar sesión", "register": "Registrarse",
        "logout": "Cerrar sesión", "home": "Inicio", "blog": "Blog", "guides": "Guías",
        "about": "Acerca de", "contact": "Contacto", "play_responsibly": "Juega con responsabilidad",
        "select_language": "Seleccionar idioma", "welcome_back": "Bienvenido de nuevo", "contact_us": "Contáctenos"
    },
    "fr": {
        "bonus": "Bonus", "visit_casino": "Visiter le Casino", "welcome": "Bienvenue",
        "best_casinos": "Meilleurs Casinos en Ligne", "login": "Connexion", "register": "S'inscrire",
        "logout": "Déconnexion", "home": "Accueil", "blog": "Blog", "guides": "Guides",
        "about": "À propos", "contact": "Contact", "play_responsibly": "Jouez de façon responsable",
        "select_language": "Sélectionner la langue", "welcome_back": "Bienvenue", "contact_us": "Nous contacter"
    },
    "ja": {
        "bonus": "ボーナス", "visit_casino": "カジノを訪問", "welcome": "ようこそ",
        "best_casinos": "最高のオンラインカジノ", "login": "ログイン", "register": "登録",
        "logout": "ログアウト", "home": "ホーム", "blog": "ブログ", "guides": "ガイド",
        "about": "について", "contact": "接触", "play_responsibly": "責任を持ってプレイ",
        "select_language": "言語を選択", "welcome_back": "お帰りなさい", "contact_us": "お問い合わせ"
    },
    "zh": {
        "bonus": "奖金", "visit_casino": "访问赌场", "welcome": "欢迎",
        "best_casinos": "最佳在线赌场", "login": "登录", "register": "注册",
        "logout": "登出", "home": "家", "blog": "博客", "guides": "指南",
        "about": "关于", "contact": "接触", "play_responsibly": "负责任地玩",
        "select_language": "选择语言", "welcome_back": "欢迎回来", "contact_us": "联系我们"
    },
    "ru": {
        "bonus": "Бонус", "visit_casino": "Посетить казино", "welcome": "Добро пожаловать",
        "best_casinos": "Лучшие онлайн казино", "login": "Войти", "register": "Регистр",
        "logout": "Выход", "home": "Дома", "blog": "Блог", "guides": "Направляющие",
        "about": "О программе", "contact": "Контакт", "play_responsibly": "Играйте ответственно",
        "select_language": "Выбрать язык", "welcome_back": "Добро пожаловать обратно", "contact_us": "Свяжитесь с нами"
    },
}

print("📝 MANUAL TRANSLATION INJECTION\n")

for lang, trans_dict in MANUAL_TRANS.items():
    fpath = LOCALE_DIR / lang / "translation.json"
    
    with open(fpath, encoding="utf-8") as f:
        data = json.load(f)
    
    count = 0
    for key, translation in trans_dict.items():
        if key in data:
            data[key] = translation
            count += 1
    
    with open(fpath, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print(f"✅ {lang.upper()}: {count} keys updated")

print("\n✨ DONE!")

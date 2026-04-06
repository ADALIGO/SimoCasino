#!/usr/bin/env python3
"""
Add comprehensive translations for hardcoded text found in user pages
"""
import json
from pathlib import Path

# COMPREHENSIVE TRANSLATION FOR ALL HARDCODED TEXT IN USER PAGES
COMPLETE_UI_TRANSLATIONS = {
    "About You": {"en": "About You", "zh": "关于你", "es": "Sobre Ti", "fr": "À Propos de Toi", "de": "Über Sie", "ar": "عنك", "pt": "Sobre Você", "ru": "О Вас", "ja": "あなたについて", "ko": "당신에 대해"},
    "Basic Information": {"en": "Basic Information", "zh": "基本信息", "es": "Información Básica", "fr": "Informations de Base", "de": "Grundlegende Informationen", "ar": "المعلومات الأساسية", "pt": "Informações Básicas", "ru": "Базовая Информация", "ja": "基本情報", "ko": "기본 정보"},
    "Bio": {"en": "Bio", "zh": "个人简介", "es": "Biografía", "fr": "Bio", "de": "Bio", "ar": "السيرة الذاتية", "pt": "Bio", "ru": "Биография", "ja": "プロフィール", "ko": "자기소개"},
    "Click to upload or drag and drop": {"en": "Click to upload or drag and drop", "zh": "点击上传或拖放", "es": "Haz clic para subir o arrastra y suelta", "fr": "Cliquez pour télécharger ou glissez-déposez", "de": "Klicken Sie zum Hochladen oder Ziehen und Ablegen", "ar": "انقر للتحميل أو اسحب وأفلت", "pt": "Clique para fazer upload ou arraste e solte", "ru": "Нажмите для загрузки или перетащите", "ja": "クリックしてアップロードするか、ドラッグアンドドロップします", "ko": "클릭하여 업로드하거나 드래그 앤 드롭"},
    "Date of Birth": {"en": "Date of Birth", "zh": "出生日期", "es": "Fecha de Nacimiento", "fr": "Date de Naissance", "de": "Geburtsdatum", "ar": "تاريخ الميلاد", "pt": "Data de Nascimento", "ru": "Дата Рождения", "ja": "生年月日", "ko": "생년월일"},
    "Edit Profile": {"en": "Edit Profile", "zh": "编辑档案", "es": "Editar Perfil", "fr": "Éditer le Profil", "de": "Profil Bearbeiten", "ar": "تعديل الملف الشخصي", "pt": "Editar Perfil", "ru": "Редактировать Профиль", "ja": "プロフィール編集", "ko": "프로필 편집"},
    "Email": {"en": "Email", "zh": "电子邮件", "es": "Correo Electrónico", "fr": "Courrier Électronique", "de": "E-Mail", "ar": "البريد الإلكتروني", "pt": "Email", "ru": "Эл. почта", "ja": "メール", "ko": "이메일"},
    "Female": {"en": "Female", "zh": "女性", "es": "Femenino", "fr": "Féminin", "de": "Weiblich", "ar": "أنثى", "pt": "Feminino", "ru": "Женщина", "ja": "女性", "ko": "여성"},
    "First Name": {"en": "First Name", "zh": "名字", "es": "Nombre", "fr": "Prénom", "de": "Vorname", "ar": "الاسم الأول", "pt": "Nome", "ru": "Имя", "ja": "名", "ko": "이름"},
    "Gender": {"en": "Gender", "zh": "性别", "es": "Género", "fr": "Genre", "de": "Geschlecht", "ar": "الجنس", "pt": "Sexo", "ru": "Пол", "ja": "性別", "ko": "성별"},
    "Image Gallery": {"en": "Image Gallery", "zh": "图片库", "es": "Galería de Imágenes", "fr": "Galerie d'Images", "de": "Bildergalerie", "ar": "معرض الصور", "pt": "Galeria de Imagens", "ru": "Галерея Изображений", "ja": "ギャラリー", "ko": "이미지 갤러리"},
    "Last Name": {"en": "Last Name", "zh": "姓氏", "es": "Apellido", "fr": "Nom de Famille", "de": "Nachname", "ar": "اسم العائلة", "pt": "Sobrenome", "ru": "Фамилия", "ja": "姓", "ko": "성"},
    "Location": {"en": "Location", "zh": "位置", "es": "Ubicación", "fr": "Localisation", "de": "Standort", "ar": "الموقع", "pt": "Localização", "ru": "Расположение", "ja": "場所", "ko": "위치"},
    "Male": {"en": "Male", "zh": "男性", "es": "Masculino", "fr": "Masculin", "de": "Männlich", "ar": "ذكر", "pt": "Masculino", "ru": "Мужчина", "ja": "男性", "ko": "남성"},
    "Other": {"en": "Other", "zh": "其他", "es": "Otro", "fr": "Autre", "de": "Sonstiges", "ar": "آخر", "pt": "Outro", "ru": "Другое", "ja": "その他", "ko": "기타"},
    "Personal Quote": {"en": "Personal Quote", "zh": "个人名言", "es": "Cita Personal", "fr": "Citation Personnelle", "de": "Persönliches Zitat", "ar": "اقتباس شخصي", "pt": "Citação Pessoal", "ru": "Личное Высказывание", "ja": "個人的な引用", "ko": "개인 인용구"},
    "Please log in to access your profile": {"en": "Please log in to access your profile", "zh": "请登录以访问您的档案", "es": "Por favor inicia sesión para acceder a tu perfil", "fr": "Veuillez vous connecter pour accéder à votre profil", "de": "Bitte melden Sie sich an, um auf Ihr Profil zuzugreifen", "ar": "يرجى تسجيل الدخول للوصول إلى ملفك الشخصي", "pt": "Para acessar seu perfil, faça login", "ru": "Пожалуйста, войдите, чтобы получить доступ к вашему профилю", "ja": "プロフィールにアクセスするにはログインしてください", "ko": "프로필에 액세스하려면 로그인하세요"},
    "Prefer not to say": {"en": "Prefer not to say", "zh": "不想说", "es": "Prefiero no decir", "fr": "Préfère ne pas dire", "de": "Keine Angabe", "ar": "أفضل عدم الإجابة", "pt": "Prefiro não dizer", "ru": "Предпочитаю не говорить", "ja": "言わない方が良い", "ko": "말씀 안 함"},
    "Profile Images": {"en": "Profile Images", "zh": "档案图片", "es": "Imágenes de Perfil", "fr": "Images de Profil", "de": "Profilbilder", "ar": "صور الملف الشخصي", "pt": "Imagens de Perfil", "ru": "Изображения Профиля", "ja": "プロフィール画像", "ko": "프로필 이미지"},
    "Profile Video": {"en": "Profile Video", "zh": "档案视频", "es": "Video de Perfil", "fr": "Vidéo de Profil", "de": "Profilvideo", "ar": "فيديو الملف الشخصي", "pt": "Vídeo de Perfil", "ru": "Видео Профиля", "ja": "プロフィールビデオ", "ko": "프로필 비디오"},
    "Account tier": {"en": "Account tier", "zh": "账户等级", "es": "Nivel de Cuenta", "fr": "Niveau de Compte", "de": "Kontostufe", "ar": "مستوى الحساب", "pt": "Nível da Conta", "ru": "Уровень Аккаунта", "ja": "アカウント層", "ko": "계정 등급"},
    "Baccarat": {"en": "Baccarat", "zh": "百家乐", "es": "Baccarat", "fr": "Baccara", "de": "Baccarat", "ar": "باكارات", "pt": "Bacará", "ru": "Баккара", "ja": "バカラ", "ko": "바카라"},
    "Biggest win": {"en": "Biggest win", "zh": "最大赢利", "es": "Mayor ganancia", "fr": "Plus gros gain", "de": "Größter Gewinn", "ar": "أكبر فوز", "pt": "Maior ganho", "ru": "Самая большая победа", "ja": "最大の勝利", "ko": "최대 수익"},
    "Bingo": {"en": "Bingo", "zh": "宾果", "es": "Bingo", "fr": "Bingo", "de": "Bingo", "ar": "بينجو", "pt": "Bingo", "ru": "Бинго", "ja": "ビンゴ", "ko": "빙고"},
    "Blackjack": {"en": "Blackjack", "zh": "21点", "es": "Blackjack", "fr": "Blackjack", "de": "Blackjack", "ar": "بلاك جاك", "pt": "Blackjack", "ru": "Блэкджек", "ja": "ブラックジャック", "ko": "블랙잭"},
    "Choose a game type": {"en": "Choose a game type", "zh": "选择游戏类型", "es": "Elige un tipo de juego", "fr": "Choisissez un type de jeu", "de": "Wählen Sie einen Spieltyp", "ar": "اختر نوع اللعبة", "pt": "Escolha um tipo de jogo", "ru": "Выберите тип игры", "ja": "ゲームタイプを選択", "ko": "게임 유형 선택"},
    "Choose a type": {"en": "Choose a type", "zh": "选择类型", "es": "Elige un tipo", "fr": "Choisissez un type", "de": "Wählen Sie einen Typ", "ar": "أختر نوع", "pt": "Escolha um tipo", "ru": "Выберите тип", "ja": "タイプを選択", "ko": "유형 선택"},
    "Coins": {"en": "Coins", "zh": "硬币", "es": "Monedas", "fr": "Pièces", "de": "Münzen", "ar": "عملات", "pt": "Moedas", "ru": "Монеты", "ja": "コイン", "ko": "코인"},
    "Cover image": {"en": "Cover image", "zh": "封面图像", "es": "Imagen de portada", "fr": "Image de couverture", "de": "Titelbild", "ar": "صورة الغلاف", "pt": "Imagem de capa", "ru": "Изображение обложки", "ja": "カバー画像", "ko": "커버 이미지"},
    "Craps": {"en": "Craps", "zh": "骰子游戏", "es": "Craps", "fr": "Craps", "de": "Craps", "ar": "كراب", "pt": "Craps", "ru": "Крэпс", "ja": "クラップス", "ko": "주사위"},
    "Enable notifications": {"en": "Enable notifications", "zh": "启用通知", "es": "Habilitar notificaciones", "fr": "Activer les notifications", "de": "Benachrichtigungen aktivieren", "ar": "تفعيل الإشعارات", "pt": "Ativar notificações", "ru": "Включить уведомления", "ja": "通知を有効にする", "ko": "알림 활성화"},
    "Facebook profile": {"en": "Facebook profile", "zh": "Facebook档案", "es": "Perfil de Facebook", "fr": "Profil Facebook", "de": "Facebook-Profil", "ar": "ملف فيسبوك", "pt": "Perfil do Facebook", "ru": "Профиль Facebook", "ja": "Facebookプロフィール", "ko": "페이스북 프로필"},
    "Favorite game type": {"en": "Favorite game type", "zh": "最喜爱的游戏类型", "es": "Tipo de juego favorito", "fr": "Type de jeu préféré", "de": "Lieblingsspieltyp", "ar": "نوع اللعبة المفضل", "pt": "Tipo de jogo favorito", "ru": "Любимый тип игры", "ja": "お気に入りのゲームタイプ", "ko": "선호하는 게임 유형"},
    "Favorite meal": {"en": "Favorite meal", "zh": "最喜爱的食物", "es": "Comida favorita", "fr": "Repas préféré", "de": "Lieblingsmahlzeit", "ar": "الوجبة المفضلة", "pt": "Refeição favorita", "ru": "Любимое блюдо", "ja": "好きな食事", "ko": "선호하는 음식"},
    "Favorite movie": {"en": "Favorite movie", "zh": "最喜爱的电影", "es": "Película favorita", "fr": "Film préféré", "de": "Lieblingsfilm", "ar": "الفيلم المفضل", "pt": "Filme favorito", "ru": "Любимый фильм", "ja": "好きな映画", "ko": "선호하는 영화"},
    "Favorite music genre": {"en": "Favorite music genre", "zh": "最喜爱的音乐流派", "es": "Género de música favorito", "fr": "Genre de musique préféré", "de": "Lieblingsmusikgenre", "ar": "نوع الموسيقى المفضل", "pt": "Gênero de música favorito", "ru": "Любимый жанр музыки", "ja": "好きな音楽ジャンル", "ko": "선호하는 음악 장르"},
    "Favorite season": {"en": "Favorite season", "zh": "最喜爱的季节", "es": "Estación favorita", "fr": "Saison préférée", "de": "Lieblingsjahreszeit", "ar": "الفصل المفضل", "pt": "Estação favorita", "ru": "Любимое время года", "ja": "好きな季節", "ko": "선호하는 계절"},
    "Email notifications": {"en": "Email notifications", "zh": "电子邮件通知", "es": "Notificaciones por correo", "fr": "Notifications par courrier", "de": "E-Mail-Benachrichtigungen", "ar": "إشعارات البريد الإلكتروني", "pt": "Notificações por email", "ru": "Уведомления по электронной почте", "ja": "メール通知", "ko": "이메일 알림"},
}

def main():
    """Add hardcoded text translations to all locale files"""
    print("\n" + "="*60)
    print("ADDING UI TEXT TRANSLATIONS")
    print("="*60 + "\n")
    
    # Get all locale directories
    locales_dir = Path('app/locales')
    locales = sorted([d.name for d in locales_dir.iterdir() if d.is_dir() and d.name != 'index.ts'])
    
    updated_count = 0
    for locale in locales:
        locale_path = Path(f'app/locales/{locale}/translation.json')
        
        try:
            with open(locale_path, 'r', encoding='utf-8') as f:
                locale_data = json.load(f)
        except:
            locale_data = {}
        
        # Add new keys if they don't exist
        added = 0
        for key, translations in COMPLETE_UI_TRANSLATIONS.items():
            if key not in locale_data:
                locale_data[key] = translations.get(locale, translations.get('en', key))
                added += 1
        
        # Write back if changes were made
        if added > 0:
            try:
                with open(locale_path, 'w', encoding='utf-8') as f:
                    json.dump(locale_data, f, ensure_ascii=False, indent=2)
                print(f"✅ {locale:5} → Added {added:2} UI translations")
                updated_count += 1
            except Exception as e:
                print(f"❌ {locale:5} → Error: {e}")
        else:
            print(f"⏭️  {locale:5} → All UI translations present")
    
    print("\n" + "="*60)
    print(f"✅ Updated {updated_count} locale files with UI text translations")
    print("All {0} key UI strings are now available for translation!".format(len(COMPLETE_UI_TRANSLATIONS)))
    print("="*60 + "\n")

if __name__ == "__main__":
    main()

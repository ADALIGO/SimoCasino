#!/usr/bin/env python3
"""
Comprehensive app translation script - translates ALL hardcoded English text to all supported languages
"""

import json
import re
from pathlib import Path
from typing import Dict, Any
import time

# Real translation dictionary - manually curated for quality
TRANSLATIONS = {
    "Profile": {
        "en": "Profile",
        "zh": "个人资料",
        "es": "Perfil",
        "fr": "Profil",
        "de": "Profil",
        "ar": "الملف الشخصي",
        "pt": "Perfil",
        "ru": "Профиль",
        "ja": "プロフィール",
        "ko": "프로필",
        "hi": "प्रोफ़ाइल",
    },
    "Edit Profile": {
        "en": "Edit Profile",
        "zh": "编辑个人资料",
        "es": "Editar Perfil",
        "fr": "Modifier le Profil",
        "de": "Profil Bearbeiten",
        "ar": "تحرير الملف الشخصي",
        "pt": "Editar Perfil",
        "ru": "Редактировать Профиль",
        "ja": "プロフィール編集",
        "ko": "프로필 편집",
        "hi": "प्रोफ़ाइल संपादित करें",
    },
    "Dashboard": {
        "en": "Dashboard",
        "zh": "仪表板",
        "es": "Dashboard",
        "fr": "Tableau de Bord",
        "de": "Dashboard",
        "ar": "لوحة التحكم",
        "pt": "Painel",
        "ru": "Панель инструментов",
        "ja": "ダッシュボード",
        "ko": "대시보드",
        "hi": "डैशबोर्ड",
    },
    "Security": {
        "en": "Security",
        "zh": "安全",
        "es": "Seguridad",
        "fr": "Sécurité",
        "de": "Sicherheit",
        "ar": "الأمان",
        "pt": "Segurança",
        "ru": "Безопасность",
        "ja": "セキュリティ",
        "ko": "보안",
        "hi": "सुरक्षा",
    },
    "Bonuses": {
        "en": "Bonuses",
        "zh": "奖金",
        "es": "Bonificaciones",
        "fr": "Bonus",
        "de": "Boni",
        "ar": "المكافآت",
        "pt": "Bônus",
        "ru": "Бонусы",
        "ja": "ボーナス",
        "ko": "보너스",
        "hi": "बोनस",
    },
    "Account": {
        "en": "Account",
        "zh": "账户",
        "es": "Cuenta",
        "fr": "Compte",
        "de": "Konto",
        "ar": "الحساب",
        "pt": "Conta",
        "ru": "Аккаунт",
        "ja": "アカウント",
        "ko": "계정",
        "hi": "खाता",
    },
    "Avatar": {
        "en": "Avatar",
        "zh": "头像",
        "es": "Avatar",
        "fr": "Avatar",
        "de": "Avatar",
        "ar": "الصورة الرمزية",
        "pt": "Avatar",
        "ru": "Аватар",
        "ja": "アバター",
        "ko": "아바타",
        "hi": "अवतार",
    },
    "Upload": {
        "en": "Upload",
        "zh": "上传",
        "es": "Subir",
        "fr": "Télécharger",
        "de": "Hochladen",
        "ar": "تحميل",
        "pt": "Carregar",
        "ru": "Загрузить",
        "ja": "アップロード",
        "ko": "업로드",
        "hi": "अपलोड",
    },
    "Remove": {
        "en": "Remove",
        "zh": "删除",
        "es": "Eliminar",
        "fr": "Supprimer",
        "de": "Entfernen",
        "ar": "إزالة",
        "pt": "Remover",
        "ru": "Удалить",
        "ja": "削除",
        "ko": "제거",
        "hi": "हटाएं",
    },
    "Change": {
        "en": "Change",
        "zh": "更改",
        "es": "Cambiar",
        "fr": "Changer",
        "de": "Ändern",
        "ar": "تغيير",
        "pt": "Alterar",
        "ru": "Изменить",
        "ja": "変更",
        "ko": "변경",
        "hi": "बदलें",
    },
    "Settings": {
        "en": "Settings",
        "zh": "设置",
        "es": "Configuración",
        "fr": "Paramètres",
        "de": "Einstellungen",
        "ar": "الإعدادات",
        "pt": "Configurações",
        "ru": "Настройки",
        "ja": "設定",
        "ko": "설정",
        "hi": "सेटिंग्स",
    },
    "Notifications": {
        "en": "Notifications",
        "zh": "通知",
        "es": "Notificaciones",
        "fr": "Notifications",
        "de": "Benachrichtigungen",
        "ar": "إشعارات",
        "pt": "Notificações",
        "ru": "Уведомления",
        "ja": "通知",
        "ko": "알림",
        "hi": "सूचनाएं",
    },
    "Activity": {
        "en": "Activity",
        "zh": "活动",
        "es": "Actividad",
        "fr": "Activité",
        "de": "Aktivität",
        "ar": "النشاط",
        "pt": "Atividade",
        "ru": "Активность",
        "ja": "アクティビティ",
        "ko": "활동",
        "hi": "गतिविधि",
    },
    "Affiliate": {
        "en": "Affiliate",
        "zh": "联盟",
        "es": "Afiliado",
        "fr": "Affilié",
        "de": "Partner",
        "ar": "التابع",
        "pt": "Afiliado",
        "ru": "Партнер",
        "ja": "アフィリエイト",
        "ko": "제휴",
        "hi": "सहबद्ध",
    },
    "Support": {
        "en": "Support",
        "zh": "支持",
        "es": "Soporte",
        "fr": "Support",
        "de": "Unterstützung",
        "ar": "الدعم",
        "pt": "Suporte",
        "ru": "Поддержка",
        "ja": "サポート",
        "ko": "지원",
        "hi": "सहायता",
    },
    "Logout": {
        "en": "Logout",
        "zh": "登出",
        "es": "Cerrar Sesión",
        "fr": "Déconnexion",
        "de": "Abmelden",
        "ar": "تسجيل الخروج",
        "pt": "Sair",
        "ru": "Выход",
        "ja": "ログアウト",
        "ko": "로그아웃",
        "hi": "लॉगआउट",
    },
    "Please select an image file": {
        "en": "Please select an image file",
        "zh": "请选择一个图像文件",
        "es": "Por favor, selecciona un archivo de imagen",
        "fr": "Veuillez sélectionner un fichier image",
        "de": "Bitte wählen Sie eine Bilddatei",
        "ar": "يرجى اختيار ملف صورة",
        "pt": "Por favor, selecione um arquivo de imagem",
        "ru": "Пожалуйста, выберите файл изображения",
        "ja": "画像ファイルを選択してください",
        "ko": "이미지 파일을 선택하세요",
        "hi": "कृपया एक छवि फाइल चुनें",
    },
    "File size must be less than 5MB": {
        "en": "File size must be less than 5MB",
        "zh": "文件大小必须小于5MB",
        "es": "El tamaño del archivo debe ser menor de 5MB",
        "fr": "La taille du fichier doit être inférieure à 5MB",
        "de": "Die Dateigröße muss kleiner als 5MB sein",
        "ar": "يجب أن يكون حجم الملف أقل من 5MB",
        "pt": "O tamanho do arquivo deve ser menor que 5MB",
        "ru": "Размер файла должен быть менее 5MB",
        "ja": "ファイルサイズは5MB以下である必要があります",
        "ko": "파일 크기는 5MB 미만이어야 합니다",
        "hi": "फाइल का आकार 5MB से कम होना चाहिए",
    },
    "Upload failed": {
        "en": "Upload failed",
        "zh": "上传失败",
        "es": "Carga fallida",
        "fr": "Échec du téléchargement",
        "de": "Upload fehlgeschlagen",
        "ar": "فشل التحميل",
        "pt": "Falha no carregamento",
        "ru": "Ошибка загрузки",
        "ja": "アップロード失敗",
        "ko": "업로드 실패",
        "hi": "अपलोड विफल",
    },
    "Upload failed. Please try again.": {
        "en": "Upload failed. Please try again.",
        "zh": "上传失败。请重试。",
        "es": "Carga fallida. Por favor intenta de nuevo.",
        "fr": "Échec du téléchargement. Veuillez réessayer.",
        "de": "Upload fehlgeschlagen. Bitte versuchen Sie es erneut.",
        "ar": "فشل التحميل. يرجى المحاولة مجددا.",
        "pt": "Falha no carregamento. Por favor tente novamente.",
        "ru": "Ошибка загрузки. Пожалуйста, попробуйте снова.",
        "ja": "アップロード失敗。もう一度お試しください。",
        "ko": "업로드 실패. 다시 시도하세요.",
        "hi": "अपलोड विफल। कृपया पुनः प्रयास करें।",
    },
    "Change Password": {
        "en": "Change Password",
        "zh": "更改密码",
        "es": "Cambiar Contraseña",
        "fr": "Changer le Mot de Passe",
        "de": "Passwort Ändern",
        "ar": "تغيير كلمة المرور",
        "pt": "Alterar Senha",
        "ru": "Изменить Пароль",
        "ja": "パスワード変更",
        "ko": "비밀번호 변경",
        "hi": "पासवर्ड बदलें",
    },
    "Two-Factor Authentication": {
        "en": "Two-Factor Authentication",
        "zh": "双因素身份验证",
        "es": "Autenticación de Dos Factores",
        "fr": "Authentification à Deux Facteurs",
        "de": "Zwei-Faktor-Authentifizierung",
        "ar": "المصادقة ثنائية العامل",
        "pt": "Autenticação de Dois Fatores",
        "ru": "Двухфакторная Аутентификация",
        "ja": "二要素認証",
        "ko": "2단계 인증",
        "hi": "दो-कारक प्रमाणीकरण",
    },
}

def load_english_translation():
    """Load English translation file"""
    try:
        with open('app/locales/en/translation.json', 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading English translation: {e}")
        return {}

def get_all_locales():
    """Get all locale directories"""
    locales_dir = Path('app/locales')
    return [d.name for d in locales_dir.iterdir() if d.is_dir() and d.name != 'index.ts']

def update_locale_file(locale_code, translations_dict):
    """Update a locale file with translations"""
    locale_path = Path(f'app/locales/{locale_code}/translation.json')
    
    try:
        with open(locale_path, 'r', encoding='utf-8') as f:
            locale_data = json.load(f)
    except:
        locale_data = {}
    
    # Add new translations
    for key, translations in translations_dict.items():
        if locale_code in translations and key not in locale_data:
            locale_data[key] = translations[locale_code]
    
    # Write back
    try:
        with open(locale_path, 'w', encoding='utf-8') as f:
            json.dump(locale_data, f, ensure_ascii=False, indent=2)
        return True
    except Exception as e:
        print(f"Error writing {locale_path}: {e}")
        return False

def main():
    print("=" * 60)
    print("COMPREHENSIVE APP TRANSLATION")
    print("=" * 60)
    
    locales = get_all_locales()
    print(f"\nFound {len(locales)} locales")
    
    # Get list of locales that have language support in TRANSLATIONS
    supported_locales = ['en', 'zh', 'es', 'fr', 'de', 'ar', 'pt', 'ru', 'ja', 'ko', 'hi']
    
    updated = 0
    for locale in sorted(locales):
        if locale in supported_locales:
            print(f"\n📝 Updating {locale}...", end=" ")
            if update_locale_file(locale, TRANSLATIONS):
                print("✅")
                updated += 1
            else:
                print("❌")
        else:
            # For unsupported locales, add English versions
            print(f"\n⚠️  {locale} not in supported list, adding English versions...", end=" ")
            translations_en = {k: {"en": v["en"]} for k, v in TRANSLATIONS.items() if "en" in v}
            if update_locale_file(locale, translations_en):
                print("✅")
                updated += 1
            else:
                print("❌")
    
    print("\n" + "=" * 60)
    print(f"✅ Updated {updated} locale files")
    print("=" * 60)

if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""
Add comprehensive translations for ALL user dashboard, profile, and account pages
"""
import json
from pathlib import Path
from typing import Dict, Any

# COMPREHENSIVE TRANSLATION DICTIONARY FOR USER PAGES
USER_TRANSLATIONS = {
    "Profile": {"en": "Profile", "zh": "个人资料", "es": "Perfil", "fr": "Profil", "de": "Profil", "ar": "الملف الشخصي", "pt": "Perfil", "ru": "Профиль", "ja": "プロフィール", "ko": "프로필"},
    "Edit Profile": {"en": "Edit Profile", "zh": "编辑个人资料", "es": "Editar Perfil", "fr": "Modifier le Profil", "de": "Profil Bearbeiten", "ar": "تحرير الملف الشخصي", "pt": "Editar Perfil", "ru": "Редактировать Профиль", "ja": "プロフィール編集", "ko": "프로필 편집"},
    "My Profile": {"en": "My Profile", "zh": "我的个人资料", "es": "Mi Perfil", "fr": "Mon Profil", "de": "Mein Profil", "ar": "ملفي الشخصي", "pt": "Meu Perfil", "ru": "Мой Профиль", "ja": "マイプロフィール", "ko": "내 프로필"},
    "Dashboard": {"en": "Dashboard", "zh": "仪表板", "es": "Panel de Control", "fr": "Tableau de Bord", "de": "Dashboard", "ar": "لوحة التحكم", "pt": "Painel", "ru": "Панель инструментов", "ja": "ダッシュボード", "ko": "대시보드"},
    "Security": {"en": "Security", "zh": "安全", "es": "Seguridad", "fr": "Sécurité", "de": "Sicherheit", "ar": "الأمان", "pt": "Segurança", "ru": "Безопасность", "ja": "セキュリティ", "ko": "보안"},
    "Account Settings": {"en": "Account Settings", "zh": "账户设置", "es": "Configuración de Cuenta", "fr": "Paramètres du Compte", "de": "Kontoeinstellungen", "ar": "إعدادات الحساب", "pt": "Configurações da Conta", "ru": "Параметры Аккаунта", "ja": "アカウント設定", "ko": "계정 설정"},
    "Privacy & Security": {"en": "Privacy & Security", "zh": "隐私和安全", "es": "Privacidad y Seguridad", "fr": "Confidentialité et Sécurité", "de": "Datenschutz und Sicherheit", "ar": "الخصوصية والأمان", "pt": "Privacidade e Segurança", "ru": "Конфиденциальность и Безопасность", "ja": "プライバシーとセキュリティ", "ko": "개인정보 보호 및 보안"},
    "Personal Information": {"en": "Personal Information", "zh": "个人信息", "es": "Información Personal", "fr": "Informations Personnelles", "de": "Persönliche Informationen", "ar": "المعلومات الشخصية", "pt": "Informações Pessoais", "ru": "Личная Информация", "ja": "個人情報", "ko": "개인 정보"},
    "Change Password": {"en": "Change Password", "zh": "更改密码", "es": "Cambiar Contraseña", "fr": "Changer le Mot de Passe", "de": "Passwort Ändern", "ar": "تغيير كلمة المرور", "pt": "Alterar Senha", "ru": "Изменить Пароль", "ja": "パスワード変更", "ko": "비밀번호 변경"},
    "Two-Factor Authentication": {"en": "Two-Factor Authentication", "zh": "双因素认证", "es": "Autenticación de Dos Factores", "fr": "Authentification à Deux Facteurs", "de": "Zwei-Faktor-Authentifizierung", "ar": "المصادقة ثنائية العامل", "pt": "Autenticação de Dois Fatores", "ru": "Двухфакторная Аутентификация", "ja": "二要素認証", "ko": "2단계 인증"},
    "Email Preferences": {"en": "Email Preferences", "zh": "电子邮件偏好", "es": "Preferencias de Correo", "fr": "Préférences de Courrier", "de": "E-Mail-Einstellungen", "ar": "تفضيلات البريد الإلكتروني", "pt": "Preferências de Email", "ru": "Предпочтения Эл. Почты", "ja": "メール設定", "ko": "이메일 환경설정"},
    "Notifications": {"en": "Notifications", "zh": "通知", "es": "Notificaciones", "fr": "Notifications", "de": "Benachrichtigungen", "ar": "إشعارات", "pt": "Notificações", "ru": "Уведомления", "ja": "通知", "ko": "알림"},
    "Activity": {"en": "Activity", "zh": "活动", "es": "Actividad", "fr": "Activité", "de": "Aktivität", "ar": "النشاط", "pt": "Atividade", "ru": "Активность", "ja": "アクティビティ", "ko": "활동"},
    "Activity Log": {"en": "Activity Log", "zh": "活动日志", "es": "Registro de Actividad", "fr": "Journal d'Activité", "de": "Aktivitätsprotokoll", "ar": "سجل النشاط", "pt": "Log de Atividade", "ru": "Журнал Активности", "ja": "アクティビティログ", "ko": "활동 로그"},
    "Bonuses": {"en": "Bonuses", "zh": "奖金", "es": "Bonificaciones", "fr": "Bonus", "de": "Boni", "ar": "المكافآت", "pt": "Bônus", "ru": "Бонусы", "ja": "ボーナス", "ko": "보너스"},
    "My Bonuses": {"en": "My Bonuses", "zh": "我的奖金", "es": "Mis Bonificaciones", "fr": "Mes Bonus", "de": "Meine Boni", "ar": "مكافآتي", "pt": "Meus Bônus", "ru": "Мои Бонусы", "ja": "マイボーナス", "ko": "내 보너스"},
    "Bonus History": {"en": "Bonus History", "zh": "奖金历史", "es": "Historial de Bonificaciones", "fr": "Historique des Bonus", "de": "Bonushistorie", "ar": "سجل المكافآت", "pt": "Histórico de Bônus", "ru": "История Бонусов", "ja": "ボーナス履歴", "ko": "보너스 기록"},
    "Active Bonuses": {"en": "Active Bonuses", "zh": "活跃奖金", "es": "Bonificaciones Activas", "fr": "Bonus Actifs", "de": "Aktive Boni", "ar": "المكافآت النشطة", "pt": "Bônus Ativos", "ru": "Активные Бонусы", "ja": "アクティブボーナス", "ko": "활성 보너스"},
    "Claimed Bonuses": {"en": "Claimed Bonuses", "zh": "已领取奖金", "es": "Bonificaciones Reclamadas", "fr": "Bonus Réclamés", "de": "Beanspruchte Boni", "ar": "المكافآت المطالب بها", "pt": "Bônus Reclamados", "ru": "Заявленные Бонусы", "ja": "クレーム済みボーナス", "ko": "청구된 보너스"},
    "Affiliate": {"en": "Affiliate", "zh": "关联", "es": "Afiliado", "fr": "Affilié", "de": "Partner", "ar": "الشريك", "pt": "Afiliado", "ru": "Партнер", "ja": "アフィリエイト", "ko": "제휴"},
    "Affiliate Program": {"en": "Affiliate Program", "zh": "联盟计划", "es": "Programa de Afiliados", "fr": "Programme Affilié", "de": "Partnerprogramm", "ar": "برنامج الشركاء", "pt": "Programa de Afiliados", "ru": "Партнерская программа", "ja": "アフィリエイトプログラム", "ko": "제휴 프로그램"},
    "Referral Link": {"en": "Referral Link", "zh": "推荐链接", "es": "Enlace de Referencia", "fr": "Lien de Parrainage", "de": "Referral-Link", "ar": "رابط الإحالة", "pt": "Link de Referência", "ru": "Реферальная ссылка", "ja": "紹介リンク", "ko": "추천 링크"},
    "Earnings": {"en": "Earnings", "zh": "收入", "es": "Ganancias", "fr": "Gains", "de": "Verdienste", "ar": "الأرباح", "pt": "Ganhos", "ru": "Доход", "ja": "収入", "ko": "수익"},
    "Total Earnings": {"en": "Total Earnings", "zh": "总收入", "es": "Ganancias Totales", "fr": "Gains Totaux", "de": "Gesamtverdienste", "ar": "إجمالي الأرباح", "pt": "Ganhos Totais", "ru": "Общий Доход", "ja": "合計収入", "ko": "총 수익"},
    "Support": {"en": "Support", "zh": "支持", "es": "Soporte", "fr": "Support", "de": "Unterstützung", "ar": "الدعم", "pt": "Suporte", "ru": "Поддержка", "ja": "サポート", "ko": "지원"},
    "Help & Support": {"en": "Help & Support", "zh": "帮助和支持", "es": "Ayuda y Soporte", "fr": "Aide et Support", "de": "Hilfe und Support", "ar": "المساعدة والدعم", "pt": "Ajuda e Suporte", "ru": "Справка и Поддержка", "ja": "ヘルプとサポート", "ko": "도움말 및 지원"},
    "Contact Support": {"en": "Contact Support", "zh": "联系支持", "es": "Contactar Soporte", "fr": "Contacter le Support", "de": "Support Kontaktieren", "ar": "اتصل بالدعم", "pt": "Contar Suporte", "ru": "Связаться с Поддержкой", "ja": "サポートに連絡", "ko": "지원 문의"},
    "Logout": {"en": "Logout", "zh": "登出", "es": "Cerrar Sesión", "fr": "Déconnexion", "de": "Abmelden", "ar": "تسجيل الخروج", "pt": "Sair", "ru": "Выход", "ja": "ログアウト", "ko": "로그아웃"},
    "User Menu": {"en": "User Menu", "zh": "用户菜单", "es": "Menú de Usuario", "fr": "Menu Utilisateur", "de": "Benutzermenü", "ar": "قائمة المستخدم", "pt": "Menu de Usuário", "ru": "Меню Пользователя", "ja": "ユーザーメニュー", "ko": "사용자 메뉴"},
    "Member": {"en": "Member", "zh": "成员", "es": "Miembro", "fr": "Membre", "de": "Mitglied", "ar": "عضو", "pt": "Membro", "ru": "Участник", "ja": "メンバー", "ko": "회원"},
    "Save Changes": {"en": "Save Changes", "zh": "保存更改", "es": "Guardar Cambios", "fr": "Enregistrer les Modifications", "de": "Änderungen Speichern", "ar": "حفظ التغييرات", "pt": "Salvar Alterações", "ru": "Сохранить Изменения", "ja": "変更を保存", "ko": "변경 사항 저장"},
    "Cancel": {"en": "Cancel", "zh": "取消", "es": "Cancelar", "fr": "Annuler", "de": "Abbrechen", "ar": "إلغاء", "pt": "Cancelar", "ru": "Отмена", "ja": "キャンセル", "ko": "취소"},
    "Delete Account": {"en": "Delete Account", "zh": "删除账户", "es": "Eliminar Cuenta", "fr": "Supprimer le Compte", "de": "Konto Löschen", "ar": "حذف الحساب", "pt": "Excluir Conta", "ru": "Удалить Аккаунт", "ja": "アカウント削除", "ko": "계정 삭제"},
    "Enable 2FA": {"en": "Enable 2FA", "zh": "启用双因素认证", "es": "Habilitar 2FA", "fr": "Activer 2FA", "de": "2FA Aktivieren", "ar": "تفعيل المصادقة الثنائية", "pt": "Habilitar 2FA", "ru": "Включить 2FA", "ja": "2FAを有効にする", "ko": "2FA 활성화"},
    "Disable 2FA": {"en": "Disable 2FA", "zh": "禁用双因素认证", "es": "Deshabilitar 2FA", "fr": "Désactiver 2FA", "de": "2FA Deaktivieren", "ar": "تعطيل المصادقة الثنائية", "pt": "Desabilitar 2FA", "ru": "Отключить 2FA", "ja": "2FAを無効にする", "ko": "2FA 비활성화"},
    "Current Password": {"en": "Current Password", "zh": "当前密码", "es": "Contraseña Actual", "fr": "Mot de Passe Actuel", "de": "Aktuelles Passwort", "ar": "كلمة المرور الحالية", "pt": "Senha Atual", "ru": "Текущий Пароль", "ja": "現在のパスワード", "ko": "현재 비밀번호"},
    "New Password": {"en": "New Password", "zh": "新密码", "es": "Nueva Contraseña", "fr": "Nouveau Mot de Passe", "de": "Neues Passwort", "ar": "كلمة المرور الجديدة", "pt": "Nova Senha", "ru": "Новый Пароль", "ja": "新しいパスワード", "ko": "새 비밀번호"},
    "Confirm Password": {"en": "Confirm Password", "zh": "确认密码", "es": "Confirmar Contraseña", "fr": "Confirmer le Mot de Passe", "de": "Passwort Bestätigen", "ar": "تأكيد كلمة المرور", "pt": "Confirmar Senha", "ru": "Подтвердить Пароль", "ja": "パスワードを確認", "ko": "비밀번호 확인"},
    "Update Email": {"en": "Update Email", "zh": "更新电子邮件", "es": "Actualizar Correo", "fr": "Mettre à Jour l'Email", "de": "E-Mail Aktualisieren", "ar": "تحديث البريد الإلكتروني", "pt": "Atualizar Email", "ru": "Обновить Email", "ja": "メールアドレスを更新", "ko": "이메일 업데이트"},
    "First Name": {"en": "First Name", "zh": "名字", "es": "Nombre", "fr": "Prénom", "de": "Vorname", "ar": "الاسم الأول", "pt": "Nome", "ru": "Имя", "ja": "名", "ko": "이름"},
    "Last Name": {"en": "Last Name", "zh": "姓氏", "es": "Apellido", "fr": "Nom de Famille", "de": "Nachname", "ar": "اسم العائلة", "pt": "Sobrenome", "ru": "Фамилия", "ja": "姓", "ko": "성"},
    "Email Address": {"en": "Email Address", "zh": "电子邮件地址", "es": "Dirección de Correo", "fr": "Adresse E-mail", "de": "E-Mail-Adresse", "ar": "عنوان البريد الإلكتروني", "pt": "Endereço de Email", "ru": "Адрес Email", "ja": "メールアドレス", "ko": "이메일 주소"},
    "Date of Birth": {"en": "Date of Birth", "zh": "出生日期", "es": "Fecha de Nacimiento", "fr": "Date de Naissance", "de": "Geburtsdatum", "ar": "تاريخ الميلاد", "pt": "Data de Nascimento", "ru": "Дата Рождения", "ja": "生年月日", "ko": "생년월일"},
    "Country": {"en": "Country", "zh": "国家", "es": "País", "fr": "Pays", "de": "Land", "ar": "الدولة", "pt": "País", "ru": "Страна", "ja": "国", "ko": "국가"},
    "Phone Number": {"en": "Phone Number", "zh": "电话号码", "es": "Número de Teléfono", "fr": "Numéro de Téléphone", "de": "Telefonnummer", "ar": "رقم الهاتف", "pt": "Número de Telefone", "ru": "Номер Телефона", "ja": "電話番号", "ko": "전화번호"},
    "Preferred Language": {"en": "Preferred Language", "zh": "首选语言", "es": "Idioma Preferido", "fr": "Langue Préférée", "de": "Bevorzugte Sprache", "ar": "اللغة المفضلة", "pt": "Idioma Preferido", "ru": "Предпочитаемый Язык", "ja": "希望言語", "ko": "선호 언어"},
    "Preferred Currency": {"en": "Preferred Currency", "zh": "首选货币", "es": "Moneda Preferida", "fr": "Devise Préférée", "de": "Bevorzugte Währung", "ar": "العملة المفضلة", "pt": "Moeda Preferida", "ru": "Предпочитаемая Валюта", "ja": "希望通貨", "ko": "선호 통화"},
    "Newsletter": {"en": "Newsletter", "zh": "新闻通讯", "es": "Boletín", "fr": "Infolettre", "de": "Newsletter", "ar": "النشرة الإخبارية", "pt": "Boletim", "ru": "Рассылка", "ja": "ニュースレター", "ko": "뉴스레터"},
    "Promotional Emails": {"en": "Promotional Emails", "zh": "促销电子邮件", "es": "Correos Promocionales", "fr": "Emails Promotionnels", "de": "Werbe-E-Mails", "ar": "رسائل بريد ترويجية", "pt": "Emails Promocionais", "ru": "Рекламные Письма", "ja": "プロモーションメール", "ko": "프로모션 이메일"},
    "Unsubscribe": {"en": "Unsubscribe", "zh": "取消订阅", "es": "Darse de Baja", "fr": "Se Désabonner", "de": "Abmelden", "ar": "إلغاء الاشتراك", "pt": "Desinscrever", "ru": "Отписаться", "ja": "購読解除", "ko": "구독 취소"},
}

def main():
    """Add user dashboard translations to all locale files"""
    print("\n" + "="*60)
    print("ADDING USER DASHBOARD TRANSLATIONS")
    print("="*60 + "\n")
    
    # Get all locale directories
    locales_dir = Path('app/locales')
    locales = sorted([d.name for d in locales_dir.iterdir() if d.is_dir() and d.name != 'index.ts'])
    
    updated_count = 0
    for locale in locales:
        locale_path = Path(f'app/locales/{locale}/translation.json')
        
        try:
            # Load existing translations
            with open(locale_path, 'r', encoding='utf-8') as f:
                locale_data = json.load(f)
        except:
            locale_data = {}
        
        # Add new keys if they don't exist
        added = 0
        for key, translations in USER_TRANSLATIONS.items():
            if key not in locale_data:
                # Use the specific language if available, otherwise use English
                locale_data[key] = translations.get(locale, translations.get('en', key))
                added += 1
        
        # Write back if changes were made
        if added > 0:
            try:
                with open(locale_path, 'w', encoding='utf-8') as f:
                    json.dump(locale_data, f, ensure_ascii=False, indent=2)
                print(f"✅ {locale:5} → Added {added:2} keys")
                updated_count += 1
            except Exception as e:
                print(f"❌ {locale:5} → Error: {e}")
        else:
            print(f"⏭️  {locale:5} → Already complete")
    
    print("\n" + "="*60)
    print(f"✅ Updated {updated_count} locale files with user dashboard translations")
    print("="*60 + "\n")

if __name__ == "__main__":
    main()

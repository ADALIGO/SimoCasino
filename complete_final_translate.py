import json
from pathlib import Path

# COMPLETE Bengali (BN) translations dictionary
bn_translations = {
    'quick_actions_title': 'দ্রুত ক্রিয়া',
    'quick_actions_description': 'মূল ক্রিয়া যা ব্যস্ততা চালিত করে।',
    'write_review': 'পর্যালোচনা লিখুন',
    'guides_page_title': 'ক্যাসিনো গাইড',
    'guides_page_subtitle': 'খেলতে শিখুন, বোনাস সর্বাধিক করুন এবং দায়িত্বের সাথে জুয়া খেলুন',
    'guide_slots_title': 'স্লট কীভাবে খেলতে হয়',
    'guide_slots_excerpt': 'অনলাইনে স্লট মেশিন বুঝতে এবং খেলার জন্য শিক্ষানবিস-বান্ধব গাইড।',
    'difficulty_intermediate': 'মধ্যবর্তী',
    'user_stats_title': 'ব্যবহারকারীর পরিসংখ্যান',
    'reviews_label': 'পর্যালোচনা',
    'helpful_votes_label': 'সহায়ক ভোট',
    'win_rate_label': 'জয়ের হার',
    'leaderboard_title': 'লিডারবোর্ড',
    'current_rank_label': 'বর্তমান র‍্যাঙ্ক',
    'monthly_performance_label': 'মাসিক কর্মক্ষমতা',
    'mission_description': 'এগুলি সম্পূর্ण করতে মুদ্রা, XP এবং স্ট্রিক বুস্ট অর্জন করুন।',
    'bonuses_offers_description': 'আপনার পছন্দের উপর ভিত্তি করে ব্যক্তিগত ডিল।',
    'favorites_title': 'প্রিয়',
    'favorites_description': 'আপনার অনুসরণ করা ক্যাসিনো, সাম্প্রতিক পরিদর্শন এবং শীর্ষ গেম প্রকার।',
    'followed_casinos_label': 'অনুসরণ করা ক্যাসিনো',
    'preferred_games_label': 'পছন্দের গেম',
    'recent_visits_label': 'সাম্প্রতিক পরিদর্শন',
    'shop_rewards_description': 'মুদ্রা রূপান্তর করুন, টিকিট কিনুন এবং আপনার পুরস্কার ভারসাম্য ট্র্যাক করুন।',
    'wallet_balance_label': 'ওয়ালেট ভারসাম্য',
    'convert_coins': 'মুদ্রা রূপান্তর করুন',
    'raffles_tickets_title': 'র‍্যাফেল এবং টিকিট',
    'raffles_tickets_description': 'আপনার টিকিট অবস্থা এবং আসন্ন ড্র ট্র্যাক করুন।',
    'monthly_raffle': 'মাসিক র‍্যাফেল',
    'vip_draw': 'ভিআইপি ড্র',
    'notifications_community_description': 'প্ল্যাটফর্ম সতর্কতা এবং সামাজিক আপডেটগুলির সাথে অবহিত থাকুন।',
    'activity_time_yesterday': 'গতকাল',
    'activity_earned_coins_label': 'আপনি 30 মুদ্রা অর্জন করেছেন',
    'activity_reviewed_casino_detail': '+50 XP',
    'activity_bonus_unlocked_detail': 'ভিআইপি ক্যাশব্যাক 10%',
    'status_completed': 'সম্পন্ন',
    'status_open': 'খোলা',
    'status_in_progress': 'চলমান',
    'mission_write_review': '1 পর্যালোচনা লিখুন',
    'mission_visit_casinos': '3টি ক্যাসিনো পরিদর্শন করুন',
    'mission_daily_login': 'প্রতিদিন লগইন',
    'notification_new_casino_update': 'নতুন ক্যাসিনো আপডেট',
    'notification_new_casino_update_detail': 'ভিআইপি পেআউট সময় 24 ঘন্টায় হ্রাস পেয়েছে।',
    'notification_personalized_offer': 'ব্যক্তিগত অফার',
    'notification_personalized_offer_detail': 'শুধুমাত্র আপনার জন্য প্রস্তাবিত বোনাস।',
    'notification_reminder': 'অনুস্মারক',
    'notification_reminder_detail': 'অতিরিক্ত মুদ্রা অর্জন করতে আপনার প্রোফাইল সম্পূর্ণ করুন।',
    'recommended_for_play_style': 'আপনার খেলার শৈলীর জন্য সুপারিশ করা হয়েছে।',
    'tickets_active': '{{count}} টিকিট - সক্রিয়',
    'ticket_winning': '{{count}} টিকিট - বিজয়ী',
    'level_text': 'স্তর {{level}}',
    'percent_complete': '{{percent}}% সম্পূর্ণ',
    'day_streak': '{{days}} দিনের স্ট্রিক',
    'achievements_unlocked': '{{count}} কৃতিত্ব আনলক করা হয়েছে',
    'rewards_claimed': '{{count}} দাবি করা হয়েছে',
}

# COMPLETE Bulgarian (BG) translations dictionary
bg_translations = {
    'welcome_bonus_title': '👋 Добро дошли Бонус',
    'welcome_bonus_description': 'Получете най-добрите приветствени бонуси в онлайн казина',
    'welcome_bonus_types_title': 'Типове добро дошли бонусите',
    'bonus_match_label': '💰 Match Бонус',
    'bonus_match_desc': 'Казиното съвпада с вашия депозит (например 100% до \)',
    'bonus_spins_label': '🎰 Безплатни ротации',
    'bonus_spins_desc': 'Безплатни ротации на популярни машини',
    'quick_actions_title': 'Бързи действия',
    'quick_actions_description': 'Основни действия, които задвижват ангажиране.',
    'write_review': 'Напишете преглед',
    'user_stats_title': 'Статистика на потребителя',
    'reviews_label': 'Прегледи',
    'helpful_votes_label': 'Полезни гласове',
    'win_rate_label': 'Процент на печалба',
    'leaderboard_title': 'Класация',
    'current_rank_label': 'Текущ ранг',
    'monthly_performance_label': 'Месечна производителност',
    'mission_description': 'Попълнете тези, за да спечелите монети, XP и изсилване на серия.',
    'bonuses_offers_description': 'Персонализирани сделки въз основа на вашите предпочитания.',
    'favorites_title': 'Любими',
    'favorites_description': 'Казината, които следите, последни посещения и популярни видове игри.',
    'followed_casinos_label': 'Следвани казина',
    'preferred_games_label': 'Предпочитани игри',
    'recent_visits_label': 'Последни посещения',
    'shop_rewards_description': 'Конвертирайте монети, закупувайте билети и проследявайте баланса на своите награди.',
    'wallet_balance_label': 'Баланс на портфейла',
    'convert_coins': 'Конвертирайте монети',
    'raffles_tickets_title': 'Томбола и билети',
    'raffles_tickets_description': 'Проследявайте статуса на вашите билети и предстоящите теглене.',
    'monthly_raffle': 'Месечна томбола',
    'vip_draw': 'VIP теглене',
    'notifications_community_description': 'Останете информирани с известия от платформата и социални актуализации.',
    'activity_time_yesterday': 'Вчера',
    'activity_earned_coins_label': 'Печелихте 30 монети',
    'activity_reviewed_casino_detail': '+50 XP',
    'activity_bonus_unlocked_detail': 'VIP кешбък 10%',
    'status_completed': 'Завършено',
    'status_open': 'Отворено',
    'status_in_progress': 'В ход',
    'mission_write_review': 'Напишете 1 преглед',
    'mission_visit_casinos': 'Посетете 3 казина',
    'mission_daily_login': 'Дневен вход',
    'notification_new_casino_update': 'Ново обновление на казиното',
    'notification_new_casino_update_detail': 'Времето за изплата на VIP бе намалено на 24h.',
    'notification_personalized_offer': 'Персонализирано предложение',
    'notification_personalized_offer_detail': 'Препоръчан бонус само за вас.',
    'notification_reminder': 'Напомняне',
    'notification_reminder_detail': 'Попълнете профила си, за да спечелите допълнителни монети.',
    'recommended_for_play_style': 'Препоръчано за вашия стил на игра.',
    'tickets_active': '{{count}} билета • Активни',
    'ticket_winning': '{{count}} билет • Печеливши',
    'level_text': 'Ниво {{level}}',
    'percent_complete': '{{percent}}% завършено',
    'day_streak': '{{days}} дни серия',
    'achievements_unlocked': '{{count}} отключени постижения',
    'rewards_claimed': '{{count}} поискани награди',
}

# COMPLETE Azerbaijani (AZ) translations dictionary
az_translations = {
    'quick_actions_title': 'Tez Əmlər',
    'quick_actions_description': 'Cəlbedici fəaliyyətə səbəb olan əsas əmlər.',
    'write_review': 'Rəy yazın',
    'guides_page_title': 'Kazino Bələdçiləri',
    'guides_page_subtitle': 'Oynamağı öyrənin, bonusları maksimum edin və məsul qümarbazlıq edin',
    'guide_slots_title': 'Slotlar Necə Oynanır',
    'guide_slots_excerpt': 'Onlayn slot maşınlarını anlamaq və oynamaq üçün başlanğıc bələdçi.',
    'difficulty_intermediate': 'Orta Səviyyə',
    'user_stats_title': 'İstifadəçi Statistikası',
    'reviews_label': 'Rəylər',
    'helpful_votes_label': 'Faydalı səslər',
    'win_rate_label': 'Qazanma faizi',
    'leaderboard_title': 'Liqa Cədvəli',
    'current_rank_label': 'Cari Rəqəm',
    'monthly_performance_label': 'Aylıq Performans',
    'mission_description': 'Bunları tamamlayın, sikkə, XP və ləng artmallarını qazanın.',
    'bonuses_offers_description': 'Sizin seçimlərinizə əsaslanan şəxsi sövdələşmələr.',
    'favorites_title': 'Sevimlilər',
    'favorites_description': 'İzlədiyiniz kazinolar, son ziyarətlər və ən çox oyun növləri.',
    'followed_casinos_label': 'İzlənilən Kazinolar',
    'preferred_games_label': 'Seçilmiş Oyunlar',
    'recent_visits_label': 'Son Ziyarətlər',
    'shop_rewards_description': 'Sikkələri çevirin, biletlər alın və ödül balansınızı izləyin.',
    'wallet_balance_label': 'Cüzdan Balansu',
    'convert_coins': 'Sikkələri Çevirin',
    'raffles_tickets_title': 'Rəflərlər və Biletlər',
    'raffles_tickets_description': 'Bilet vəziyyətinizi və gələcək çəkilişləri izləyin.',
    'monthly_raffle': 'Aylıq Rəfləri',
    'vip_draw': 'VIP Çəkiliş',
    'notifications_community_description': 'Platform xəbərləndirmələri və sosial yeniləmələrlə maraqlı olun.',
    'activity_time_yesterday': 'Dünən',
    'activity_earned_coins_label': 'Siz 30 sikkə qazandınız',
    'activity_reviewed_casino_detail': '+50 XP',
    'activity_bonus_unlocked_detail': 'VIP kəsb 10%',
    'status_completed': 'Tamamlandı',
    'status_open': 'Açıq',
    'status_in_progress': 'Devam Ediyor',
    'mission_write_review': '1 Rəy Yazın',
    'mission_visit_casinos': '3 Kazino Ziyarət Edin',
    'mission_daily_login': 'Gündəlik Giriş',
    'notification_new_casino_update': 'Yeni Kazino Yenilənməsi',
    'notification_new_casino_update_detail': 'VIP Ödəniş Müddəti 24 Saata Qısaldılmışdır.',
    'notification_personalized_offer': 'Şəxsiləşdirilmiş Təklif',
    'notification_personalized_offer_detail': 'Sadəcə Sizin üçün Tövsiyə Edilən Bonus.',
    'notification_reminder': 'Xəbərdarlıq',
    'notification_reminder_detail': 'Əlavə sikkə Qazanmaq üçün Profilinizi Tamamlayın.',
    'recommended_for_play_style': 'Sizin Oyun Stiliniz üçün Tövsiyə Edilir.',
    'tickets_active': '{{count}} bilet • Aktiv',
    'ticket_winning': '{{count}} bilet • Qazanan',
    'level_text': 'Səviyyə {{level}}',
    'percent_complete': '{{percent}}% tamamlandı',
    'day_streak': '{{days}} gün sıra',
    'achievements_unlocked': '{{count}} kilidlər açıldı',
    'rewards_claimed': '{{count}} talep edildi',
}

def load_and_translate(locale, translations_dict):
    '''Load JSON file and replace English strings with translations'''
    filepath = Path(f'app/locales/{locale}/translation.json')
    if not filepath.exists():
        print(f'ERROR: File not found: {filepath}')
        return False
    
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    def has_mostly_english(text):
        '''Detect if text is primarily English'''
        if not isinstance(text, str):
            return False
        non_ascii = sum(1 for c in text if ord(c) >= 128)
        return len(text) > 0 and non_ascii < len(text) * 0.3
    
    replaced_count = 0
    missing_count = 0
    
    def replace_english(obj):
        nonlocal replaced_count, missing_count
        if isinstance(obj, dict):
            for key, val in obj.items():
                if isinstance(val, str) and has_mostly_english(val):
                    if key in translations_dict:
                        obj[key] = translations_dict[key]
                        replaced_count += 1
                    else:
                        missing_count += 1
                elif isinstance(val, dict):
                    replace_english(val)
    
    replace_english(data)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print(f'✓ {locale.upper()}: Replaced {replaced_count}, Missing {missing_count}')
    return True

print('=' * 50)
print('COMPLETE LOCALE TRANSLATION SCRIPT')
print('=' * 50)
load_and_translate('bn', bn_translations)
load_and_translate('bg', bg_translations)
load_and_translate('az', az_translations)
print('=' * 50)
print('All translations completed!')
print('=' * 50)

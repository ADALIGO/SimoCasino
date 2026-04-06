'use client';

import { useTranslation } from 'react-i18next';
import HOMELayouts from '@/app/layouts/HOMELayouts';

export default function ReviewsPage() {
  const { t } = useTranslation();

  return (
    <HOMELayouts backgroundColor="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1>{t('reviews_page_title')}</h1>
        <p style={{ fontSize: '18px', color: '#666', marginTop: '20px' }}>
          {t('reviews_page_description')}
        </p>
        <div style={{ marginTop: '40px', textAlign: 'left', maxWidth: '800px', margin: '40px auto' }}>
          <h2>{t('reviews_process_title')}</h2>
          <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '24px' }}>
            {t('reviews_process_description')}
          </p>

          <h2>{t('reviews_categories_title')}</h2>
          <ul style={{ fontSize: '16px', lineHeight: '1.8' }}>
            <li>{t('reviews_category_games')}</li>
            <li>{t('reviews_category_bonuses')}</li>
            <li>{t('reviews_category_payments')}</li>
            <li>{t('reviews_category_security')}</li>
            <li>{t('reviews_category_support')}</li>
            <li>{t('reviews_category_mobile')}</li>
            <li>{t('reviews_category_experience')}</li>
          </ul>
        </div>
      </div>
    </HOMELayouts>
  );
}
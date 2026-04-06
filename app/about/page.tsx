'use client';

import { useTranslation } from 'react-i18next';
import HOMELayouts from '@/app/layouts/HOMELayouts';

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <HOMELayouts backgroundColor="linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)">
      <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1>{t('about_page_title')}</h1>
          <p style={{ fontSize: '18px', color: '#666', marginTop: '20px' }}>
            {t('about_page_subtitle')}
          </p>
        </div>

        <div style={{ background: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h2>{t('about_our_mission')}</h2>
          <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '24px' }}>
            {t('about_our_mission_description')}
          </p>

          <h2>{t('about_what_we_do')}</h2>
          <ul style={{ fontSize: '16px', lineHeight: '1.8' }}>
            <li>{t('about_bullet_reviews')}</li>
            <li>{t('about_bullet_bonuses')}</li>
            <li>{t('about_bullet_security')}</li>
            <li>{t('about_bullet_guides')}</li>
            <li>{t('about_bullet_tools')}</li>
          </ul>
        </div>
      </div>
    </HOMELayouts>
  );
}
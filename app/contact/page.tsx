'use client';

import { useTranslation } from 'react-i18next';
import HOMELayouts from '@/app/layouts/HOMELayouts';

export default function ContactPage() {
  const { t } = useTranslation();

  return (
    <HOMELayouts backgroundColor="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
      <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1>{t('contact_title')}</h1>
          <p style={{ fontSize: '18px', color: '#666', marginTop: '20px' }}>
            {t('contact_subtitle')}
          </p>
        </div>

        <div style={{ background: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <div style={{ marginBottom: '32px' }}>
            <h3>{t('contact_email_support_title')}</h3>
            <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#555' }}>
              {t('contact_email_support_desc')}: <strong>support@simocasino.com</strong>
            </p>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h3>{t('contact_casino_reviews_title')}</h3>
            <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#555' }}>
              {t('contact_casino_reviews_desc')}: <strong>reviews@simocasino.com</strong>
            </p>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h3>{t('contact_responsible_title')}</h3>
            <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#555' }}>
              {t('contact_responsible_desc')}: <strong>responsible@simocasino.com</strong>
            </p>
          </div>

          <div>
            <h3>{t('contact_business_title')}</h3>
            <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#555' }}>
              {t('contact_business_desc')}: <strong>business@simocasino.com</strong>
            </p>
          </div>
        </div>
      </div>
    </HOMELayouts>
  );
}
'use client';

import { useTranslation } from 'react-i18next';
import HOMELayouts from '@/app/layouts/HOMELayouts';

export default function FAQPage() {
  const { t } = useTranslation();

  return (
    <HOMELayouts>
      <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1>{t('faq_page_title')}</h1>
          <p style={{ fontSize: '18px', color: '#666', marginTop: '20px' }}>
            {t('faq_page_description')}
          </p>
        </div>

        <div style={{ background: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <div style={{ marginBottom: '32px' }}>
            <h3>{t('faq_q1_title')}</h3>
            <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#555' }}>
              {t('faq_q1_answer')}
            </p>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h3>{t('faq_q2_title')}</h3>
            <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#555' }}>
              {t('faq_q2_answer')}
            </p>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h3>{t('faq_q3_title')}</h3>
            <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#555' }}>
              {t('faq_q3_answer')}
            </p>
          </div>

          <div>
            <h3>{t('faq_q4_title')}</h3>
            <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#555' }}>
              {t('faq_q4_answer')}
            </p>
          </div>
        </div>
      </div>
    </HOMELayouts>
  );
}
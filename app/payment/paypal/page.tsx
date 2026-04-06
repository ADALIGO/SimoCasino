'use client';

import { useTranslation } from 'react-i18next';
import HOMELayouts from '@/app/layouts/HOMELayouts';

export default function PayPalCasinosPage() {
  const { t } = useTranslation();

  return (
    <HOMELayouts>
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1>{t('paypal_page_title')}</h1>
        <p style={{ fontSize: '18px', color: '#666', marginTop: '20px' }}>
          {t('paypal_page_description')}
        </p>
        <div style={{ marginTop: '40px', textAlign: 'left', maxWidth: '800px', margin: '40px auto' }}>
          <h2>{t('paypal_why_choose_title')}</h2>
          <ul style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '24px' }}>
            <li>{t('paypal_benefit_buyer_protection')}</li>
            <li>{t('paypal_benefit_instant_deposits')}</li>
            <li>{t('paypal_benefit_secure_transactions')}</li>
            <li>{t('paypal_benefit_easy_to_use')}</li>
            <li>{t('paypal_benefit_widely_accepted')}</li>
          </ul>

          <h2>{t('paypal_casino_benefits_title')}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div style={{ padding: '20px', background: '#f0f9ff', borderRadius: '8px', textAlign: 'center', border: '1px solid #0ea5e9' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>🛡️</div>
              <h4 style={{ color: '#0ea5e9', margin: '0 0 8px 0' }}>{t('paypal_feature_chargeback_protection')}</h4>
              <p style={{ margin: 0, color: '#374151' }}>{t('paypal_feature_chargeback_protection_description')}</p>
            </div>
            <div style={{ padding: '20px', background: '#f0fdf4', borderRadius: '8px', textAlign: 'center', border: '1px solid #22c55e' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>⚡</div>
              <h4 style={{ color: '#22c55e', margin: '0 0 8px 0' }}>{t('paypal_feature_fast_processing')}</h4>
              <p style={{ margin: 0, color: '#374151' }}>{t('paypal_feature_fast_processing_description')}</p>
            </div>
            <div style={{ padding: '20px', background: '#fef3c7', borderRadius: '8px', textAlign: 'center', border: '1px solid #f59e0b' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>📧</div>
              <h4 style={{ color: '#f59e0b', margin: '0 0 8px 0' }}>{t('paypal_feature_email_confirmation')}</h4>
              <p style={{ margin: 0, color: '#374151' }}>{t('paypal_feature_email_confirmation_description')}</p>
            </div>
          </div>
        </div>
      </div>
    </HOMELayouts>
  );
}
'use client';

import { useTranslation } from 'react-i18next';
import HOMELayouts from '@/app/layouts/HOMELayouts';

export default function BitcoinCasinosPage() {
  const { t } = useTranslation();

  return (
    <HOMELayouts>
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1>{t('bitcoin_page_title')}</h1>
        <p style={{ fontSize: '18px', color: '#666', marginTop: '20px' }}>
          {t('bitcoin_page_description')}
        </p>
        <div style={{ marginTop: '40px', textAlign: 'left', maxWidth: '800px', margin: '40px auto' }}>
          <h2>{t('bitcoin_benefits_title')}</h2>
          <ul style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '24px' }}>
            <li>{t('bitcoin_benefit_anonymous_gaming')}</li>
            <li>{t('bitcoin_benefit_instant_transactions')}</li>
            <li>{t('bitcoin_benefit_global_access')}</li>
            <li>{t('bitcoin_benefit_low_fees')}</li>
            <li>{t('bitcoin_benefit_secure')}</li>
          </ul>

          <h2>{t('bitcoin_how_it_works_title')}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div style={{ padding: '20px', background: '#f7931a', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>📥</div>
              <h4 style={{ margin: '0 0 8px 0' }}>{t('bitcoin_step_deposit_title')}</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>{t('bitcoin_step_deposit_description')}</p>
            </div>
            <div style={{ padding: '20px', background: '#f7931a', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>⚡</div>
              <h4 style={{ margin: '0 0 8px 0' }}>{t('bitcoin_step_instant_title')}</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>{t('bitcoin_step_instant_description')}</p>
            </div>
            <div style={{ padding: '20px', background: '#f7931a', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>📤</div>
              <h4 style={{ margin: '0 0 8px 0' }}>{t('bitcoin_step_withdraw_title')}</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>{t('bitcoin_step_withdraw_description')}</p>
            </div>
          </div>

          <div style={{ marginTop: '32px', padding: '20px', background: '#f0f9ff', borderRadius: '8px', border: '1px solid #0ea5e9' }}>
            <h3 style={{ color: '#0ea5e9', margin: '0 0 12px 0' }}>{t('bitcoin_important_title')}</h3>
            <p style={{ margin: 0, color: '#374151' }}>
              {t('bitcoin_important_description')}
            </p>
          </div>
        </div>
      </div>
    </HOMELayouts>
  );
}
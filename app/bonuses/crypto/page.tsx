'use client';

import { useTranslation } from 'react-i18next';
import HOMELayouts from '@/app/layouts/HOMELayouts';

export default function CryptoBonusesPage() {
  const { t } = useTranslation();

  return (
    <HOMELayouts>
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1>{t('crypto_bonuses_title')}</h1>
        <p style={{ fontSize: '18px', color: '#666', marginTop: '20px' }}>
          {t('crypto_bonuses_description')}
        </p>
        <div style={{ marginTop: '40px', textAlign: 'left', maxWidth: '800px', margin: '40px auto' }}>
          <h2>{t('crypto_why_title')}</h2>
          <ul style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '24px' }}>
            <li>{t('crypto_why_instant')}</li>
            <li>{t('crypto_why_security')}</li>
            <li>{t('crypto_why_global')}</li>
            <li>{t('crypto_why_fees')}</li>
            <li>{t('crypto_why_processing')}</li>
          </ul>

          <h2>{t('crypto_popular_title')}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div style={{ padding: '20px', background: '#f7931a', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>₿</div>
              <h4 style={{ margin: '0 0 8px 0' }}>{t('crypto_bitcoin_title')}</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>{t('crypto_bitcoin_desc')}</p>
            </div>
            <div style={{ padding: '20px', background: '#627eea', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>Ξ</div>
              <h4 style={{ margin: '0 0 8px 0' }}>{t('crypto_ethereum_title')}</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>{t('crypto_ethereum_desc')}</p>
            </div>
            <div style={{ padding: '20px', background: '#26a17b', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>Ł</div>
              <h4 style={{ margin: '0 0 8px 0' }}>{t('crypto_litecoin_title')}</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>{t('crypto_litecoin_desc')}</p>
            </div>
          </div>

          <div style={{ marginTop: '32px', padding: '20px', background: '#f0f9ff', borderRadius: '8px', border: '1px solid #0ea5e9' }}>
            <h3 style={{ color: '#0ea5e9', margin: '0 0 12px 0' }}>{t('crypto_advantages_title')}</h3>
            <ul style={{ margin: 0, color: '#374151' }}>
              <li>{t('crypto_advantage_kyc')}</li>
              <li>{t('crypto_advantage_anonymous')}</li>
              <li>{t('crypto_advantage_wagering')}</li>
              <li>{t('crypto_advantage_amounts')}</li>
              <li>{t('crypto_advantage_instant')}</li>
            </ul>
          </div>
        </div>
      </div>
    </HOMELayouts>
  );
}
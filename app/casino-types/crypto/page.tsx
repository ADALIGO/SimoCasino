'use client';

import { useTranslation } from 'react-i18next';
import HOMELayouts from '@/app/layouts/HOMELayouts';

export default function CryptoCasinosPage() {
  const { t } = useTranslation();

  return (
    <HOMELayouts>
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1>{t('crypto_casinos_title')}</h1>
        <p style={{ fontSize: '18px', color: '#666', marginTop: '20px' }}>
          {t('crypto_casinos_description')}
        </p>
        <div style={{ marginTop: '40px', textAlign: 'left', maxWidth: '800px', margin: '40px auto' }}>
          <h2>Why Choose Crypto Casinos?</h2>
          <ul style={{ fontSize: '16px', lineHeight: '1.6' }}>
            <li>🔒 Enhanced Privacy - No banking details required</li>
            <li>⚡ Instant Transactions - Fast deposits and withdrawals</li>
            <li>🌍 Borderless Gaming - Play from anywhere</li>
            <li>💰 Lower Fees - Reduced transaction costs</li>
            <li>🎲 Anonymous Gaming - No KYC requirements</li>
          </ul>

          <h2 style={{ marginTop: '32px' }}>Supported Cryptocurrencies</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', marginTop: '16px' }}>
            <div style={{ padding: '16px', background: '#f9f9f9', borderRadius: '8px', textAlign: 'center' }}>
              ₿ Bitcoin
            </div>
            <div style={{ padding: '16px', background: '#f9f9f9', borderRadius: '8px', textAlign: 'center' }}>
              Ξ Ethereum
            </div>
            <div style={{ padding: '16px', background: '#f9f9f9', borderRadius: '8px', textAlign: 'center' }}>
              ₮ Tether
            </div>
            <div style={{ padding: '16px', background: '#f9f9f9', borderRadius: '8px', textAlign: 'center' }}>
              Ł Litecoin
            </div>
          </div>
        </div>
      </div>
    </HOMELayouts>
  );
}
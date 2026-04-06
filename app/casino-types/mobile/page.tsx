'use client';

import { useTranslation } from 'react-i18next';
import HOMELayouts from '@/app/layouts/HOMELayouts';

export default function MobileCasinosPage() {
  const { t } = useTranslation();

  return (
    <HOMELayouts>
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1>{t('mobile_casinos_title')}</h1>
        <p style={{ fontSize: '18px', color: '#666', marginTop: '20px' }}>
          {t('mobile_casinos_description')}
        </p>
        <div style={{ marginTop: '40px', textAlign: 'left', maxWidth: '800px', margin: '40px auto' }}>
          <h2>Why Choose Mobile Casinos?</h2>
          <ul style={{ fontSize: '16px', lineHeight: '1.6' }}>
            <li>📱 Play Anywhere - Access games on the go</li>
            <li>🎮 Touch-Optimized - Smooth mobile gameplay</li>
            <li>⚡ Fast Loading - Optimized for mobile networks</li>
            <li>💰 Mobile Bonuses - Exclusive mobile promotions</li>
            <li>🔒 Secure Gaming - Protected mobile sessions</li>
          </ul>

          <h2 style={{ marginTop: '32px' }}>Mobile Casino Features</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '16px' }}>
            <div style={{ padding: '20px', background: '#f9f9f9', borderRadius: '8px' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>🎯</div>
              <h4>Touch Controls</h4>
              <p>Smooth touch interactions for all games</p>
            </div>
            <div style={{ padding: '20px', background: '#f9f9f9', borderRadius: '8px' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>📶</div>
              <h4>Offline Play</h4>
              <p>Some games work without internet</p>
            </div>
            <div style={{ padding: '20px', background: '#f9f9f9', borderRadius: '8px' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>💳</div>
              <h4>Mobile Payments</h4>
              <p>Easy deposits and withdrawals</p>
            </div>
          </div>
        </div>
      </div>
    </HOMELayouts>
  );
}
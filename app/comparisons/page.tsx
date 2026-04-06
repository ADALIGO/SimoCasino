'use client';

import { useTranslation } from 'react-i18next';
import HOMELayouts from '@/app/layouts/HOMELayouts';

export default function ComparisonsPage() {
  const { t } = useTranslation();

  return (
    <HOMELayouts>
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1>{t('comparisons_title')}</h1>
        <p style={{ fontSize: '18px', color: '#666', marginTop: '20px' }}>
          {t('comparisons_description')}
        </p>
        <div style={{ marginTop: '40px', textAlign: 'left', maxWidth: '800px', margin: '40px auto' }}>
          <h2>Comparison Categories</h2>
          <ul style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '24px' }}>
            <li>🎰 Game Selection - Slot variety and quality</li>
            <li>💰 Bonuses - Welcome offers and promotions</li>
            <li>💳 Payment Methods - Deposit/withdrawal options</li>
            <li>📱 Mobile Experience - App and responsive design</li>
            <li>🎯 RTP Rates - Return to player percentages</li>
            <li>🛡️ Licensing - Regulatory compliance and safety</li>
          </ul>

          <h2>Popular Comparisons</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div style={{ padding: '24px', background: '#4a90e2', color: 'white', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 12px 0' }}>Big vs Small Casinos</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>Compare established brands vs new operators</p>
            </div>
            <div style={{ padding: '24px', background: '#7b68ee', color: 'white', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 12px 0' }}>Licensed vs Unlicensed</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>Safety and regulation differences</p>
            </div>
            <div style={{ padding: '24px', background: '#2e7d32', color: 'white', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 12px 0' }}>Mobile vs Desktop</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>Platform-specific features and limitations</p>
            </div>
            <div style={{ padding: '24px', background: '#d32f2f', color: 'white', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 12px 0' }}>High Roller vs Budget</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>VIP programs and betting limits</p>
            </div>
          </div>

          <h2 style={{ marginTop: '40px' }}>Comparison Tools</h2>
          <ul style={{ fontSize: '16px', lineHeight: '1.8' }}>
            <li>📊 Side-by-Side Tables - Feature comparison matrices</li>
            <li>⭐ Rating Systems - User and expert reviews</li>
            <li>💯 Score Calculations - Weighted ranking algorithms</li>
            <li>🔍 Filter Options - Custom comparison criteria</li>
            <li>📈 Trend Analysis - Performance over time</li>
          </ul>
        </div>
      </div>
    </HOMELayouts>
  );
}
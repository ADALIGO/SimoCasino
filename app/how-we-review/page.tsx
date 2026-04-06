'use client';

import { useTranslation } from 'react-i18next';
import HOMELayouts from '@/app/layouts/HOMELayouts';

export default function HowWeReviewPage() {
  const { t } = useTranslation();

  return (
    <HOMELayouts>
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1>{t('how_we_review_title')}</h1>
        <p style={{ fontSize: '18px', color: '#666', marginTop: '20px' }}>
          {t('how_we_review_description')}
        </p>
        <div style={{ marginTop: '40px', textAlign: 'left', maxWidth: '800px', margin: '40px auto' }}>
          <h2>Our Review Process</h2>
          <ul style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '24px' }}>
            <li>📋 Initial Screening - License verification and basic compliance</li>
            <li>🎮 Game Testing - Hands-on evaluation of casino games</li>
            <li>💰 Bonus Analysis - Terms, wagering requirements, and value</li>
            <li>💳 Payment Testing - Deposit/withdrawal speed and limits</li>
            <li>📞 Support Evaluation - Response time and helpfulness</li>
            <li>📱 Mobile Experience - App and responsive design testing</li>
          </ul>

          <h2>Rating Criteria</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div style={{ padding: '24px', background: '#4a90e2', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>🎰</div>
              <h4 style={{ margin: '0 0 12px 0' }}>Games (25%)</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>Selection, quality, and variety</p>
            </div>
            <div style={{ padding: '24px', background: '#7b68ee', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>💰</div>
              <h4 style={{ margin: '0 0 12px 0' }}>Bonuses (20%)</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>Value, terms, and fairness</p>
            </div>
            <div style={{ padding: '24px', background: '#2e7d32', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>💳</div>
              <h4 style={{ margin: '0 0 12px 0' }}>Payments (15%)</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>Speed, methods, and limits</p>
            </div>
            <div style={{ padding: '24px', background: '#d32f2f', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>🛡️</div>
              <h4 style={{ margin: '0 0 12px 0' }}>Security (15%)</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>Licensing and player protection</p>
            </div>
            <div style={{ padding: '24px', background: '#ff9800', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>📞</div>
              <h4 style={{ margin: '0 0 12px 0' }}>Support (10%)</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>Helpfulness and availability</p>
            </div>
            <div style={{ padding: '24px', background: '#9c27b0', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>📱</div>
              <h4 style={{ margin: '0 0 12px 0' }}>Mobile (10%)</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>User experience on mobile devices</p>
            </div>
            <div style={{ padding: '24px', background: '#607d8b', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>⭐</div>
              <h4 style={{ margin: '0 0 12px 0' }}>User Experience (5%)</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>Overall design and usability</p>
            </div>
          </div>

          <h2 style={{ marginTop: '40px' }}>Review Standards</h2>
          <ul style={{ fontSize: '16px', lineHeight: '1.8' }}>
            <li>✅ Independent Analysis - No sponsored or biased reviews</li>
            <li>🔄 Regular Updates - Casinos re-evaluated every 6 months</li>
            <li>📊 Data-Driven - Real testing and statistical analysis</li>
            <li>🎯 Transparency - Clear methodology and criteria</li>
            <li>👥 User Feedback - Incorporating player reviews and ratings</li>
          </ul>
        </div>
      </div>
    </HOMELayouts>
  );
}
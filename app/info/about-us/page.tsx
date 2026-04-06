'use client';

import { useTranslation } from 'react-i18next';
import HOMELayouts from '@/app/layouts/HOMELayouts';

export default function AboutUsPage() {
  const { t } = useTranslation();

  return (
    <HOMELayouts>
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1>{t('about_us_title')}</h1>
        <p style={{ fontSize: '18px', color: '#666', marginTop: '20px' }}>
          {t('about_us_subtitle')}
        </p>
        <div style={{ marginTop: '40px', textAlign: 'left', maxWidth: '800px', margin: '40px auto' }}>
          <h2>Our Mission</h2>
          <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '24px' }}>
            At Simocasino, we believe in responsible gaming and helping players make informed decisions.
            Our platform provides comprehensive casino reviews, bonus comparisons, and educational content
            to ensure you have the best possible online gaming experience.
          </p>

          <h2>What We Offer</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div style={{ padding: '24px', background: '#4a90e2', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>⭐</div>
              <h4 style={{ margin: '0 0 12px 0' }}>Expert Reviews</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>In-depth casino evaluations</p>
            </div>
            <div style={{ padding: '24px', background: '#7b68ee', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>🎁</div>
              <h4 style={{ margin: '0 0 12px 0' }}>Bonus Guides</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>Best offers and promotions</p>
            </div>
            <div style={{ padding: '24px', background: '#2e7d32', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>🛡️</div>
              <h4 style={{ margin: '0 0 12px 0' }}>Safety First</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>Licensed and secure casinos</p>
            </div>
            <div style={{ padding: '24px', background: '#d32f2f', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>📚</div>
              <h4 style={{ margin: '0 0 12px 0' }}>Education</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>Gaming tips and strategies</p>
            </div>
          </div>

          <h2 style={{ marginTop: '40px' }}>Our Values</h2>
          <ul style={{ fontSize: '16px', lineHeight: '1.8' }}>
            <li>🔒 Transparency - Clear, honest information</li>
            <li>🛡️ Responsibility - Promoting safe gaming habits</li>
            <li>📊 Accuracy - Fact-based reviews and data</li>
            <li>🎯 Independence - Unbiased recommendations</li>
            <li>👥 Community - Supporting the gaming community</li>
          </ul>
        </div>
      </div>
    </HOMELayouts>
  );
}
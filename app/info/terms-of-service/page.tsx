'use client';

import { useTranslation } from 'react-i18next';
import HOMELayouts from '@/app/layouts/HOMELayouts';

export default function TermsOfServicePage() {
  const { t } = useTranslation();

  return (
    <HOMELayouts>
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1>{t('terms_title')}</h1>
        <p style={{ fontSize: '18px', color: '#666', marginTop: '20px' }}>
          {t('terms_description')}
        </p>
        <div style={{ marginTop: '40px', textAlign: 'left', maxWidth: '800px', margin: '40px auto' }}>
          <h2>Acceptance of Terms</h2>
          <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '24px' }}>
            By accessing and using Simocasino, you accept and agree to be bound by the terms and
            provision of this agreement. If you do not agree to abide by the above, please do not use this service.
          </p>

          <h2>Use License</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div style={{ padding: '24px', background: '#4a90e2', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>✅</div>
              <h4 style={{ margin: '0 0 12px 0' }}>Permitted Use</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>Personal, non-commercial use</p>
            </div>
            <div style={{ padding: '24px', background: '#7b68ee', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>🚫</div>
              <h4 style={{ margin: '0 0 12px 0' }}>Prohibited Use</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>Commercial exploitation</p>
            </div>
            <div style={{ padding: '24px', background: '#2e7d32', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>🔒</div>
              <h4 style={{ margin: '0 0 12px 0' }}>Content Protection</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>Copyright and trademarks</p>
            </div>
            <div style={{ padding: '24px', background: '#d32f2f', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>⚖️</div>
              <h4 style={{ margin: '0 0 12px 0' }}>Legal Compliance</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>Applicable laws and regulations</p>
            </div>
          </div>

          <h2 style={{ marginTop: '40px' }}>User Responsibilities</h2>
          <ul style={{ fontSize: '16px', lineHeight: '1.8' }}>
            <li>🎯 Provide accurate and current information</li>
            <li>🔐 Maintain password security and confidentiality</li>
            <li>🚫 Not engage in fraudulent or illegal activities</li>
            <li>📧 Respect other users and community guidelines</li>
            <li>🛡️ Comply with responsible gaming practices</li>
            <li>⚠️ Report suspicious activities or security issues</li>
          </ul>

          <h2 style={{ marginTop: '40px' }}>Disclaimer</h2>
          <ul style={{ fontSize: '16px', lineHeight: '1.8' }}>
            <li>📊 Information provided for educational purposes</li>
            <li>🎰 No guarantee of casino outcomes or winnings</li>
            <li>🔄 Content subject to change without notice</li>
            <li>🌐 External links not endorsed or controlled</li>
            <li>⚖️ No financial or legal advice provided</li>
            <li>🛡️ Use services at your own risk</li>
          </ul>
        </div>
      </div>
    </HOMELayouts>
  );
}
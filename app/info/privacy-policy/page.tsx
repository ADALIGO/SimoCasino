'use client';

import { useTranslation } from 'react-i18next';
import HOMELayouts from '@/app/layouts/HOMELayouts';

export default function PrivacyPolicyPage() {
  const { t } = useTranslation();

  return (
    <HOMELayouts>
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1>{t('privacy_title')}</h1>
        <p style={{ fontSize: '18px', color: '#666', marginTop: '20px' }}>
          {t('privacy_description')}
        </p>
        <div style={{ marginTop: '40px', textAlign: 'left', maxWidth: '800px', margin: '40px auto' }}>
          <h2>Information We Collect</h2>
          <ul style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '24px' }}>
            <li>📧 Email addresses for newsletter subscriptions</li>
            <li>🌐 IP addresses for analytics and security</li>
            <li>🍪 Cookies for website functionality and preferences</li>
            <li>📱 Device information for responsive design optimization</li>
            <li>📊 Usage data for improving our services</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div style={{ padding: '24px', background: '#4a90e2', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>📧</div>
              <h4 style={{ margin: '0 0 12px 0' }}>Communication</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>Newsletter and updates</p>
            </div>
            <div style={{ padding: '24px', background: '#7b68ee', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>📊</div>
              <h4 style={{ margin: '0 0 12px 0' }}>Analytics</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>Website improvement</p>
            </div>
            <div style={{ padding: '24px', background: '#2e7d32', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>🛡️</div>
              <h4 style={{ margin: '0 0 12px 0' }}>Security</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>Fraud prevention</p>
            </div>
            <div style={{ padding: '24px', background: '#d32f2f', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>⚖️</div>
              <h4 style={{ margin: '0 0 12px 0' }}>Legal</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>Compliance requirements</p>
            </div>
          </div>

          <h2 style={{ marginTop: '40px' }}>Data Protection</h2>
          <ul style={{ fontSize: '16px', lineHeight: '1.8' }}>
            <li>🔐 SSL encryption for all data transmission</li>
            <li>🗂️ Secure servers with regular security audits</li>
            <li>⏰ Data retention policies with automatic deletion</li>
            <li>🚫 No sale of personal information to third parties</li>
            <li>📋 GDPR compliance for EU users</li>
            <li>🔄 Regular privacy policy updates</li>
          </ul>

          <h2 style={{ marginTop: '40px' }}>Your Rights</h2>
          <ul style={{ fontSize: '16px', lineHeight: '1.8' }}>
            <li>👀 Access your personal data</li>
            <li>✏️ Correct inaccurate information</li>
            <li>🗑️ Request data deletion</li>
            <li>🚫 Opt-out of marketing communications</li>
            <li>📤 Data portability options</li>
            <li>⚖️ Lodge privacy complaints</li>
          </ul>
        </div>
      </div>
    </HOMELayouts>
  );
}
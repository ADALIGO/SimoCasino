'use client';

import { useTranslation } from 'react-i18next';
import HOMELayouts from '@/app/layouts/HOMELayouts';

export default function TrustedCasinosPage() {
  const { t } = useTranslation();

  return (
    <HOMELayouts>
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1>{t('trusted_casinos_title')}</h1>
        <p style={{ fontSize: '18px', color: '#666', marginTop: '20px' }}>
          {t('trusted_casinos_description')}
        </p>
        <div style={{ marginTop: '40px', textAlign: 'left', maxWidth: '800px', margin: '40px auto' }}>
          <h2>Trust Indicators</h2>
          <ul style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '24px' }}>
            <li>📜 Valid Licensing - Regulated by reputable authorities</li>
            <li>🔒 SSL Encryption - Secure data transmission</li>
            <li>🎰 Fair Gaming - Certified random number generators</li>
            <li>💰 Responsible Payments - Reliable withdrawal processing</li>
            <li>📞 24/7 Support - Professional customer service</li>
            <li>⭐ Longevity - Established operators with proven track records</li>
          </ul>

          <h2>Licensing Authorities</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div style={{ padding: '24px', background: '#4a90e2', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>🇲🇹</div>
              <h4 style={{ margin: '0 0 12px 0' }}>Malta Gaming Authority</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>MGA - Gold standard licensing</p>
            </div>
            <div style={{ padding: '24px', background: '#7b68ee', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>🇬🇧</div>
              <h4 style={{ margin: '0 0 12px 0' }}>UK Gambling Commission</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>UKGC - Strict regulatory standards</p>
            </div>
            <div style={{ padding: '24px', background: '#2e7d32', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>🇸🇪</div>
              <h4 style={{ margin: '0 0 12px 0' }}>Swedish Gambling Authority</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>Spelinspektionen - Player protection focus</p>
            </div>
            <div style={{ padding: '24px', background: '#d32f2f', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>🇨🇺</div>
              <h4 style={{ margin: '0 0 12px 0' }}>Curacao eGaming</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>International licensing authority</p>
            </div>
          </div>

          <h2 style={{ marginTop: '40px' }}>Security Features</h2>
          <ul style={{ fontSize: '16px', lineHeight: '1.8' }}>
            <li>🔐 Two-Factor Authentication - Enhanced account security</li>
            <li>👁️ Privacy Protection - GDPR compliance and data security</li>
            <li>🎲 Game Fairness - Regular audits by independent testing labs</li>
            <li>💳 Payment Security - PCI DSS compliance for card payments</li>
            <li>🚫 Fraud Prevention - Advanced monitoring and detection</li>
            <li>📋 Responsible Gaming - Self-exclusion and deposit limits</li>
          </ul>
        </div>
      </div>
    </HOMELayouts>
  );
}
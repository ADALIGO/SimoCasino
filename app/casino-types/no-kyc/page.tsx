'use client';

import { useTranslation } from 'react-i18next';
import HOMELayouts from '@/app/layouts/HOMELayouts';

export default function NoKYCCasinosPage() {
  const { t } = useTranslation();

  return (
    <HOMELayouts>
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1>{t('no_kyc_casinos_title')}</h1>
        <p style={{ fontSize: '18px', color: '#666', marginTop: '20px' }}>
          {t('no_kyc_casinos_description')}
        </p>
        <div style={{ marginTop: '40px', textAlign: 'left', maxWidth: '800px', margin: '40px auto' }}>
          <h2>What is KYC?</h2>
          <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '24px' }}>
            Know Your Customer (KYC) is a verification process where casinos require players to submit identification
            documents to confirm their identity. No KYC casinos skip this process, allowing for more private gaming.
          </p>

          <h2>Benefits of No KYC Casinos</h2>
          <ul style={{ fontSize: '16px', lineHeight: '1.8' }}>
            <li>🔒 Enhanced Privacy - No personal information required</li>
            <li>⚡ Instant Access - No waiting for verification</li>
            <li>🌍 Anonymous Gaming - Play without identity checks</li>
            <li>🚀 Faster Withdrawals - No verification delays</li>
            <li>🆓 No Documentation - Skip ID uploads</li>
          </ul>

          <div style={{ marginTop: '32px', padding: '20px', background: '#fef3c7', borderRadius: '8px', border: '1px solid #f59e0b' }}>
            <h3 style={{ color: '#92400e', margin: '0 0 12px 0' }}>⚠️ Important Note</h3>
            <p style={{ margin: 0, color: '#92400e' }}>
              While no KYC casinos offer privacy benefits, always ensure they are properly licensed and regulated.
              Some jurisdictions may require KYC for certain withdrawal amounts.
            </p>
          </div>
        </div>
      </div>
    </HOMELayouts>
  );
}
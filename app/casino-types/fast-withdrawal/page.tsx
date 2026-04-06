'use client';

import { useTranslation } from 'react-i18next';
import HOMELayouts from '@/app/layouts/HOMELayouts';

export default function FastWithdrawalCasinosPage() {
  const { t } = useTranslation();

  return (
    <HOMELayouts>
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1>{t('fast_withdrawal_title')}</h1>
        <p style={{ fontSize: '18px', color: '#666', marginTop: '20px' }}>
          {t('fast_withdrawal_description')}
        </p>
        <div style={{ marginTop: '40px', textAlign: 'left', maxWidth: '800px', margin: '40px auto' }}>
          <h2>Withdrawal Speed Categories</h2>
          <div style={{ display: 'grid', gap: '20px', marginTop: '24px' }}>
            <div style={{ padding: '20px', background: '#f0f9ff', borderRadius: '8px', border: '1px solid #0ea5e9' }}>
              <h3 style={{ color: '#0ea5e9', margin: '0 0 12px 0' }}>⚡ Instant (0-24 hours)</h3>
              <p style={{ margin: 0, color: '#374151' }}>E-wallets, crypto, and some bank transfers</p>
            </div>
            <div style={{ padding: '20px', background: '#fef3c7', borderRadius: '8px', border: '1px solid #f59e0b' }}>
              <h3 style={{ color: '#f59e0b', margin: '0 0 12px 0' }}>🚀 Fast (1-3 days)</h3>
              <p style={{ margin: 0, color: '#374151' }}>Credit cards and most bank transfers</p>
            </div>
            <div style={{ padding: '20px', background: '#fee2e2', borderRadius: '8px', border: '1px solid #ef4444' }}>
              <h3 style={{ color: '#ef4444', margin: '0 0 12px 0' }}>⏰ Standard (3-7 days)</h3>
              <p style={{ margin: 0, color: '#374151' }}>Wire transfers and checks</p>
            </div>
          </div>
        </div>
      </div>
    </HOMELayouts>
  );
}
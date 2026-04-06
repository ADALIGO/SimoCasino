'use client';

import { useTranslation } from 'react-i18next';
import HOMELayouts from '@/app/layouts/HOMELayouts';

export default function HighRollerCasinosPage() {
  const { t } = useTranslation();

  return (
    <HOMELayouts>
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1>{t('high_roller_title')}</h1>
        <p style={{ fontSize: '18px', color: '#666', marginTop: '20px' }}>
          {t('high_roller_description')}
        </p>
        <div style={{ marginTop: '40px', textAlign: 'left', maxWidth: '800px', margin: '40px auto' }}>
          <h2>VIP Program Features</h2>
          <ul style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '24px' }}>
            <li>🎁 Exclusive Bonuses - Higher match percentages and values</li>
            <li>💰 Higher Limits - Increased deposit and withdrawal limits</li>
            <li>⚡ Faster Payouts - Priority processing for high rollers</li>
            <li>👨‍💼 Personal Manager - Dedicated account management</li>
            <li>🎟️ Special Events - Invitations to exclusive tournaments</li>
            <li>🎁 Luxury Gifts - Premium rewards and experiences</li>
          </ul>

          <h2>High Roller Benefits</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div style={{ padding: '24px', background: '#4a90e2', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>💳</div>
              <h4 style={{ margin: '0 0 12px 0' }}>Higher Deposit Limits</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>$5,000+ per transaction</p>
            </div>
            <div style={{ padding: '24px', background: '#7b68ee', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>💰</div>
              <h4 style={{ margin: '0 0 12px 0' }}>Higher Withdrawal Limits</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>$10,000+ per withdrawal</p>
            </div>
            <div style={{ padding: '24px', background: '#2e7d32', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>🎰</div>
              <h4 style={{ margin: '0 0 12px 0' }}>Exclusive Games</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>VIP-only gaming experiences</p>
            </div>
            <div style={{ padding: '24px', background: '#d32f2f', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>🏆</div>
              <h4 style={{ margin: '0 0 12px 0' }}>Priority Support</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>24/7 VIP customer service</p>
            </div>
          </div>

          <h2 style={{ marginTop: '40px' }}>VIP Tiers</h2>
          <ul style={{ fontSize: '16px', lineHeight: '1.8' }}>
            <li>🥉 Bronze Level - Entry-level VIP benefits</li>
            <li>🥈 Silver Level - Enhanced bonuses and limits</li>
            <li>🥇 Gold Level - Premium rewards and services</li>
            <li>💎 Platinum Level - Top-tier VIP treatment</li>
            <li>👑 Diamond Level - Ultimate VIP experience</li>
          </ul>
        </div>
      </div>
    </HOMELayouts>
  );
}
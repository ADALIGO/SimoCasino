'use client';

import { useTranslation } from 'react-i18next';
import HOMELayouts from '@/app/layouts/HOMELayouts';

export default function TopSlotsPage() {
  const { t } = useTranslation();

  return (
    <HOMELayouts>
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1>{t('top_slots_title')}</h1>
        <p style={{ fontSize: '18px', color: '#666', marginTop: '20px' }}>
          {t('top_slots_description')}
        </p>
        <div style={{ marginTop: '40px', textAlign: 'left', maxWidth: '800px', margin: '40px auto' }}>
          <h2>Slot Ranking Factors</h2>
          <ul style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '24px' }}>
            <li>🎯 RTP Percentage - Return to player rates</li>
            <li>📊 Volatility Level - Risk and reward balance</li>
            <li>🎨 Graphics & Sound - Visual and audio quality</li>
            <li>🎮 Game Features - Bonus rounds and special symbols</li>
            <li>⭐ Player Ratings - User reviews and popularity</li>
            <li>💰 Jackpot Size - Maximum payout potential</li>
          </ul>

          <h2>Slot Categories</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div style={{ padding: '24px', background: '#4a90e2', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>💎</div>
              <h4 style={{ margin: '0 0 12px 0' }}>High RTP</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>Best return to player rates</p>
            </div>
            <div style={{ padding: '24px', background: '#7b68ee', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>🎯</div>
              <h4 style={{ margin: '0 0 12px 0' }}>Progressive</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>Growing jackpot slots</p>
            </div>
            <div style={{ padding: '24px', background: '#2e7d32', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>🎪</div>
              <h4 style={{ margin: '0 0 12px 0' }}>Megaways</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>Dynamic reel slots</p>
            </div>
            <div style={{ padding: '24px', background: '#d32f2f', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>🎭</div>
              <h4 style={{ margin: '0 0 12px 0' }}>Branded</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>Movie and TV themed slots</p>
            </div>
          </div>

          <h2 style={{ marginTop: '40px' }}>Popular Providers</h2>
          <ul style={{ fontSize: '16px', lineHeight: '1.8' }}>
            <li>🎰 NetEnt - Premium slot developer</li>
            <li>🎪 Microgaming - Progressive jackpot specialists</li>
            <li>🎯 Play&apos;n GO - Innovative game features</li>
            <li>💎 Pragmatic Play - High RTP focus</li>
            <li>🎨 Yggstudio - Unique themed slots</li>
            <li>⭐ ELK Studios - Cinematic slot experiences</li>
          </ul>
        </div>
      </div>
    </HOMELayouts>
  );
}
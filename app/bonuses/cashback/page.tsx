import HOMELayouts from '@/app/layouts/HOMELayouts';

export const metadata = {
  title: 'Cashback Bonuses | Simocasino',
  description: 'Get cashback bonuses at online casinos. Earn money back on your losses with cashback offers and insurance bonuses.',
};

export default function CashbackBonusesPage() {
  return (
    <HOMELayouts>
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1>💰 Cashback Bonuses</h1>
        <p style={{ fontSize: '18px', color: '#666', marginTop: '20px' }}>
          Get cashback bonuses at online casinos. Earn money back on your losses with cashback offers and insurance bonuses.
        </p>
        <div style={{ marginTop: '40px', textAlign: 'left', maxWidth: '800px', margin: '40px auto' }}>
          <h2>How Cashback Bonuses Work</h2>
          <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '24px' }}>
            Cashback bonuses return a percentage of your losses back to you as bonus money. This acts like insurance
            against losing streaks and can help you continue playing with reduced risk.
          </p>

          <h2>Types of Cashback</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div style={{ padding: '20px', background: '#f0fdf4', borderRadius: '8px', textAlign: 'center', border: '1px solid #22c55e' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>📅</div>
              <h4 style={{ color: '#22c55e', margin: '0 0 8px 0' }}>Daily Cashback</h4>
              <p style={{ margin: 0, color: '#374151' }}>Get cashback every day</p>
            </div>
            <div style={{ padding: '20px', background: '#fef3c7', borderRadius: '8px', textAlign: 'center', border: '1px solid #f59e0b' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>📊</div>
              <h4 style={{ color: '#f59e0b', margin: '0 0 8px 0' }}>Weekly Cashback</h4>
              <p style={{ margin: 0, color: '#374151' }}>Weekly loss refunds</p>
            </div>
            <div style={{ padding: '20px', background: '#f0f9ff', borderRadius: '8px', textAlign: 'center', border: '1px solid #0ea5e9' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>🏆</div>
              <h4 style={{ color: '#0ea5e9', margin: '0 0 8px 0' }}>VIP Cashback</h4>
              <p style={{ margin: 0, color: '#374151' }}>Higher rates for loyal players</p>
            </div>
          </div>

          <h2 style={{ marginTop: '40px' }}>Cashback Benefits</h2>
          <ul style={{ fontSize: '16px', lineHeight: '1.8' }}>
            <li>🛡️ Loss Protection - Get money back on losses</li>
            <li>🔄 Risk Reduction - Safer gambling experience</li>
            <li>💵 Bonus Money - Use cashback to keep playing</li>
            <li>📈 Bankroll Management - Better money management</li>
            <li>🎯 Consistent Gaming - Less fear of losing streaks</li>
          </ul>
        </div>
      </div>
    </HOMELayouts>
  );
}
import HOMELayouts from '@/app/layouts/HOMELayouts';

export const metadata = {
  title: 'Top Bonuses | Simocasino',
  description: 'Find the best casino bonuses of 2024. Compare welcome offers, free spins, and ongoing promotions.',
};

export default function TopBonusesPage() {
  return (
    <HOMELayouts>
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1>🎁 Top Bonuses</h1>
        <p style={{ fontSize: '18px', color: '#666', marginTop: '20px' }}>
          Find the best casino bonuses of 2024. Compare welcome offers, free spins, and ongoing promotions.
        </p>
        <div style={{ marginTop: '40px', textAlign: 'left', maxWidth: '800px', margin: '40px auto' }}>
          <h2>Bonus Evaluation</h2>
          <ul style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '24px' }}>
            <li>💰 Bonus Value - Total worth of the offer</li>
            <li>🎯 Wagering Requirements - Playthrough conditions</li>
            <li>⏰ Time Limits - Expiration dates and validity</li>
            <li>🎮 Game Restrictions - Which games qualify</li>
            <li>💳 Payment Methods - Eligible deposit options</li>
            <li>⭐ Terms Clarity - Transparent bonus rules</li>
          </ul>

          <h2>Bonus Types</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div style={{ padding: '24px', background: '#4a90e2', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>🎉</div>
              <h4 style={{ margin: '0 0 12px 0' }}>Welcome Bonus</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>First deposit match offers</p>
            </div>
            <div style={{ padding: '24px', background: '#7b68ee', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>🆓</div>
              <h4 style={{ margin: '0 0 12px 0' }}>Free Spins</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>No deposit spin bonuses</p>
            </div>
            <div style={{ padding: '24px', background: '#2e7d32', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>🔄</div>
              <h4 style={{ margin: '0 0 12px 0' }}>Reload Bonus</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>Ongoing deposit bonuses</p>
            </div>
            <div style={{ padding: '24px', background: '#d32f2f', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>💎</div>
              <h4 style={{ margin: '0 0 12px 0' }}>VIP Bonuses</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>High roller exclusive offers</p>
            </div>
          </div>

          <h2 style={{ marginTop: '40px' }}>Bonus Features</h2>
          <ul style={{ fontSize: '16px', lineHeight: '1.8' }}>
            <li>🎲 Sticky Bonuses - Bonus funds stay with wins</li>
            <li>💸 Cashback Offers - Percentage refunds on losses</li>
            <li>🎯 Tournament Entries - Competition participation</li>
            <li>📅 Weekly Promotions - Regular bonus opportunities</li>
            <li>🎪 Seasonal Events - Holiday and special occasion bonuses</li>
          </ul>
        </div>
      </div>
    </HOMELayouts>
  );
}
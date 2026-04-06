import HOMELayouts from '@/app/layouts/HOMELayouts';

// Enable ISR caching for 1 hour
export const revalidate = 3600;

export const metadata = {
  title: 'High Roller Bonuses | Simocasino',
  description: 'Exclusive high roller bonuses for big players. VIP casino offers, high limit bonuses, and premium gaming experiences.',
};

export default function HighRollerBonusesPage() {
  return (
    <HOMELayouts>
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1>💎 High Roller Bonuses</h1>
        <p style={{ fontSize: '18px', color: '#666', marginTop: '20px' }}>
          Exclusive high roller bonuses for big players. VIP casino offers, high limit bonuses, and premium gaming experiences.
        </p>
        <div style={{ marginTop: '40px', textAlign: 'left', maxWidth: '800px', margin: '40px auto' }}>
          <h2>What is a High Roller Casino?</h2>
          <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '24px' }}>
            High roller casinos cater to players who make large deposits and bets. These casinos offer exclusive bonuses,
            VIP treatment, and higher limits that regular players don&apos;t have access to.
          </p>

          <h2>High Roller Benefits</h2>
          <ul style={{ fontSize: '16px', lineHeight: '1.8' }}>
            <li>💰 Higher Deposit Limits - No restrictions on deposit amounts</li>
            <li>🎁 Exclusive Bonuses - VIP-only promotions</li>
            <li>👨‍💼 Personal Account Manager - Dedicated support</li>
            <li>⚡ Faster Withdrawals - Priority processing</li>
            <li>🎲 Higher Table Limits - Premium gaming experience</li>
            <li>🏆 VIP Rewards - Loyalty programs and comps</li>
          </ul>

          <div style={{ marginTop: '32px', padding: '24px', background: 'linear-gradient(135deg, #1a1a2e, #16213e)', color: 'white', borderRadius: '8px' }}>
            <h3 style={{ margin: '0 0 12px 0' }}>🎯 Typical High Roller Requirements</h3>
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              <li>Minimum deposits: $500 - $5,000+</li>
              <li>Monthly play: $10,000+</li>
              <li>VIP status invitation</li>
              <li>Proof of high net worth (sometimes)</li>
            </ul>
          </div>
        </div>
      </div>
    </HOMELayouts>
  );
}
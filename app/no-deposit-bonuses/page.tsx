import HOMELayouts from '@/app/layouts/HOMELayouts';

// Enable ISR caching for 1 hour
export const revalidate = 3600;

export const metadata = {
  title: 'No Deposit Bonuses | Simocasino',
  description: 'Play online casinos for free with no deposit bonuses. Get free spins, cash bonuses, and risk-free gaming opportunities.',
};

export default function NoDepositBonusesPage() {
  return (
    <HOMELayouts>
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1>🎁 No Deposit Bonuses</h1>
        <p style={{ fontSize: '18px', color: '#666', marginTop: '20px' }}>
          Play online casinos for free with no deposit bonuses. Get free spins, cash bonuses, and risk-free gaming opportunities.
        </p>
        <div style={{ marginTop: '40px', textAlign: 'left', maxWidth: '800px', margin: '40px auto' }}>
          <h2>Types of No Deposit Bonuses:</h2>
          <ul style={{ fontSize: '16px', lineHeight: '1.6' }}>
            <li>🎰 Free Spins - Play slots without wagering</li>
            <li>💵 Cash Bonuses - Real money to play with</li>
            <li>🎮 Free Play - Access to casino games</li>
            <li>🏆 Tournament Entries - Compete for prizes</li>
            <li>🎁 Welcome Packages - Multiple bonus types</li>
          </ul>
        </div>
      </div>
    </HOMELayouts>
  );
}
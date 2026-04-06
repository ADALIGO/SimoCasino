import HOMELayouts from '@/app/layouts/HOMELayouts';

export const metadata = {
  title: 'Beginner Friendly Casinos | Simocasino',
  description: 'Best casinos for beginners. Easy-to-use platforms with generous welcome bonuses and simple gaming experiences.',
};

export default function BeginnersCasinosPage() {
  return (
    <HOMELayouts>
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1>🌟 Beginner Friendly Casinos</h1>
        <p style={{ fontSize: '18px', color: '#666', marginTop: '20px' }}>
          Best casinos for beginners. Easy-to-use platforms with generous welcome bonuses and simple gaming experiences.
        </p>
        <div style={{ marginTop: '40px', textAlign: 'left', maxWidth: '800px', margin: '40px auto' }}>
          <h2>Beginner-Friendly Features</h2>
          <ul style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '24px' }}>
            <li>🎁 Generous Welcome Bonuses - No deposit and low wagering bonuses</li>
            <li>📚 Easy Tutorials - Game guides and strategy tips</li>
            <li>💬 24/7 Support - Friendly customer service</li>
            <li>🎮 Simple Game Selection - Easy-to-learn casino games</li>
            <li>💰 Low Minimum Deposits - Start with small amounts</li>
            <li>📱 Mobile Optimized - Easy mobile gaming</li>
          </ul>

          <h2>Recommended for Beginners</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div style={{ padding: '24px', background: '#4a90e2', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>🎰</div>
              <h4 style={{ margin: '0 0 12px 0' }}>Slot Machines</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>Easy to play, no strategy required</p>
            </div>
            <div style={{ padding: '24px', background: '#7b68ee', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>🎲</div>
              <h4 style={{ margin: '0 0 12px 0' }}>Roulette</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>Simple betting options</p>
            </div>
            <div style={{ padding: '24px', background: '#2e7d32', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>🃏</div>
              <h4 style={{ margin: '0 0 12px 0' }}>Video Poker</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>Poker basics with casino payouts</p>
            </div>
            <div style={{ padding: '24px', background: '#d32f2f', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>🎯</div>
              <h4 style={{ margin: '0 0 12px 0' }}>Keno</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>Lottery-style number selection</p>
            </div>
          </div>

          <h2 style={{ marginTop: '40px' }}>Beginner Tips</h2>
          <ul style={{ fontSize: '16px', lineHeight: '1.8' }}>
            <li>💵 Set a Budget - Only gamble what you can afford to lose</li>
            <li>🎯 Start Small - Begin with low stakes and minimum bets</li>
            <li>📖 Learn Rules - Understand games before playing for real money</li>
            <li>⏱️ Take Breaks - Don&apos;t play for extended periods</li>
            <li>🎁 Use Bonuses - Take advantage of welcome offers</li>
            <li>🛑 Know When to Stop - Set win/loss limits</li>
          </ul>
        </div>
      </div>
    </HOMELayouts>
  );
}
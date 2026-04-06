import HOMELayouts from '@/app/layouts/HOMELayouts';

export const metadata = {
  title: 'Betting Strategies | Simocasino',
  description: 'Learn proven betting strategies and money management techniques for online casino gaming.',
};

export default function StrategiesPage() {
  return (
    <HOMELayouts>
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1>🎯 Betting Strategies</h1>
        <p style={{ fontSize: '18px', color: '#666', marginTop: '20px' }}>
          Learn proven betting strategies and money management techniques for online casino gaming.
        </p>
        <div style={{ marginTop: '40px', textAlign: 'left', maxWidth: '800px', margin: '40px auto' }}>
          <h2>Strategy Categories</h2>
          <ul style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '24px' }}>
            <li>💰 Bankroll Management - Capital preservation techniques</li>
            <li>🎲 Progressive Systems - Stake adjustment methods</li>
            <li>📊 Mathematical Approaches - Probability-based strategies</li>
            <li>🎯 Game-Specific Tactics - Slot, blackjack, roulette strategies</li>
            <li>🛡️ Risk Management - Loss prevention and recovery</li>
          </ul>

          <h2>Popular Strategies</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div style={{ padding: '24px', background: '#4a90e2', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>📈</div>
              <h4 style={{ margin: '0 0 12px 0' }}>Martingale</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>Double bets after losses</p>
            </div>
            <div style={{ padding: '24px', background: '#7b68ee', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>⚖️</div>
              <h4 style={{ margin: '0 0 12px 0' }}>Flat Betting</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>Consistent stake amounts</p>
            </div>
            <div style={{ padding: '24px', background: '#2e7d32', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>🎯</div>
              <h4 style={{ margin: '0 0 12px 0' }}>Kelly Criterion</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>Optimal bet sizing</p>
            </div>
            <div style={{ padding: '24px', background: '#d32f2f', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>🔄</div>
              <h4 style={{ margin: '0 0 12px 0' }}>D&apos;Alembert</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>Pyramid progression system</p>
            </div>
          </div>

          <h2 style={{ marginTop: '40px' }}>Strategy Guides</h2>
          <ul style={{ fontSize: '16px', lineHeight: '1.8' }}>
            <li>🎰 Slot Strategies - RTP analysis and volatility management</li>
            <li>🃏 Blackjack Tactics - Basic strategy and card counting</li>
            <li>🎡 Roulette Systems - Wheel bias and sector betting</li>
            <li>🎲 Dice Games - Craps and sic bo optimal play</li>
            <li>🏆 Sports Betting - Value betting and arbitrage</li>
          </ul>
        </div>
      </div>
    </HOMELayouts>
  );
}
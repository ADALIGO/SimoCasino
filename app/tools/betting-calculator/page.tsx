import HOMELayouts from '@/app/layouts/HOMELayouts';

export const metadata = {
  title: 'Betting Calculator | Simocasino',
  description: 'Calculate your betting odds, potential winnings, and betting strategies with our advanced betting calculator.',
};

export default function BettingCalculatorPage() {
  return (
    <HOMELayouts>
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1>🧮 Betting Calculator</h1>
        <p style={{ fontSize: '18px', color: '#666', marginTop: '20px' }}>
          Calculate your betting odds, potential winnings, and betting strategies with our advanced betting calculator.
        </p>
        <div style={{ marginTop: '40px', textAlign: 'left', maxWidth: '800px', margin: '40px auto' }}>
          <h2>Calculator Features</h2>
          <ul style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '24px' }}>
            <li>🎯 Odds Calculator - Convert between different odds formats</li>
            <li>💰 Profit Calculator - Calculate potential winnings</li>
            <li>📊 Parlay Calculator - Multiple bet combinations</li>
            <li>🔄 Arbitrage Finder - Find arbitrage opportunities</li>
            <li>📈 Expected Value - Calculate EV for bets</li>
          </ul>

          <h2>Odds Formats</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div style={{ padding: '24px', background: '#4a90e2', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <h4 style={{ margin: '0 0 12px 0' }}>Decimal Odds</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>1.50, 2.00, 3.25</p>
            </div>
            <div style={{ padding: '24px', background: '#7b68ee', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <h4 style={{ margin: '0 0 12px 0' }}>Fractional Odds</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>1/2, Evens, 5/2</p>
            </div>
            <div style={{ padding: '24px', background: '#2e7d32', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <h4 style={{ margin: '0 0 12px 0' }}>American Odds</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>+150, -200, +300</p>
            </div>
          </div>

          <h2 style={{ marginTop: '40px' }}>Betting Strategies</h2>
          <ul style={{ fontSize: '16px', lineHeight: '1.8' }}>
            <li>🎲 Martingale - Double bet after losses</li>
            <li>📊 Kelly Criterion - Optimal bet sizing</li>
            <li>🔄 D&apos;Alembert - Pyramid betting system</li>
            <li>⚖️ Flat Betting - Consistent stake amounts</li>
            <li>📈 Percentage of Bankroll - Risk management</li>
          </ul>
        </div>
      </div>
    </HOMELayouts>
  );
}
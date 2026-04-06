import HOMELayouts from '@/app/layouts/HOMELayouts';

export const metadata = {
  title: 'Bankroll Simulator | Simocasino',
  description: 'Simulate your betting bankroll growth with different strategies and stake management techniques.',
};

export default function BankrollSimulatorPage() {
  return (
    <HOMELayouts>
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1>💼 Bankroll Simulator</h1>
        <p style={{ fontSize: '18px', color: '#666', marginTop: '20px' }}>
          Simulate your betting bankroll growth with different strategies and stake management techniques.
        </p>
        <div style={{ marginTop: '40px', textAlign: 'left', maxWidth: '800px', margin: '40px auto' }}>
          <h2>Simulation Features</h2>
          <ul style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '24px' }}>
            <li>📈 Bankroll Growth - Track your capital over time</li>
            <li>🎯 Strategy Testing - Compare different betting approaches</li>
            <li>📊 Risk Analysis - Understand volatility and drawdowns</li>
            <li>🎲 Random Outcomes - Realistic win/loss simulation</li>
            <li>📋 Performance Metrics - ROI, win rate, profit factor</li>
          </ul>

          <h2>Betting Strategies</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div style={{ padding: '24px', background: '#4a90e2', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>📊</div>
              <h4 style={{ margin: '0 0 12px 0' }}>Fixed Stake</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>Same bet amount every time</p>
            </div>
            <div style={{ padding: '24px', background: '#7b68ee', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>📈</div>
              <h4 style={{ margin: '0 0 12px 0' }}>Percentage</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>Bet % of current bankroll</p>
            </div>
            <div style={{ padding: '24px', background: '#2e7d32', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>🎯</div>
              <h4 style={{ margin: '0 0 12px 0' }}>Kelly Criterion</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>Optimal mathematical sizing</p>
            </div>
          </div>

          <h2 style={{ marginTop: '40px' }}>Risk Management</h2>
          <ul style={{ fontSize: '16px', lineHeight: '1.8' }}>
            <li>🛡️ Stop Loss - Automatic loss limits</li>
            <li>🎯 Target Profit - Take profit levels</li>
            <li>📉 Drawdown Control - Maximum loss thresholds</li>
            <li>🔄 Recovery Plans - Comeback strategies</li>
            <li>📊 Performance Tracking - Detailed statistics</li>
          </ul>
        </div>
      </div>
    </HOMELayouts>
  );
}
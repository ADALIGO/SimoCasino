import HOMELayouts from '@/app/layouts/HOMELayouts';

export const metadata = {
  title: 'Top Online Casinos | Simocasino',
  description: 'Discover the best online casinos of 2024. Our expert rankings based on games, bonuses, and player experience.',
};

export default function TopOnlineCasinosPage() {
  return (
    <HOMELayouts>
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1>🏆 Top Online Casinos</h1>
        <p style={{ fontSize: '18px', color: '#666', marginTop: '20px' }}>
          Discover the best online casinos of 2024. Our expert rankings based on games, bonuses, and player experience.
        </p>
        <div style={{ marginTop: '40px', textAlign: 'left', maxWidth: '800px', margin: '40px auto' }}>
          <h2>Ranking Criteria</h2>
          <ul style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '24px' }}>
            <li>🎮 Game Selection - Variety and quality of casino games</li>
            <li>💰 Bonuses - Welcome offers and ongoing promotions</li>
            <li>💳 Payment Options - Deposit/withdrawal methods and speed</li>
            <li>📱 Mobile Experience - App quality and responsive design</li>
            <li>🛡️ Security - Licensing and player protection</li>
            <li>🎯 RTP Rates - Return to player percentages</li>
            <li>👥 Customer Support - Response time and helpfulness</li>
          </ul>

          <h2>Top Categories</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div style={{ padding: '24px', background: '#4a90e2', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>⭐</div>
              <h4 style={{ margin: '0 0 12px 0' }}>Best Overall</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>Top-rated casinos across all criteria</p>
            </div>
            <div style={{ padding: '24px', background: '#7b68ee', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>💰</div>
              <h4 style={{ margin: '0 0 12px 0' }}>Best Bonuses</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>Highest welcome offers and promotions</p>
            </div>
            <div style={{ padding: '24px', background: '#2e7d32', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>🎰</div>
              <h4 style={{ margin: '0 0 12px 0' }}>Best Slots</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>Largest selection of slot games</p>
            </div>
            <div style={{ padding: '24px', background: '#d32f2f', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>📱</div>
              <h4 style={{ margin: '0 0 12px 0' }}>Best Mobile</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>Top mobile casino experiences</p>
            </div>
          </div>

          <h2 style={{ marginTop: '40px' }}>Monthly Updates</h2>
          <ul style={{ fontSize: '16px', lineHeight: '1.8' }}>
            <li>📊 Performance Tracking - Regular casino evaluations</li>
            <li>🆕 New Casino Reviews - Latest operator assessments</li>
            <li>📈 Trend Analysis - Industry developments and changes</li>
            <li>⭐ Player Feedback - User reviews and ratings</li>
            <li>🔄 Ranking Updates - Dynamic position adjustments</li>
          </ul>
        </div>
      </div>
    </HOMELayouts>
  );
}
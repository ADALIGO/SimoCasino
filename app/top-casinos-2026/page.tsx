import HOMELayouts from '@/app/layouts/HOMELayouts';

// Enable ISR caching for 1 hour
export const revalidate = 3600;

export const metadata = {
  title: 'Top Casinos 2026 | Simocasino',
  description: 'Discover the best online casinos for 2026. Our comprehensive rankings based on bonuses, games, security, and user experience.',
};

export default function TopCasinos2026Page() {
  return (
    <HOMELayouts>
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1>🏆 Top Casinos 2026</h1>
        <p style={{ fontSize: '18px', color: '#666', marginTop: '20px' }}>
          Discover the best online casinos for 2026. Our comprehensive rankings based on bonuses, games, security, and user experience.
        </p>
        <div style={{ marginTop: '40px', textAlign: 'left', maxWidth: '800px', margin: '40px auto' }}>
          <h2>Coming Soon Features:</h2>
          <ul style={{ fontSize: '16px', lineHeight: '1.6' }}>
            <li>🎰 Comprehensive casino rankings</li>
            <li>💰 Best bonus offers for 2026</li>
            <li>⭐ User reviews and ratings</li>
            <li>🔒 Security and licensing verification</li>
            <li>📱 Mobile compatibility scores</li>
          </ul>
        </div>
      </div>
    </HOMELayouts>
  );
}
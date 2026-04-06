import HOMELayouts from '@/app/layouts/HOMELayouts';

// Enable ISR caching for 1 hour
export const revalidate = 3600;

export const metadata = {
  title: 'New Casinos | Simocasino',
  description: 'Discover the latest online casinos launching in 2024. Find new casino bonuses, exclusive offers, and fresh gaming experiences.',
};

export default function NewCasinosPage() {
  return (
    <HOMELayouts>
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1>🆕 New Casinos</h1>
        <p style={{ fontSize: '18px', color: '#666', marginTop: '20px' }}>
          Discover the latest online casinos launching in 2024. Find new casino bonuses, exclusive offers, and fresh gaming experiences.
        </p>
        <div style={{ marginTop: '40px', textAlign: 'left', maxWidth: '800px', margin: '40px auto' }}>
          <h2>Why Play at New Casinos?</h2>
          <ul style={{ fontSize: '16px', lineHeight: '1.6' }}>
            <li>🎁 Exclusive launch bonuses</li>
            <li>💰 Higher welcome offers</li>
            <li>🎮 Latest game releases</li>
            <li>🔒 Modern security features</li>
            <li>📱 Cutting-edge mobile experience</li>
          </ul>
        </div>
      </div>
    </HOMELayouts>
  );
}
import HOMELayouts from '@/app/layouts/HOMELayouts';

export const metadata = {
  title: 'Free Spins Bonuses | Simocasino',
  description: 'Get free spins bonuses at online casinos. Compare free spin offers, no deposit spins, and bonus free spins.',
};

export default function FreeSpinsBonusPage() {
  return (
    <HOMELayouts>
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1>🎰 Free Spins Bonuses</h1>
        <p style={{ fontSize: '18px', color: '#666', marginTop: '20px' }}>
          Get free spins bonuses at online casinos. Compare free spin offers, no deposit spins, and bonus free spins.
        </p>
        <div style={{ marginTop: '40px', textAlign: 'left', maxWidth: '800px', margin: '40px auto' }}>
          <h2>Types of Free Spins</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div style={{ padding: '24px', background: '#f0f9ff', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>🎁</div>
              <h3 style={{ color: '#0ea5e9', margin: '0 0 12px 0' }}>No Deposit Free Spins</h3>
              <p style={{ margin: 0, color: '#374151' }}>Free spins without depositing money</p>
            </div>
            <div style={{ padding: '24px', background: '#f0fdf4', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>💰</div>
              <h3 style={{ color: '#22c55e', margin: '0 0 12px 0' }}>Deposit Free Spins</h3>
              <p style={{ margin: 0, color: '#374151' }}>Free spins with your deposit</p>
            </div>
            <div style={{ padding: '24px', background: '#fef3c7', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>🔄</div>
              <h3 style={{ color: '#f59e0b', margin: '0 0 12px 0' }}>Daily Free Spins</h3>
              <p style={{ margin: 0, color: '#374151' }}>Regular free spin promotions</p>
            </div>
          </div>

          <h2 style={{ marginTop: '40px' }}>Popular Slot Games with Free Spins</h2>
          <ul style={{ fontSize: '16px', lineHeight: '1.8' }}>
            <li>⭐ Book of Dead - Ancient Egyptian adventure</li>
            <li>💎 Starburst - Classic fruit slot</li>
            <li>🐺 Gonzo&apos;s Quest - Treasure hunting</li>
            <li>🎪 Immortal Romance - Vampire love story</li>
            <li>🔥 Reactoonz - Alien slot adventure</li>
          </ul>

          <div style={{ marginTop: '32px', padding: '20px', background: '#f0f9ff', borderRadius: '8px', border: '1px solid #0ea5e9' }}>
            <h3 style={{ color: '#0ea5e9', margin: '0 0 12px 0' }}>💡 Pro Tip</h3>
            <p style={{ margin: 0, color: '#374151' }}>
              Always check the wagering requirements for free spins winnings. Some free spins have stricter rules than regular bonuses.
            </p>
          </div>
        </div>
      </div>
    </HOMELayouts>
  );
}
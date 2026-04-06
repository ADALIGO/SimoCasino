import HOMELayouts from '@/app/layouts/HOMELayouts';

export const metadata = {
  title: 'Live Casinos | Simocasino',
  description: 'Experience live dealer casinos with real-time gaming. Play blackjack, roulette, and baccarat with professional dealers.',
};

export default function LiveCasinosPage() {
  return (
    <HOMELayouts>
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1>🎥 Live Casinos</h1>
        <p style={{ fontSize: '18px', color: '#666', marginTop: '20px' }}>
          Experience live dealer casinos with real-time gaming. Play blackjack, roulette, and baccarat with professional dealers.
        </p>
        <div style={{ marginTop: '40px', textAlign: 'left', maxWidth: '800px', margin: '40px auto' }}>
          <h2>What is Live Casino Gaming?</h2>
          <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '24px' }}>
            Live casino games feature real dealers streaming from professional studios. You can interact with the dealer
            and other players in real-time, providing an authentic casino experience from home.
          </p>

          <h2>Popular Live Games</h2>
          <ul style={{ fontSize: '16px', lineHeight: '1.8' }}>
            <li>🃏 Live Blackjack - Multiple table limits</li>
            <li>🎰 Live Roulette - European and American variants</li>
            <li>🎴 Live Baccarat - High-stakes gaming</li>
            <li>🎲 Live Dice Games - Craps and more</li>
            <li>🃠 Live Poker - Various poker formats</li>
          </ul>
        </div>
      </div>
    </HOMELayouts>
  );
}
import HOMELayouts from '@/app/layouts/HOMELayouts';

export const metadata = {
  title: 'Fast Payout Casinos | Simocasino',
  description: 'Find casinos with the fastest withdrawal times. Get your winnings quickly with instant and rapid payout casinos.',
};

export default function FastPayoutCasinosPage() {
  return (
    <HOMELayouts>
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1>⚡ Fast Payout Casinos</h1>
        <p style={{ fontSize: '18px', color: '#666', marginTop: '20px' }}>
          Find casinos with the fastest withdrawal times. Get your winnings quickly with instant and rapid payout casinos.
        </p>
        <div style={{ marginTop: '40px', textAlign: 'left', maxWidth: '800px', margin: '40px auto' }}>
          <h2>Payout Speed Categories</h2>
          <ul style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '24px' }}>
            <li>⚡ Instant (Under 1 hour) - Immediate processing</li>
            <li>🚀 Same Day (1-24 hours) - Fast processing</li>
            <li>📅 Next Day (24-48 hours) - Quick processing</li>
            <li>📆 2-3 Days (48-72 hours) - Standard processing</li>
            <li>⏰ 3-5 Days (72-120 hours) - Slower processing</li>
          </ul>

          <h2>Payment Methods by Speed</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div style={{ padding: '24px', background: '#4a90e2', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>₿</div>
              <h4 style={{ margin: '0 0 12px 0' }}>Cryptocurrency</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>Instant blockchain transfers</p>
            </div>
            <div style={{ padding: '24px', background: '#7b68ee', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>💰</div>
              <h4 style={{ margin: '0 0 12px 0' }}>E-Wallets</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>Minutes to hours</p>
            </div>
            <div style={{ padding: '24px', background: '#2e7d32', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>💳</div>
              <h4 style={{ margin: '0 0 12px 0' }}>Credit Cards</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>1-3 business days</p>
            </div>
            <div style={{ padding: '24px', background: '#d32f2f', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>🏦</div>
              <h4 style={{ margin: '0 0 12px 0' }}>Bank Transfer</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>3-7 business days</p>
            </div>
          </div>

          <h2 style={{ marginTop: '40px' }}>Factors Affecting Payout Speed</h2>
          <ul style={{ fontSize: '16px', lineHeight: '1.8' }}>
            <li>🔍 Verification Process - KYC and document checks</li>
            <li>💰 Withdrawal Amount - Higher amounts may require extra verification</li>
            <li>🌍 Geographic Location - International transfers take longer</li>
            <li>📋 First-Time Withdrawal - Additional security checks</li>
            <li>🎯 Payment Method - Some methods are inherently faster</li>
            <li>🕐 Business Days - Weekends and holidays affect processing</li>
          </ul>
        </div>
      </div>
    </HOMELayouts>
  );
}
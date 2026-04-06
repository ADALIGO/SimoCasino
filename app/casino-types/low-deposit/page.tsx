import HOMELayouts from '@/app/layouts/HOMELayouts';

export const metadata = {
  title: 'Low Deposit Casinos | Simocasino',
  description: 'Play casino games with low minimum deposits. Find casinos that accept $1, $5, or other small deposit amounts.',
};

export default function LowDepositCasinosPage() {
  return (
    <HOMELayouts>
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1>💵 Low Deposit Casinos</h1>
        <p style={{ fontSize: '18px', color: '#666', marginTop: '20px' }}>
          Play casino games with low minimum deposits. Find casinos that accept $1, $5, or other small deposit amounts.
        </p>
        <div style={{ marginTop: '40px', textAlign: 'left', maxWidth: '800px', margin: '40px auto' }}>
          <h2>Deposit Amount Categories</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div style={{ padding: '24px', background: '#f0fdf4', borderRadius: '8px', textAlign: 'center', border: '1px solid #22c55e' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>💵</div>
              <h3 style={{ color: '#22c55e', margin: '0 0 8px 0' }}>$1 Deposit</h3>
              <p style={{ margin: 0, color: '#374151' }}>Ultra low entry casinos</p>
            </div>
            <div style={{ padding: '24px', background: '#fefce8', borderRadius: '8px', textAlign: 'center', border: '1px solid #eab308' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>💰</div>
              <h3 style={{ color: '#eab308', margin: '0 0 8px 0' }}>$5 Deposit</h3>
              <p style={{ margin: 0, color: '#374151' }}>Budget-friendly gaming</p>
            </div>
            <div style={{ padding: '24px', background: '#fef3c7', borderRadius: '8px', textAlign: 'center', border: '1px solid #f59e0b' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>💳</div>
              <h3 style={{ color: '#f59e0b', margin: '0 0 8px 0' }}>$10 Deposit</h3>
              <p style={{ margin: 0, color: '#374151' }}>Standard low deposit</p>
            </div>
          </div>

          <h2 style={{ marginTop: '40px' }}>Benefits of Low Deposit Casinos</h2>
          <ul style={{ fontSize: '16px', lineHeight: '1.8' }}>
            <li>🎮 Try games without large investment</li>
            <li>💰 Test casino quality affordably</li>
            <li>🎁 Access to welcome bonuses</li>
            <li>📱 Perfect for mobile gaming</li>
            <li>🔄 Easy to switch between casinos</li>
          </ul>
        </div>
      </div>
    </HOMELayouts>
  );
}
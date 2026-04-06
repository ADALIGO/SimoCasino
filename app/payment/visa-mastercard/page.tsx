import HOMELayouts from '@/app/layouts/HOMELayouts';

export const metadata = {
  title: 'Visa Mastercard Casinos | Simocasino',
  description: 'Find casinos that accept Visa and Mastercard payments. Credit and debit card casinos with secure transactions.',
};

export default function VisaMastercardCasinosPage() {
  return (
    <HOMELayouts>
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1>💳 Visa & Mastercard Casinos</h1>
        <p style={{ fontSize: '18px', color: '#666', marginTop: '20px' }}>
          Find casinos that accept Visa and Mastercard payments. Credit and debit card casinos with secure transactions.
        </p>
        <div style={{ marginTop: '40px', textAlign: 'left', maxWidth: '800px', margin: '40px auto' }}>
          <h2>Card Payment Advantages</h2>
          <ul style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '24px' }}>
            <li>🌍 Universally Accepted - Available worldwide</li>
            <li>⚡ Instant Deposits - Immediate funds</li>
            <li>🛡️ Secure Transactions - SSL encryption</li>
            <li>📱 Mobile Payments - Apple Pay, Google Pay</li>
            <li>🔄 Easy Withdrawals - Direct to your card</li>
          </ul>

          <h2>Payment Methods</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div style={{ padding: '20px', background: '#1a365d', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>💳</div>
              <h4 style={{ margin: '0 0 8px 0' }}>Visa Credit</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>Credit card payments</p>
            </div>
            <div style={{ padding: '20px', background: '#2d3748', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>💳</div>
              <h4 style={{ margin: '0 0 8px 0' }}>Visa Debit</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>Direct bank payments</p>
            </div>
            <div style={{ padding: '20px', background: '#1a202c', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>💳</div>
              <h4 style={{ margin: '0 0 8px 0' }}>Mastercard</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>Mastercard accepted</p>
            </div>
          </div>

          <div style={{ marginTop: '32px', padding: '20px', background: '#fef3c7', borderRadius: '8px', border: '1px solid #f59e0b' }}>
            <h3 style={{ color: '#92400e', margin: '0 0 12px 0' }}>💡 Pro Tip</h3>
            <p style={{ margin: 0, color: '#92400e' }}>
              Always use your own card for casino deposits. Using prepaid cards or third-party cards may violate casino terms.
            </p>
          </div>
        </div>
      </div>
    </HOMELayouts>
  );
}
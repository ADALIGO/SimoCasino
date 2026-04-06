import HOMELayouts from '@/app/layouts/HOMELayouts';

export const metadata = {
  title: 'Skrill Neteller Casinos | Simocasino',
  description: 'Play at casinos accepting Skrill and Neteller e-wallets. Fast, secure e-wallet payments for online gambling.',
};

export default function SkrillNetellerCasinosPage() {
  return (
    <HOMELayouts>
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1>💰 Skrill & Neteller Casinos</h1>
        <p style={{ fontSize: '18px', color: '#666', marginTop: '20px' }}>
          Play at casinos accepting Skrill and Neteller e-wallets. Fast, secure e-wallet payments for online gambling.
        </p>
        <div style={{ marginTop: '40px', textAlign: 'left', maxWidth: '800px', margin: '40px auto' }}>
          <h2>E-Wallet Advantages</h2>
          <ul style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '24px' }}>
            <li>⚡ Instant Processing - Funds available immediately</li>
            <li>🛡️ Secure Transactions - Protected payment methods</li>
            <li>🌍 International - Accepted worldwide</li>
            <li>📱 Mobile Payments - Easy mobile transactions</li>
            <li>🔒 Privacy - No banking details shared</li>
          </ul>

          <h2>Skrill vs Neteller</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div style={{ padding: '24px', background: '#4a90e2', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>🅂</div>
              <h4 style={{ margin: '0 0 12px 0' }}>Skrill</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>Formerly Moneybookers, widely accepted</p>
            </div>
            <div style={{ padding: '24px', background: '#7b68ee', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>🅝</div>
              <h4 style={{ margin: '0 0 12px 0' }}>Neteller</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>Paysafecard integration, fast payouts</p>
            </div>
          </div>

          <h2 style={{ marginTop: '40px' }}>E-Wallet Features</h2>
          <ul style={{ fontSize: '16px', lineHeight: '1.8' }}>
            <li>💳 Prepaid Cards - Physical and virtual cards</li>
            <li>🏪 ATM Withdrawals - Cash access worldwide</li>
            <li>🔄 Currency Exchange - Multi-currency support</li>
            <li>📊 Spending Limits - Parental controls available</li>
            <li>🎁 Cashback Rewards - Earning opportunities</li>
          </ul>
        </div>
      </div>
    </HOMELayouts>
  );
}
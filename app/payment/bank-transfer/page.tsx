import HOMELayouts from '@/app/layouts/HOMELayouts';

export const metadata = {
  title: 'Bank Transfer Casinos | Simocasino',
  description: 'Play at casinos accepting bank transfers. Secure direct bank payments for online gambling.',
};

export default function BankTransferCasinosPage() {
  return (
    <HOMELayouts>
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1>🏦 Bank Transfer Casinos</h1>
        <p style={{ fontSize: '18px', color: '#666', marginTop: '20px' }}>
          Play at casinos accepting bank transfers. Secure direct bank payments for online gambling.
        </p>
        <div style={{ marginTop: '40px', textAlign: 'left', maxWidth: '800px', margin: '40px auto' }}>
          <h2>Bank Transfer Benefits</h2>
          <ul style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '24px' }}>
            <li>🔒 Maximum Security - Direct bank-to-bank transfers</li>
            <li>💰 High Limits - Large deposit/withdrawal amounts</li>
            <li>🌍 Universal - Accepted by all major banks</li>
            <li>📊 No Fees - Usually free from banks</li>
            <li>✅ Trustworthy - Traditional banking methods</li>
          </ul>

          <h2>Transfer Methods</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div style={{ padding: '24px', background: '#2e7d32', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>💳</div>
              <h4 style={{ margin: '0 0 12px 0' }}>Wire Transfer</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>International bank transfers</p>
            </div>
            <div style={{ padding: '24px', background: '#1976d2', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>🏦</div>
              <h4 style={{ margin: '0 0 12px 0' }}>Direct Debit</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>Automated bank payments</p>
            </div>
            <div style={{ padding: '24px', background: '#d32f2f', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>📱</div>
              <h4 style={{ margin: '0 0 12px 0' }}>Online Banking</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>Bank app integrations</p>
            </div>
          </div>

          <h2 style={{ marginTop: '40px' }}>Processing Times</h2>
          <ul style={{ fontSize: '16px', lineHeight: '1.8' }}>
            <li>📥 Deposits - 1-3 business days</li>
            <li>📤 Withdrawals - 3-7 business days</li>
            <li>✅ Verification - May require additional documents</li>
            <li>💰 Limits - Vary by bank and country</li>
            <li>🌐 International - Currency conversion fees may apply</li>
          </ul>
        </div>
      </div>
    </HOMELayouts>
  );
}
import HOMELayouts from '@/app/layouts/HOMELayouts';

export const metadata = {
  title: 'Odds Converter | Simocasino',
  description: 'Convert between decimal, fractional, and American odds formats with our free odds converter tool.',
};

export default function OddsConverterPage() {
  return (
    <HOMELayouts>
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1>🔄 Odds Converter</h1>
        <p style={{ fontSize: '18px', color: '#666', marginTop: '20px' }}>
          Convert between decimal, fractional, and American odds formats with our free odds converter tool.
        </p>
        <div style={{ marginTop: '40px', textAlign: 'left', maxWidth: '800px', margin: '40px auto' }}>
          <h2>Supported Formats</h2>
          <ul style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '24px' }}>
            <li>🔢 Decimal Odds - European format (1.50, 2.00, 3.25)</li>
            <li>📊 Fractional Odds - UK format (1/2, Evens, 5/2)</li>
            <li>💯 American Odds - US format (+150, -200, +300)</li>
            <li>📱 Probability - Percentage chance (33.3%, 50%, 75%)</li>
          </ul>

          <h2>Conversion Examples</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '24px' }}>
            <div style={{ padding: '24px', background: '#4a90e2', color: 'white', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 12px 0' }}>Decimal ↔ Fractional</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>2.00 = Evens<br/>1.50 = 1/2<br/>3.00 = 2/1</p>
            </div>
            <div style={{ padding: '24px', background: '#7b68ee', color: 'white', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 12px 0' }}>Decimal ↔ American</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>2.00 = +100<br/>1.50 = -200<br/>3.00 = +200</p>
            </div>
            <div style={{ padding: '24px', background: '#2e7d32', color: 'white', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 12px 0' }}>Odds ↔ Probability</h4>
              <p style={{ margin: 0, opacity: 0.9 }}>2.00 = 50%<br/>1.25 = 80%<br/>4.00 = 25%</p>
            </div>
          </div>

          <h2 style={{ marginTop: '40px' }}>How to Use</h2>
          <ol style={{ fontSize: '16px', lineHeight: '1.8' }}>
            <li>Enter your odds in any supported format</li>
            <li>Select the input format from the dropdown</li>
            <li>View instant conversions in all other formats</li>
            <li>Copy the converted odds for your betting slip</li>
          </ol>
        </div>
      </div>
    </HOMELayouts>
  );
}
import HOMELayouts from '@/app/layouts/HOMELayouts';

export const metadata = {
  title: 'Binom Tracker Setup | Simocasino',
  description: 'Choose between self-hosted or cloud-based Binom tracking and review recommended installation options.',
};

export default function BinomSetupPage() {
  return (
    <HOMELayouts>
      <div style={{ padding: '40px 20px', maxWidth: 1080, margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', marginBottom: 16 }}>Welcome aboard Binom</h1>
        <p style={{ textAlign: 'center', fontSize: 18, color: '#555', marginBottom: 32 }}>
          Before you start using Binom, choose the installation option that best fits your traffic and infrastructure needs.
        </p>

        <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          <section style={{ border: '1px solid #d1d5db', borderRadius: 16, padding: 24, background: '#fff' }}>
            <h2>Self-hosted</h2>
            <p style={{ color: '#374151', margin: '12px 0 20px' }}>
              Install the tracker on your own server.
            </p>
            <p style={{ fontWeight: 700, fontSize: 22, marginBottom: 16 }}>$104/mo + server costs</p>
            <ul style={{ color: '#4b5563', lineHeight: 1.8, marginBottom: 20 }}>
              <li>Install on your own infrastructure</li>
              <li>Full control over server and deployment</li>
              <li>Recommended for high-volume traffic</li>
            </ul>
          </section>

          <section style={{ border: '1px solid #d1d5db', borderRadius: 16, padding: 24, background: '#f8fafc' }}>
            <h2>Cloud-based</h2>
            <p style={{ color: '#374151', margin: '12px 0 20px' }}>
              Binom automatically installs on one of their servers, with proactive 24/7 support.
            </p>
            <p style={{ fontWeight: 700, fontSize: 22, marginBottom: 16 }}>$299/mo. No additional fees</p>
            <ul style={{ color: '#4b5563', lineHeight: 1.8, marginBottom: 20 }}>
              <li>Managed by Binom support team</li>
              <li>24/7 proactive monitoring</li>
              <li>No server setup required</li>
            </ul>
          </section>
        </div>

        <div style={{ marginTop: 40, padding: 24, borderRadius: 16, background: '#eef2ff', border: '1px solid #c7d2fe' }}>
          <h3>How to choose</h3>
          <p style={{ color: '#3730a3', margin: '12px 0 16px' }}>
            The functionality and capabilities are identical for both options. Pick the option that matches your expected daily traffic.
          </p>
          <p style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>
            <strong>Less than 1.5M daily clicks</strong>: Cloud-based is the easiest choice.
          </p>
          <p style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>
            <strong>More than 1.5M daily clicks</strong>: Use Self-hosted for best performance and scalability today.
          </p>
          <p style={{ marginTop: 16, color: '#334155' }}>
            Large volumes are wonderful, but the cloud solution for more than 1,500,000 daily clicks will be available later this year. Until then, choose &quot;My server&quot; if your expected traffic is over that threshold.
          </p>
        </div>

        <div style={{ marginTop: 32, padding: 24, borderRadius: 16, background: '#f8fafc', border: '1px solid #cbd5e1' }}>
          <h3>Need help?</h3>
          <p style={{ color: '#475569', marginBottom: 16 }}>
            If you are unsure which option to choose, Binom support can recommend the proper server and install Binom for you.
          </p>
          <button
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              background: '#3730a3',
              color: 'white',
              borderRadius: 10,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Open Support Chat
          </button>
        </div>
      </div>
    </HOMELayouts>
  );
}

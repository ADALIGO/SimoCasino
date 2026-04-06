'use client';

import { useState } from 'react';
import HOMELayouts from '@/app/layouts/HOMELayouts';

export default function RTPCalculatorClient() {
  const [stake, setStake] = useState<number>(10);
  const [rtp, setRtp] = useState<number>(96);
  const [spins, setSpins] = useState<number>(1000);

  const expectedReturn = (stake * spins * rtp) / 100;
  const expectedLoss = stake * spins - expectedReturn;

  return (
    <HOMELayouts>
      <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1>📊 RTP Calculator</h1>
          <p style={{ fontSize: '18px', color: '#666', marginTop: '20px' }}>
            Calculate your expected returns based on Return to Player (RTP) percentages
          </p>
        </div>

        <div style={{ background: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'grid', gap: '24px' }}>
            <div>
              <label htmlFor="stake" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                Stake per Spin (€)
              </label>
              <input
                id="stake"
                type="number"
                value={stake}
                onChange={(e) => setStake(Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
              />
            </div>

            <div>
              <label htmlFor="rtp" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                RTP Percentage (%)
              </label>
              <input
                id="rtp"
                type="number"
                value={rtp}
                onChange={(e) => setRtp(Number(e.target.value))}
                min="0"
                max="100"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
              />
            </div>

            <div>
              <label htmlFor="spins" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                Number of Spins
              </label>
              <input
                id="spins"
                type="number"
                value={spins}
                onChange={(e) => setSpins(Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
              />
            </div>
          </div>

          <div style={{ marginTop: '32px', padding: '24px', background: '#f9f9f9', borderRadius: '8px' }}>
            <h3 style={{ margin: '0 0 16px 0', color: '#1a1a2e' }}>Results</h3>
            <div style={{ display: 'grid', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Total Stake:</span>
                <strong>€{(stake * spins).toFixed(2)}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Expected Return:</span>
                <strong style={{ color: '#22c55e' }}>€{expectedReturn.toFixed(2)}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Expected Loss:</span>
                <strong style={{ color: '#ef4444' }}>€{expectedLoss.toFixed(2)}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #ddd', paddingTop: '12px' }}>
                <span>House Edge:</span>
                <strong>{(100 - rtp).toFixed(1)}%</strong>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '40px' }}>
          <h2>What is RTP?</h2>
          <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#555' }}>
            Return to Player (RTP) is the percentage of all wagered money that a slot machine will pay back to players over time.
            For example, a slot with 96% RTP will return €96 for every €100 wagered on average.
          </p>
        </div>
      </div>
    </HOMELayouts>
  );
}
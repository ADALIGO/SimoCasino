import RTPCalculatorClient from './client';

export const metadata = {
  title: 'RTP Calculator | Simocasino',
  description: 'Calculate expected returns from slot machines using our RTP calculator. Understand house edge and expected losses.',
};

export default function RTPCalculatorPage() {
  return <RTPCalculatorClient />;
}
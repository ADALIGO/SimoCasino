import HOMELayouts from '@/app/layouts/HOMELayouts';
import BonusesClient from './client';

export const metadata = {
  title: 'Best Casino Bonuses | Simocasino',
  description: 'Compare the best casino bonuses for 2026. Explore welcome offers, free spins, cashback rewards, and no-deposit deals.',
};

export default function BonusesPage() {
  return (
    <HOMELayouts backgroundColor="linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)">
      <BonusesClient />
    </HOMELayouts>
  );
}

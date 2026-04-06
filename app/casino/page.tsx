import HOMELayouts from '@/app/layouts/HOMELayouts';
import AllCasinosClient from './client';

export const metadata = {
  title: 'All Online Casinos | Simocasino',
  description: 'Browse all online casinos in one place. Discover top casinos, compare bonuses, ratings, and reviews for thousands of casinos.',
};

export default function CasinoIndexPage() {
  return (
    <HOMELayouts backgroundColor="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)">
      <AllCasinosClient />
    </HOMELayouts>
  );
}

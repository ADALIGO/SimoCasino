import HOMELayouts from '@/app/layouts/HOMELayouts';
import CountriesClient from './client';

export const metadata = {
  title: 'All Countries | Simocasino',
  description: 'Browse online casinos by country. Find the best casinos for your location with local bonuses and payment methods.',
};

export default function CountriesPage() {
  return (
    <HOMELayouts>
      <CountriesClient />
    </HOMELayouts>
  );
}
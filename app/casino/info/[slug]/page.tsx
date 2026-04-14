import HOMELayouts from '@/app/layouts/HOMELayouts';
import CasinoDetailsClient from './client';

export const metadata = {
  title: 'Casino Details | Simocasino',
  description: 'Detailed information about online casinos including reviews, bonuses, and ratings.',
};

export default function CasinoDetailsPage({ params }: { params: { slug: string } }) {
  return (
    <HOMELayouts backgroundColor="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
      <CasinoDetailsClient slug={params.slug} />
    </HOMELayouts>
  );
}
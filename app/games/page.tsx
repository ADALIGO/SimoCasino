import HOMELayouts from '@/app/layouts/HOMELayouts';
import GamesClient from './client';

export const metadata = {
  title: 'Casino Games | Simocasino',
  description: 'Explore top online casino games by type, provider and ratings.',
};

export default function GamesPage() {
  return (
    <HOMELayouts backgroundColor="linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)">
      <GamesClient />
    </HOMELayouts>
  );
}

import type { Metadata } from 'next';
import HOMELayouts from '@/app/layouts/HOMELayouts';
import HomePageClient from './HomePageClient';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: 'Simocasino - Best Online Casinos, Bonuses & Reviews',
  description:
    'Discover top-rated online casinos, compare bonuses, free spins, and trusted casino reviews. Updated for 2026.',
  keywords: [
    'online casinos',
    'casino bonuses',
    'free spins',
    'casino reviews',
    'best casino bonuses',
    'top casino sites',
  ],
  openGraph: {
    title: 'Simocasino - Best Online Casinos, Bonuses & Reviews',
    description:
      'Discover top-rated online casinos, compare bonuses, free spins, and trusted casino reviews. Updated for 2026.',
    url: 'https://simocasino.com',
    siteName: 'Simocasino',
    type: 'website',
    images: [
      {
        url: 'https://simocasino.com/images/logo1.jpg',
        width: 1200,
        height: 630,
        alt: 'Simocasino best online casinos',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Simocasino - Best Online Casinos, Bonuses & Reviews',
    description:
      'Discover top-rated online casinos, compare bonuses, free spins, and trusted casino reviews. Updated for 2026.',
    images: ['https://simocasino.com/images/logo1.jpg'],
  },
  alternates: {
    canonical: 'https://simocasino.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

// Enable ISR caching for 1 hour (ultra-fast for repeated visits)
export const revalidate = 3600;

const featuredBonuses = [
  {
    amount: '+50%',
    type: 'Welcome Bonus',
    description: 'Get up to 50% on your first deposit',
  },
  {
    amount: '100',
    type: 'Free Spins',
    description: 'Play your favorite slots for free',
  },
  {
    amount: '$500',
    type: 'VIP Rewards',
    description: 'Exclusive rewards for loyal players',
  },
];

const featuredCasinos = [
  {
    name: 'Betfair',
    country: 'United Kingdom',
    bonus: 'Welcome Bonus 50% up to $200',
    rating: 4.8,
  },
  {
    name: 'PokerStars',
    country: 'Australia',
    bonus: 'First Deposit Match 100%',
    rating: 4.7,
  },
  {
    name: '888 Casino',
    country: 'United States',
    bonus: '$88 No Deposit Bonus',
    rating: 4.6,
  },
  {
    name: 'Bet365',
    country: 'Canada',
    bonus: 'Up to $200 Welcome Bonus',
    rating: 4.9,
  },
];

export default function Home() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: 'https://simocasino.com',
    name: 'Simocasino',
    description:
      'Discover top-rated online casinos, compare bonuses, free spins, and trusted casino reviews. Updated for 2026.',
    publisher: {
      '@type': 'Organization',
      name: 'Simocasino',
      url: 'https://simocasino.com',
    },
  };

  return (
    <HOMELayouts>
      <div className={styles.homepage}>
        <HomePageClient
          featuredBonuses={featuredBonuses}
          featuredCasinos={featuredCasinos}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </div>
    </HOMELayouts>
  );
}

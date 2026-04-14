import type { Metadata } from 'next';
import Script from 'next/script';
import HOMELayouts from '@/app/layouts/HOMELayouts';
import HomePageClient from './HomePageClient';
import styles from './page.module.scss';
import fs from 'fs';
import path from 'path';

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

// Load casino data from verified file
async function loadCasinoData() {
  try {
    const filePath = path.join(process.cwd(), 'verified_casinos_with_urls.txt');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const lines = fileContents.split('\n').filter(line => line.trim());

    const casinos = lines.map(line => {
      const match = line.match(/✅ Valid casino: (.+?) → (.+?) \((\d+)%\)/);
      if (match) {
        const name = match[1].trim();
        const website = match[2].trim();
        const confidence = parseInt(match[3], 10);
        const rating = Math.min(5, Math.max(3.5, 3 + confidence / 40));

        return {
          name,
          website,
          confidence,
          slug: name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
          rating,
          spins: 50,
          likes: 0,
          affiliateLink: website, // Use website as affiliate link for now
          isAffiliate: false,
          isPremium: false,
          isExclusive: false,
        };
      }
      return null;
    }).filter(Boolean);

    // Group by country (all international for now)
    const casinosByCountry: Record<string, any[]> = {
      International: casinos, // Show all verified casinos
    };

    return casinosByCountry;
  } catch (error) {
    console.error('Error loading casino data:', error);
    return { International: [] };
  }
}

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
  {
    amount: '200%',
    type: 'Reload Bonus',
    description: 'Get 200% bonus on your next deposit',
  },
  {
    amount: '25',
    type: 'Daily Spins',
    description: 'Free spins every day for active players',
  },
  {
    amount: '$1000',
    type: 'High Roller',
    description: 'Exclusive bonuses for big depositors',
  },
];

const SHOW_ADS = false;

export default async function Home() {
  const casinoData = await loadCasinoData();

  // Flatten casino data for featured casinos and choose the top 10 most trusted casinos
  const featuredCasinos = Object.values(casinoData)
    .flat()
    .slice()
    .sort((a, b) => {
      const ratingDiff = (b.rating ?? 0) - (a.rating ?? 0);
      if (ratingDiff !== 0) return ratingDiff;
      return (b.confidence ?? 0) - (a.confidence ?? 0);
    })
    .slice(0, 10);

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
          casinoData={casinoData}
        />

        {SHOW_ADS ? (
          <>
            <div
              id="ads-container"
              style={{ marginTop: '2rem', minHeight: 300, width: 160 }}
            >
              <div id="container-6a438426211ee34f97653e5b8b3930dc"></div>
            </div>

            <Script
              id="adstera-160x300-config"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `var atOptions = { 'key' : '4a96bad988472f5c08706236693e5c2a', 'format' : 'iframe', 'height' : 300, 'width' : 160, 'params' : {} };`,
              }}
            />
            <Script
              src="https://www.highperformanceformat.com/4a96bad988472f5c08706236693e5c2a/invoke.js"
              strategy="afterInteractive"
            />
            <Script
              src="https://pl29086571.profitablecpmratenetwork.com/3b/f9/98/3bf9984f88d21806c74cc520f7196579.js"
              strategy="afterInteractive"
            />
            <Script
              async
              data-cfasync="false"
              src="https://pl29086572.profitablecpmratenetwork.com/6a438426211ee34f97653e5b8b3930dc/invoke.js"
              strategy="afterInteractive"
            />
            <Script
              src="https://pl29086573.profitablecpmratenetwork.com/83/70/2f/83702f8cf68e9b423b2d88d068369e3d.js"
              strategy="afterInteractive"
            />
            <Script
              src="https://www.profitablecpmratenetwork.com/vr532hde?key=5e311e07db3b13e8e30c3d03fd9d16ed"
              strategy="afterInteractive"
            />
            <Script
              id="adstera-468x60-config"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `var atOptions = { 'key' : '900782abd397a75722ad2c793a5691d3', 'format' : 'iframe', 'height' : 60, 'width' : 468, 'params' : {} };`,
              }}
            />
            <Script
              src="https://www.highperformanceformat.com/900782abd397a75722ad2c793a5691d3/invoke.js"
              strategy="afterInteractive"
            />
            <Script
              id="adstera-250x300-config"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `var atOptions = { 'key' : '4dac1448d738c715b0d23b1fd480d26b', 'format' : 'iframe', 'height' : 250, 'width' : 300, 'params' : {} };`,
              }}
            />
            <Script
              src="https://www.highperformanceformat.com/4dac1448d738c715b0d23b1fd480d26b/invoke.js"
              strategy="afterInteractive"
            />
            <Script
              id="adstera-600x160-config"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `var atOptions = { 'key' : '1d7d7c7d95c6b000e30a1f7e3d598dcd', 'format' : 'iframe', 'height' : 600, 'width' : 160, 'params' : {} };`,
              }}
            />
            <Script
              src="https://www.highperformanceformat.com/1d7d7c7d95c6b000e30a1f7e3d598dcd/invoke.js"
              strategy="afterInteractive"
            />
            <Script
              id="adstera-50x320-config"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `var atOptions = { 'key' : '353c0b680c42e97fed336e24cee5b36d', 'format' : 'iframe', 'height' : 50, 'width' : 320, 'params' : {} };`,
              }}
            />
            <Script
              src="https://www.highperformanceformat.com/353c0b680c42e97fed336e24cee5b36d/invoke.js"
              strategy="afterInteractive"
            />
            <Script
              id="adstera-728x90-config"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `var atOptions = { 'key' : '608b4337a131b24d8e10c5b1e2ac73b3', 'format' : 'iframe', 'height' : 90, 'width' : 728, 'params' : {} };`,
              }}
            />
            <Script
              src="https://www.highperformanceformat.com/608b4337a131b24d8e10c5b1e2ac73b3/invoke.js"
              strategy="afterInteractive"
            />
          </>
        ) : null}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </div>
    </HOMELayouts>
  );
}

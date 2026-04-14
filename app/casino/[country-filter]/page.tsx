import { Metadata } from 'next';
import CasinoCountryPage from './client';
import { casinosData } from '@/casinos_data';

interface CasinoParams {
  'country-filter': string;
}

function normalizeSlug(value: string) {
  return value.toLowerCase().replace(/\s+/g, '-');
}

function findCasinoBySlug(slug: string) {
  return casinosData.find(
    (casino) => casino.slug === slug || normalizeSlug(casino.name) === slug
  );
}

function getCountryNameFromSlug(slug: string) {
  const casinoMatch = findCasinoBySlug(slug);
  if (casinoMatch) return casinoMatch.country;
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function getInitialCasinos(countryName: string) {
  const normalizedCountry = countryName.trim().toLowerCase();
  return (casinosData as any[])
    .filter((casino) => casino.country?.toLowerCase() === normalizedCountry)
    .sort((a, b) => {
      const featured = (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      if (featured !== 0) return featured;
      const exclusive = (b.isExclusive ? 1 : 0) - (a.isExclusive ? 1 : 0);
      if (exclusive !== 0) return exclusive;
      return (b.rating || 0) - (a.rating || 0);
    });
}

export async function generateMetadata(pageProps: { params: Promise<CasinoParams> }): Promise<Metadata> {
  const { params } = pageProps;
  const resolvedParams = await params;
  const rawParam = resolvedParams['country-filter'];
  const countryName = getCountryNameFromSlug(rawParam);

  return {
    title: `Best Casinos in ${countryName} | Simocasino`,
    description: `Discover the best online casinos in ${countryName}. Compare bonuses, ratings, and find top-rated casinos tailored for ${countryName} players.`,
    openGraph: {
      title: `Best Casinos in ${countryName} | Simocasino`,
      description: `Discover the best online casinos in ${countryName}.`,
      type: 'website',
      url: `https://simocasino.com/casino/by-country/${rawParam}`,
      siteName: 'Simocasino',
    },
    alternates: {
      canonical: `https://simocasino.com/casino/by-country/${rawParam}`,
    },
  };
}

export async function generateStaticParams() {
  const countries = [
    'united-states',
    'australia',
    'united-kingdom',
    'canada',
    'germany',
    'france',
    'netherlands',
    'japan',
    'singapore',
    'ireland',
    'morocco',
  ];

  const casinoSlugs = casinosData.map((casino) => casino.slug);

  const uniqueParams = Array.from(new Set([...countries, ...casinoSlugs]));

  return uniqueParams.map((country) => ({ 'country-filter': country }));
}

export default async function Page(pageProps: { params: Promise<CasinoParams> }) {
  const { params } = pageProps;
  const resolvedParams = await params;
  const countryName = getCountryNameFromSlug(resolvedParams['country-filter']);
  const initialCasinos = getInitialCasinos(countryName);

  return (
    <CasinoCountryPage
      country={countryName.toLowerCase().replace(/\s+/g, '-')}
      initialCasinos={initialCasinos}
    />
  );
}
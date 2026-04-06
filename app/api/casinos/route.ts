import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getCached, setCached, getCacheKey } from '@/lib/cache';
import casinosData from '@/casinos_data.json';

const prisma = new PrismaClient();

const defaultCasinoOrder = [
  { isFeatured: 'desc' as const },
  { isExclusive: 'desc' as const },
  { rating: 'desc' as const },
];

const sortCasinos = (a: any, b: any) => {
  const featured = (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
  if (featured !== 0) return featured;
  const exclusive = (b.isExclusive ? 1 : 0) - (a.isExclusive ? 1 : 0);
  if (exclusive !== 0) return exclusive;
  return (b.rating || 0) - (a.rating || 0);
};

// Ultra-aggressive caching: 1 hour in CDN
export const revalidate = 3600;
const CACHE_CONTROL = 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400';

// Mock casino data - used when MongoDB is unavailable or empty
const mockCasinos = {
  'united states': [
    { 
      id: '1', 
      name: 'Betfair', 
      slug: 'betfair-united-states',
      country: 'United States', 
      bonus: 'Welcome Bonus 50% up to $200', 
      rating: 4.8,
      spins: 100,
      providers: ['Playtech', 'NetEnt'],
      likes: 150,
      comments: 25,
      operatingCountries: ['United States', 'United Kingdom', 'Morocco']
    },
    { 
      id: '2', 
      name: '888 Casino', 
      slug: '888-casino-united-states',
      country: 'United States', 
      bonus: '$88 No Deposit Bonus', 
      rating: 4.6,
      spins: 88,
      providers: ['Playtech'],
      likes: 120,
      comments: 15,
      operatingCountries: ['United States']
    },
    { 
      id: '3', 
      name: 'Bet365', 
      slug: 'bet365-united-states',
      country: 'United States', 
      bonus: 'Up to $200 Welcome Bonus', 
      rating: 4.9,
      spins: 0,
      providers: ['NetEnt', 'Evolution Gaming'],
      likes: 300,
      comments: 60,
      operatingCountries: ['United States', 'Canada', 'United Kingdom', 'Morocco']
    },
  ],
  'australia': [
    { 
      id: '4', 
      name: 'PokerStars', 
      slug: 'pokerstars-australia',
      country: 'Australia', 
      bonus: 'First Deposit Match 100%', 
      rating: 4.7,
      spins: 50,
      providers: ['NetEnt', 'Microgaming'],
      likes: 200,
      comments: 40,
      operatingCountries: ['Australia', 'Canada']
    },
    { 
      id: '5', 
      name: 'LeoVegas', 
      slug: 'leovegas-australia',
      country: 'Australia', 
      bonus: 'Free Spins on Sign Up', 
      rating: 4.7,
      spins: 30,
      providers: ['NetEnt', 'Yggdrasil'],
      likes: 220,
      comments: 35,
      operatingCountries: ['Australia']
    },
    { 
      id: '6', 
      name: 'Casumo', 
      slug: 'casumo-australia',
      country: 'Australia', 
      bonus: '20 Free Spins + Bonus Funds', 
      rating: 4.6,
      spins: 20,
      providers: ['NetEnt'],
      likes: 160,
      comments: 28,
      operatingCountries: ['Australia']
    },
  ],
  'united kingdom': [
    { id: '7', name: 'Unibet', country: 'United Kingdom', bonus: '$50 Free Bet', rating: 4.5 },
    { id: '8', name: 'Betsson', country: 'United Kingdom', bonus: '100% Welcome Bonus', rating: 4.4 },
  ],
  'canada': [
    { id: '9', name: 'Bet365', country: 'Canada', bonus: 'Up to $200 Welcome Bonus', rating: 4.9 },
    { id: '10', name: 'DraftKings', country: 'Canada', bonus: 'Free Play Bonus', rating: 4.5 },
  ],
  'germany': [
    { id: '11', name: 'Bwin', country: 'Germany', bonus: '100% Welcome Bonus up to €100', rating: 4.3 },
    { id: '12', name: 'Tipico', country: 'Germany', bonus: '100% up to €100', rating: 4.4 },
  ],
  'france': [
    { id: '13', name: 'Winamax', country: 'France', bonus: '100% up to €100', rating: 4.2 },
    { id: '14', name: 'Unibet', country: 'France', bonus: '100% Welcome Bonus', rating: 4.3 },
  ],
  'netherlands': [
    { id: '15', name: 'Holland Casino', country: 'Netherlands', bonus: 'Welcome Package', rating: 4.1 },
    { id: '16', name: 'Toto', country: 'Netherlands', bonus: 'Sports Bonus', rating: 4.0 },
  ],
  'japan': [
    { id: '17', name: 'DMM.co.jp', country: 'Japan', bonus: 'Welcome Bonus', rating: 4.0 },
    { id: '18', name: 'Rakuten', country: 'Japan', bonus: 'Points Bonus', rating: 3.9 },
  ],
  'singapore': [
    { id: '19', name: 'Singapore Pools', country: 'Singapore', bonus: '4D Bonus', rating: 4.1 },
    { id: '20', name: 'Sports Toto', country: 'Singapore', bonus: 'Toto Bonus', rating: 4.0 },
  ],
  'ireland': [
    { id: '21', name: 'Paddy Power', country: 'Ireland', bonus: '€50 Free Bet', rating: 4.4 },
    { id: '22', name: 'Betdaq', country: 'Ireland', bonus: 'Exchange Bonus', rating: 4.2 },
  ],
  'morocco': [
    { 
      id: '23', 
      name: 'BankonBet', 
      slug: 'bankonbet',
      country: 'Morocco', 
      bonus: 'Reload Bonus 200% up to $200', 
      rating: 3.1,
      spins: 300,
      providers: ['Aristocrat', 'Gamomat'],
      likes: 1465,
      comments: 344,
      operatingCountries: ['Germany', 'Switzerland', 'Czech Republic', 'Morocco']
    },
    { 
      id: '24', 
      name: 'Bassbet', 
      slug: 'bassbet',
      country: 'Morocco', 
      bonus: 'First Deposit 200% up to $300 + 150 Free Spins', 
      rating: 3.3,
      spins: 253,
      providers: ['Pragmatic Play', 'Blueprint Gaming', 'Aristocrat', 'IGT'],
      likes: 67,
      comments: 263,
      operatingCountries: ['Portugal', 'Sweden', 'Australia', 'Morocco']
    },
    { 
      id: '25', 
      name: 'BeOnBet', 
      slug: 'beonbet',
      country: 'Morocco', 
      bonus: 'Welcome Bonus up to $500', 
      rating: 3.5,
      spins: 200,
      providers: ['NetEnt', 'Pragmatic Play'],
      likes: 800,
      comments: 180,
      operatingCountries: ['Morocco', 'Europe']
    },
  ],
};

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const rawCountry = url.searchParams.get('country');
    const normalizedCountry = rawCountry?.trim().toLowerCase();
    const isAllCasinos = !normalizedCountry || normalizedCountry === 'all';

    try {
      const cacheKey = getCacheKey('casinos', { country: isAllCasinos ? 'all' : normalizedCountry });
      
      // Check in-memory cache first (ultra-fast)
      const cachedData = getCached(cacheKey);
      if (cachedData) {
        const response = NextResponse.json(cachedData);
        response.headers.set('Cache-Control', CACHE_CONTROL);
        response.headers.set('X-Cache', 'HIT');
        return response;
      }
      
      const casinos = isAllCasinos
        ? await prisma.casino.findMany({ orderBy: defaultCasinoOrder })
        : await prisma.casino.findMany({
            where: {
              country: {
                contains: normalizedCountry,
                mode: 'insensitive',
              },
            },
            orderBy: defaultCasinoOrder,
          });

      // If no casinos found in database, return data from JSON
      if (casinos.length === 0) {
        console.warn('⚠️ No casinos found in database, loading from JSON file');
        const jsonCasinos = isAllCasinos
          ? (casinosData as any[])
          : (casinosData as any[]).filter(c => 
              c.country && c.country.toLowerCase() === normalizedCountry
            );
        jsonCasinos.sort(sortCasinos);
        
        if (jsonCasinos.length > 0) {
          // Cache the JSON data
          setCached(cacheKey, jsonCasinos);
          
          const response = NextResponse.json(jsonCasinos);
          response.headers.set('Cache-Control', CACHE_CONTROL);
          response.headers.set('X-Data-Source', 'json');
          return response;
        }
        
        // Fallback to mock data if JSON also doesn't have the country
const mockKey = isAllCasinos ? 'united states' : normalizedCountry || 'united states';
        const mockData = mockCasinos[mockKey as keyof typeof mockCasinos] || [];
        
        // Cache the mock data
        setCached(cacheKey, mockData);
        
        const response = NextResponse.json(mockData, {
          headers: {
            'X-Data-Source': 'mock',
            'X-Warning': 'No data in database or JSON: Using mock data.',
          },
        });
        response.headers.set('Cache-Control', CACHE_CONTROL);
        return response;
      }

      // Cache the database results
      setCached(cacheKey, casinos);

      const response = NextResponse.json(casinos);
      response.headers.set('Cache-Control', CACHE_CONTROL);
      response.headers.set('X-Cache', 'MISS');
      return response;
    } catch (dbError) {
      // MongoDB connection failed - try JSON data first, then mock data
      console.warn('⚠️ MongoDB connection failed, loading from JSON');
      console.warn('Database Error:', (dbError as any)?.message);

      // Try loading from JSON file
      const jsonCasinos = isAllCasinos
        ? (casinosData as any[])
        : (casinosData as any[]).filter(c => 
            c.country && c.country.toLowerCase() === normalizedCountry
          );
      jsonCasinos.sort(sortCasinos);
      
      if (jsonCasinos.length > 0) {
        const response = NextResponse.json(jsonCasinos, { status: 200 });
        response.headers.set('Cache-Control', CACHE_CONTROL);
        response.headers.set('X-Data-Source', 'json');
        return response;
      }

      // Fallback to mock data if JSON also doesn't work
      const mockKey = isAllCasinos ? 'united states' : normalizedCountry || 'united states';
      const mockData = mockCasinos[mockKey as keyof typeof mockCasinos] || [];

      const response = NextResponse.json(mockData, { status: 200 });
      response.headers.set('Cache-Control', CACHE_CONTROL);
      response.headers.set('X-Data-Source', 'mock');
      return response;
    }
  } catch (error) {
    console.error('Unexpected API error:', error);
    return NextResponse.json(
      { error: 'Server error. Please try again.' },
      { status: 500 }
    );
  }
}

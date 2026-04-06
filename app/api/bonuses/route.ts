import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Ultra-aggressive caching: 1 hour in CDN
export const revalidate = 3600;
const CACHE_CONTROL = 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400';

export async function GET() {
  try {
    const casinos = await prisma.casino.findMany({
      select: {
        id: true,
        name: true,
        bonus: true,
      },
      orderBy: {
        rating: 'desc',
      },
      take: 10,
    });

    const bonuses = casinos.map((casino) => ({
      casinoId: casino.id,
      casinoName: casino.name,
      bonus: casino.bonus,
    }));

    const response = NextResponse.json(bonuses);
    response.headers.set('Cache-Control', CACHE_CONTROL);
    return response;
  } catch (error) {
    console.error('Failed to fetch bonuses:', error);
    const response = NextResponse.json(
      { error: 'Failed to fetch bonuses' },
      { status: 500 }
    );
    response.headers.set('Cache-Control', 'public, max-age=60');
    return response;
  }
}

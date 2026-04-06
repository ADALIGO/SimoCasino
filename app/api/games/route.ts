import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const revalidate = 3600;
const CACHE_CONTROL = 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400';

export async function GET() {
  try {
    const games = await prisma.game.findMany({
      orderBy: { rating: 'desc' },
      include: { casino: { select: { id: true, name: true, slug: true } } },
      take: 50,
    });

    const response = NextResponse.json(games);
    response.headers.set('Cache-Control', CACHE_CONTROL);
    return response;
  } catch (error) {
    console.error('Failed to fetch games:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to fetch games' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=60' },
    });
  }
}

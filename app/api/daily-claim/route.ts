import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const today = new Date().toISOString().split('T')[0];
    const lastClaim = user.lastDailyLoginAt ? user.lastDailyLoginAt.toISOString().split('T')[0] : null;

    if (lastClaim === today) {
      return NextResponse.json({ error: 'Already claimed today' }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        totalPoints: (user.totalPoints ?? 0) + 10,
        coins: (user.coins ?? 0) + 30,
        levelProgress: (user.levelProgress ?? 0) + 10,
        lastDailyLoginAt: new Date(),
        dailyRewardsClaimed: (user.dailyRewardsClaimed ?? 0) + 1,
        dailyLoginStreak: (user.dailyLoginStreak ?? 0) + 1,
        lastRewardAt: new Date(),
      },
    });

    const { password: _password, ...safeUser } = updatedUser;
    void _password;

    return NextResponse.json({ user: safeUser });
  } catch (error) {
    console.error('Daily claim error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
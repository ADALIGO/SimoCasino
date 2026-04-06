import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const REWARD_SELECT = {
  id: true,
  totalPoints: true,
  coins: true,
  currentLevel: true,
  levelProgress: true,
  xpToNextLevel: true,
  streakDays: true,
  lastRewardAt: true,
  dailyRewardsClaimed: true,
  dailyLoginStreak: true,
  vipPoints: true,
  rewardActionsCompleted: true,
  referralCode: true,
  referralsCount: true,
  referralEarnings: true,
  totalEarnings: true,
  pendingEarnings: true,
  withdrawnEarnings: true,
  affiliateClicks: true,
  conversionCount: true,
};

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: REWARD_SELECT,
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Rewards GET error:', error);
    return NextResponse.json({ error: 'Unable to load reward data' }, { status: 500 });
  }
}

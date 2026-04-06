import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { REWARD_CONFIG } from '../reward-config';

const prisma = new PrismaClient();

function isValidObjectId(id: unknown): id is string {
  return typeof id === 'string' && /^[0-9a-fA-F]{24}$/.test(id);
}


function sanitizeAction(action: unknown): string {
  return typeof action === 'string' ? action.trim().toLowerCase() : '';
}

export async function POST(request: NextRequest) {
  try {
    const { userId, action } = await request.json();
    const sanitizedAction = sanitizeAction(action);

    if (!userId || !sanitizedAction || !isValidObjectId(userId)) {
      return NextResponse.json({ error: 'userId and action are required and userId must be a valid ObjectId' }, { status: 400 });
    }

    const reward = REWARD_CONFIG[sanitizedAction];
    if (!reward) {
      return NextResponse.json({ error: `Unknown reward action: ${sanitizedAction}` }, { status: 400 });
    }
    if (!reward.enabled) {
      return NextResponse.json({ error: `Reward action is disabled: ${sanitizedAction}` }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const userAny = user as any;
    const hasCompletedAction = Array.isArray(userAny.rewardActionsCompleted) && userAny.rewardActionsCompleted.includes(sanitizedAction);
    if (reward.once && hasCompletedAction) {
      return NextResponse.json({ error: 'Action already rewarded' }, { status: 400 });
    }

    const updateData: any = {
      coins: (user.coins ?? 0) + (reward.coins ?? 0),
      totalPoints: (user.totalPoints ?? 0) + (reward.totalPoints ?? 0),
      levelProgress: (user.levelProgress ?? 0) + (reward.levelProgress ?? 0),
      lastRewardAt: new Date(),
      rewardActionsCompleted: reward.once
        ? [...new Set([...(userAny.rewardActionsCompleted ?? []), sanitizedAction])]
        : userAny.rewardActionsCompleted,
    };

    if (sanitizedAction === 'daily_login' || sanitizedAction === 'daily_casino_checkin') {
      updateData.dailyLoginStreak = (userAny.dailyLoginStreak ?? 0) + 1;
      updateData.dailyRewardsClaimed = (userAny.dailyRewardsClaimed ?? 0) + 1;
    }

    if (sanitizedAction === 'complete_daily_mission' || sanitizedAction === 'complete_weekly_mission') {
      updateData.completedMissions = (userAny.completedMissions ?? 0) + 1;
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    const { password: _password, ...safeUser } = updatedUser;
    void _password;
    return NextResponse.json({ user: safeUser, reward: { action: sanitizedAction, ...reward } }, { status: 200 });
  } catch (error) {
    console.error('Reward action error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

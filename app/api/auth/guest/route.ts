import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function isValidObjectId(id: unknown): id is string {
  return typeof id === 'string' && /^[0-9a-fA-F]{24}$/.test(id);
}


function makeGuestEmail() {
  const randomPart = Math.random().toString(36).slice(2, 10);
  return `guest_${Date.now()}_${randomPart}@guest.simocasino.local`;
}

export async function POST(request: NextRequest) {
  try {
    const { guestId, username } = await request.json().catch(() => ({}));

    if (guestId && typeof guestId === 'string' && isValidObjectId(guestId)) {
      const existingUser = await prisma.user.findUnique({ where: { id: guestId } });
      if (existingUser) {
        const { password: _password, ...safeUser } = existingUser as any;
      void _password;
        return NextResponse.json({ user: safeUser });
      }
    }

    const user = await prisma.user.create({
      data: {
        email: makeGuestEmail(),
        firstName: 'Guest',
        lastName: 'User',
        username: typeof username === 'string' && username.trim().length > 0
          ? username
          : `guest_${Math.random().toString(36).slice(2, 8)}`,
        lastIp: '0.0.0.0',
        lastCountry: 'Unknown',
        totalPoints: 10,
        coins: 100,
        currentLevel: 0,
        levelProgress: 10,
        xpToNextLevel: 100,
        lastLoginAt: new Date(),
        dailyLoginStreak: 0,
        dailyRewardsClaimed: 0,
        rewardActionsCompleted: ['guest_start'],
        lastRewardAt: new Date(),
      },
    });

    const { password: _password, ...safeUser } = user as any;
    void _password;
    return NextResponse.json({ user: safeUser });
  } catch (error) {
    console.error('Guest creation error:', error);
    return NextResponse.json(
      { error: 'Unable to create guest user' },
      { status: 500 }
    );
  }
}

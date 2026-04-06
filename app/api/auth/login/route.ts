import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = typeof body.password === 'string' ? String(body.password).trim() : '';

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username: email }],
      },
    });
    if (!user) {
      // For security, do not expose whether the email exists.
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    let passwordMatch = false;
    let rehashPassword = false;

    if (user.password) {
      const isHashed = user.password.startsWith('$2a$') || user.password.startsWith('$2b$') || user.password.startsWith('$2y$');
      if (isHashed) {
        passwordMatch = await bcrypt.compare(password, user.password);
      } else {
        passwordMatch = password === user.password;
        rehashPassword = passwordMatch;
      }
    }

    if (!passwordMatch) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    if (rehashPassword) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await prisma.user.update({ where: { email }, data: { password: hashedPassword } });
    }

    // Update last login and give daily bonus if not already claimed today
    const today = new Date().toISOString().split('T')[0];
    const lastDaily = user.lastDailyLoginAt ? user.lastDailyLoginAt.toISOString().split('T')[0] : null;

    const updateData: any = { lastLoginAt: new Date() };

    if (lastDaily !== today) {
      updateData.totalPoints = (user.totalPoints ?? 0) + 10;
      updateData.coins = (user.coins ?? 0) + 30;
      updateData.levelProgress = (user.levelProgress ?? 0) + 10;
      updateData.lastDailyLoginAt = new Date();
      updateData.dailyRewardsClaimed = (user.dailyRewardsClaimed ?? 0) + 1;
      updateData.dailyLoginStreak = (user.dailyLoginStreak ?? 0) + 1;
      updateData.lastRewardAt = new Date();
    }

    const updatedUser = await prisma.user.update({
      where: { email },
      data: updateData,
    });

    const { password: _password, ...safeUser } = updatedUser;
    void _password;

    return NextResponse.json({ user: safeUser }, { status: 200 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

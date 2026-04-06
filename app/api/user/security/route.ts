import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const SECURITY_SELECT = {
  id: true,
  twoFactorEnabled: true,
  recoveryEmail: true,
  recoveryPhone: true,
  loginAttempts: true,
  lastFailedLogin: true,
  accountActivityLogs: true,
};

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: SECURITY_SELECT,
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Security GET error:', error);
    return NextResponse.json({ error: 'Unable to load security preferences' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { userId, twoFactorEnabled, recoveryEmail, recoveryPhone } = body;

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  const updateData: Record<string, any> = {};

  if (typeof twoFactorEnabled === 'boolean') updateData.twoFactorEnabled = twoFactorEnabled;
  if (typeof recoveryEmail === 'string') updateData.recoveryEmail = recoveryEmail;
  if (typeof recoveryPhone === 'string') updateData.recoveryPhone = recoveryPhone;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: SECURITY_SELECT,
    });

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.error('Security PUT error:', error);
    return NextResponse.json({ error: 'Unable to update security preferences' }, { status: 500 });
  }
}

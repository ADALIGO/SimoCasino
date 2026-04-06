import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const NOTIFICATION_SELECT = {
  id: true,
  emailNotifications: true,
  pushNotifications: true,
  smsNotifications: true,
  notificationsEnabled: true,
};

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: NOTIFICATION_SELECT,
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Notification GET error:', error);
    return NextResponse.json({ error: 'Unable to load notification settings' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const {
    userId,
    emailNotifications,
    pushNotifications,
    smsNotifications,
    notificationsEnabled,
  } = body;

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  const updateData: Record<string, any> = {};

  if (typeof emailNotifications === 'boolean') updateData.emailNotifications = emailNotifications;
  if (typeof pushNotifications === 'boolean') updateData.pushNotifications = pushNotifications;
  if (typeof smsNotifications === 'boolean') updateData.smsNotifications = smsNotifications;
  if (typeof notificationsEnabled === 'boolean') updateData.notificationsEnabled = notificationsEnabled;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: NOTIFICATION_SELECT,
    });

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.error('Notification PUT error:', error);
    return NextResponse.json({ error: 'Unable to update notification settings' }, { status: 500 });
  }
}

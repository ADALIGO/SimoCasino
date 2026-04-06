import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = typeof body.password === 'string' ? String(body.password).trim() : '';

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Get IP address
    const ipAddress = request.headers.get('x-forwarded-for') ||
                      request.headers.get('x-real-ip') ||
                      '127.0.0.1';

    // Detect country from IP (mock for now, in production use a service)
    let userCountry = 'Unknown';
    try {
      // For localhost development, default to Morocco
      if (
        ipAddress === '127.0.0.1' ||
        ipAddress === '::1' ||
        ipAddress === '0.0.0.0' ||
        ipAddress.startsWith('192.168.') ||
        ipAddress.startsWith('10.') ||
        ipAddress.startsWith('172.')
      ) {
        userCountry = 'Morocco';
      } else {
        // Example using ipapi.co
        const response = await fetch(`http://ipapi.co/${ipAddress}/country_name/`);
        if (response.ok) {
          userCountry = await response.text();
        }
      }
    } catch (error) {
      console.warn('Failed to detect country from IP:', error);
      // Default to Morocco for development
      userCountry = 'Morocco';
    }

    // Create user with new-user starter rewards
    const user = await prisma.user.create({
      data: {
        firstName: name,
        lastName: '',
        email,
        password: hashedPassword,
        lastIp: ipAddress,
        lastCountry: userCountry,
        totalPoints: 20,
        coins: 1000,
        currentLevel: 0,
        levelProgress: 20,
        xpToNextLevel: 100,
        lastLoginAt: new Date(),
        lastDailyLoginAt: new Date(),
        dailyRewardsClaimed: 1,
        dailyLoginStreak: 1,
        rewardActionsCompleted: ['register'],
        lastRewardAt: new Date(),
      },
    });

    // Return user without password
    const { password: _password, ...userWithoutPassword } = user;
    void _password;

    return NextResponse.json(
      { message: 'User registered successfully', user: userWithoutPassword },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
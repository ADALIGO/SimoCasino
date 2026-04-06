import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const USER_SELECT = {
  id: true,
  email: true,
  username: true,
  firstName: true,
  lastName: true,
  profileImage: true,
  bannerImage: true,
  imageGallery: true,
  bio: true,
  personalQuote: true,
  signature: true,
  showFlagNextToUsername: true,
  hideGender: true,
  preferredCasinoType: true,
  favoriteGameType: true,
  firstGambleYear: true,
  biggestWin: true,
  favoriteMeal: true,
  favoriteMovie: true,
  favoriteMusicGenre: true,
  favoriteSeason: true,
  facebookProfile: true,
  twitterProfile: true,
  instagramProfile: true,
  newsletterSubscribed: true,
  dateOfBirth: true,
  gender: true,
  location: true,
  userTier: true,
  verificationStatus: true,
  emailNotifications: true,
  pushNotifications: true,
  smsNotifications: true,
  notificationsEnabled: true,
  twoFactorEnabled: true,
  recoveryEmail: true,
  recoveryPhone: true,
  isBanned: true,
  bannedReason: true,
  lastIp: true,
  lastCountry: true,
  city: true,
  region: true,
  timezone: true,
  userAgent: true,
  browser: true,
  os: true,
  deviceType: true,
  riskScore: true,
  totalPoints: true,
  coins: true,
  currentLevel: true,
  levelProgress: true,
  xpToNextLevel: true,
  streakDays: true,
  lastActiveAt: true,
  lastLoginAt: true,
  lastDailyLoginAt: true,
  dailyRewardsClaimed: true,
  dailyLoginStreak: true,
  vipPoints: true,
  rewardActionsCompleted: true,
  lastRewardAt: true,
  referralCode: true,
  referredBy: true,
  referralsCount: true,
  referralEarnings: true,
  totalEarnings: true,
  pendingEarnings: true,
  withdrawnEarnings: true,
  affiliateClicks: true,
  conversionCount: true,
  pageViews: true,
  engagementScore: true,
  retentionScore: true,
  likedCasinoIds: true,
  followedCasinoIds: true,
  favoriteCasinoId: true,
  createdAt: true,
  updatedAt: true,
};

function sanitizeDate(input?: string | null) {
  if (!input) return undefined;
  const date = new Date(input);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: USER_SELECT,
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const responseUser = {
      ...user,
      avatarUrl: user.profileImage || undefined,
    };

    return NextResponse.json({ user: responseUser });
  } catch (error) {
    console.error('User profile GET error:', error);
    return NextResponse.json({ error: 'Unable to load user profile' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const {
    userId,
    email,
    username,
    firstName,
    lastName,
    profileImage,
    bannerImage,
    imageGallery,
    bio,
    personalQuote,
    signature,
    showFlagNextToUsername,
    hideGender,
    preferredCasinoType,
    favoriteGameType,
    firstGambleYear,
    biggestWin,
    favoriteMeal,
    favoriteMovie,
    favoriteMusicGenre,
    favoriteSeason,
    facebookProfile,
    twitterProfile,
    instagramProfile,
    newsletterSubscribed,
    location,
    gender,
    dateOfBirth,
    referralCode,
  } = body;

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  const updateData: Record<string, any> = {};

  if (email !== undefined) updateData.email = email;
  if (username !== undefined) updateData.username = username;
  if (firstName !== undefined) updateData.firstName = firstName;
  if (lastName !== undefined) updateData.lastName = lastName;
  if (profileImage !== undefined) updateData.profileImage = profileImage;
  if (bannerImage !== undefined) updateData.bannerImage = bannerImage;
  if (imageGallery !== undefined) updateData.imageGallery = Array.isArray(imageGallery) ? imageGallery : [];
  if (bio !== undefined) updateData.bio = bio;
  if (personalQuote !== undefined) updateData.personalQuote = personalQuote;
  if (signature !== undefined) updateData.signature = signature;
  if (showFlagNextToUsername !== undefined) updateData.showFlagNextToUsername = showFlagNextToUsername;
  if (hideGender !== undefined) updateData.hideGender = hideGender;
  if (preferredCasinoType !== undefined) updateData.preferredCasinoType = preferredCasinoType;
  if (favoriteGameType !== undefined) updateData.favoriteGameType = favoriteGameType;
  if (firstGambleYear !== undefined) updateData.firstGambleYear = firstGambleYear;
  if (biggestWin !== undefined) updateData.biggestWin = biggestWin;
  if (favoriteMeal !== undefined) updateData.favoriteMeal = favoriteMeal;
  if (favoriteMovie !== undefined) updateData.favoriteMovie = favoriteMovie;
  if (favoriteMusicGenre !== undefined) updateData.favoriteMusicGenre = favoriteMusicGenre;
  if (favoriteSeason !== undefined) updateData.favoriteSeason = favoriteSeason;
  if (facebookProfile !== undefined) updateData.facebookProfile = facebookProfile;
  if (twitterProfile !== undefined) updateData.twitterProfile = twitterProfile;
  if (instagramProfile !== undefined) updateData.instagramProfile = instagramProfile;
  if (newsletterSubscribed !== undefined) updateData.newsletterSubscribed = newsletterSubscribed;
  if (location !== undefined) updateData.location = location;
  if (gender !== undefined) updateData.gender = gender;
  if (referralCode !== undefined) updateData.referralCode = referralCode;

  const formattedDate = sanitizeDate(dateOfBirth);
  if (formattedDate !== undefined) {
    updateData.dateOfBirth = formattedDate;
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: USER_SELECT,
    });

    const responseUser = {
      ...updatedUser,
      avatarUrl: updatedUser.profileImage || undefined,
    };

    return NextResponse.json({ user: responseUser });
  } catch (error) {
    console.error('User profile PUT error:', error);
    return NextResponse.json({ error: 'Unable to update user profile' }, { status: 500 });
  }
}

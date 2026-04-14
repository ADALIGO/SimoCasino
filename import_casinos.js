#!/usr/bin/env node

// Script to import casino data into MongoDB via Prisma
import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const dataPath = path.join(process.cwd(), 'casinos_data.json');
const casinosData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

const prisma = new PrismaClient();

function normalizeSlug(rawSlug, name) {
  const baseSlug = (rawSlug || name || '')
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-');
  return baseSlug || name.toString().trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

function makeUniqueSlug(baseSlug, usedSlugs) {
  let slug = baseSlug;
  let mergeIndex = 1;
  while (usedSlugs.has(slug)) {
    mergeIndex += 1;
    slug = `${baseSlug}-${mergeIndex}`;
  }
  usedSlugs.add(slug);
  return slug;
}

function normalizeBonus(bonus) {
  if (!bonus && bonus !== 0) return '';
  if (typeof bonus === 'string') return bonus;
  if (typeof bonus === 'object') {
    if (bonus === null) return '';
    if (typeof bonus.welcome === 'string') return bonus.welcome;
    if (typeof bonus.amount === 'string') return bonus.amount;
    if (typeof bonus.title === 'string') return bonus.title;
    return JSON.stringify(bonus);
  }
  return String(bonus);
}

function normalizeString(value) {
  if (typeof value === 'string') return value.trim();
  if (value === null || value === undefined) return undefined;
  return String(value).trim();
}

function normalizeNumber(value) {
  return typeof value === 'number' && !Number.isNaN(value) ? value : undefined;
}

function normalizeBoolean(value, fallback = false) {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    return ['true', '1', 'yes', 'y'].includes(value.toLowerCase());
  }
  if (typeof value === 'number') return value !== 0;
  if (Array.isArray(value)) return value.length > 0;
  return fallback;
}

function normalizeStringArray(value) {
  if (Array.isArray(value)) return value.filter((item) => item !== undefined && item !== null).map((item) => String(item));
  if (typeof value === 'string') return value.split(',').map((item) => item.trim()).filter(Boolean);
  return [];
}

function normalizeCurrencies(value) {
  const allowed = new Set(['USD', 'EUR', 'GBP', 'CAD', 'BTC', 'ETH', 'USDT', 'ADA']);
  const currencies = normalizeStringArray(value).map((item) => item.toUpperCase()).filter((item) => allowed.has(item));
  return currencies.length > 0 ? currencies : ['USD', 'EUR', 'CAD'];
}

function normalizeJson(value) {
  if (value === undefined) return undefined;
  return value;
}

async function importCasinos() {
  console.log(`🚀 Starting import of ${casinosData.length} casinos...`);

  let successCount = 0;
  let errorCount = 0;

  const existingSlugs = new Set(
    (await prisma.casino.findMany({ select: { slug: true } })).map((c) => c.slug)
  );
  const processedSlugs = new Set();

  for (const casino of casinosData) {
    try {
      const requestedSlug = normalizeSlug(casino.slug, casino.name);

      if (processedSlugs.has(requestedSlug)) {
        console.log(`⚠️ Skipping duplicate source slug: ${requestedSlug} (${casino.name})`);
        continue;
      }
      processedSlugs.add(requestedSlug);

      const slug = requestedSlug || makeUniqueSlug(normalizeSlug(undefined, casino.name), existingSlugs);

      const casinoData = {
        name: normalizeString(casino.name) || slug.replace(/-/g, ' '),
        country: normalizeString(casino.country) || 'Unknown',
        description: normalizeString(casino.description) || `${slug.replace(/-/g, ' ')} - Premium online casino`,
        bonus: normalizeBonus(casino.bonus),
        rating: normalizeNumber(casino.rating) ?? 0,
        revenueRank: normalizeNumber(casino.revenueRank),
        spins: normalizeNumber(casino.spins) ?? 0,
        providers: normalizeStringArray(casino.providers),
        likes: normalizeNumber(casino.likes) ?? 0,
        comments: normalizeNumber(casino.comments) ?? 0,
        operatingCountries: normalizeStringArray(casino.operatingCountries),
        languages: normalizeStringArray(casino.languages).length > 0 ? normalizeStringArray(casino.languages) : ['English'],
        license: normalizeString(casino.license) || undefined,
        appAvailable: casino.appAvailable !== undefined ? Boolean(casino.appAvailable) : false,
        minDeposit: normalizeNumber(casino.minDeposit),
        minWithdrawal: normalizeNumber(casino.minWithdrawal),
        withdrawalLimit: normalizeNumber(casino.withdrawalLimit),
        withdrawalTime: normalizeString(casino.withdrawalTime) || undefined,
        currencies: normalizeCurrencies(casino.currencies),
        vipLevels: normalizeNumber(casino.vipLevels),
        vipRewards: normalizeStringArray(casino.vipRewards),
        liveCasinoAvailable: casino.liveCasinoAvailable !== undefined ? Boolean(casino.liveCasinoAvailable) : false,
        website: normalizeString(casino.website) || undefined,
        supportEmail: normalizeString(casino.supportEmail) || undefined,
        supportPhone: normalizeString(casino.supportPhone) || undefined,
        avatarUrl: normalizeString(casino.avatarUrl) || undefined,
        imageUrl: normalizeString(casino.imageUrl) || undefined,
        imageGallery: normalizeStringArray(casino.imageGallery),
        jackpotAmount: normalizeNumber(casino.jackpotAmount),
        isFeatured: casino.isFeatured !== undefined ? Boolean(casino.isFeatured) : false,
        isNew: casino.isNew !== undefined ? Boolean(casino.isNew) : false,
        totalPlayers: normalizeNumber(casino.totalPlayers),
        monthlyActivePlayers: normalizeNumber(casino.monthlyActivePlayers),
        cryptoSupport: normalizeBoolean(casino.cryptoSupport, false),
        popularGames: normalizeStringArray(casino.popularGames),
        tournamentsActive: normalizeBoolean(casino.tournamentsActive, false),
        leaderboardEnabled: normalizeBoolean(casino.leaderboardEnabled, false),
        analyticsTracking: casino.analyticsTracking !== undefined ? normalizeBoolean(casino.analyticsTracking, true) : true,
        metaTitle: normalizeString(casino.metaTitle) || undefined,
        metaDescription: normalizeString(casino.metaDescription) || undefined,
        metaKeywords: normalizeStringArray(casino.metaKeywords),
        seoScore: normalizeNumber(casino.seoScore),
        organicTrafficScore: normalizeNumber(casino.organicTrafficScore),
        paidAdsScore: normalizeNumber(casino.paidAdsScore),
        affiliatePerformance: normalizeJson(casino.affiliatePerformance),
        socialMediaLinks: normalizeStringArray(casino.socialMediaLinks),
        socialFollowers: normalizeNumber(casino.socialFollowers),
        promotionsActive: normalizeBoolean(casino.promotionsActive, false),
        dailyActivePlayers: normalizeNumber(casino.dailyActivePlayers),
        weeklyActivePlayers: normalizeNumber(casino.weeklyActivePlayers),
        retentionRate: normalizeNumber(casino.retentionRate),
        churnRate: normalizeNumber(casino.churnRate),
        avgSessionDuration: normalizeNumber(casino.avgSessionDuration),
        avgBetPerUser: normalizeNumber(casino.avgBetPerUser),
        avgWinPerUser: normalizeNumber(casino.avgWinPerUser),
        maxBetPlaced: normalizeNumber(casino.maxBetPlaced),
        maxWin: normalizeNumber(casino.maxWin),
        jackpotHistory: normalizeStringArray(casino.jackpotHistory),
        bonusRedemptionRate: normalizeNumber(casino.bonusRedemptionRate),
        favoriteGamesIds: normalizeStringArray(casino.favoriteGamesIds),
        topPlayersIds: normalizeStringArray(casino.topPlayersIds),
        totalTournaments: normalizeNumber(casino.totalTournaments),
        tournamentWinners: normalizeStringArray(casino.tournamentWinners),
        topLeaderboardPlayers: normalizeStringArray(casino.topLeaderboardPlayers),
        specialEventsActive: normalizeBoolean(casino.specialEventsActive, false),
        seasonalRewards: normalizeStringArray(casino.seasonalRewards),
        vipTournamentEligible: normalizeBoolean(casino.vipTournamentEligible, false),
        tournamentPrizePool: normalizeNumber(casino.tournamentPrizePool),
        totalDeposits: normalizeNumber(casino.totalDeposits),
        totalWithdrawals: normalizeNumber(casino.totalWithdrawals),
        avgDepositAmount: normalizeNumber(casino.avgDepositAmount),
        avgWithdrawalAmount: normalizeNumber(casino.avgWithdrawalAmount),
        paymentMethods: normalizeStringArray(casino.paymentMethods),
        cryptoTransactions: normalizeNumber(casino.cryptoTransactions),
        fiatTransactions: normalizeNumber(casino.fiatTransactions),
        pendingWithdrawals: normalizeNumber(casino.pendingWithdrawals),
        suspiciousAccounts: normalizeStringArray(casino.suspiciousAccounts),
        chargebacks: normalizeNumber(casino.chargebacks),
        blockedIPs: normalizeStringArray(casino.blockedIPs),
        fraudScore: normalizeNumber(casino.fraudScore),
        accountFlags: normalizeStringArray(casino.accountFlags),
        antiMoneyLaunderingScore: normalizeNumber(casino.antiMoneyLaunderingScore),
        maxBetsPerUser: normalizeNumber(casino.maxBetsPerUser),
        maxWinsPerUser: normalizeNumber(casino.maxWinsPerUser),
        totalVIPPlayers: normalizeNumber(casino.totalVIPPlayers),
        vipRetentionRate: normalizeNumber(casino.vipRetentionRate),
        vipRewardsClaimed: normalizeStringArray(casino.vipRewardsClaimed),
        lifetimeVIPRevenue: normalizeNumber(casino.lifetimeVIPRevenue),
        vipEngagementScore: normalizeNumber(casino.vipEngagementScore),
        mobileUsers: normalizeNumber(casino.mobileUsers),
        desktopUsers: normalizeNumber(casino.desktopUsers),
        tabletUsers: normalizeNumber(casino.tabletUsers),
        deviceDiversityScore: normalizeNumber(casino.deviceDiversityScore),
        appDownloads: normalizeNumber(casino.appDownloads),
        appRetentionRate: normalizeNumber(casino.appRetentionRate),
        aiScore: normalizeNumber(casino.aiScore),
        aiRecommendedGames: normalizeStringArray(casino.aiRecommendedGames),
        predictedChurnScore: normalizeNumber(casino.predictedChurnScore),
        playerSegmentation: normalizeStringArray(casino.playerSegmentation),
        engagementPrediction: normalizeNumber(casino.engagementPrediction),
        userGeneratedContent: normalizeStringArray(casino.userGeneratedContent),
        forumThreads: normalizeStringArray(casino.forumThreads),
        reviewsCount: normalizeNumber(casino.reviewsCount),
        topReviewers: normalizeStringArray(casino.topReviewers),
        socialShares: normalizeNumber(casino.socialShares),
        communityEngagement: normalizeNumber(casino.communityEngagement),
        complaintsCount: normalizeNumber(casino.complaintsCount),
        supportTicketsOpen: normalizeNumber(casino.supportTicketsOpen),
        supportTicketsResolved: normalizeNumber(casino.supportTicketsResolved),
        averageResponseTime: normalizeNumber(casino.averageResponseTime),
        awards: normalizeStringArray(casino.awards),
        certifications: normalizeStringArray(casino.certifications),
        industryRank: normalizeNumber(casino.industryRank),
      };

      const cleanedData = Object.fromEntries(Object.entries(casinoData).filter(([, value]) => value !== undefined));

      // Upsert by canonical slug; duplicate source entries are skipped
      await prisma.casino.upsert({
        where: { slug },
        update: cleanedData,
        create: {
          ...cleanedData,
          slug,
        }
      });

      existingSlugs.add(slug);
      successCount++;
      console.log(`✅ Created: ${casino.name}`);

    } catch (error) {
      errorCount++;
      console.error(`❌ Error creating ${casino.name}:`, error.message);
    }
  }

  console.log(`\n📊 Import Summary:`);
  console.log(`   ✅ Successfully imported: ${successCount} casinos`);
  console.log(`   ❌ Errors: ${errorCount} casinos`);
  console.log(`   📈 Total processed: ${successCount + errorCount} casinos`);

  await prisma.$disconnect();
}

importCasinos().catch(console.error);
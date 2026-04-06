import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();
const ROOT_DIR = path.resolve(process.cwd());
const CASINO_FOLDER_ROOT = path.join(ROOT_DIR, 'data', 'casinoDATAjson');

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
  let idx = 1;
  while (usedSlugs.has(slug)) {
    idx += 1;
    slug = `${baseSlug}-${idx}`;
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

function normalizeBoolean(value, fallback = false) {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    return ['true', '1', 'yes', 'y'].includes(value.toLowerCase());
  }
  if (typeof value === 'number') return value !== 0;
  if (Array.isArray(value)) return value.length > 0;
  return fallback;
}

function normalizeString(value) {
  if (typeof value === 'string') return value.trim();
  if (value === null || value === undefined) return undefined;
  return String(value).trim();
}

function normalizeNumber(value) {
  return typeof value === 'number' && !Number.isNaN(value) ? value : undefined;
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

function buildCasinoRecord(casino, usedSlugs) {
  const slug = makeUniqueSlug(normalizeSlug(casino.slug, casino.name), usedSlugs);
  const name = normalizeString(casino.name) || slug.replace(/-/g, ' ');

  const record = {
    name,
    slug,
    country: normalizeString(casino.country) || 'Unknown',
    description: normalizeString(casino.description) || `${name} - Premium online casino`,
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
    appAvailable: normalizeBoolean(casino.appAvailable, false),
    minDeposit: normalizeNumber(casino.minDeposit),
    minWithdrawal: normalizeNumber(casino.minWithdrawal),
    withdrawalLimit: normalizeNumber(casino.withdrawalLimit),
    withdrawalTime: normalizeString(casino.withdrawalTime) || undefined,
    currencies: normalizeCurrencies(casino.currencies),
    vipLevels: normalizeNumber(casino.vipLevels),
    vipRewards: normalizeStringArray(casino.vipRewards),
    liveCasinoAvailable: normalizeBoolean(casino.liveCasinoAvailable, false),
    supportEmail: normalizeString(casino.supportEmail) || undefined,
    supportPhone: normalizeString(casino.supportPhone) || undefined,
    avatarUrl: normalizeString(casino.avatarUrl) || undefined,
    imageUrl: normalizeString(casino.imageUrl) || undefined,
    imageGallery: normalizeStringArray(casino.imageGallery),
    jackpotAmount: normalizeNumber(casino.jackpotAmount),
    isFeatured: normalizeBoolean(casino.isFeatured, false),
    isNew: normalizeBoolean(casino.isNew, false),
    totalPlayers: normalizeNumber(casino.totalPlayers),
    monthlyActivePlayers: normalizeNumber(casino.monthlyActivePlayers),
    cryptoSupport: normalizeBoolean(casino.cryptoSupport, false),
    popularGames: normalizeStringArray(casino.popularGames),
    tournamentsActive: normalizeBoolean(casino.tournamentsActive, false),
    leaderboardEnabled: normalizeBoolean(casino.leaderboardEnabled, false),
    analyticsTracking: casino.analyticsTracking !== undefined ? normalizeBoolean(casino.analyticsTracking, true) : true,
    vipRewards: normalizeStringArray(casino.vipRewards),
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

  return Object.fromEntries(Object.entries(record).filter(([, value]) => value !== undefined));
}

function loadCasinoData(folderPath) {
  const jsonPath = path.join(folderPath, 'data.json');
  if (!fs.existsSync(jsonPath)) return null;
  try {
    return JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  } catch (error) {
    return null;
  }
}

function buildCasinoRecord(casino, usedSlugs) {
  const slug = makeUniqueSlug(normalizeSlug(casino.slug, casino.name), usedSlugs);
  const name = casino.name || slug.replace(/-/g, ' ');

  return {
    name,
    slug,
    country: casino.country || 'Unknown',
    description: casino.description || `${name} - Premium online casino`,
    bonus: normalizeBonus(casino.bonus),
    rating: typeof casino.rating === 'number' ? casino.rating : 0,
    revenueRank: typeof casino.revenueRank === 'number' ? casino.revenueRank : null,
    spins: typeof casino.spins === 'number' ? casino.spins : 0,
    providers: normalizeStringArray(casino.providers),
    likes: typeof casino.likes === 'number' ? casino.likes : 0,
    comments: typeof casino.comments === 'number' ? casino.comments : 0,
    operatingCountries: normalizeStringArray(casino.operatingCountries),
    languages: normalizeStringArray(casino.languages).length > 0 ? normalizeStringArray(casino.languages) : ['English'],
    license: casino.license || 'MGA',
    appAvailable: normalizeBoolean(casino.appAvailable, true),
    minDeposit: typeof casino.minDeposit === 'number' ? casino.minDeposit : 10,
    minWithdrawal: typeof casino.minWithdrawal === 'number' ? casino.minWithdrawal : 20,
    withdrawalLimit: typeof casino.withdrawalLimit === 'number' ? casino.withdrawalLimit : 5000,
    withdrawalTime: casino.withdrawalTime || '24-48 hours',
    currencies: normalizeStringArray(casino.currencies).length > 0 ? normalizeStringArray(casino.currencies) : ['USD', 'EUR', 'CAD'],
    vipLevels: typeof casino.vipLevels === 'number' ? casino.vipLevels : 5,
    liveCasinoAvailable: normalizeBoolean(casino.liveCasinoAvailable, true),
    supportEmail: casino.supportEmail || `support@${name.toLowerCase().replace(/\s+/g, '')}.com`,
    supportPhone: casino.supportPhone || '+1-800-123-4567',
    avatarUrl: casino.avatarUrl || null,
    imageUrl: casino.imageUrl || null,
    imageGallery: normalizeStringArray(casino.imageGallery),
    jackpotAmount: typeof casino.jackpotAmount === 'number' ? casino.jackpotAmount : 0,
    isFeatured: normalizeBoolean(casino.isFeatured, false),
    isNew: normalizeBoolean(casino.isNew, false),
    totalPlayers: typeof casino.totalPlayers === 'number' ? casino.totalPlayers : 0,
    monthlyActivePlayers: typeof casino.monthlyActivePlayers === 'number' ? casino.monthlyActivePlayers : 0,
    cryptoSupport: normalizeBoolean(casino.cryptoSupport, false),
    popularGames: normalizeStringArray(casino.popularGames),
    tournamentsActive: normalizeBoolean(casino.tournamentsActive, false),
    leaderboardEnabled: normalizeBoolean(casino.leaderboardEnabled, false),
    analyticsTracking: casino.analyticsTracking !== undefined ? normalizeBoolean(casino.analyticsTracking, true) : true,
    vipRewards: normalizeStringArray(casino.vipRewards),
  };
}

async function main() {
  if (!fs.existsSync(CASINO_FOLDER_ROOT)) {
    console.error(`Casino folder root not found: ${CASINO_FOLDER_ROOT}`);
    process.exit(1);
  }

  const folderNames = fs.readdirSync(CASINO_FOLDER_ROOT).filter((name) => {
    const fullPath = path.join(CASINO_FOLDER_ROOT, name);
    return fs.statSync(fullPath).isDirectory();
  });

  if (folderNames.length === 0) {
    console.error('No casino folders found to import.');
    process.exit(1);
  }

  console.log(`Found ${folderNames.length} casino folders. Starting import...`);

  const usedSlugs = new Set(
    (await prisma.casino.findMany({ select: { slug: true } })).map((c) => c.slug)
  );

  const records = [];
  let skipped = 0;

  for (const folderName of folderNames) {
    const folderPath = path.join(CASINO_FOLDER_ROOT, folderName);
    const casino = loadCasinoData(folderPath);
    if (!casino || typeof casino !== 'object') {
      skipped += 1;
      continue;
    }
    if (!casino.name && !casino.slug) {
      skipped += 1;
      continue;
    }

    const record = buildCasinoRecord(casino, usedSlugs);
    records.push(record);
  }

  console.log(`Prepared ${records.length} records for import (${skipped} folders skipped).`);

  const BATCH_SIZE = 250;
  let totalCreated = 0;

  for (let i = 0; i < records.length; i += BATCH_SIZE) {
    const batch = records.slice(i, i + BATCH_SIZE);
    const result = await prisma.casino.createMany({ data: batch });
    totalCreated += result.count;
    console.log(`  Imported ${Math.min(i + BATCH_SIZE, records.length)}/${records.length}`);
  }

  console.log(`\n✅ Imported ${totalCreated} casinos from folders.`);
  await prisma.$disconnect();
}

main().catch(async (error) => {
  console.error('Import failed:', error);
  await prisma.$disconnect();
  process.exit(1);
});

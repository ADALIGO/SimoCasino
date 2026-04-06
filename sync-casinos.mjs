import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();
const dataPath = path.join(process.cwd(), 'casinos_data.json');

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
  let index = 1;
  while (usedSlugs.has(slug)) {
    index += 1;
    slug = `${baseSlug}-${index}`;
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

async function main() {
  console.log('📥 Loading casinos_data.json...');
  const casinosData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  console.log(`✅ Loaded ${casinosData.length} casinos`);

  let updated = 0;
  let created = 0;

  const usedSlugs = new Set(
    (await prisma.casino.findMany({ select: { slug: true } })).map((c) => c.slug)
  );

  for (const casino of casinosData) {
    const normalizedSlug = normalizeSlug(casino.slug, casino.name);
    const slugValue = makeUniqueSlug(normalizedSlug, usedSlugs);

    const data = {
      name: casino.name,
      slug: slugValue,
      country: casino.country || 'Unknown',
      description: casino.description || `${casino.name} - Premium online casino`,
      bonus: normalizeBonus(casino.bonus),
      rating: typeof casino.rating === 'number' ? casino.rating : 0,
      revenueRank: casino.revenueRank || null,
      spins: casino.spins || 0,
      providers: casino.providers || [],
      likes: casino.likes || 0,
      comments: casino.comments || 0,
      operatingCountries: casino.operatingCountries || [],
      languages: casino.languages || ['English'],
      license: casino.license || 'MGA',
      appAvailable: casino.appAvailable !== undefined ? casino.appAvailable : true,
      minDeposit: casino.minDeposit || 10,
      minWithdrawal: casino.minWithdrawal || 20,
      withdrawalLimit: casino.withdrawalLimit || 5000,
      withdrawalTime: casino.withdrawalTime || '24-48 hours',
      currencies: casino.currencies || ['USD', 'EUR', 'CAD'],
      vipLevels: casino.vipLevels || 5,
      liveCasinoAvailable: casino.liveCasinoAvailable !== undefined ? casino.liveCasinoAvailable : true,
      supportEmail: casino.supportEmail || `support@${slugValue}.com`,
      supportPhone: casino.supportPhone || '+1-800-123-4567',
      avatarUrl: casino.avatarUrl || null,
      imageUrl: casino.imageUrl || null,
      imageGallery: casino.imageGallery || [],
      jackpotAmount: casino.jackpotAmount || 0,
      isFeatured: casino.isFeatured || false,
      isNew: casino.isNew || false,
      totalPlayers: casino.totalPlayers || 0,
      monthlyActivePlayers: casino.monthlyActivePlayers || 0,
      cryptoSupport: casino.cryptoSupport || false,
      popularGames: casino.popularGames || [],
      tournamentsActive: casino.tournamentsActive || false,
      leaderboardEnabled: casino.leaderboardEnabled || false,
      analyticsTracking: casino.analyticsTracking !== undefined ? casino.analyticsTracking : true,
      vipRewards: casino.vipRewards || [],
    };


    const result = await prisma.casino.upsert({
      where: { slug: slugValue },
      create: data,
      update: data,
    });

    if (result) {
      // if upsert returns a record, we cannot know created vs updated directly; use anthor technique.
      // We can check existing by tracking slug for first run, but approximate by checks.
      updated += 1;
    }
  }

  const total = await prisma.casino.count();
  console.log(`✅ Upsert complete. Total casinos in DB: ${total}`);
  if (total !== casinosData.length) {
    console.log(`⚠️ Warning: expected ${casinosData.length} but got ${total}.`);
  }

  await prisma.$disconnect();
  process.exit(0);
}

main().catch(async (e) => {
  console.error('❌ sync-casinos failed', e);
  await prisma.$disconnect();
  process.exit(1);
});
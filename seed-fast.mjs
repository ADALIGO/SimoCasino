import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

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

console.log('Loading casinos_data.json...');
const casinosData = JSON.parse(fs.readFileSync('./casinos_data.json', 'utf-8'));
console.log(`✅ Loaded ${casinosData.length} casinos`);

async function seedCasinos() {
  console.log('🚀 Starting FAST bulk seed...');
  const startTime = Date.now();
  
  const BATCH_SIZE = 250;
  let totalCreated = 0;

  // Load existing slugs from DB to avoid collision with earlier records
  const usedSlugs = new Set(
    (await prisma.casino.findMany({ select: { slug: true } })).map((c) => c.slug)
  );

  for (let batchIndex = 0; batchIndex < casinosData.length; batchIndex += BATCH_SIZE) {
    const batch = casinosData.slice(batchIndex, batchIndex + BATCH_SIZE);
    
    const casinosToCreate = batch.map((casino) => {
      const slug = makeUniqueSlug(normalizeSlug(casino.slug, casino.name), usedSlugs);

      return {
        name: casino.name,
        slug,
        country: casino.country || 'Unknown',
        description: casino.description || `${casino.name} - Premium online casino`,
        bonus: normalizeBonus(casino.bonus),
        rating: typeof casino.rating === 'number' ? casino.rating : 0,
      revenueRank: casino.revenueRank,
      spins: casino.spins || 0,
      providers: casino.providers || [],
      likes: casino.likes || 0,
      comments: casino.comments || 0,
      operatingCountries: casino.operatingCountries || [],
      languages: casino.languages || ['English'],
      license: casino.license || 'MGA',
      appAvailable: true,
      minDeposit: 10,
      minWithdrawal: 20,
      withdrawalLimit: 5000,
      withdrawalTime: '24-48 hours',
      currencies: ['USD', 'EUR', 'CAD'],
      vipLevels: 5,
      liveCasinoAvailable: true,
      supportEmail: `support@${casino.name.toLowerCase().replace(/\s+/g, '')}.com`,
      supportPhone: '+1-800-123-4567',
      avatarUrl: casino.avatarUrl,
      imageUrl: casino.imageUrl,
      imageGallery: casino.imageGallery || [],
      jackpotAmount: casino.jackpotAmount || 0,
      isFeatured: casino.isFeatured || false,
      isNew: casino.isNew || false,
      totalPlayers: casino.totalPlayers || 0,
      monthlyActivePlayers: casino.monthlyActivePlayers || 0,
      cryptoSupport: Array.isArray(casino.cryptoSupport)
        ? casino.cryptoSupport.length > 0
        : Boolean(casino.cryptoSupport),
      popularGames: casino.popularGames || [],
      tournamentsActive: casino.tournamentsActive || false,
      leaderboardEnabled: casino.leaderboardEnabled || false,
      analyticsTracking: casino.analyticsTracking !== undefined ? casino.analyticsTracking : true,
      vipRewards: casino.vipRewards || [],
    };
    });

    try {
      const created = await prisma.casino.createMany({
        data: casinosToCreate,
      });
      
      totalCreated += created.count;
      const progress = Math.min(batchIndex + BATCH_SIZE, casinosData.length);
      console.log(`⏳ Progress: ${progress}/${casinosData.length} (${created.count} created in this batch)`);
    } catch (error) {
      console.error(`❌ Batch error at index ${batchIndex}:`, error);
      if (error && typeof error === 'object' && 'meta' in error) {
        console.error('Error meta:', error.meta);
      }
      throw error;
    }
  }

  const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`\n✅ Successfully created ${totalCreated} casinos in ${elapsedTime}s!`);
  
  return totalCreated;
}

seedCasinos()
  .then(async (count) => {
    console.log(`🎉 Seed completed! Total: ${count} casinos`);
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (error) => {
    console.error('❌ Seeding failed:', error.message);
    if (error.stack) console.error(error.stack);
    await prisma.$disconnect();
    process.exit(1);
  });
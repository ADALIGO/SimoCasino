import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();

function normalizeSlug(rawSlug: string | undefined, name: string) {
  const baseSlug = (rawSlug || name || '')
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-');
  return baseSlug || name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

function makeUniqueSlug(baseSlug: string, usedSlugs: Set<string>) {
  let slug = baseSlug;
  let index = 1;
  while (usedSlugs.has(slug)) {
    index += 1;
    slug = `${baseSlug}-${index}`;
  }
  usedSlugs.add(slug);
  return slug;
}

function normalizeBonus(bonus: unknown): string {
  if (!bonus && bonus !== 0) return '';
  if (typeof bonus === 'string') return bonus;
  if (typeof bonus === 'object') {
    const anyBonus = bonus as Record<string, unknown>;
    if (typeof anyBonus.welcome === 'string') return anyBonus.welcome;
    if (typeof anyBonus.amount === 'string') return anyBonus.amount;
    if (typeof anyBonus.title === 'string') return anyBonus.title;
    return JSON.stringify(bonus);
  }
  return String(bonus);
}

// Load casino data from JSON file
const dataPath = path.join(__dirname, '../casinos_data.json');
const casinosData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

console.log(`✅ Loaded ${casinosData.length} casinos from casinos_data.js`);

async function main() {
  console.log('🚀 Starting FAST bulk seed...');
  const startTime = Date.now();

  // Prepare casino data in batches
  const BATCH_SIZE = 500;
  let totalCreated = 0;

  // preload used slugs from DB so we can keep names unique across runs
  const existingCasinoSlugs = new Set<string>(
    (await prisma.casino.findMany({ select: { slug: true } })).map((c: any) => c.slug)
  );

  for (let batchIndex = 0; batchIndex < casinosData.length; batchIndex += BATCH_SIZE) {
    const batch = casinosData.slice(batchIndex, batchIndex + BATCH_SIZE);
    
    const casinosToCreate = batch.map((casino: any) => {
      const initialSlug = normalizeSlug(casino.slug, casino.name);
      const slug = makeUniqueSlug(initialSlug, existingCasinoSlugs);

      return {
        name: casino.name,
        slug,
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
    });

    try {
      const created = await prisma.casino.createMany({ data: casinosToCreate });
      totalCreated += created.count;
      const progress = Math.min(batchIndex + BATCH_SIZE, casinosData.length);
      console.log(`⏳ Progress: ${progress}/${casinosData.length} (${created.count} in this batch)`);
    } catch (error: any) {
      console.error(`❌ Batch error at index ${batchIndex}:`, error?.message || String(error));
    }
  }

  const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`\n✅ Successfully created ${totalCreated} casinos in ${elapsedTime}s!`);

  // Add test user for development
  try {
    const hashedPassword = await bcrypt.hash('Password123!', 10);
    await prisma.user.create({
      data: {
        email: 'test@simocasino.com',
        password: hashedPassword,
        firstName: 'Test',
        lastName: 'User',
        userTier: 'FREE',
        totalPoints: 1000,
        coins: 5000,
        lastCountry: 'United States',
      },
    });
    console.log('✅ Test user created');
  } catch (error) {
    console.log('ℹ️  Test user already exists');
  }

  console.log('\n🎉 Seed completed successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('✅ Done!');
    process.exit(0);
  })
  .catch(async (e) => {
    console.error('❌ Error:', e);
    if (e.stack) console.error(e.stack);
    await prisma.$disconnect();
    process.exit(1);
  });

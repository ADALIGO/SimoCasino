import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const CLEAN_FILE = path.join(process.cwd(), 'casinos_data_clean.json');
const prisma = new PrismaClient();

async function importCleanData(dropDb = false) {
  if (!fs.existsSync(CLEAN_FILE)) {
    console.error(`❌ Clean data file not found: ${CLEAN_FILE}`);
    console.log('Run the cleanup first: node clear-casinos.mjs --max=4000 --no-search');
    process.exit(1);
  }

  const cleanData = JSON.parse(fs.readFileSync(CLEAN_FILE, 'utf8'));

  if (dropDb) {
    console.log('🧹 Clearing existing casino collection...');
    await prisma.casino.deleteMany({});
    console.log('✅ Database cleared');
  }

  console.log(`📦 Importing ${cleanData.length} verified casinos...`);

  let importedCount = 0;
  let skippedCount = 0;

  for (const casino of cleanData) {
    try {
      const data = {
        name: casino.name,
        slug: casino.slug,
        country: casino.country || 'Unknown',
        description: casino.description || `${casino.name} verified online casino`,
        bonus: casino.bonus || '',
        rating: casino.rating ?? 0,
        revenueRank: casino.revenueRank,
        spins: casino.spins ?? 0,
        providers: casino.providers || [],
        likes: casino.likes ?? 0,
        comments: casino.comments ?? 0,
        operatingCountries: casino.operatingCountries || [],
        languages: casino.languages || ['English'],
        license: casino.license || casino.websiteLicense,
        liveCasinoAvailable: casino.liveCasinoAvailable ?? casino.liveCasino ?? false,
        avatarUrl: casino.avatarUrl,
        imageUrl: casino.imageUrl,
        imageGallery: casino.imageGallery || [],
        website: casino.verifiedWebsite,
        affiliateLink: casino.verifiedWebsite,
        metaTitle: casino.metaTitle,
        metaDescription: casino.metaDescription,
        metaKeywords: casino.metaKeywords || [],
        promotionsActive: casino.promotionsActive ?? false,
      };

      await prisma.casino.upsert({
        where: { slug: casino.slug },
        create: data,
        update: data,
      });

      importedCount += 1;

      if (importedCount % 10 === 0) {
        console.log(`✅ Imported ${importedCount}/${cleanData.length} casinos...`);
      }

    } catch (error) {
      console.error(`❌ Failed to import ${casino.name}:`, error.message);
      skippedCount += 1;
    }
  }

  console.log(`\n🎉 IMPORT COMPLETED!`);
  console.log(`✅ Successfully imported: ${importedCount} casinos`);
  console.log(`❌ Failed to import: ${skippedCount} casinos`);
  console.log(`📊 Total in database: ${importedCount} verified casinos ready for your platform!`);

  await prisma.$disconnect();
}

// Check command line args
const dropDb = process.argv.includes('--drop-db') || process.argv.includes('-d');

importCleanData(dropDb).catch(async (error) => {
  console.error('❌ Import failed:', error?.stack || error);
  await prisma.$disconnect();
  process.exit(1);
});
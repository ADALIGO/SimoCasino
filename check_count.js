import { PrismaClient } from '@prisma/client';

async function checkCasinoCount() {
  const prisma = new PrismaClient();

  try {
    const count = await prisma.casino.count();
    console.log('Total casinos in database:', count);

    // Also check a sample casino to verify data
    const sample = await prisma.casino.findFirst({
      select: {
        name: true,
        avatarUrl: true,
        imageUrl: true,
        imageGallery: true
      }
    });

    if (sample) {
      console.log('Sample casino:', sample);
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkCasinoCount();
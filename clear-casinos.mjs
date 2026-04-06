import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearAndSeed() {
  console.log('🗑️  Dropping current database...');
  await prisma.$runCommandRaw({ dropDatabase: 1 });
  console.log('✅ Database dropped successfully!');
  await prisma.$disconnect();
}

clearAndSeed().catch(async (e) => {
  console.error('❌ Failed:', e.message);
  await prisma.$disconnect();
  process.exit(1);
});

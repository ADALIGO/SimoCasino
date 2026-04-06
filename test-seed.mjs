import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function testSeed() {
  console.log('📝 Testing seed with 1 casino...');
  
  try {
    const result = await prisma.casino.createMany({
      data: [{
        name: 'Test Casino',
        slug: 'test-casino-unique-' + Date.now(),
        country: 'United States',
        bonus: 'Test Bonus $100',
        rating: 4.5,
        providers: ['NetEnt'],
        avatarUrl: 'https://example.com/test.png',
        imageUrl: 'https://example.com/image.png',
      }],
    });
    
    console.log('✅ Created:', result.count, 'casinos');
    
    const count = await prisma.casino.count();
    console.log('📊 Total in DB:', count);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testSeed();
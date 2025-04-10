// lib/prisma.js
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query', 'error', 'warn'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Test DB connection immediately
async function testConnection() {
  try {
    await prisma.$connect();
    console.log('[Prisma] Database connected successfully ✅');
  } catch (error) {
    console.error('[Prisma] Database connection failed ❌', error);
    process.exit(1); // Optional: shut down the app if DB fails
  }
}

testConnection();

import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

function createPrismaClient() {
  if (!process.env.DATABASE_URL) {
    return undefined;
  }

  return new PrismaClient();
}

const prismaClient = global.prisma ?? createPrismaClient();

export const prisma = prismaClient;

if (process.env.NODE_ENV !== 'production' && prismaClient) {
  global.prisma = prismaClient;
}

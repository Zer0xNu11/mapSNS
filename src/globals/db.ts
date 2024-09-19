// import { PrismaClient } from '@prisma/client';

// const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

// export const prismadb = globalForPrisma.prisma || new PrismaClient();

import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

export const prismadb = globalThis.prismaGlobal ?? prismaClientSingleton()


if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prismadb
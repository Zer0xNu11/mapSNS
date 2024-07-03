import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

export const prismadb = globalForPrisma.prisma || new PrismaClient();


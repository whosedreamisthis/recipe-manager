// lib/prisma.ts
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const globalForPrisma = (global as unknown) as { prisma: PrismaClient };

// We use the Prisma URL provided by Vercel for the connection pool
const connectionString = process.env.POSTGRES_PRISMA_URL;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

export const prisma =
	globalForPrisma.prisma ||
	new PrismaClient({
		adapter, // This is the Prisma 7 way
	});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

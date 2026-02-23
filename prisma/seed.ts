// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { SEED_RECIPES } from '../data/seed-recipes';
import * as dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

const connectionString = process.env.POSTGRES_PRISMA_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

// In Prisma 7, the adapter is mandatory in the constructor
const prisma = new PrismaClient({ adapter });

async function main() {
	console.log('🚀 Start seeding...');

	for (const recipe of SEED_RECIPES) {
		const { id, ...recipeData } = recipe;

		await prisma.recipe.create({
			data: {
				...recipeData,
				// INJECT MISSING FIELD HERE
				authorId: 'seed-admin-id',

				// Ensure types are correct
				prepTime: Number(recipeData.prepTime),
				cookTime: Number(recipeData.cookTime),
				categories: recipeData.categories || [],
			},
		});
	}
	console.log('✅ Seeding finished successfully!');
}

main()
	.catch((e) => {
		console.error('❌ Seeding error:', e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});

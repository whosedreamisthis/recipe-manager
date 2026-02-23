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

const prisma = new PrismaClient({ adapter });

async function main() {
	console.log('🚀 Start seeding...');

	for (const recipe of SEED_RECIPES) {
		// 1. Destructure to pull 'id' and 'likes' out, so they aren't in 'restOfRecipeData'
		const { id, likes, ...restOfRecipeData } = recipe;

		await prisma.recipe.create({
			data: {
				...restOfRecipeData,
				authorId: 'seed-admin-id',

				// 2. Ensure types are correct for numbers and arrays
				prepTime: Number(restOfRecipeData.prepTime) || 0,
				cookTime: Number(restOfRecipeData.cookTime) || 0,
				categories: restOfRecipeData.categories || [],

				// 3. ingredients and instructions are handled automatically by Prisma
				// if they are standard arrays in your seed data.
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

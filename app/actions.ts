'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// --- 🥗 RECIPE FETCHING ACTIONS ---

export async function fetchRecipes(
	page: number = 1,
	limit: number = 12,
	query: string = '',
	category: string = '',
) {
	const skip = (page - 1) * limit;

	// Build the dynamic Prisma 'where' clause
	const where: any = {};

	if (query) {
		where.title = {
			contains: query,
			mode: 'insensitive', // Makes search case-insensitive
		};
	}

	if (category && category !== 'My Recipes') {
		where.categories = {
			has: category,
		};
	}

	try {
		const [recipes, totalCount] = await Promise.all([
			prisma.recipe.findMany({
				where,
				skip,
				take: limit,
				orderBy: { createdAt: 'desc' },
			}),
			prisma.recipe.count({ where }),
		]);

		const hasMore = skip + limit < totalCount;

		return {
			// Prisma JSON fields need a quick cast to match your Recipe type
			recipes: recipes as any[],
			hasMore,
		};
	} catch (error) {
		console.error('Fetch Recipes Error:', error);
		return { recipes: [], hasMore: false };
	}
}

/**
 * Single Recipe: Fetch details for a specific ID from Postgres
 */
export const fetchRecipe = async (recipeId: string) => {
	try {
		return await prisma.recipe.findUnique({
			where: { id: recipeId },
		});
	} catch (error) {
		console.error('Fetch Single Recipe Error:', error);
		return null;
	}
};

// --- 🛠️ ADMIN / MUTATION ACTIONS ---

export const addRecipe = async (recipeData: any) => {
	try {
		const newRecipe = await prisma.recipe.create({
			data: {
				title: recipeData.title,
				description: recipeData.description,
				author: recipeData.author,
				authorId: recipeData.authorId,
				prepTime: Number(recipeData.prepTime),
				cookTime: Number(recipeData.cookTime),
				image: recipeData.image,
				categories: [...recipeData.categories, 'My Recipes'],
				ingredients: recipeData.ingredients,
				instructions: recipeData.instructions,
			},
		});

		revalidatePath('/');
		return { success: true, recipeId: newRecipe.id };
	} catch (error) {
		console.error('Prisma Create Error:', error);
		return { success: false };
	}
};

export const deleteRecipe = async (recipeId: string) => {
	try {
		await prisma.recipe.delete({
			where: { id: recipeId },
		});

		revalidatePath('/');
		return { success: true };
	} catch (error) {
		console.error('Delete Error:', error);
		return { success: false };
	}
};

export async function fetchMyRecipes(userId: string) {
	try {
		// Better to filter by authorId (unique Clerk ID) than author name
		return await prisma.recipe.findMany({
			where: { authorId: userId },
			orderBy: { createdAt: 'desc' },
		});
	} catch (error) {
		console.error('Fetch My Recipes Error:', error);
		return [];
	}
}

// --- ❤️ LIKES & SAVED (Simple Implementation) ---
// Note: For a real app, you'd want a separate "Like" table,
// but for now, we can increment the like count on the recipe.

export async function toggleLikeAction(recipeId: string) {
	try {
		await prisma.recipe.update({
			where: { id: recipeId },
			data: {
				likes: { increment: 1 }, // Simplified logic
			},
		});
		revalidatePath('/');
	} catch (error) {
		console.error('Like Error:', error);
	}
}

export async function getSavedRecipes(ids: string[] = []): Promise<any[]> {
	try {
		if (ids.length === 0) return [];

		const recipes = await prisma.recipe.findMany({
			where: {
				id: { in: ids },
			},
		});

		return recipes;
	} catch (error) {
		console.error('Error fetching saved recipes:', error);
		return [];
	}
}

export async function toggleSaveAction(recipeId: string) {
	// In a full DB implementation, this would connect to a 'SavedRecipes' table
	// For now, we revalidate the paths to ensure the UI updates if you're using local state
	console.log(`Toggle save triggered for: ${recipeId}`);

	revalidatePath('/');
	revalidatePath(`/recipes/${recipeId}`);

	return { success: true };
}

export async function getSavedIds(): Promise<string[]> {
	// Eventually: return await prisma.savedRecipe.findMany(...)
	return [];
}

export async function getLikedIds(): Promise<string[]> {
	// Eventually: return await prisma.like.findMany(...)
	return [];
}

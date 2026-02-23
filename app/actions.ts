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
	// 1. Calculate pagination offset
	const skip = (page - 1) * limit;

	// 2. Build the dynamic filter (Where clause)
	const where: any = {};

	if (query) {
		where.title = {
			contains: query,
			mode: 'insensitive', // Makes "Pasta" match "pasta"
		};
	}

	if (category && category !== 'My Recipes') {
		where.categories = {
			has: category,
		};
	}

	try {
		// 3. Execute both queries in parallel for performance
		const [recipes, totalCount] = await Promise.all([
			prisma.recipe.findMany({
				where,
				skip,
				take: limit,
				orderBy: { createdAt: 'desc' },
				include: {
					// This allows us to get the count of the Likes relationship
					// without fetching every individual Like record
					_count: {
						select: { likes: true },
					},
				},
			}),
			prisma.recipe.count({ where }),
		]);

		// 4. Calculate if there's a next page
		const hasMore = skip + limit < totalCount;

		// 5. Map the data to fix the "NaN" issue
		// We transform the '_count' object into a single 'likes' number
		// so the frontend stays clean and easy to read.
		const formattedRecipes = recipes.map((r) => ({
			...r,
			likes: r._count?.likes ?? 0, // Fallback to 0 if count is missing
		}));

		return {
			recipes: formattedRecipes,
			hasMore,
		};
	} catch (error) {
		console.error('Fetch Recipes Error:', error);
		// Return empty state on error to prevent the UI from crashing
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

export async function toggleLikeAction(recipeId: string, userId: string) {
	if (!userId) {
		console.error('User ID is required to like a recipe');
		return { success: false, error: 'Not authenticated' };
	}

	try {
		const existing = await prisma.like.findUnique({
			where: {
				userId_recipeId: { userId, recipeId },
			},
		});

		if (existing) {
			await prisma.like.delete({ where: { id: existing.id } });
		} else {
			await prisma.like.create({ data: { userId, recipeId } });
		}

		revalidatePath('/');
		return { success: true };
	} catch (error) {
		console.error(error);
		return { success: false };
	}
}

export async function getLikedIds(userId: string): Promise<string[]> {
	// If no user is logged in, return an empty array immediately
	if (!userId) return [];

	try {
		const likes = await prisma.like.findMany({
			where: {
				userId: userId,
			},
			select: {
				recipeId: true, // We only need the ID of the recipe
			},
		});

		// Transform [{ recipeId: '1' }, { recipeId: '2' }] into ['1', '2']
		return likes.map((like) => like.recipeId);
	} catch (error) {
		console.error('❌ Error in getLikedIds:', error);
		return [];
	}
}

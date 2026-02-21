'use server';

import { SEED_RECIPES } from '@/data/seed-recipes';
import { Recipe } from '@/lib/types';
import { revalidatePath } from 'next/cache';

// --- 🗄️ PERSISTENT MOCK DATABASE STATE ---
type GlobalDatabase = {
	db: Recipe[];
	savedIds: Set<string>;
	likedIds: Set<string>;
};

const globalForDb = (global as unknown) as GlobalDatabase;

/**
 * Internal helper to initialize the global store.
 * Marked async to satisfy 'use server' requirements for exported helpers.
 */
export const getDb = async () => {
	if (!globalForDb.db) {
		globalForDb.db = [...SEED_RECIPES];
	}
	if (!globalForDb.savedIds) globalForDb.savedIds = new Set<string>();
	if (!globalForDb.likedIds) globalForDb.likedIds = new Set<string>();

	return globalForDb;
};

// --- 🥗 RECIPE FETCHING ACTIONS ---

/**
 * Main Feed: Fetches paginated recipes from the global master list
 */
export async function fetchRecipes(page: number = 1, limit: number = 12) {
	await new Promise((resolve) => setTimeout(resolve, 500));

	const { db } = await getDb(); // Correctly access the global db

	const start = (page - 1) * limit;
	const end = start + limit;

	const recipes = db.slice(start, end);
	const hasMore = end < db.length;

	return { recipes, hasMore };
}

/**
 * Single Recipe: Fetch details for a specific ID
 */
export const fetchRecipe = async (recipeId: string) => {
	await new Promise((res) => setTimeout(res, 500));
	const { db } = await getDb();

	return db.find((recipe) => recipe.id === recipeId);
};

// --- ❤️ SAVED / VAULT ACTIONS ---

export async function getSavedRecipes(): Promise<Recipe[]> {
	await new Promise((res) => setTimeout(res, 300));
	const { db, savedIds } = await getDb();
	return db.filter((recipe) => savedIds.has(recipe.id));
}

export async function getSavedIds(): Promise<string[]> {
	const { savedIds } = await getDb();
	return Array.from(savedIds);
}

export async function toggleSaveAction(recipeId: string) {
	await new Promise((res) => setTimeout(res, 300));
	const { savedIds } = await getDb();

	if (savedIds.has(recipeId)) {
		savedIds.delete(recipeId);
	} else {
		savedIds.add(recipeId);
	}

	revalidatePath('/');
	revalidatePath(`/recipes/${recipeId}`);
}

// --- 👍 LIKE ACTIONS ---

export async function getLikedIds(): Promise<string[]> {
	const { likedIds } = await getDb();
	return Array.from(likedIds);
}

export async function toggleLikeAction(recipeId: string) {
	await new Promise((res) => setTimeout(res, 300));
	const { likedIds } = await getDb();

	if (likedIds.has(recipeId)) {
		likedIds.delete(recipeId);
	} else {
		likedIds.add(recipeId);
	}

	revalidatePath('/');
}

// --- 🛠️ ADMIN / MUTATION ACTIONS ---

export const addRecipe = async (recipeData: Omit<Recipe, 'id'>) => {
	await new Promise((res) => setTimeout(res, 1000));
	const { db } = await getDb();

	const newId = crypto.randomUUID();

	const newRecipe: Recipe = {
		...recipeData,
		id: newId,
		author: recipeData.author || 'Guest',
		likes: recipeData.likes ?? 0,
	};

	// Update the global reference array
	globalForDb.db = [newRecipe, ...db];

	revalidatePath('/');
	revalidatePath(`/recipes/${newId}`);

	return { success: true, recipeId: newId };
};

export const deleteRecipe = async (recipeId: string) => {
	await new Promise((res) => setTimeout(res, 1000));
	const { savedIds, likedIds } = await getDb();

	globalForDb.db = globalForDb.db.filter((recipe) => recipe.id !== recipeId);

	savedIds.delete(recipeId);
	likedIds.delete(recipeId);

	revalidatePath('/');
	return { success: true };
};

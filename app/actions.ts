'use server';

import { SEED_RECIPES } from '@/data/seed-recipes';
import { Recipe } from '@/lib/types';
import { revalidatePath } from 'next/cache';

// --- 🗄️ MOCK DATABASE STATE ---
// These live in the server's memory.
// Note: These will reset if the dev server restarts.
let db = [...SEED_RECIPES];
const MOCK_SAVED_IDS = new Set<string>();
const MOCK_LIKED_IDS = new Set<string>();

// --- 🥗 RECIPE FETCHING ACTIONS ---

/**
 * Main Feed: Fetches paginated recipes from the master list
 */
export async function fetchRecipes(page: number = 1, limit: number = 12) {
	await new Promise((resolve) => setTimeout(resolve, 500));

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
	return db.find((recipe) => recipe.id === recipeId);
};

// --- ❤️ SAVED / VAULT ACTIONS ---

/**
 * Get Saved: Filters the master list based on the saved IDs
 */
export async function getSavedRecipes(): Promise<Recipe[]> {
	await new Promise((res) => setTimeout(res, 300));
	return db.filter((recipe) => MOCK_SAVED_IDS.has(recipe.id));
}

/**
 * Get Saved IDs: Returns just the IDs (used for heart/bookmark icons)
 */
export async function getSavedIds(): Promise<string[]> {
	return Array.from(MOCK_SAVED_IDS);
}

/**
 * Toggle Save: Adds/Removes ID from the vault
 */
export async function toggleSaveAction(recipeId: string) {
	await new Promise((res) => setTimeout(res, 300));

	if (MOCK_SAVED_IDS.has(recipeId)) {
		MOCK_SAVED_IDS.delete(recipeId);
	} else {
		MOCK_SAVED_IDS.add(recipeId);
	}

	revalidatePath('/');
	revalidatePath(`/recipes/${recipeId}`);
}

// --- 👍 LIKE ACTIONS ---

/**
 * Get Liked IDs: Returns list of IDs the user has liked
 */
export async function getLikedIds(): Promise<string[]> {
	return Array.from(MOCK_LIKED_IDS);
}

/**
 * Toggle Like: Logic for liking a recipe
 */
export async function toggleLikeAction(recipeId: string) {
	await new Promise((res) => setTimeout(res, 300));

	if (MOCK_LIKED_IDS.has(recipeId)) {
		MOCK_LIKED_IDS.delete(recipeId);
		// Optional: If your Recipe type has a .likes property,
		// you would decrement it in 'db' here.
	} else {
		MOCK_LIKED_IDS.add(recipeId);
	}

	revalidatePath('/');
}

// --- 🛠️ ADMIN / MUTATION ACTIONS ---

export const addRecipe = async (recipe: Recipe) => {
	await new Promise((res) => setTimeout(res, 1000));
	db = [recipe, ...db];
	return { success: true };
};

export const deleteRecipe = async (recipeId: string) => {
	await new Promise((res) => setTimeout(res, 1000));

	db = db.filter((recipe) => recipe.id !== recipeId);

	// Cleanup user interactions for this recipe
	MOCK_SAVED_IDS.delete(recipeId);
	MOCK_LIKED_IDS.delete(recipeId);

	revalidatePath('/');
	return { success: true };
};

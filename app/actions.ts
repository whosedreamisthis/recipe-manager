'use server';
import { SEED_RECIPES } from '@/data/seed-recipes';
import { Recipe } from '@/lib/types';

let db = SEED_RECIPES;

export async function fetchRecipes(page: number = 1, limit: number = 12) {
	// Simulate a database delay
	await new Promise((resolve) => setTimeout(resolve, 500));

	const start = (page - 1) * limit;
	const end = start + limit;

	const recipes = SEED_RECIPES.slice(start, end);
	const hasMore = end < SEED_RECIPES.length;
	console.log('RECIPES', SEED_RECIPES.slice(start, end)[11]);
	return { recipes, hasMore };
}

export const fetchRecipe = async (recipeId: string) => {
	await new Promise((res) => setTimeout(res, 2000));
	return db.find((recipe) => recipe.id === recipeId);
};

export const addRecipe = async (recipe: Recipe) => {
	await new Promise((res) => setTimeout(res, 2000));

	db.push(recipe);
	return { success: true };
};

export const deleteRecipe = async (recipeId: string) => {
	await new Promise((res) => setTimeout(res, 2000));

	db = db.filter((recipe) => recipeId === recipe.id);
	return { success: true };
};

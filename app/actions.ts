'use server';
import { SEED_RECIPES } from '@/data/seed-recipes';
import { Recipe } from '@/lib/types';

let db = SEED_RECIPES;

export const fetchRecipes = async () => {
	await new Promise((res) => setTimeout(res, 2000));
	return [...db];
};

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

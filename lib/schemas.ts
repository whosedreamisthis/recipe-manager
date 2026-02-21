import { z } from 'zod';

export const ingredientSchema = z.object({
	name: z.string(),
	quantity: z.number(),
	unit: z.string(),
});
export const recipeSchema = z.object({
	title: z.string(),
	description: z.string(),
	categories: z.array(z.string()),
	prepTime: z.number(),
	cookTime: z.number(),
	image: z.string(),
	ingredients: z.array(ingredientSchema),
	instructions: z.array(z.string()),
});

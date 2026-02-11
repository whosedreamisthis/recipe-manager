import React from 'react';

import RecipeList from '@/components/RecipeList';
import { fetchRecipes } from '../actions';
export default async function RecipesPage() {
	const recipes = await fetchRecipes();
	return (
		<div>
			<RecipeList recipes={recipes} />
		</div>
	);
}

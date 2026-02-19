import React from 'react';

import RecipeList from '@/components/RecipeList';
import { fetchRecipes } from '../actions';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { RECIPE_CATEGORIES } from '@/data/seed-recipes';
import CategoryBar from '@/components/CategoryBar';
import SearchBar from '@/components/SearchBar';
export default async function RecipesPage() {
	const recipes = await fetchRecipes();

	return (
		<div>
			<SearchBar />
			<CategoryBar />

			<RecipeList recipes={recipes} />
		</div>
	);
}

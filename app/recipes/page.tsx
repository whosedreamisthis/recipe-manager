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
	// Fetch only the first 12 recipes for the initial load
	const { recipes, hasMore } = await fetchRecipes(1, 12);

	return (
		<div className="container mx-auto px-4">
			<SearchBar />
			<CategoryBar />

			{/* Pass 'recipes' and 'hasMore' to your list. 
          Note: You'll need to update RecipeList to handle the "Load More" logic 
      */}
			<RecipeList initialRecipes={recipes} initialHasMore={hasMore} />
		</div>
	);
}

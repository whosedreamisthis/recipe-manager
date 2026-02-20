import React from 'react';

import RecipeList from '@/components/RecipeList';
import CategoryBar from '@/components/CategoryBar';
import SearchBar from '@/components/SearchBar';

export default async function RecipesPage() {
	return (
		<div className="container mx-auto px-4">
			<SearchBar />
			<CategoryBar />

			<RecipeList />
		</div>
	);
}

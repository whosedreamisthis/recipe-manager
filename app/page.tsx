import React from 'react';

import RecipeList from '@/components/RecipeList';
import CategoryBar from '@/components/CategoryBar';
import SearchBar from '@/components/SearchBar';
// app/page.tsx
import { fetchRecipes } from '@/app/actions';
export const revalidate = 60;
export default async function Home() {
	// Prefetch the first page on the server
	const initialData = await fetchRecipes(1, 12);

	return (
		<div className="container mx-auto">
			<SearchBar />
			<CategoryBar />
			<RecipeList initialData={initialData} />
		</div>
	);
}

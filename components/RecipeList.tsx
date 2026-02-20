'use client';

import { act, useEffect, useState } from 'react';
import { fetchRecipes } from '@/app/actions';
import { Recipe } from '@/lib/types';
import RecipeCard from './RecipeCard'; // Your existing card component
import { useUIStore } from '@/stores/useUIStore';
import { useSavedStore } from '@/stores/useSavedStore';

interface RecipeListProps {
	initialRecipes: Recipe[]; // Change 'recipes' to 'initialRecipes'
	initialHasMore: boolean;
}

export default function RecipeList({ initialRecipes }: RecipeListProps) {
	const [recipes, setRecipes] = useState(initialRecipes);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const activeTab = useUIStore((state) => state.activeTab);
	const savedRecipes = useSavedStore((state) => state.savedRecipes);

	// useEffect(() => {
	// 	if (activeTab === 'saved') {
	// 		setRecipes(savedRecipes);
	// 	}
	// }, [activeTab, savedRecipes]);

	const loadMore = async () => {
		setLoading(true);
		const nextPage = page + 1;
		const { recipes: newRecipes, hasMore: more } = await fetchRecipes(
			nextPage,
		);

		setRecipes((prev) => [...prev, ...newRecipes]);
		setPage(nextPage);
		setHasMore(more);
		setLoading(false);
	};

	return (
		<div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{activeTab === 'search' &&
					recipes.map((recipe) => (
						<RecipeCard key={recipe.id} recipe={recipe} />
					))}
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{activeTab === 'saved' &&
					savedRecipes.map((recipe) => (
						<RecipeCard key={recipe.id} recipe={recipe} />
					))}
			</div>

			{hasMore && activeTab === 'search' && (
				<div className="mt-12 flex justify-center">
					<button
						onClick={loadMore}
						disabled={loading}
						className="px-6 py-3 bg-cyan-600 text-white rounded-lg font-bold disabled:bg-slate-300"
					>
						{loading ? 'Loading...' : 'Show More Recipes'}
					</button>
				</div>
			)}
		</div>
	);
}

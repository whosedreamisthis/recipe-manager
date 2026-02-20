'use client';

import { useState, useMemo } from 'react';
import { fetchRecipes } from '@/app/actions';
import { Recipe } from '@/lib/types';
import RecipeCard from './RecipeCard';

// Stores
import { useSearchStore } from '@/stores/useSearchStore';
import { useCategoryStore } from '@/stores/useCategoryStore';
import { useSavedStore } from '@/stores/useSavedStore';
import { useRecentStore } from '@/stores/useRecentStore';
import { useUIStore } from '@/stores/useUIStore';

interface RecipeListProps {
	initialRecipes: Recipe[];
	initialHasMore: boolean;
}

export default function RecipeList({
	initialRecipes,
	initialHasMore,
}: RecipeListProps) {
	// 1. Pagination State (Remote Data)
	const [dbRecipes, setDbRecipes] = useState(initialRecipes ?? []);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(initialHasMore); // Fixed: Properly initialized state

	// 2. Store State
	const query = useSearchStore((state) => state.query);
	const selectedCategory = useCategoryStore(
		(state) => state.selectedCategory,
	);
	const activeTab = useUIStore((state) => state.activeTab);
	const savedRecipes = useSavedStore((state) => state.savedRecipes);
	const recentRecipes = useRecentStore((state) => state.recentRecipes);

	// 3. Centralized Data Switching & Filtering Logic
	const displayRecipes = useMemo(() => {
		let baseSet: Recipe[] = [];

		// Switch the "Source of Truth" based on the active tab
		if (activeTab === 'saved') {
			baseSet = savedRecipes ?? [];
		} else if (activeTab === 'recent') {
			baseSet = recentRecipes ?? [];
		} else {
			baseSet = dbRecipes ?? [];
		}

		// Apply global search and category filters to the active set
		return baseSet.filter((recipe) => {
			if (!recipe) return false;

			const matchesQuery = (recipe.title ?? '')
				.toLowerCase()
				.includes((query ?? '').toLowerCase());

			const matchesCategory =
				selectedCategory === '' ||
				(recipe.categories?.includes(selectedCategory) ?? false);

			return matchesQuery && matchesCategory;
		});
	}, [
		activeTab,
		dbRecipes,
		savedRecipes,
		recentRecipes,
		query,
		selectedCategory,
	]);

	// 4. Load More Functionality
	const loadMore = async () => {
		setLoading(true);
		try {
			const nextPage = page + 1;
			const { recipes: newRecipes, hasMore: more } = await fetchRecipes(
				nextPage,
			);

			setDbRecipes((prev) => [...prev, ...newRecipes]);
			setPage(nextPage);
			setHasMore(more);
		} catch (error) {
			console.error('Failed to fetch more recipes:', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="space-y-8">
			{/* Unified Grid View */}
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
				{displayRecipes.map((recipe) => (
					<RecipeCard key={recipe.id} recipe={recipe} />
				))}
			</div>

			{/* Empty State UI */}
			{displayRecipes.length === 0 && !loading && (
				<div className="text-center py-20 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
					<p className="text-slate-500">
						No recipes found in your {activeTab} view.
					</p>
				</div>
			)}

			{/* Pagination: Only visible on 'search' tab when not actively filtering */}
			{activeTab === 'search' &&
				hasMore &&
				query === '' &&
				selectedCategory === '' && (
					<div className="flex justify-center pt-4">
						<button
							onClick={loadMore}
							disabled={loading}
							className="px-8 py-3 bg-slate-900 text-white rounded-full font-bold 
                         hover:bg-cyan-600 transition-all disabled:bg-slate-300"
						>
							{loading ? 'Loading...' : 'Show More Recipes'}
						</button>
					</div>
				)}
		</div>
	);
}

'use client';

import { useMemo } from 'react';
import { Recipe } from '@/lib/types';
import RecipeCard from './RecipeCard';
import { useRecipes } from '@/hooks/useRecipes';
import { useSavedRecipes } from '@/hooks/useSavedRecipes'; // Import new hook
import { useSearchStore } from '@/stores/useSearchStore';
import { useCategoryStore } from '@/stores/useCategoryStore';
import { useUIStore } from '@/stores/useUIStore';

export default function RecipeList() {
	// 1. Fetch Main Feed
	const {
		data: dbData,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading: isLoadingSearch,
	} = useRecipes();

	// 2. Fetch Saved Feed
	const { data: savedData, isLoading: isLoadingSaved } = useSavedRecipes();

	const query = useSearchStore((state) => state.query);
	const selectedCategory = useCategoryStore(
		(state) => state.selectedCategory,
	);
	const activeTab = useUIStore((state) => state.activeTab);
	const isLoading = activeTab === 'saved' ? isLoadingSaved : isLoadingSearch;
	// 3. Centralized Data Switching
	const displayRecipes = useMemo(() => {
		let baseSet: Recipe[] = [];

		if (activeTab === 'saved') {
			baseSet = savedData ?? [];
		} else if (activeTab === 'search') {
			baseSet = dbData?.pages.flatMap((page) => page.recipes) ?? [];
		}
		// Note: You can add 'recent' logic here similarly once moved to DB

		return baseSet.filter((recipe) => {
			const matchesQuery = recipe.title
				.toLowerCase()
				.includes(query.toLowerCase());
			const matchesCategory =
				selectedCategory === '' ||
				recipe.categories?.includes(selectedCategory);
			return matchesQuery && matchesCategory;
		});
	}, [activeTab, dbData, savedData, query, selectedCategory]);

	if (isLoading) {
		return (
			<div className="grid grid-cols-2 md:grid-cols-3 gap-6">
				{[1, 2, 3, 4, 5, 6].map((i) => (
					<div
						key={i}
						className="h-64 bg-slate-100 animate-pulse rounded-xl"
					/>
				))}
			</div>
		);
	}

	return (
		<div className="space-y-8 pb-20">
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
				{displayRecipes.map((recipe) => (
					<RecipeCard key={recipe.id} recipe={recipe} />
				))}
			</div>

			{/* Empty State */}
			{displayRecipes.length === 0 && (
				<div className="text-center py-20 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
					<p className="text-slate-500">
						{activeTab === 'saved'
							? "You haven't vaulted any recipes yet."
							: 'No recipes found.'}
					</p>
				</div>
			)}

			{/* Pagination (Only for Search) */}
			{activeTab === 'search' && hasNextPage && (
				<div className="flex justify-center pt-4">
					<button
						onClick={() => fetchNextPage()}
						disabled={isFetchingNextPage}
						className="px-8 py-3 bg-slate-900 text-white rounded-full font-bold transition-all disabled:bg-slate-300"
					>
						{isFetchingNextPage ? 'Syncing...' : 'Load More'}
					</button>
				</div>
			)}
		</div>
	);
}

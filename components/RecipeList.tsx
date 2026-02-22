'use client';

import { useMemo } from 'react';

import RecipeCard from './RecipeCard';
import { useRecipes } from '@/hooks/useRecipes';
import { useSavedRecipes } from '@/hooks/useSavedRecipes'; // Import new hook
import { useSearchStore } from '@/stores/useSearchStore';
import { useCategoryStore } from '@/stores/useCategoryStore';
import { useUIStore } from '@/stores/useUIStore';
import { SignInButton, SignUpButton, useUser } from '@clerk/nextjs';
import { Button } from './ui/button';
import { Lock } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getLikedIds, getSavedIds } from '@/app/actions';

export default function RecipeList({ initialData }: { initialData: any }) {
	const { isSignedIn, user, isLoaded } = useUser();
	const userName = user?.fullName;

	const query = useSearchStore((state) => state.query);
	const selectedCategory = useCategoryStore(
		(state) => state.selectedCategory,
	);
	const activeTab = useUIStore((state) => state.activeTab);

	// 1. Fetch Main Feed
	const {
		data: dbData,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading: isLoadingSearch,
	} = useRecipes(initialData, query, selectedCategory);

	// 2. Fetch Saved Feed
	const { data: savedData, isLoading: isLoadingSaved } = useSavedRecipes();

	const isLoading = activeTab === 'saved' ? isLoadingSaved : isLoadingSearch;

	const { data: savedIds = [] } = useQuery({
		queryKey: ['recipes', 'saved-ids'],
		queryFn: getSavedIds,
	});
	const { data: likedIds = [] } = useQuery({
		queryKey: ['recipes', 'liked-ids'],
		queryFn: getLikedIds,
	});

	// 3. Centralized Data Switching
	// RecipeList.tsx
	const displayRecipes = useMemo(() => {
		// 1. Flatten pages while handling both array and object responses
		const baseSet =
			activeTab === 'saved'
				? savedData ?? []
				: dbData?.pages.flatMap((page: any) => {
						// Check if page is the array itself or an object containing the array
						return Array.isArray(page) ? page : page.recipes ?? [];
				  }) ?? [];

		if (baseSet.length === 0) return [];

		// 2. SEARCH TAB: Server-side filtering is active
		if (activeTab === 'search') {
			// We only perform basic data sanitization here
			return baseSet.filter(
				(recipe) =>
					recipe.title &&
					recipe.image &&
					recipe.title !== 'Untitled Recipe',
			);
		}

		// 3. SAVED TAB: Perform local client-side filtering
		const lowerQuery = query.toLowerCase().trim();
		return baseSet.filter((recipe) => {
			const matchesQuery =
				lowerQuery === '' ||
				recipe.title.toLowerCase().includes(lowerQuery);

			const matchesCategory =
				selectedCategory === '' ||
				recipe.categories?.includes(selectedCategory);

			return matchesQuery && matchesCategory;
		});
	}, [activeTab, dbData, savedData, query, selectedCategory]); // Remove userName from deps if not used in filter
	if (activeTab === 'saved' && isLoaded && !isSignedIn) {
		return (
			<div className="flex flex-col items-center justify-center py-20 px-4 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
				<div className="bg-white p-4 rounded-full shadow-sm mb-4">
					<Lock className="w-8 h-8 text-cyan-600" />
				</div>
				<h3 className="text-xl font-bold text-slate-900">
					Your Personal Vault
				</h3>
				<p className="text-slate-500 max-w-sm text-center mb-8">
					Sign up to start saving your favorite recipes and access
					them anywhere.
				</p>

				<div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
					<SignUpButton mode="modal">
						<Button
							className="bg-cyan-600 hover:bg-cyan-700 flex-1"
							aria-label="Sign up"
						>
							Sign Up
						</Button>
					</SignUpButton>

					<SignInButton mode="modal">
						<Button
							variant="outline"
							className="flex-1"
							aria-label="Sign in"
						>
							Log In
						</Button>
					</SignInButton>
				</div>
			</div>
		);
	}

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
				{displayRecipes.map((recipe, index) => (
					<div key={recipe.id} className="recipe-card-container">
						<RecipeCard
							recipe={recipe}
							index={index}
							isSaved={savedIds.includes(recipe.id)}
							isLiked={likedIds.includes(recipe.id)}
						/>
					</div>
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
					{/* NEW LOGIC: 
      1. Hide if user is searching/filtering (Standard UX)
      2. Ensure we don't show it if the current filtered view is empty
    */}
					{query === '' && selectedCategory === '' && (
						<Button
							onClick={() => fetchNextPage()}
							disabled={isFetchingNextPage}
							className="px-8 py-3 bg-slate-900 text-white rounded-full font-bold transition-all disabled:bg-slate-300 hover:bg-slate-800 active:scale-95"
							aria-label="Fetch next page of recipes"
						>
							{isFetchingNextPage ? 'Syncing...' : 'Load More'}
						</Button>
					)}

					{/* Optional: Indicator for recruiters that they've seen all filtered results */}
					{(query !== '' || selectedCategory !== '') &&
						displayRecipes.length > 0 && (
							<p className="text-slate-400 text-sm italic">
								Showing all results for this filter
							</p>
						)}
				</div>
			)}
		</div>
	);
}

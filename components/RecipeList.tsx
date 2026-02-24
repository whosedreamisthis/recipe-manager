'use client';

import { useDeferredValue, useMemo } from 'react';
import RecipeCard from './RecipeCard';
import { useRecipes } from '@/hooks/useRecipes';
import { useSavedRecipes } from '@/hooks/useSavedRecipes';
import { useSearchStore } from '@/stores/useSearchStore';
import { useCategoryStore } from '@/stores/useCategoryStore';
import { useUIStore } from '@/stores/useUIStore';
import { SignInButton, SignUpButton, useUser } from '@clerk/nextjs';
import { Button } from './ui/button';
import { Lock } from 'lucide-react'; // Optimized import
import { useQuery } from '@tanstack/react-query';
import { getLikedIds, getSavedIds } from '@/app/actions';

export default function RecipeList({ initialData }: { initialData: any }) {
	const { isSignedIn, user, isLoaded } = useUser();
	const userId = user?.id;

	const query = useSearchStore((state) => state.query);
	const selectedCategory = useCategoryStore(
		(state) => state.selectedCategory,
	);
	const activeTab = useUIStore((state) => state.activeTab);

	// 1. DEFER FILTERS: Prevents input lag and reduces blocking during hydration
	const deferredQuery = useDeferredValue(query);
	const deferredCategory = useDeferredValue(selectedCategory);

	// 2. CONDITIONAL HOOKS: Only run the Saved query if the tab is actually active
	const {
		data: dbData,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading: isLoadingSearch,
	} = useRecipes(initialData, deferredQuery, deferredCategory);

	const { data: savedData, isLoading: isLoadingSaved } = useSavedRecipes({
		enabled: activeTab === 'saved',
		userId,
	});

	const isLoading = activeTab === 'saved' ? isLoadingSaved : isLoadingSearch;

	// 3. CONSOLIDATED STATUS: Fetching only what's necessary for hydration
	const { data: savedIds = [] } = useQuery({
		queryKey: ['recipes', 'saved-ids', userId],
		queryFn: () => getSavedIds(userId as string),
		enabled: !!userId && isLoaded,
		staleTime: 1000 * 60 * 5, // 5 minutes (reduces re-calculation)
	});

	const { data: likedIds = [] } = useQuery({
		queryKey: ['likes', userId],
		queryFn: () => getLikedIds(userId as string),
		enabled: !!userId && isLoaded,
		staleTime: 1000 * 60 * 5,
	});

	// 4. OPTIMIZED FILTERING: Using deferred values to keep main thread free
	const displayRecipes = useMemo(() => {
		const baseSet =
			activeTab === 'saved'
				? savedData ?? []
				: dbData?.pages.flatMap((page: any) =>
						Array.isArray(page) ? page : page.recipes ?? [],
				  ) ?? [];

		if (baseSet.length === 0) return [];

		const lowerQuery = deferredQuery.toLowerCase().trim();
		const isMyRecipes =
			deferredCategory.toLowerCase().trim() === 'my recipes';

		return baseSet.filter((recipe) => {
			if (
				!recipe.title ||
				!recipe.image ||
				recipe.title === 'Untitled Recipe'
			)
				return false;

			const matchesQuery =
				lowerQuery === '' ||
				recipe.title.toLowerCase().includes(lowerQuery);
			const isAuthorMe = recipe.authorId === userId;

			if (isMyRecipes) return isAuthorMe && matchesQuery;

			const matchesCategory =
				deferredCategory === '' ||
				recipe.categories?.includes(deferredCategory);
			return matchesQuery && matchesCategory;
		});
	}, [activeTab, dbData, savedData, deferredQuery, deferredCategory, userId]);

	// RENDER LOGIC
	if (activeTab === 'saved' && isLoaded && !isSignedIn) {
		return (
			<div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
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
						<Button className="bg-cyan-600 hover:bg-cyan-700 flex-1">
							Sign Up
						</Button>
					</SignUpButton>
					<SignInButton mode="modal">
						<Button variant="outline" className="flex-1">
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
				{[...Array(6)].map((_, i) => (
					<div
						key={i}
						className="h-64 bg-slate-100 animate-pulse rounded-xl"
					/>
				))}
			</div>
		);
	}

	return (
		<div className="space-y-8 pb-20 m-0">
			<div className="m-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3">
				{displayRecipes.map((recipe, index) => (
					<RecipeCard
						key={recipe.id}
						recipe={recipe}
						index={index}
						isSaved={savedIds.includes(recipe.id)}
						isLiked={likedIds.includes(recipe.id)}
					/>
				))}
			</div>

			{displayRecipes.length === 0 && (
				<div className="text-center py-20 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
					<p className="text-slate-500">
						{activeTab === 'saved'
							? 'No vaulted recipes.'
							: 'No recipes found.'}
					</p>
				</div>
			)}

			{activeTab === 'search' &&
				hasNextPage &&
				deferredQuery === '' &&
				deferredCategory === '' && (
					<div className="flex justify-center pt-4">
						<Button
							onClick={() => fetchNextPage()}
							disabled={isFetchingNextPage}
							className="px-8 py-3 bg-slate-900 text-white rounded-full font-bold transition-all"
						>
							{isFetchingNextPage ? 'Syncing...' : 'Load More'}
						</Button>
					</div>
				)}
		</div>
	);
}

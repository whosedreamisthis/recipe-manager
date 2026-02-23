// hooks/useRecipes.ts
'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchRecipes } from '@/app/actions';
import { Recipe } from '@/lib/types';

export function useRecipes(
	initialData?: Recipe[],
	query: string = '',
	category: string = '',
) {
	// Check if we are in the "My Recipes" view
	const isMyRecipes = category.toLowerCase().trim() === 'my recipes';

	return useInfiniteQuery({
		queryKey: ['recipes', query, category],
		queryFn: ({ pageParam = 1 }) =>
			// If My Recipes, request a large number (e.g., 1000) to bypass pagination
			fetchRecipes(pageParam, isMyRecipes ? 1000 : 12, query, category),
		initialPageParam: 1,
		initialData:
			initialData && !query && !category
				? { pages: [initialData], pageParams: [1] }
				: undefined,
		getNextPageParam: (lastPage: any, allPages) => {
			// If we fetched "everything" for My Recipes, there is no next page
			if (isMyRecipes) return undefined;

			const hasMore = Array.isArray(lastPage)
				? lastPage.length === 12
				: lastPage.hasMore;
			return hasMore ? allPages.length + 1 : undefined;
		},
	});
}

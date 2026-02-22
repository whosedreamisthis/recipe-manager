// hooks/useRecipes.ts
'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchRecipes } from '@/app/actions';
import { Recipe } from '@/lib/types';

// hooks/useRecipes.ts
export function useRecipes(
	initialData?: Recipe[],
	query: string = '',
	category: string = '',
) {
	return useInfiniteQuery({
		queryKey: ['recipes', query, category], // Correctly tracks category
		queryFn: ({ pageParam = 1 }) =>
			fetchRecipes(pageParam, 12, query, category),
		initialPageParam: 1,
		// Only use initialData if there is NO query and NO category selected
		initialData:
			initialData && !query && !category
				? { pages: [initialData], pageParams: [1] }
				: undefined,
		getNextPageParam: (lastPage: any, allPages) => {
			// Adjust based on your API response structure
			const hasMore = Array.isArray(lastPage)
				? lastPage.length === 12
				: lastPage.hasMore;
			return hasMore ? allPages.length + 1 : undefined;
		},
	});
}

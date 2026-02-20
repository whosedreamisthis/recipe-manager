// hooks/useRecipes.ts
'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchRecipes } from '@/app/actions';

export function useRecipes() {
	return useInfiniteQuery({
		queryKey: ['recipes'],
		queryFn: ({ pageParam = 1 }) => fetchRecipes(pageParam, 12),
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages) =>
			lastPage.hasMore ? allPages.length + 1 : undefined,
	});
}

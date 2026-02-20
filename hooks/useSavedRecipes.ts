// hooks/useSavedRecipes.ts
'use client';

import { useQuery } from '@tanstack/react-query';
import { getSavedRecipes } from '@/app/actions';

export function useSavedRecipes() {
	return useQuery({
		queryKey: ['recipes', 'saved-list'],
		queryFn: () => getSavedRecipes(),
		// Keep the data fresh, but don't over-fetch
		staleTime: 1000 * 60 * 5,
	});
}

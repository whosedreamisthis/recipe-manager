// hooks/useSavedRecipes.ts
'use client';

import { useQuery } from '@tanstack/react-query';
import { getSavedRecipes } from '@/app/actions';
import { useUser } from '@clerk/nextjs';

export function useSavedRecipes({
	enabled,
	userId,
}: {
	enabled: boolean;
	userId: string | undefined;
}) {
	const { isLoaded } = useUser();

	return useQuery({
		// Add userId to queryKey so it refetches when user changes
		queryKey: ['recipes', 'saved-list', userId],
		// Only run the query if the user is actually loaded and logged in
		queryFn: () => getSavedRecipes(userId as string),
		enabled: isLoaded && !!userId && enabled,
		staleTime: 1000 * 60 * 5,
	});
}

'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleSaveAction, toggleLikeAction } from '@/app/actions';
import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';

export function useRecipeActions(recipeId: string) {
	const queryClient = useQueryClient();
	const { user } = useUser();
	const userId = user?.id;

	// --- SAVE MUTATION (Keep as is) ---
	const { mutate: toggleSave } = useMutation({
		mutationFn: () => toggleSaveAction(recipeId, userId as string),
		onMutate: async () => {
			if (!userId) {
				toast.error('Please log in to save recipes');
				throw new Error('Not authenticated');
			}
			await queryClient.cancelQueries({
				queryKey: ['recipes', 'saved-ids', userId],
			});
			const previousSavedIds = queryClient.getQueryData([
				'recipes',
				'saved-ids',
				userId,
			]);

			queryClient.setQueryData(
				['recipes', 'saved-ids', userId],
				(old: string[] | undefined) => {
					const current = old || [];
					return current.includes(recipeId)
						? current.filter((id) => id !== recipeId)
						: [...current, recipeId];
				},
			);

			return { previousSavedIds };
		},
		onError: (err, _, context) => {
			if (context?.previousSavedIds) {
				queryClient.setQueryData(
					['recipes', 'saved-ids', userId],
					context.previousSavedIds,
				);
			}
			toast.error('Failed to save recipe');
		},
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: ['recipes', 'saved-ids', userId],
			});
			queryClient.invalidateQueries({
				queryKey: ['recipes', 'saved-list', userId],
			});
		},
	});

	// --- LIKE MUTATION (Updated for Optimistic Count) ---
	const { mutate: toggleLike } = useMutation({
		mutationFn: () => toggleLikeAction(recipeId, userId as string),
		onMutate: async () => {
			if (!userId) {
				toast.error('Please log in to like recipes');
				throw new Error('Not authenticated');
			}

			// 1. Cancel outgoing refetches
			await queryClient.cancelQueries({ queryKey: ['likes', userId] });
			await queryClient.cancelQueries({ queryKey: ['recipes'] });

			// 2. Snapshot current state
			const previousLikedIds = queryClient.getQueryData([
				'likes',
				userId,
			]);
			const isCurrentlyLiked = (previousLikedIds as
				| string[]
				| undefined)?.includes(recipeId);

			// 3. Optimistically update liked IDs list
			queryClient.setQueryData(
				['likes', userId],
				(old: string[] | undefined) => {
					const current = old ?? [];
					return isCurrentlyLiked
						? current.filter((id) => id !== recipeId)
						: [...current, recipeId];
				},
			);

			// 4. Optimistically update the LIKE COUNT in the main recipe list
			// This prevents the "Double Like" bug by changing the data source
			queryClient.setQueriesData(
				{ queryKey: ['recipes'] },
				(old: any) => {
					if (!old) return old;

					// Handle both infinite queries (pages) and standard queries
					const updateRecipe = (r: any) => {
						if (r.id !== recipeId) return r;
						const currentLikes = r.likes ?? 0;
						return {
							...r,
							likes: isCurrentlyLiked
								? Math.max(0, currentLikes - 1)
								: currentLikes + 1,
						};
					};

					if (old.pages) {
						return {
							...old,
							pages: old.pages.map((page: any) => ({
								...page,
								recipes:
									page.recipes?.map(updateRecipe) ||
									page.map?.(updateRecipe),
							})),
						};
					}
					return Array.isArray(old)
						? old.map(updateRecipe)
						: updateRecipe(old);
				},
			);

			return { previousLikedIds };
		},
		onError: (err, _, context) => {
			if (context?.previousLikedIds) {
				queryClient.setQueryData(
					['likes', userId],
					context.previousLikedIds,
				);
			}
			toast.error('Failed to like recipe');
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['likes', userId] });
			queryClient.invalidateQueries({ queryKey: ['recipes'] });
		},
	});

	return { toggleSave, toggleLike };
}

'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleSaveAction, toggleLikeAction } from '@/app/actions';
import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';

export function useRecipeActions(userId: string | undefined) {
	// No longer takes recipeId here
	const queryClient = useQueryClient();

	// --- GLOBAL SAVE MUTATION ---
	const { mutate: toggleSave } = useMutation({
		mutationFn: (id: string) => toggleSaveAction(id, userId as string),
		onMutate: async (id) => {
			if (!userId) {
				toast.error('Log in to save recipes');
				return;
			}
			await queryClient.cancelQueries({
				queryKey: ['recipes', 'saved-ids', userId],
			});
			const previous = queryClient.getQueryData([
				'recipes',
				'saved-ids',
				userId,
			]);

			queryClient.setQueryData(
				['recipes', 'saved-ids', userId],
				(old: string[] | undefined) => {
					const current = old || [];
					return current.includes(id)
						? current.filter((x) => x !== id)
						: [...current, id];
				},
			);
			return { previous };
		},
		onError: (_, __, context) => {
			queryClient.setQueryData(
				['recipes', 'saved-ids', userId],
				context?.previous,
			);
		},
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: ['recipes', 'saved-ids', userId],
			});
		},
	});

	// --- GLOBAL LIKE MUTATION ---
	const { mutate: toggleLike } = useMutation({
		mutationFn: (id: string) => toggleLikeAction(id, userId as string),
		onMutate: async (id: string) => {
			if (!userId) {
				toast.error('Log in to like recipes');
				return;
			}

			await queryClient.cancelQueries({ queryKey: ['likes', userId] });
			await queryClient.cancelQueries({ queryKey: ['recipes'] });

			const previousLikedIds = queryClient.getQueryData([
				'likes',
				userId,
			]) as string[] | undefined;
			const isCurrentlyLiked = previousLikedIds?.includes(id);

			// 1. Update Liked IDs List
			queryClient.setQueryData(
				['likes', userId],
				(old: string[] | undefined) => {
					const current = old ?? [];
					return isCurrentlyLiked
						? current.filter((x) => x !== id)
						: [...current, id];
				},
			);

			// 2. Update Counts in ['recipes'] cache
			queryClient.setQueriesData(
				{ queryKey: ['recipes'] },
				(old: any) => {
					if (!old) return old;

					const updateFn = (r: any) => {
						if (r.id !== id) return r;
						return {
							...r,
							likes: isCurrentlyLiked
								? Math.max(0, (r.likes || 1) - 1)
								: (r.likes || 0) + 1,
						};
					};

					if (old.pages) {
						return {
							...old,
							pages: old.pages.map((page: any) => ({
								...page,
								recipes:
									page.recipes?.map(updateFn) ||
									page.map?.(updateFn),
							})),
						};
					}
					return Array.isArray(old)
						? old.map(updateFn)
						: updateFn(old);
				},
			);

			return { previousLikedIds };
		},
		onError: (_, __, context) => {
			queryClient.setQueryData(
				['likes', userId],
				context?.previousLikedIds,
			);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['likes', userId] });
			queryClient.invalidateQueries({ queryKey: ['recipes'] });
		},
	});

	return { toggleSave, toggleLike };
}

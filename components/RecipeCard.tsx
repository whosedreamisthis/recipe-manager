'use client';
import { memo, useState, useEffect } from 'react';
import { Bookmark, ThumbsUp } from 'lucide-react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import Image from 'next/image';
import { Recipe } from '@/lib/types';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleSaveAction, toggleLikeAction } from '@/app/actions';
import { useUser } from '@clerk/nextjs';

interface Props {
	recipe: Recipe;
	isSaved: boolean; // Pass as prop
	isLiked: boolean; // Pass as prop
	index?: number;
	onLike: () => void;
}

const RecipeCard = memo(function RecipeCard({
	recipe,
	isSaved,
	isLiked,
	onLike,
	index,
}: Props) {
	const [imgSrc, setImgSrc] = useState(recipe.image || '');
	const queryClient = useQueryClient();
	const { user } = useUser(); // Get current user
	const userId = user?.id;

	const { mutate: toggleSave } = useMutation({
		mutationFn: () => toggleSaveAction(recipe.id),
		onMutate: () => {
			queryClient.cancelQueries({ queryKey: ['recipes', 'saved-ids'] });
			const previousSavedIds = queryClient.getQueryData([
				'recipes',
				'saved-ids',
			]);

			queryClient.setQueryData(
				['recipes', 'saved-ids'],
				(old: string[] | undefined) => {
					const current = old || [];
					return current.includes(recipe.id)
						? current.filter((id) => id !== recipe.id) // Remove if exists
						: [...current, recipe.id]; // Add if not exists
				},
			);

			return { previousSavedIds };
		},
		onError: (err, variables, context) => {
			if (context?.previousSavedIds) {
				queryClient.setQueryData(
					['recipes', 'saved-ids'],
					context.previousSavedIds,
				);
			}

			toast.error('Failed to save recipe');
		},
		onSettled: () => {
			// Invalidate both the ID list and the full objects list for the Saved Tab
			queryClient.invalidateQueries({
				queryKey: ['recipes', 'saved-ids'],
			});
			queryClient.invalidateQueries({
				queryKey: ['recipes', 'saved-list'],
			});
		},
	});

	// --- LIKE MUTATION ---
	const { mutate: toggleLike } = useMutation({
		// IMPORTANT: Pass userId to the action
		mutationFn: () => toggleLikeAction(recipe.id, userId as string),
		onMutate: async () => {
			if (!userId) {
				toast.error('Please log in to like recipes');
				throw new Error('Not authenticated');
			}

			await queryClient.cancelQueries({ queryKey: ['likes', userId] });
			const previousLikedIds = queryClient.getQueryData([
				'likes',
				userId,
			]);

			queryClient.setQueryData(
				['likes', userId],
				(old: string[] | undefined) => {
					const current = old ?? [];
					return current.includes(recipe.id)
						? current.filter((id) => id !== recipe.id)
						: [...current, recipe.id];
				},
			);

			return { previousLikedIds };
		},
		onError: (err, variables, context) => {
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
			queryClient.invalidateQueries({ queryKey: ['recipes'] }); // Refresh counts
		},
	});

	useEffect(() => {
		setImgSrc(recipe.image || '');
	}, [recipe.image]);

	return (
		<div className="relative group">
			<Link
				href={`/recipes/${recipe.id}`}
				className="block"
				aria-label={`View ${recipe.title} recipe`}
			>
				<Card className="overflow-hidden p-0 bg-white border-slate-200 transition-all duration-200 group-hover:border-cyan-500/50 group-hover:shadow-lg">
					<div className="relative h-44 w-full overflow-hidden">
						<Image
							src={imgSrc || '/placeholder-recipe.jpg'}
							alt={recipe.title}
							fill
							className="object-cover transition-transform duration-500 group-hover:scale-110"
							sizes="(max-width: 672px) 50vw, 336px"
							priority={index !== undefined && index < 3}
							onError={() => setImgSrc('/placeholder-recipe.jpg')}
						/>
					</div>

					<CardHeader className="px-4 pt-4 pb-3">
						<CardTitle className="group-hover:text-cyan-600 transition-colors mb-1 text-lg line-clamp-1">
							{recipe.title}
						</CardTitle>

						<CardDescription className="flex flex-col gap-1">
							<span className="text-xs text-slate-500">
								Ready in {recipe.prepTime + recipe.cookTime}{' '}
								minutes
							</span>

							<div className="flex items-center gap-1 h-6 mt-1">
								<div className="w-6" />
								<span className="text-sm font-semibold text-slate-700">
									{/* Shows actual count + 1 if liked locally */}
									{recipe.likes ?? 0}
								</span>
							</div>
						</CardDescription>
					</CardHeader>
				</Card>
			</Link>

			{/* LIKE BUTTON */}
			<div className="absolute bottom-[10px] left-[13px] z-20">
				<Button
					size="icon"
					variant="ghost"
					aria-label="Toggle like recipe"
					className="h-8 w-8 rounded-full hover:bg-slate-100 transition-colors"
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						toggleLike();
					}}
				>
					<ThumbsUp
						aria-hidden="true"
						className={`w-4 h-4 transition-all ${
							isLiked
								? 'fill-cyan-500 text-cyan-500'
								: 'text-slate-400'
						}`}
					/>
				</Button>
			</div>

			{/* BOOKMARK BUTTON */}
			<div className="absolute top-3 right-3 z-10">
				<Button
					size="icon"
					variant="secondary"
					className="rounded-sm bg-white/80 backdrop-blur-sm shadow-sm"
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						toggleSave();
					}}
					aria-label="Toggle save recipe"
				>
					<Bookmark
						className={`w-5 h-5 transition-colors ${
							isSaved
								? 'fill-cyan-500 text-cyan-500'
								: 'text-slate-400'
						}`}
					/>
				</Button>
			</div>
		</div>
	);
});

export default RecipeCard;

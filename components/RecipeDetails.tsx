'use client';

import { useState, useEffect, useTransition } from 'react';
import { useRecentStore } from '@/stores/useRecentStore';
import { Recipe } from '@/lib/types';
import Image from 'next/image';
import { Button } from './ui/button';
import {
	PlusCircle,
	Bookmark,
	ThumbsUp,
	Trash2,
	Loader2,
	ChevronLeft,
} from 'lucide-react';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useShoppingListStore } from '@/stores/useShoppingListStore';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRecipeActions } from '@/hooks/useRecipeActions';
import { getLikedIds, getSavedIds, deleteRecipe } from '@/app/actions';

interface Props {
	recipe: Recipe;
}

export default function RecipeDetails({ recipe }: Props) {
	const { user } = useUser();
	const userId = user?.id;
	const { toggleSave, toggleLike } = useRecipeActions(userId);

	const queryClient = useQueryClient();
	const router = useRouter();
	const [isDeleting, startTransition] = useTransition();

	const addRecent = useRecentStore((state) => state.addRecent);
	const addToShoppingList = useShoppingListStore(
		(state) => state.addToShoppingList,
	);

	const isOwner = userId === recipe.authorId;

	// Fetch liked IDs using the SAME key as the hook/RecipeCard
	const { data: likedIds = [] } = useQuery({
		queryKey: ['likes', userId],
		queryFn: () => getLikedIds(userId as string),
		enabled: !!userId,
	});

	// Fetch saved IDs using the SAME key as the hook/RecipeCard
	const { data: savedIds = [] } = useQuery({
		queryKey: ['recipes', 'saved-ids', userId],
		queryFn: () => getSavedIds(userId as string),
		enabled: !!userId,
	});

	const isLiked = likedIds.includes(recipe.id);
	const isSaved = savedIds.includes(recipe.id);

	// --- 3. HANDLERS ---
	const handleDelete = () => {
		if (!userId) return;

		startTransition(async () => {
			const result = await deleteRecipe(recipe.id, userId);

			if (result.success) {
				// 1. Tell TanStack Query to throw away the old list
				// This ensures when the user lands on '/', it fetches fresh data
				await queryClient.invalidateQueries({ queryKey: ['recipes'] });

				// 2. Also clear 'My Recipes' or 'saved-list' if you use those keys
				await queryClient.invalidateQueries({
					queryKey: ['recipes', 'saved-list', userId],
				});

				toast.success('Recipe deleted');

				// 3. Navigate away
				router.push('/');

				// 4. Force Next.js to refresh the Server Component cache
				router.refresh();
			} else {
				toast.error(result.error || 'Delete failed');
			}
		});
	};

	const addIngredientsToShoppingList = () => {
		addToShoppingList(recipe.ingredients);
		toast.success('List Updated', {
			description: `Added ingredients from ${recipe.title}.`,
			action: {
				label: 'View List',
				onClick: () => router.push('/shopping-list'),
			},
		});
	};

	useEffect(() => {
		if (recipe) {
			// Move this out of the critical path
			const idleId = requestIdleCallback(() => addRecent(recipe));
			return () => cancelIdleCallback(idleId);
		}
	}, [recipe, addRecent]);

	return (
		<div className="max-w-2xl mx-auto pb-20 px-4 pt-4">
			{/* BACK BUTTON */}
			<Button
				variant="ghost"
				size="sm"
				onClick={() => router.back()}
				className="mb-4 text-slate-500 hover:text-slate-900"
			>
				<ChevronLeft className="w-4 h-4 mr-1" /> Back
			</Button>

			{/* IMAGE SECTION */}
			<div className="relative h-72 w-full overflow-hidden rounded-3xl shadow-xl border border-slate-100">
				<Image
					src={recipe.image || '/placeholder-recipe.jpg'}
					alt={recipe.title}
					fill
					className="object-cover"
					priority
					sizes="(max-width: 768px) 100vw, 700px"
					fetchPriority="high"
					loading="eager"
				/>
				<div className="absolute top-4 right-4">
					<Button
						variant="secondary"
						size="icon"
						className="rounded-full bg-white/95 backdrop-blur-sm shadow-md hover:scale-110 transition-transform"
						onClick={() => toggleSave(recipe.id)}
					>
						<Bookmark
							className={`w-5 h-5 ${
								isSaved
									? 'fill-cyan-500 text-cyan-500'
									: 'text-slate-600'
							}`}
						/>
					</Button>
				</div>
			</div>

			{/* HEADER SECTION */}
			<div className="mt-8 flex justify-between items-start">
				<div className="flex-1">
					<div className="flex items-center gap-3 mb-1">
						<em className="text-cyan-600 font-bold not-italic text-xs uppercase tracking-widest">
							By {recipe.author}
						</em>

						{isOwner && (
							<AlertDialog>
								<AlertDialogTrigger asChild>
									<Button
										variant="ghost"
										className="h-6 px-2 text-red-500 hover:text-red-600 hover:bg-red-50 text-[10px] font-bold uppercase tracking-tighter"
									>
										<Trash2 className="w-3 h-3 mr-1" />{' '}
										Delete
									</Button>
								</AlertDialogTrigger>
								<AlertDialogContent>
									<AlertDialogHeader>
										<AlertDialogTitle>
											Delete this recipe?
										</AlertDialogTitle>
										<AlertDialogDescription>
											This action is permanent and cannot
											be undone.
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel>
											Cancel
										</AlertDialogCancel>
										<AlertDialogAction
											onClick={handleDelete}
											className="bg-red-500 hover:bg-red-600"
											disabled={isDeleting}
										>
											{isDeleting ? (
												<Loader2 className="w-4 h-4 animate-spin" />
											) : (
												'Delete Forever'
											)}
										</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						)}
					</div>
					<h1 className="font-black text-4xl text-slate-900 leading-none tracking-tight">
						{recipe.title}
					</h1>
				</div>

				<div className="flex flex-col items-center gap-1 ml-4">
					<Button
						variant="outline"
						size="icon"
						className={`h-12 w-12 rounded-full transition-all shadow-sm ${
							isLiked
								? 'bg-cyan-50 border-cyan-200'
								: 'hover:bg-slate-50'
						}`}
						onClick={() => toggleLike(recipe.id)}
					>
						<ThumbsUp
							className={`w-6 h-6 ${
								isLiked
									? 'fill-cyan-500 text-cyan-500 scale-110'
									: 'text-slate-400'
							}`}
						/>
					</Button>
					<span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
						{recipe.likes || 0} Likes
					</span>
				</div>
			</div>

			<p className="mt-6 text-lg text-slate-600 leading-relaxed italic border-l-4 border-cyan-500/20 pl-6 bg-slate-50/50 py-4 rounded-r-lg">
				{recipe.description}
			</p>

			{/* INGREDIENTS */}
			<div className="mt-10">
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-2xl font-black text-slate-900 tracking-tight">
						Ingredients
					</h2>
					<Button
						size="sm"
						onClick={addIngredientsToShoppingList}
						className="rounded-full bg-cyan-600 hover:bg-cyan-700 shadow-md shadow-cyan-100"
					>
						<PlusCircle className="w-4 h-4 mr-2" /> Add to List
					</Button>
				</div>
				<div className="grid grid-cols-1 gap-2">
					{recipe.ingredients.map((ing, i) => (
						<div
							key={i}
							className="flex justify-between items-center p-3 rounded-xl bg-white border border-slate-100 shadow-sm"
						>
							<span className="text-slate-700 font-bold">
								{ing.name}
							</span>
							<span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded-md text-slate-500">
								{ing.quantity} {ing.unit}
							</span>
						</div>
					))}
				</div>
			</div>

			{/* INSTRUCTIONS */}
			<div className="mt-12">
				<h2 className="text-2xl font-black text-slate-900 tracking-tight mb-8">
					Instructions
				</h2>
				<div className="space-y-8">
					{recipe.instructions.map((step, i) => (
						<div key={i} className="flex gap-6">
							<span className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-mono font-bold text-sm">
								{String(i + 1).padStart(2, '0')}
							</span>
							<p className="text-slate-700 text-lg leading-snug pt-0.5">
								{step}
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

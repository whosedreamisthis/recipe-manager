'use client';

import { useState, useEffect } from 'react';
import { useRecentStore } from '@/stores/useRecentStore';
import { Recipe } from '@/lib/types';
import Image from 'next/image';
import { Button } from './ui/button';
import { PlusCircle, Bookmark, ThumbsUp } from 'lucide-react';
import { useShoppingListStore } from '@/stores/useShoppingListStore';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
	getLikedIds,
	getSavedIds,
	toggleLikeAction,
	toggleSaveAction,
} from '@/app/actions';

interface Props {
	recipe: Recipe;
}

export default function RecipeDetails({ recipe }: Props) {
	const [imgSrc, setImgSrc] = useState(recipe.image || '');
	const { userId } = useAuth();
	const queryClient = useQueryClient();
	const router = useRouter();

	const addRecent = useRecentStore((state) => state.addRecent);
	const addToShoppingList = useShoppingListStore(
		(state) => state.addToShoppingList,
	);

	// --- 1. DATA FETCHING (Current Status) ---
	const { data: likedIds = [] } = useQuery({
		queryKey: ['likes', userId],
		queryFn: () => getLikedIds(userId as string),
		enabled: !!userId,
	});

	const { data: savedIds = [] } = useQuery({
		queryKey: ['recipes', 'saved-ids', userId],
		queryFn: () => getSavedIds(userId as string),
		enabled: !!userId,
	});

	const isLiked = likedIds.includes(recipe.id);
	const isSaved = savedIds.includes(recipe.id);

	// --- 2. MUTATIONS ---
	const { mutate: toggleLike } = useMutation({
		mutationFn: () => toggleLikeAction(recipe.id, userId as string),
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey: ['likes', userId] });
			const previous = queryClient.getQueryData(['likes', userId]);

			queryClient.setQueryData(
				['likes', userId],
				(old: string[] | undefined) => {
					const current = old ?? [];
					return isLiked
						? current.filter((id) => id !== recipe.id)
						: [...current, recipe.id];
				},
			);
			return { previous };
		},
		onError: (err, varbs, context) => {
			queryClient.setQueryData(['likes', userId], context?.previous);
			toast.error('Failed to update like');
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['likes', userId] });
			queryClient.invalidateQueries({ queryKey: ['recipes'] });
		},
	});

	const { mutate: toggleSave } = useMutation({
		mutationFn: () => toggleSaveAction(recipe.id, userId as string),
		onMutate: async () => {
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
					const current = old ?? [];
					return isSaved
						? current.filter((id) => id !== recipe.id)
						: [...current, recipe.id];
				},
			);
			return { previous };
		},
		onError: (err, varbs, context) => {
			queryClient.setQueryData(
				['recipes', 'saved-ids', userId],
				context?.previous,
			);
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

	// --- 3. EFFECTS ---
	useEffect(() => {
		if (recipe) {
			addRecent(recipe);
		}
	}, [recipe, addRecent]);

	useEffect(() => {
		setImgSrc(recipe.image || '');
	}, [recipe.image]);

	// --- 4. HANDLERS ---
	const addIngredientsToShoppingList = () => {
		addToShoppingList(recipe.ingredients);
		toast.success('List Updated', {
			description: `Added ${recipe.ingredients.length} ingredients from ${recipe.title}.`,
			action: {
				label: 'View List',
				onClick: () => router.push('/shopping-list'),
			},
		});
	};

	return (
		<div className="max-w-2xl mx-auto pb-20 px-4">
			{/* IMAGE SECTION */}
			<div className="relative h-64 w-full overflow-hidden rounded-2xl shadow-lg border border-slate-100">
				<Image
					src={imgSrc || '/placeholder-recipe.jpg'}
					alt={recipe.title}
					fill
					className="object-cover"
					priority
					sizes="(max-width: 768px) 100vw, 700px"
					onError={() => setImgSrc('/placeholder-recipe.jpg')}
				/>

				{/* SAVE BUTTON OVERLAY */}
				<div className="absolute top-4 right-4">
					<Button
						variant="secondary"
						size="icon"
						className="rounded-full bg-white/90 backdrop-blur-sm shadow-md hover:scale-110 transition-transform"
						onClick={() => toggleSave()}
					>
						<Bookmark
							className={`w-5 h-5 transition-colors ${
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
					<em className="text-cyan-600 font-medium not-italic text-sm">
						By {recipe.author}
					</em>
					<h1 className="font-bold mt-1 text-4xl text-slate-900 leading-tight">
						{recipe.title}
					</h1>
				</div>

				{/* LIKE INTERACTION */}
				<div className="flex flex-col items-center gap-1 ml-4">
					<Button
						variant="outline"
						size="icon"
						className={`h-12 w-12 rounded-full transition-all ${
							isLiked
								? 'bg-cyan-50 border-cyan-200'
								: 'hover:bg-slate-50'
						}`}
						onClick={() => toggleLike()}
					>
						<ThumbsUp
							className={`w-6 h-6 transition-all ${
								isLiked
									? 'fill-cyan-500 text-cyan-500 scale-110'
									: 'text-slate-400'
							}`}
						/>
					</Button>
					<span className="text-xs font-bold text-slate-500 uppercase tracking-tighter">
						{recipe.likes} Likes
					</span>
				</div>
			</div>

			<p className="mt-6 text-lg text-slate-600 leading-relaxed italic border-l-4 border-cyan-100 pl-4">
				{recipe.description}
			</p>

			<div className="my-8 border-b border-slate-100" />

			{/* INGREDIENTS SECTION */}
			<div className="relative mb-8">
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-2xl font-bold text-slate-900">
						Ingredients
					</h2>
					<Button
						size="sm"
						onClick={addIngredientsToShoppingList}
						className="flex gap-2 "
					>
						<PlusCircle className="w-4 h-4" />
						<span>Add to List</span>
					</Button>
				</div>

				<ul className="space-y-3 bg-slate-50 p-6 rounded-2xl">
					{recipe.ingredients.map((ingredient, index) => (
						<li
							key={index}
							className="flex justify-between items-center border-b border-slate-200/50 pb-2 last:border-0 last:pb-0"
						>
							<span className="text-slate-700 font-medium">
								{ingredient.name}
							</span>
							<div className="flex gap-1 text-slate-500 font-mono text-sm bg-white px-2 py-1 rounded border border-slate-100">
								<span>{ingredient.quantity}</span>
								<span>{ingredient.unit}</span>
							</div>
						</li>
					))}
				</ul>
			</div>

			<div className="my-8 border-b border-slate-100" />

			{/* INSTRUCTIONS SECTION */}
			<h2 className="text-2xl font-bold text-slate-900 mb-6">
				Instructions
			</h2>
			<ol className="space-y-6">
				{recipe.instructions.map((step, index) => (
					<li key={index} className="relative pl-14 pt-1">
						<div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-cyan-600 text-white font-bold shadow-sm shadow-cyan-200">
							{index + 1}
						</div>
						<p className="text-slate-700 leading-relaxed text-lg">
							{step}
						</p>
					</li>
				))}
			</ol>
		</div>
	);
}

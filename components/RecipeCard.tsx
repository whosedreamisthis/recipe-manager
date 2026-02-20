'use client';
import React from 'react';
import { useSavedStore } from '@/stores/useSavedStore';
import { Bookmark, ThumbsUp } from 'lucide-react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import Image from 'next/image';
import { Recipe } from '@/lib/types';
import { useLikedStore } from '@/stores/useLikedStore';

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
	const toggleSaved = useSavedStore((state) => state.toggleSaved);
	const savedRecipes = useSavedStore((state) => state.savedRecipes);
	const liked = useLikedStore((state) => state.liked);
	const toggleLiked = useLikedStore((state) => state.toggleLiked);
	const isSaved = savedRecipes?.some((r) => r.id === recipe.id) ?? false;
	const isLiked = liked.includes(recipe.id);

	return (
		<div className="relative group">
			<Link href={`/recipes/${recipe.id}`} className="block">
				<Card className="overflow-hidden p-0 bg-white border-slate-200 transition-all duration-200 group-hover:border-cyan-500/50 group-hover:shadow-lg">
					<div className="relative h-44 w-full overflow-hidden">
						<Image
							src={recipe.image}
							alt={recipe.title}
							fill
							className="object-cover transition-transform duration-500 group-hover:scale-110"
							sizes="(max-width: 768px) 100vw, 33vw"
						/>
					</div>

					<CardHeader className="px-4 pt-4 pb-3">
						<CardTitle className="group-hover:text-cyan-600 transition-colors mb-1 text-lg">
							{recipe.title}
						</CardTitle>

						<CardDescription className="flex flex-col gap-1">
							{/* Line 1: Time */}
							<span className="text-xs text-slate-500">
								Ready in {recipe.prepTime + recipe.cookTime}{' '}
								minutes
							</span>

							{/* Line 2: The Like Placeholder */}
							<div className="flex items-center gap-1 h-6 mt-1">
								{/* Ghost spacer to move the number to the right of the absolute icon */}
								<div className="w-6" />
								<span className="text-sm font-semibold text-slate-700">
									{isLiked ? recipe.likes + 1 : recipe.likes}
								</span>
							</div>
						</CardDescription>
					</CardHeader>
				</Card>
			</Link>

			{/* 2. THE ABSOLUTE LIKE BUTTON */}
			{/* Positioned exactly over the placeholder in the second line of the description */}
			<div className="absolute bottom-[10px] left-[13px] z-20">
				<Button
					size="icon"
					variant="ghost"
					className="h-8 w-8 rounded-full hover:bg-slate-100 transition-colors"
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						toggleLiked(recipe.id);
					}}
				>
					<ThumbsUp
						className={`w-4 h-4 transition-all ${
							isLiked
								? 'fill-cyan-500 text-cyan-500'
								: 'text-slate-400'
						}`}
					/>
				</Button>
			</div>

			{/* 3. BOOKMARK BUTTON */}
			<div className="absolute top-3 right-3 z-10">
				<Button
					size="icon"
					variant="secondary"
					className="rounded-sm bg-white/80 backdrop-blur-sm shadow-sm"
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						toggleSaved(recipe);
					}}
				>
					<Bookmark
						className={`w-5 h-5 ${
							isSaved ? 'fill-gray-700' : 'text-slate-400'
						}`}
					/>
				</Button>
			</div>
		</div>
	);
}

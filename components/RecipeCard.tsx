'use client';
import { memo, useState, useEffect } from 'react';
import { Bookmark, ThumbsUp } from 'lucide-react';
import Link from 'next/link';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
} from './ui/recipe-card-base';
import { Button } from './ui/button';
import Image from 'next/image';
import { Recipe } from '@/lib/types';

interface Props {
	recipe: Recipe;
	isSaved: boolean;
	isLiked: boolean;
	onLike: () => void;
	onSave: () => void;
	index?: number;
}

const RecipeCard = memo(function RecipeCard({
	recipe,
	isSaved,
	isLiked,
	onLike,
	onSave,
	index,
}: Props) {
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
							src={recipe.image || '/placeholder-recipe.jpg'}
							alt={recipe.title}
							fill
							className="object-cover transition-transform duration-500 group-hover:scale-110"
							sizes="(max-width: 672px) 50vw, 336px"
							priority={index !== undefined && index < 2}
						/>
					</div>

					<CardHeader className="px-1 pt-0 pb-3">
						<CardTitle className="group-hover:text-cyan-600 transition-colors text-md line-clamp-1">
							{recipe.title}
						</CardTitle>

						<CardDescription className="flex flex-col">
							<span className="text-xs text-slate-500">
								Ready in {recipe.prepTime + recipe.cookTime}{' '}
								minutes
							</span>

							<div className="flex items-center gap-1 h-6 mt-0 -ml-1">
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
			<div className="absolute bottom-[10px] left-[0px] z-20">
				<Button
					size="icon"
					variant="ghost"
					aria-label="Toggle like recipe"
					className="h-8 w-8 rounded-full hover:bg-slate-100 transition-colors"
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						onLike();
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
						onSave();
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

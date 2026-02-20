'use client';
import React from 'react';
import { useSavedStore } from '@/stores/useSavedStore';
import { Heart, Bookmark, ThumbsUp } from 'lucide-react';
import Link from 'next/link';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from './ui/card';
import { Button } from './ui/button';
import Image from 'next/image';
import { Recipe } from '@/lib/types';

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
	const toggleSaved = useSavedStore((state) => state.toggleSaved);
	const saved = useSavedStore((state) => state.saved);
	const isSaved = saved.includes(recipe.id);

	return (
		<div className="relative group">
			<Link href={`/recipes/${recipe.id}`} className="block">
				{/* 1. Added bg-white to ensure it stays white. overflow-hidden is mandatory here to round the image corners */}
				<Card className="overflow-hidden p-0 bg-white border-slate-200 transition-all duration-200 group-hover:border-cyan-500/50 group-hover:shadow-lg">
					{/* 2. Moved outside of CardHeader to be flush with the top. overflow-hidden clips the zoom scale */}
					<div className="relative h-44 w-full overflow-hidden">
						<Image
							src={recipe.image}
							alt={recipe.title}
							fill
							className="object-cover transition-transform duration-500 group-hover:scale-110"
							sizes="(max-width: 768px) 100vw, 33vw"
						/>
					</div>

					{/* 3. CardHeader now starts after the image. pt-4 provides spacing from the photo */}
					<CardHeader className="px-2">
						<CardTitle className="group-hover:text-cyan-600 transition-colors">
							{recipe.title}
						</CardTitle>
						<CardDescription>
							<p>
								Ready in {recipe.prepTime + recipe.cookTime}{' '}
								minutes
							</p>
							<div className="mt-1 flex gap-1">
								<ThumbsUp className="w-5 h-5 fill-blue-300 text-gray-700" />
								<p className="font-semibold">{recipe.likes}</p>
							</div>
						</CardDescription>
					</CardHeader>

					<CardContent>
						{/* <p className="text-slate-600 text-sm line-clamp-2">
							{recipe.description}
						</p> */}
					</CardContent>
				</Card>
			</Link>

			{/* 4. Favorite Button - Kept relative to the parent div */}
			<div className="absolute top-3 right-3 z-10">
				<Button
					size="icon"
					variant="secondary"
					className="rounded-sm bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white"
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						toggleSaved(recipe.id);
					}}
				>
					<Bookmark
						className={`w-5 h-5 transition-all ${
							isSaved ? 'fill-gray-700' : 'text-slate-400'
						}`}
					/>
				</Button>
			</div>
		</div>
	);
}

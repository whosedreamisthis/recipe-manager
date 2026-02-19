'use client';
import React from 'react';
import { useFavouriteStore } from '@/stores/useFavouriteStore';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from './ui/card';
import { Button } from './ui/button';

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
	const toggleFavourite = useFavouriteStore((state) => state.toggleFavourite);
	const favourites = useFavouriteStore((state) => state.favourites);
	const isFavourite = favourites.includes(recipe.id);

	return (
		<div className="relative group">
			{/* 1. The Main Link Wrapper */}
			<Link href={`/recipes/${recipe.id}`} className="block">
				<Card className="transition-all duration-200 group-hover:border-cyan-500/50 group-hover:shadow-lg group-hover:shadow-cyan-500/10">
					<CardHeader>
						<CardTitle className="group-hover:text-cyan-400 transition-colors">
							{recipe.title}
						</CardTitle>
						<CardDescription>Ready in 20 minutes</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-slate-400 text-sm line-clamp-2">
							{recipe.description}
						</p>
					</CardContent>
					<CardFooter className="text-xs font-mono text-slate-500">
						VIEW_DETAILS →
					</CardFooter>
				</Card>
			</Link>

			{/* 2. The Isolated Favorite Button */}
			{/* We use absolute positioning and 'z-10' to pull it out of the Link's hit area */}
			<div className="absolute top-4 right-4 z-10">
				<Button
					size="icon"
					variant="ghost"
					className="rounded-full hover:bg-slate-800"
					onClick={(e) => {
						e.preventDefault(); // CRITICAL: Stops the Link from triggering
						e.stopPropagation(); // CRITICAL: Stops the click from bubbling up
						toggleFavourite(recipe.id);
					}}
				>
					<Heart
						className={`w-5 h-5 transition-all ${
							isFavourite
								? 'fill-red-500 text-red-500'
								: 'text-slate-400'
						}`}
					/>
				</Button>
			</div>
		</div>
	);
}

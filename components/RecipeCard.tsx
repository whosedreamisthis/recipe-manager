'use client';
import React, { useState } from 'react';
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Recipe } from '@/lib/types';
import { Button, buttonVariants } from './ui/button';
import { Heart, Plus } from 'lucide-react';
import Link from 'next/link';
import { useFavouriteStore } from '@/stores/useFavouriteStore';

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
	const toggleFavourite = useFavouriteStore((state) => state.toggleFavourite);
	const favourites = useFavouriteStore((state) => state.favourites);
	const isFavourite = favourites.includes(recipe.id);

	return (
		<Card>
			<CardHeader>
				<CardTitle>{recipe.title}</CardTitle>
				<CardDescription>Ready in 20 minutes</CardDescription>
			</CardHeader>

			<CardContent>
				<p>{recipe.description}</p>
			</CardContent>

			{/* This is where "Card Actions" live */}
			<CardFooter className="flex justify-between">
				<Link
					href={`/recipes/${recipe.id}`}
					className={buttonVariants({ variant: 'outline' })}
				>
					View Details
				</Link>
				<Button
					onClick={() => {
						toggleFavourite(recipe.id);
					}}
				>
					<Heart className={`${isFavourite ? 'fill-white' : ''} `} />
				</Button>
			</CardFooter>
		</Card>
	);
}

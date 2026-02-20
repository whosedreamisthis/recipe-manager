'use client';
import React from 'react';
import { useRecentStore } from '@/stores/useRecentStore';
import { Recipe } from '@/lib/types';

interface Props {
	recipe: Recipe;
}
export default function RecipeDetails({ recipe }: Props) {
	const addToRecent = useRecentStore((state) => state.addToRecent);
	addToRecent(recipe.id);
	return (
		<div>
			<p>{recipe.title}</p>
		</div>
	);
}

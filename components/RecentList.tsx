'use client';
import { Recipe } from '@/lib/types';
import { useRecentStore } from '@/stores/useRecentStore';

import React, { useMemo } from 'react';
import RecipeCard from './RecipeCard';

interface Props {
	recipes: Recipe[];
}
export default function RecentList({ recipes }: Props) {
	const recentIds = useRecentStore((state) => state.recentIds);
	const filteredRecipes = useMemo(() => {
		return recipes.filter((recipe) => recentIds.includes(recipe.id));
	}, [recipes, recentIds]);
	return (
		<div className="grid grid-cols-2 gap-5">
			{filteredRecipes.map((recipe) => (
				<RecipeCard key={recipe.id} recipe={recipe} />
			))}
		</div>
	);
}

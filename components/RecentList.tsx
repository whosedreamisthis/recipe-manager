'use client';
import { Recipe } from '@/lib/types';
import { useRecentStore } from '@/stores/useRecentStore';

import React, { useMemo } from 'react';
import RecipeCard from './RecipeCard';

interface Props {
	recipes: Recipe[];
}
export default function RecentList() {
	const recentRecipes = useRecentStore((state) => state.recentRecipes);

	return (
		<div className="grid grid-cols-2 gap-5">
			{recentRecipes.map((recipe) => (
				<RecipeCard key={recipe.id} recipe={recipe} />
			))}
		</div>
	);
}

'use client';
import { Recipe } from '@/lib/types';
import { useRecentStore } from '@/stores/useRecentStore';

import React, { useEffect, useMemo, useState } from 'react';
import RecipeCard from './RecipeCard';
import { useQuery } from '@tanstack/react-query';
import { getLikedIds, getSavedIds } from '@/app/actions';

interface Props {
	recipes: Recipe[];
}
export default function RecentList() {
	const [isHydrated, setIsHydrated] = useState(false);
	const recentRecipes = useRecentStore((state) => state.recentRecipes);
	const { data: savedIds = [] } = useQuery({
		queryKey: ['recipes', 'saved-ids'],
		queryFn: getSavedIds,
	});
	const { data: likedIds = [] } = useQuery({
		queryKey: ['recipes', 'liked-ids'],
		queryFn: getLikedIds,
	});
	useEffect(() => {
		setIsHydrated(true);
	}, []);

	if (!isHydrated) {
		return (
			<div className="grid grid-cols-2 gap-5 opacity-0">
				<div className="h-40 bg-slate-100 rounded-xl animate-pulse" />
				<div className="h-40 bg-slate-100 rounded-xl animate-pulse" />
			</div>
		);
	}

	if (recentRecipes.length === 0) {
		return (
			<div className="text-center py-10 text-slate-500">
				No recent recipes found.
			</div>
		);
	}

	return (
		<div className="grid grid-cols-2 gap-5">
			{recentRecipes.map((recipe) => (
				<RecipeCard
					key={recipe.id}
					recipe={recipe}
					isSaved={savedIds.includes(recipe.id)}
					isLiked={likedIds.includes(recipe.id)}
				/>
			))}
		</div>
	);
}

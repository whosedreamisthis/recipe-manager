import { Recipe } from '@/lib/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RecentState {
	recentRecipes: Recipe[];
	addRecent: (recipe: Recipe) => void;
}

export const useRecentStore = create<RecentState>()(
	persist(
		(set) => ({
			recentRecipes: [],
			addRecent: (recipe) =>
				set((state) => {
					// Remove if already exists to move it to the front
					const filtered = state.recentRecipes.filter(
						(r) => r.id !== recipe.id,
					);
					// Keep only the most recent 4 items
					return { recentRecipes: [recipe, ...filtered].slice(0, 4) };
				}),
		}),
		{ name: 'recent-recipes' },
	),
);

// stores/useSavedStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Recipe } from '@/lib/types';

type SavedState = {
	savedRecipes: Recipe[]; // Change 'saved' to 'savedRecipes' for clarity
	toggleSaved: (recipe: Recipe) => void;
};

export const useSavedStore = create<SavedState>()(
	persist(
		(set) => ({
			savedRecipes: [], // Initialize as empty array
			toggleSaved: (recipe) =>
				set((state) => {
					// Safety: Fallback to empty array if state is currently hydrating
					const currentSaved = state.savedRecipes ?? [];
					const isAlreadySaved = currentSaved.some(
						(r) => r.id === recipe.id,
					);

					return {
						savedRecipes: isAlreadySaved
							? currentSaved.filter((r) => r.id !== recipe.id)
							: [...currentSaved, recipe],
					};
				}),
		}),
		{ name: 'saved-recipes-storage' },
	),
);

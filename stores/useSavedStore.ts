import { create } from 'zustand';

type SavedState = {
	saved: string[];
	toggleSaved: (recipeId: string) => void;
};

export const useSavedStore = create<SavedState>((set) => ({
	saved: [],
	toggleSaved: (recipeId) =>
		set((state) => ({
			saved: state.saved.includes(recipeId)
				? state.saved.filter((f) => f !== recipeId)
				: [...state.saved, recipeId],
		})),
}));

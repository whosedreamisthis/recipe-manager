import { create } from 'zustand';

type FavouriteState = {
	favourites: string[];
	toggleFavourite: (recipeId: string) => void;
};

export const useFavouriteStore = create<FavouriteState>((set) => ({
	favourites: [],
	toggleFavourite: (recipeId) =>
		set((state) => ({
			favourites: state.favourites.includes(recipeId)
				? state.favourites.filter((f) => f !== recipeId)
				: [...state.favourites, recipeId],
		})),
}));

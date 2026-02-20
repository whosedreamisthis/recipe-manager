import { create } from 'zustand';

type LikedState = {
	liked: string[];
	toggleLiked: (recipeId: string) => void;
};

export const useLikedStore = create<LikedState>((set) => ({
	liked: [],
	toggleLiked: (recipeId) =>
		set((state) => ({
			liked: state.liked.includes(recipeId)
				? state.liked.filter((f) => f !== recipeId)
				: [...state.liked, recipeId],
		})),
}));

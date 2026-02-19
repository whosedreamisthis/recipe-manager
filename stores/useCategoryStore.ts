import { create } from 'zustand';

type CategoryState = {
	selectedCategory: string;
	setCategory: (cat: string) => void;
};

export const useCategoryStore = create<CategoryState>((set) => ({
	selectedCategory: '',
	setCategory: (cat: string) =>
		set((state) => ({
			selectedCategory: state.selectedCategory === cat ? '' : cat,
		})),
}));

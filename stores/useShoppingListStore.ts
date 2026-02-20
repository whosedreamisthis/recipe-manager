import { Ingredient, Recipe } from '@/lib/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RecentState {
	shoppingList: Ingredient[];
	addToShoppingList: (ingredients: Ingredient[]) => void;
	clearShoppingList: () => void;
	removeFromList: (name: string) => void;
}

export const useShoppingListStore = create<RecentState>()(
	persist(
		(set) => ({
			shoppingList: [],
			addToShoppingList: (ingredients) =>
				set((state) => ({
					shoppingList: [...state.shoppingList, ...ingredients],
				})),
			removeFromList: (name) =>
				set((state) => ({
					shoppingList: state.shoppingList.filter(
						(item) => item.name !== name,
					),
				})),
			clearShoppingList: () =>
				set((state) => ({
					shoppingList: [],
				})),
		}),
		{ name: 'shopping-list' },
	),
);

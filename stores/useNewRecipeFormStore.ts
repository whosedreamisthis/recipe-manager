import { create } from 'zustand';
import { Recipe, Ingredient } from '@/lib/types';

interface RecipeFormState {
	step: number;
	formData: Partial<Recipe>;
	setStep: (step: number) => void;
	updateFormData: (data: Partial<Recipe>) => void;
	resetForm: () => void;
	fillDemoData: () => void;
}

const initialData: Partial<Recipe> = {
	title: '',
	description: '',
	categories: [],
	prepTime: 0,
	cookTime: 0,
	image: '',
	ingredients: [{ name: '', quantity: 0, unit: '' }],
	instructions: [''],
};

export const useNewRecipeFormStore = create<RecipeFormState>((set) => ({
	step: 1,
	formData: initialData,
	setStep: (step) => set({ step }),
	updateFormData: (data) =>
		set((state) => ({ formData: { ...state.formData, ...data } })),
	resetForm: () => set({ step: 1, formData: initialData }),
	fillDemoData: () =>
		set({
			step: 1, // Jump straight to the end to show the list logic
			formData: {
				title: 'Signature Chocolate Lava Cake',
				description:
					'A gooey, decadent dessert that never fails to impress.',
				prepTime: 15,
				cookTime: 12,
				categories: ['Dessert', 'Dinner'],
				ingredients: [
					{ name: 'Dark Chocolate', quantity: 200, unit: 'g' },
					{ name: 'Butter', quantity: 100, unit: 'g' },
					{ name: 'Eggs', quantity: 3, unit: 'pcs' },
				],
				instructions: [
					'Melt the chocolate and butter together in a bain-marie.',
					'Whisk eggs and sugar until light and fluffy.',
					'Gently fold the chocolate into the egg mixture.',
					'Pour into greased ramekins and bake at 200°C for 12 minutes.',
				],
				image:
					'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=820&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
			},
		}),
}));

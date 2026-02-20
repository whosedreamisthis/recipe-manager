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
			step: 3, // Jump straight to the end to show the list logic
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
			},
		}),
}));

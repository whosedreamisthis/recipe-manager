export interface Ingredient {
	name: string; // "Red Miso Paste"
	quantity: number; // 2
	unit: string; // "tbsp"
}

export interface Recipe {
	id: string;
	title: string;
	description: string;
	categories: string[];
	prepTime: number;
	cookTime: number;
	likes: number;
	image: string;
	ingredients: Ingredient[];
	instructions: string[];
}

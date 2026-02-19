'use client';
import { Recipe } from '@/lib/types';
import RecipeCard from './RecipeCard';
import { RECIPE_CATEGORIES } from '@/data/seed-recipes';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useCategoryStore } from '@/stores/useCategoryStore';
import { useSearchStore } from '@/stores/useSearchStore';

export default function RecipeList({ recipes }: { recipes: Recipe[] }) {
	// const [filteredRecipes, setFilteredRecipes] = useState(recipes);
	const selectedCategory = useCategoryStore(
		(state) => state.selectedCategory,
	);
	const query = useSearchStore((state) => state.query);

	const filteredRecipes = useMemo(() => {
		console.log('Filtering recipes...'); // Useful for testing if it's working

		return recipes.filter((recipe) => {
			return (
				(selectedCategory === '' ||
					recipe.categories.includes(selectedCategory)) &&
				recipe.title.toLowerCase().includes(query.toLowerCase())
			);
		});
	}, [recipes, selectedCategory, query]);

	return (
		<div className="grid grid-cols-1 gap-5">
			{filteredRecipes.map((recipe) => {
				return (
					<div key={recipe.id}>
						<RecipeCard recipe={recipe} />
					</div>
				);
			})}
		</div>
	);
}

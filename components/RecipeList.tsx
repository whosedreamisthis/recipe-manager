'use client';
import { Recipe } from '@/lib/types';
import RecipeCard from './RecipeCard';
import { RECIPE_CATEGORIES } from '@/data/seed-recipes';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useCategoryStore } from '@/stores/useCategoryStore';
import { useSearchStore } from '@/stores/useSearchStore';
import { useUIStore } from '@/stores/useUIStore';
import { useSavedStore } from '@/stores/useSavedStore';

export default function RecipeList({ recipes }: { recipes: Recipe[] }) {
	const activeTab = useUIStore((state) => state.activeTab);
	const saved = useSavedStore((state) => state.saved);
	console.log('activeTab', activeTab);
	// const [filteredRecipes, setFilteredRecipes] = useState(recipes);
	const selectedCategory = useCategoryStore(
		(state) => state.selectedCategory,
	);
	const query = useSearchStore((state) => state.query);
	const [debouncedQuery, setDebouncedQuery] = useState(query);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedQuery(query);
		}, 300);

		return () => {
			if (handler) clearTimeout(handler);
		};
	}, [query]);
	const filteredRecipes = useMemo(() => {
		console.log('Filtering recipes...'); // Useful for testing if it's working

		return recipes.filter((recipe) => {
			return (
				(selectedCategory === '' ||
					recipe.categories.includes(selectedCategory)) &&
				recipe.title
					.toLowerCase()
					.includes(debouncedQuery.toLowerCase()) &&
				(activeTab !== 'saved' || saved.includes(recipe.id))
			);
		});
	}, [recipes, selectedCategory, debouncedQuery, activeTab, saved]);

	return (
		<div className="grid grid-cols-2 gap-5">
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

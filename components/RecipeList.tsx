import { Recipe } from '@/lib/types';
import RecipeCard from './RecipeCard';

export default function RecipeList({ recipes }: { recipes: Recipe[] }) {
	return (
		<div className="grid grid-cols-3 gap-5 m-2">
			{recipes.map((recipe) => {
				return (
					<div key={recipe.id}>
						<RecipeCard recipe={recipe} />
					</div>
				);
			})}
		</div>
	);
}

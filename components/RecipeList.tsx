import { Recipe } from '@/lib/types';
import RecipeCard from './RecipeCard';
import { RECIPE_CATEGORIES } from '@/data/seed-recipes';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search } from 'lucide-react';

export default function RecipeList({ recipes }: { recipes: Recipe[] }) {
	return (
		<div className="grid grid-cols-1 gap-5 m-2">
			<div className="flex gap-4">
				<Button>
					<Search />
				</Button>
				<Input />
			</div>
			<div className="flex overflow-x-auto no-scrollbar gap-2 py-2 px-4 ">
				{RECIPE_CATEGORIES.map((cat) => (
					<button
						key={cat}
						className="whitespace-nowrap px-4 py-1 rounded-md border border-slate-700 text-sm"
					>
						{cat}
					</button>
				))}
			</div>
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

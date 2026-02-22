import { fetchRecipe } from '@/app/actions';
import RecipeDetails from '@/components/RecipeDetails';

export default async function RecipePage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const recipe = await fetchRecipe(id);

	if (!recipe) {
		throw new Error('Failed to fetch recipe');
	}
	return (
		<div>
			<RecipeDetails recipe={recipe} />
		</div>
	);
}

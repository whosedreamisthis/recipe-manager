import { fetchRecipe } from '@/app/actions';
import RecipeDetails from '@/components/RecipeDetails';
import { Metadata } from 'next';

type Props = {
	params: Promise<{ id: string }>;
};

// --- 1. METADATA FOR PRELOADING ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { id } = await params;
	const recipe = await fetchRecipe(id);

	if (!recipe) return { title: 'Recipe Not Found' };

	return {
		title: `${recipe.title} | My Recipe App`,
		description: recipe.description,
	};
}

// --- 2. PAGE COMPONENT ---
export default async function RecipePage({ params }: Props) {
	const { id } = await params;
	const recipe = await fetchRecipe(id);

	if (!recipe) {
		throw new Error('Failed to fetch recipe');
	}

	return (
		<main>
			<RecipeDetails recipe={recipe} />
		</main>
	);
}

import { fetchRecipe } from '@/app/actions';
import { Recipe } from '@/lib/types';
import React from 'react';

export default async function RecipePage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const recipe = await fetchRecipe(id);
	return (
		<div>
			<h1>{recipe?.title}</h1>
		</div>
	);
}

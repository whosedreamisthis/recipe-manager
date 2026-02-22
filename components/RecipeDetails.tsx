'use client';
import React, { useEffect } from 'react';
import { useRecentStore } from '@/stores/useRecentStore';
import { Recipe } from '@/lib/types';
import Image from 'next/image';
import { Button } from './ui/button';
import { PlusCircle } from 'lucide-react';
import { useShoppingListStore } from '@/stores/useShoppingListStore';
import { toast } from 'sonner';
import { useUIStore } from '@/stores/useUIStore';
import { useRouter } from 'next/navigation';

interface Props {
	recipe: Recipe;
}
export default function RecipeDetails({ recipe }: Props) {
	const addRecent = useRecentStore((state) => state.addRecent);
	const setActiveTab = useUIStore((state) => state.setActiveTab);
	const router = useRouter();
	const addToShoppingList = useShoppingListStore(
		(state) => state.addToShoppingList,
	);
	useEffect(() => {
		// 🛡️ Move the call inside useEffect to avoid the "update while rendering" error
		if (recipe) {
			addRecent(recipe);
		}
	}, [recipe, addRecent]);

	const addIngredientsToShoppingList = () => {
		addToShoppingList(recipe.ingredients);
		toast.success('List Updated', {
			description: `Added ${recipe.ingredients.length} ingredients from ${recipe.title}.`,
			action: {
				label: 'View List',
				onClick: () => {
					// Logic to switch to shopping tab
					router.push('/shopping-list');
				},
			},
			actionButtonStyle: {
				background: 'rgba(255, 255, 255, 0.2)', // Subtle light overlay
				border: '1px solid rgba(255, 255, 255, 0.4)',
				color: 'white',
			},
		});
	};

	return (
		<div>
			<div className="relative h-44 w-full overflow-hidden">
				<Image
					src={recipe.image}
					alt={recipe.title}
					fill
					className="object-cover transition-transform duration-500 group-hover:scale-110"
					sizes="(max-width: 768px) 100vw, 33vw"
				/>
			</div>
			<em className="italics">{recipe.author}</em>
			<h1 className="font-bold mt-5 mb-2 text-3xl">{recipe.title}</h1>
			<p>{recipe.description}</p>
			<div className="border-b mt-4 border-1 border-black"></div>
			<div className="relative">
				<h2 className="uppercase text-lg underline my-2 text-center">
					Ingredients
				</h2>
				<Button
					size="sm"
					onClick={addIngredientsToShoppingList}
					className="flex gap-2 absolute top-0 right-0 hover:bg-gray-700 active:bg-gray-400"
					aria-label="Add ingredients to shopping list"
				>
					<PlusCircle className="w-4 h-4" />
					<span>Add All</span>
				</Button>
			</div>

			<ul className="m-auto w-[40%]">
				{/* <li>
					<div></div>
				</li> */}
				{recipe.ingredients.map((ingredient, index) => (
					<div key={index} className="flex justify-between">
						<p>{ingredient.name}</p>
						<div className="flex gap-2">
							<p>{ingredient.quantity}</p>
							<p>{ingredient.unit}</p>
						</div>
					</div>
				))}
			</ul>
			<div className="border-b mt-4 border-1 border-black"></div>
			<h2 className="uppercase text-lg underline my-2 text-center">
				Instructions
			</h2>
			<ol>
				{recipe.instructions.map((step, index) => {
					return (
						<li
							key={index}
							className="relative pl-12 pt-3 before:content-[counter(step)] [counter-increment:step] 
                       before:absolute before:left-0 before:top-3 
                       before:flex before:h-8 before:w-8 before:items-center before:justify-center 
                        before:bg-cyan-50 before:text-sm before:font-bold 
                       before:text-cyan-600 before:border before:border-cyan-100"
						>
							<p className="text-slate-700 leading-relaxed pt-1">
								{step}
							</p>
						</li>
					);
				})}
			</ol>
		</div>
	);
}

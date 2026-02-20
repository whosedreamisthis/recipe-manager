'use client';
import React from 'react';
import { useShoppingListStore } from '@/stores/useShoppingListStore';
import { Button } from './ui/button';
import { Trash2, X } from 'lucide-react'; // Import icons

export default function ShoppingList() {
	const shoppingList = useShoppingListStore((state) => state.shoppingList);
	const clearShoppingList = useShoppingListStore(
		(state) => state.clearShoppingList,
	);
	const removeFromList = useShoppingListStore(
		(state) => state.removeFromList,
	);

	return (
		<div className="max-w-2xl mx-auto p-4">
			<div className="flex justify-between items-center border-b pb-4 mb-6">
				<h1 className="text-2xl font-bold">Shopping List</h1>
				{shoppingList.length > 0 && (
					<Button
						variant="destructive"
						size="sm"
						onClick={clearShoppingList}
					>
						Clear All
					</Button>
				)}
			</div>

			<div className="space-y-3">
				{shoppingList.length === 0 ? (
					<p className="text-center text-slate-500 py-10">
						Your list is empty.
					</p>
				) : (
					shoppingList.map((ingredient, index) => (
						<div
							key={index}
							className="flex items-center justify-between p-3 bg-white border rounded-md shadow-sm hover:border-cyan-200 transition-colors"
						>
							<div className="flex flex-col">
								<span className="font-medium text-slate-900">
									{ingredient.name}
								</span>
								<span className="text-sm text-slate-500">
									{ingredient.quantity} {ingredient.unit}
								</span>
							</div>

							<Button
								variant="ghost"
								size="icon"
								className="text-slate-400 hover:text-red-500 hover:bg-red-50"
								onClick={() => removeFromList(ingredient.name)}
							>
								<X className="h-4 w-4" />
							</Button>
						</div>
					))
				)}
			</div>
		</div>
	);
}

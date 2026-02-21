import { useFieldArray, useForm } from 'react-hook-form';
import { useNewRecipeFormStore } from '@/stores/useNewRecipeFormStore';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Trash2, Plus, ArrowUp, ArrowDown } from 'lucide-react';
import { toast } from 'sonner';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { addRecipe } from '@/app/actions';
import { Recipe } from '@/lib/types';

interface InstructionForm {
	instructions: { value: string }[];
}

export default function Step3Instructions() {
	const { user } = useUser();
	const router = useRouter();

	const {
		formData,
		setStep,
		updateFormData,
		resetForm,
	} = useNewRecipeFormStore();

	const { control, register, handleSubmit } = useForm<InstructionForm>({
		defaultValues: {
			// Transform string[] to object[] for more stable field tracking
			instructions: formData.instructions?.length
				? formData.instructions.map((i) => ({ value: i }))
				: [{ value: '' }],
		},
	});

	const { fields, append, remove, move } = useFieldArray({
		control,
		name: 'instructions',
	});

	const onSubmit = async (data: InstructionForm) => {
		const instructionsStrings = data.instructions.map((i) => i.value);

		// This object fulfills the strict requirements by ensuring no field is undefined
		const recipeToSave: Omit<Recipe, 'id'> = {
			title: formData.title || 'Untitled Recipe',
			description: formData.description || '',
			// Providing a default string here fixes the 'undefined' error
			author: 'Guest User' as string,
			likes: 0,
			prepTime: Number(formData.prepTime) || 0,
			cookTime: Number(formData.cookTime) || 0,
			categories: formData.categories || [],
			image: formData.image || '/placeholder-recipe.jpg',
			ingredients: formData.ingredients || [],
			instructions: instructionsStrings,
		};

		try {
			const result = await addRecipe(recipeToSave);

			if (result.success) {
				toast.success('Recipe Created!');
				resetForm();
				// This redirect works because 'addRecipe' returns a valid ID
				router.push(`/recipes/${result.recipeId}`);
			}
		} catch (error) {
			toast.error('Failed to save recipe');
			console.error(error);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-16">
			<div className="flex flex-col gap-4">
				<div className="flex justify-between items-center mb-10">
					<h2 className="text-xl font-bold">Cooking Steps</h2>
					<span className="text-xs text-slate-400 uppercase font-semibold tracking-wider">
						Step 3 of 3
					</span>
				</div>
				<div className="space-y-4">
					{fields.map((field, index) => (
						<div
							key={field.id}
							className="group flex gap-4 items-start bg-slate-50 p-4 rounded-xl border border-transparent hover:border-slate-200 transition-all"
						>
							{/* Step Number Badge */}
							<div className="flex-shrink-0 w-8 h-8 bg-cyan-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
								{index + 1}
							</div>

							<div className="flex-1 flex flex-col gap-3">
								<Textarea
									{...register(
										`instructions.${index}.value` as const,
									)}
									placeholder="e.g. Preheat oven to 350°F and grease a baking sheet..."
									className="bg-white border-slate-200 focus:ring-cyan-500 min-h-[80px]"
								/>

								{/* Row Actions */}
								<div className="flex gap-2 pt-2">
									<Button
										type="button"
										variant="ghost"
										size="sm"
										onClick={() => move(index, index - 1)}
										disabled={index === 0}
									>
										<ArrowUp className="w-3 h-3 mr-1" /> Up
									</Button>
									<Button
										type="button"
										variant="ghost"
										size="sm"
										onClick={() => move(index, index + 1)}
										disabled={index === fields.length - 1}
									>
										<ArrowDown className="w-3 h-3 mr-1" />{' '}
										Down
									</Button>
									<div className="flex-grow" />
									<Button
										type="button"
										variant="ghost"
										size="sm"
										className="text-red-500 hover:text-red-600 hover:bg-red-50"
										onClick={() => remove(index)}
									>
										<Trash2 className="w-3 h-3" />
									</Button>
								</div>
							</div>
						</div>
					))}
				</div>

				<Button
					type="button"
					variant="outline"
					className="w-full border-dashed border-2 py-8 hover:bg-cyan-50 hover:border-cyan-200 hover:text-cyan-600 transition-all"
					onClick={() => append({ value: '' })}
				>
					<Plus className="w-4 h-4 mr-2" />
					Add Next Step
				</Button>

				<div className="flex  mt-10 gap-3">
					<div className="flex gap-3 ml-auto">
						<Button
							onClick={() => setStep(2)}
							variant="outline"
							className="rounded-md font-bold px-8 mr-auto"
						>
							Back
						</Button>
						<Button
							type="submit"
							className="bg-cyan-600 hover:bg-cyan-700 text-white rounded-md font-bold"
						>
							{user ? 'Publish Recipe' : 'Save Locally'}
						</Button>
					</div>
				</div>
			</div>
		</form>
	);
}

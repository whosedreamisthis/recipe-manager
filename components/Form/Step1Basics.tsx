import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { recipeSchema } from '@/lib/schemas'; // Your schema from earlier
import { CategorySelect } from './CategorySelect'; // The Combobox we discussed
import { useNewRecipeFormStore } from '@/stores/useNewRecipeFormStore';

export default function Step1Basics() {
	const { formData, setStep, updateFormData } = useNewRecipeFormStore();

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(
			recipeSchema.pick({
				title: true,
				description: true,
				categories: true,
				prepTime: true,
				cookTime: true,
			}),
		),
		defaultValues: formData,
	});

	const onSubmit = (data: any) => {
		updateFormData(data);
		setStep(2);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
			<div>
				<label className="block text-sm font-medium mb-1">
					Recipe Title
				</label>
				<input
					{...register('title')}
					className="w-full p-2 border rounded-md"
				/>
				{errors.title && (
					<p className="text-red-500 text-xs">
						{errors.title.message as string}
					</p>
				)}
			</div>

			<div className="grid grid-cols-2 gap-4">
				<div>
					<label className="block text-sm font-medium mb-1">
						Prep Time (mins)
					</label>
					<input
						type="number"
						{...register('prepTime', { valueAsNumber: true })}
						className="w-full p-2 border rounded-md"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium mb-1">
						Cook Time (mins)
					</label>
					<input
						type="number"
						{...register('cookTime', { valueAsNumber: true })}
						className="w-full p-2 border rounded-md"
					/>
				</div>
			</div>

			<div>
				<label className="block text-sm font-medium mb-2">
					Categories
				</label>
				<CategorySelect
					selected={formData.categories || []}
					onChange={(val) => updateFormData({ categories: val })}
				/>
			</div>

			<button
				type="submit"
				className="w-full bg-cyan-600 text-white py-3 rounded-xl font-bold"
			>
				Next: Ingredients
			</button>
		</form>
	);
}

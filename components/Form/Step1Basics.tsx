import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { recipeSchema } from '@/lib/schemas'; // Your schema from earlier
import { CategorySelect } from './CategorySelect'; // The Combobox we discussed
import { useNewRecipeFormStore } from '@/stores/useNewRecipeFormStore';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

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
				<Input
					{...register('title')}
					className="w-full p-2 border rounded-sm"
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
					<Input
						type="number"
						{...register('prepTime', { valueAsNumber: true })}
						className="w-full p-2 border rounded-sm"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium mb-1">
						Cook Time (mins)
					</label>
					<Input
						type="number"
						{...register('cookTime', { valueAsNumber: true })}
						className="w-full p-2 border rounded-sm"
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

			<div className="flex  mt-10">
				<Button
					type="submit"
					className="bg-cyan-600 text-white rounded-md font-bold px-8 ml-auto"
				>
					Next
				</Button>
			</div>
		</form>
	);
}

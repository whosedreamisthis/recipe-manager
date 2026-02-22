import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { recipeSchema } from '@/lib/schemas'; // Your schema from earlier
import { CategorySelect } from './CategorySelect'; // The Combobox we discussed
import { useNewRecipeFormStore } from '@/stores/useNewRecipeFormStore';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import Image from 'next/image';
import { useEffect } from 'react';
export default function Step1Basics() {
	const { formData, setStep, updateFormData } = useNewRecipeFormStore();

	const {
		register,
		handleSubmit,
		control,
		reset,
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

	useEffect(() => {
		reset(formData);
	}, [formData, reset]);

	const onSubmit = (data: any) => {
		updateFormData(data);
		setStep(2);
	};

	// Inside your Step 1 or General Info component
	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const url = e.target.value;
		updateFormData({ image: url }); // Update your global or parent state
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
			<div className="flex flex-col gap-5">
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
					<label className="block text-sm font-medium">
						Categories
					</label>
					<CategorySelect
						selected={formData.categories || []}
						onChange={(val) => updateFormData({ categories: val })}
					/>
				</div>
				<div className="flex flex-col gap-3 space-y-4 bg-white p-6 rounded-2xl border border-slate-200">
					<h3 className="text-lg font-bold text-slate-800">
						Recipe Cover Image
					</h3>

					<div className="flex flex-col gap-4">
						{/* Visual Size Limit: max-h-64 and aspect-video */}
						<div className="relative w-full h-64 aspect-video rounded-sm bg-slate-100 border-2 border-dashed border-slate-300 overflow-hidden flex items-center justify-center">
							{formData.image ? (
								<Image
									src={formData.image}
									fill
									alt="Preview"
									className="object-cover"
									sizes="(max-width: 768px) 100vw, 50vw"
									onError={(e) =>
										(e.currentTarget.src =
											'/placeholder-recipe.jpg')
									}
								/>
							) : (
								<div className="text-center text-slate-400">
									<p className="text-sm">
										Image Preview Area
									</p>
								</div>
							)}
						</div>

						<input
							type="text"
							placeholder="Paste Image URL here..."
							className="w-full p-3 rounded-xl border border-slate-200"
							value={formData.image || ''}
							onChange={(e) =>
								updateFormData({ image: e.target.value })
							}
						/>
					</div>
				</div>
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

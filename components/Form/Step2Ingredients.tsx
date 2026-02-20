import { useNewRecipeFormStore } from '@/stores/useNewRecipeFormStore';
import { useFieldArray, useForm } from 'react-hook-form';

export default function Step2Ingredients() {
	const { formData, setStep, updateFormData } = useNewRecipeFormStore();
	const { control, register, handleSubmit } = useForm({
		defaultValues: formData,
	});
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'ingredients',
	});

	const onNext = (data: any) => {
		updateFormData(data);
		setStep(3);
	};

	return (
		<form onSubmit={handleSubmit(onNext)} className="space-y-4">
			<h2 className="text-xl font-bold">Ingredients</h2>
			{fields.map((field, index) => (
				<div key={field.id} className="flex gap-2">
					<input
						{...register(`ingredients.${index}.name`)}
						placeholder="Item"
						className="flex-1 p-2 border rounded-md"
					/>
					<input
						{...register(`ingredients.${index}.quantity`)}
						type="number"
						className="w-20 p-2 border rounded-md"
					/>
					<input
						{...register(`ingredients.${index}.unit`)}
						placeholder="Unit"
						className="w-20 p-2 border rounded-md"
					/>
					<button
						onClick={() => remove(index)}
						className="text-red-500"
					>
						✕
					</button>
				</div>
			))}

			<button
				type="button"
				onClick={() => append({ name: '', quantity: 0, unit: '' })}
				className="text-cyan-600 text-sm font-bold"
			>
				+ Add Ingredient
			</button>

			<div className="flex gap-4 pt-6">
				<button
					onClick={() => setStep(1)}
					className="flex-1 border py-3 rounded-xl"
				>
					Back
				</button>
				<button
					type="submit"
					className="flex-1 bg-cyan-600 text-white py-3 rounded-xl"
				>
					Next: Instructions
				</button>
			</div>
		</form>
	);
}

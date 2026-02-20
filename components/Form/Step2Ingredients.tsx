import { useNewRecipeFormStore } from '@/stores/useNewRecipeFormStore';
import { useFieldArray, useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

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
		<form onSubmit={handleSubmit(onNext)}>
			<div className="flex flex-col gap-4 items-start">
				<Label className="text-xl font-bold">Ingredients</Label>
				{fields.map((field, index) => (
					<div key={field.id} className="flex gap-2">
						<Input
							{...register(`ingredients.${index}.name`)}
							placeholder="Ingredient name (e.g. Flour)"
						/>
						<Input
							{...register(`ingredients.${index}.quantity`)}
							type="number"
							className="w-20"
						/>
						<Input
							{...register(`ingredients.${index}.unit`)}
							placeholder="Unit"
							className="w-20"
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
			</div>

			<div className="flex  mt-10 gap-3">
				<div className="flex gap-3 ml-auto">
					<Button
						onClick={() => setStep(1)}
						variant="outline"
						className="rounded-md font-bold px-8 mr-auto"
					>
						Back
					</Button>
					<Button
						type="submit"
						className="bg-cyan-600 text-white rounded-md font-bold px-8 ml-auto"
					>
						Next
					</Button>
				</div>
			</div>
		</form>
	);
}

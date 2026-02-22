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
			<div className="flex flex-col gap-4 items-stretch">
				<Label className="text-xl font-bold">Ingredients</Label>

				{fields.map((field, index) => (
					<div key={field.id} className="flex gap-2 items-end">
						{/* 1. Name Input + Hidden Label */}
						<div className="flex-1">
							<Label
								htmlFor={`name-${index}`}
								className="sr-only"
							>
								Ingredient Name
							</Label>
							<Input
								id={`name-${index}`}
								{...register(`ingredients.${index}.name`)}
								placeholder="Ingredient name"
							/>
						</div>

						{/* 2. Quantity Input + Hidden Label */}
						<div>
							<Label htmlFor={`qty-${index}`} className="sr-only">
								Quantity
							</Label>
							<Input
								id={`qty-${index}`}
								{...register(`ingredients.${index}.quantity`)}
								type="number"
								className="w-20"
							/>
						</div>

						{/* 3. Unit Input + Hidden Label */}
						<div>
							<Label
								htmlFor={`unit-${index}`}
								className="sr-only"
							>
								Unit
							</Label>
							<Input
								id={`unit-${index}`}
								{...register(`ingredients.${index}.unit`)}
								placeholder="Unit"
								className="w-20"
							/>
						</div>

						{/* Remove button remains the same */}
						<button
							onClick={() => remove(index)}
							className="text-red-500 pb-2"
						>
							✕
						</button>
					</div>
				))}
				<Button
					type="button"
					onClick={() => append({ name: '', quantity: 0, unit: '' })}
					className=" text-sm font-bold"
				>
					+ Add Ingredient
				</Button>
			</div>

			<div className="flex  mt-10 gap-3">
				<div className="flex gap-3 ml-auto">
					<Button
						onClick={() => setStep(1)}
						variant="outline"
						className="rounded-md font-bold px-8 mr-auto"
						aria-label="Go to first form step (basics)"
					>
						Back
					</Button>
					<Button
						type="submit"
						className="bg-cyan-600 text-white rounded-md font-bold px-8 ml-auto"
						aria-label="Go to 3rd form step (instructions)"
					>
						Next
					</Button>
				</div>
			</div>
		</form>
	);
}

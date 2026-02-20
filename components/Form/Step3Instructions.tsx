import { useFieldArray, useForm } from 'react-hook-form';
import { useNewRecipeFormStore } from '@/stores/useNewRecipeFormStore';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Trash2, Plus, ArrowUp, ArrowDown } from 'lucide-react';

export default function Step3Instructions() {
	const {
		formData,
		setStep,
		updateFormData,
		resetForm,
	} = useNewRecipeFormStore();

	const { control, register, handleSubmit } = useForm({
		defaultValues: {
			instructions: formData.instructions?.length
				? formData.instructions
				: [''],
		},
	});

	const { fields, append, remove, move } = useFieldArray({
		control,
		name: 'instructions' as never, // "as never" helps with strict TS nested string arrays
	});

	const onSubmit = (data: any) => {
		updateFormData(data);

		// Final Submission Logic
		console.log('Final Recipe Data:', { ...formData, ...data });
		alert('Recipe Created Locally! (Sign in to save to DB)');
		// resetForm();
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
			<div className="flex justify-between items-center">
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

						<div className="flex-grow space-y-2">
							<Textarea
								{...register(`instructions.${index}` as const)}
								placeholder="e.g. Preheat oven to 350°F and grease a baking sheet..."
								className="bg-white border-slate-200 focus:ring-cyan-500 min-h-[80px]"
							/>

							{/* Row Actions */}
							<div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
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
									<ArrowDown className="w-3 h-3 mr-1" /> Down
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
				onClick={() => append('')}
			>
				<Plus className="w-4 h-4 mr-2" />
				Add Next Step
			</Button>

			<div className="flex gap-4 pt-10 border-t">
				<Button
					type="button"
					variant="secondary"
					className="flex-1 py-6"
					onClick={() => setStep(2)}
				>
					Back to Ingredients
				</Button>
				<Button
					type="submit"
					className="flex-1 py-6 bg-slate-900 hover:bg-black text-white"
				>
					Finish & Create Recipe
				</Button>
			</div>
		</form>
	);
}

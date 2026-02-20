'use client';

import { useNewRecipeFormStore } from '@/stores/useNewRecipeFormStore';
import Step1Basics from './Step1Basics';
import Step2Ingredients from './Step2Ingredients';
import Step3Instructions from './Step3Instructions';
import FormProgress from './FormProgress';
import { Button } from '../ui/button';
import { Sparkles } from 'lucide-react';

export default function NewRecipeForm() {
	const step = useNewRecipeFormStore((state) => state.step);
	const fillDemoData = useNewRecipeFormStore((state) => state.fillDemoData);

	return (
		<div className="max-w-2xl mx-auto py-10 px-6">
			{/* Header with Magic Button */}
			<div className="flex justify-between items-center mb-10">
				<div>
					<h1 className="text-3xl font-bold">Create Recipe</h1>
					<p className="text-slate-500 text-sm">
						Follow the steps to add your masterpiece.
					</p>
				</div>
				<Button
					onClick={fillDemoData}
					variant="outline"
					className="bg-cyan-50 border-cyan-200 text-cyan-700 hover:bg-cyan-100 flex gap-2"
				>
					<Sparkles className="w-4 h-4" />
					Demo Fill
				</Button>
			</div>

			<FormProgress currentStep={step} totalSteps={3} />

			<div className="mt-12 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
				{step === 1 && <Step1Basics />}
				{step === 2 && <Step2Ingredients />}
				{step === 3 && <Step3Instructions />}
			</div>
		</div>
	);
}

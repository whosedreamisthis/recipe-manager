// components/FormProgress.tsx
interface FormProgressProps {
	currentStep: number;
	totalSteps: number;
}

export default function FormProgress({ currentStep }: FormProgressProps) {
	const steps = [
		{ id: 1, label: 'Basics' },
		{ id: 2, label: 'Ingredients' },
		{ id: 3, label: 'Instructions' },
	];

	return (
		<div className="flex justify-between w-[60%] mt-4">
			{steps.map((step, index) => {
				return (
					<p
						key={index}
						className={`uppercase font-bold ${
							currentStep === index + 1
								? 'text-cyan-600'
								: 'text-slate-400'
						} `}
					>
						{step.label}
					</p>
				);
			})}
		</div>
	);
}

// components/FormProgress.tsx
import { Check } from 'lucide-react';

interface FormProgressProps {
	currentStep: number;
	totalSteps: number;
}

export default function FormProgress({
	currentStep,
	totalSteps,
}: FormProgressProps) {
	const steps = [
		{ id: 1, label: 'Basics' },
		{ id: 2, label: 'Ingredients' },
		{ id: 3, label: 'Steps' },
	];

	return (
		<nav aria-label="Progress" className="w-full px-4">
			<ol role="list" className="flex items-center w-full">
				{steps.map((step, index) => (
					<li
						key={step.id}
						className={`relative flex flex-col items-center ${
							index !== steps.length - 1 ? 'flex-1' : ''
						}`}
					>
						{/* The Line (Only for steps that aren't the last one) */}
						{index !== steps.length - 1 && (
							<div
								className="absolute w-full h-0.5"
								style={{
									top: '1rem',
									left: '50%',
									backgroundColor:
										step.id < currentStep
											? '#0891b2'
											: '#e2e8f0', // cyan-600 or slate-200
								}}
							/>
						)}

						{/* Circle and Icon */}
						<div className="relative z-10 flex flex-col items-center">
							<div
								className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors duration-300 bg-white ${
									step.id < currentStep
										? 'bg-cyan-600 border-cyan-600'
										: step.id === currentStep
										? 'border-cyan-600 text-cyan-600'
										: 'border-slate-300 text-slate-300'
								}`}
							>
								{step.id < currentStep ? (
									<Check className="h-5 w-5 text-white" />
								) : (
									<span className="text-sm font-bold">
										{step.id}
									</span>
								)}
							</div>

							{/* Label - Positioned absolutely below to avoid affecting line width */}
							<div className="absolute top-10 w-32 text-center">
								<span
									className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider block transition-colors ${
										step.id === currentStep
											? 'text-cyan-600'
											: 'text-slate-400'
									}`}
								>
									{step.label}
								</span>
							</div>
						</div>
					</li>
				))}
			</ol>
		</nav>
	);
}

'use client';

import { Progress } from '@/components/ui/progress';

interface ShoppingProgressProps {
	currentStep: number;
	totalSteps: number;
}

export function ShoppingProgress({
	currentStep,
	totalSteps,
}: ShoppingProgressProps) {
	const progress = (currentStep / totalSteps) * 100;

	return (
		<div className="mb-8">
			<div className="mb-2 flex items-center justify-between">
				<span className="text-sm text-gray-500">
					Step {currentStep} of {totalSteps}
				</span>
				<span className="text-sm text-gray-500">{Math.round(progress)}%</span>
			</div>
			<Progress value={progress} className="h-1 bg-gray-100" />
		</div>
	);
}

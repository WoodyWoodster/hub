'use client';

import { ShoppingPageWrapper } from '@/components/shopping-page-wrapper';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Upload, Ban } from 'lucide-react';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { useState } from 'react';

export default function Intentions() {
	const router = useRouter();
	const [selectedOption, setSelectedOption] = useState<string>('');
	const currentYear = new Date().getFullYear();

	return (
		<ShoppingPageWrapper>
			<h1 className="font-display mb-4 text-4xl font-medium text-gray-900">
				What do you want to do for health insurance?
			</h1>
			<p className="mb-8 text-xl/relaxed text-gray-600">
				You can purchase health insurance for you and/or your household, upload
				your current coverage if you have any that will be used for
				reimbursement (such as a marketplace plan or a medicare plan), or choose
				to waive coverage.
			</p>

			<RadioGroup.Root
				className="flex flex-col gap-4"
				value={selectedOption}
				onValueChange={setSelectedOption}
			>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
					<label className="group cursor-pointer">
						<RadioGroup.Item value="purchase" className="peer sr-only" />
						<div className="hover:border-primary peer-aria-checked:border-primary peer-aria-checked:ring-primary flex h-full flex-col items-center rounded-xl border-2 bg-white p-6 text-center shadow-sm transition-all peer-aria-checked:ring-1">
							<div className="bg-primary/10 text-primary group-hover:bg-primary/20 mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full">
								<ShoppingCart className="h-6 w-6" />
							</div>
							<h3 className="mb-1 font-medium">
								Purchase a new health insurance plan
							</h3>
							<p className="text-sm text-gray-500">
								Shop and compare plans that fit your needs
							</p>
						</div>
					</label>

					<label className="group cursor-pointer">
						<RadioGroup.Item value="upload" className="peer sr-only" />
						<div className="hover:border-primary peer-aria-checked:border-primary peer-aria-checked:ring-primary flex h-full flex-col items-center rounded-xl border-2 bg-white p-6 text-center shadow-sm transition-all peer-aria-checked:ring-1">
							<div className="bg-primary/10 text-primary group-hover:bg-primary/20 mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full">
								<Upload className="h-6 w-6" />
							</div>
							<h3 className="mb-1 font-medium">
								Use my HRA allowance toward my current individual marketplace
								plan
							</h3>
							<p className="text-sm text-gray-500">
								Upload your existing coverage details
							</p>
						</div>
					</label>

					<label className="group cursor-pointer">
						<RadioGroup.Item value="waive" className="peer sr-only" />
						<div className="hover:border-primary peer-aria-checked:border-primary peer-aria-checked:ring-primary flex h-full flex-col items-center rounded-xl border-2 bg-white p-6 text-center shadow-sm transition-all peer-aria-checked:ring-1">
							<div className="bg-primary/10 text-primary group-hover:bg-primary/20 mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full">
								<Ban className="h-6 w-6" />
							</div>
							<h3 className="mb-1 font-medium">
								Waive coverage for {currentYear}
							</h3>
							<p className="text-sm text-gray-500">
								Opt out of health insurance coverage
							</p>
						</div>
					</label>
				</div>
			</RadioGroup.Root>

			<div className="flex justify-end gap-12 pt-8">
				<Button
					variant="outline"
					onClick={() => router.push('/shopping')}
					className="flex items-center gap-2"
				>
					<ChevronLeft className="h-4 w-4" />
					Back
				</Button>
				<Button
					onClick={() => router.push('/shopping/personal-info')}
					className="bg-primary hover:bg-primary/90"
					disabled={!selectedOption}
				>
					Continue
				</Button>
			</div>
		</ShoppingPageWrapper>
	);
}

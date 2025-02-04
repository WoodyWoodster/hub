'use client';

import { ShoppingPageWrapper } from '@/components/shopping-page-wrapper';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PersonalInformation() {
	const router = useRouter();

	return (
		<ShoppingPageWrapper>
			<h1 className="font-display mb-4 text-4xl font-medium text-gray-900">
				Let&apos;s add your information
			</h1>
			<p className="text-xl/relaxed">
				You can purchase health insurance for you and/or your household, upload
				your current coverage if you have any that will be used for
				reimbursement (such as a marketplace plan or a medicare plan), or choose
				to waive coverage.
			</p>
			{/* Form content will go here */}

			<div className="flex justify-end gap-12 pt-8">
				<Button
					variant="ghost"
					onClick={() => router.push('/shopping')}
					className="flex items-center gap-2"
				>
					<ChevronLeft className="h-4 w-4" />
					Back
				</Button>
				<Button
					onClick={() => router.push('/shopping/household')}
					className="bg-primary hover:bg-primary/90"
				>
					Continue
				</Button>
			</div>
		</ShoppingPageWrapper>
	);
}

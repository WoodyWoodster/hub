'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Welcome() {
	const router = useRouter();

	return (
		<div className="mx-auto max-w-2xl">
			<h1 className="font-display text-onyx-700 text-center text-4xl font-medium">
				<span className="mb-1 block">Welcome to Take Command.</span>
				<span>Let’s get some health insurance!</span>
			</h1>
			<p className="mt-6 text-lg font-medium text-gray-600">
				You can purchase health insurance for you and/or your household, upload
				your current coverage if you have any that will be used for
				reimbursement (such as a marketplace plan or a medicare plan), or choose
				to waive coverage.
			</p>
			<div className="flex justify-between pt-8">
				<div /> {/* Empty div for spacing since this is the first page */}
				<Button
					onClick={() => router.push('/shopping/intentions')}
					className="bg-primary hover:bg-primary/90"
				>
					Get started
				</Button>
			</div>
		</div>
	);
}

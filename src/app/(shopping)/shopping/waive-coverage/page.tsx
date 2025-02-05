'use client';

import { ShoppingPageWrapper } from '@/components/shopping-page-wrapper';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import WaiveCoverage from '@/components/custom/waiveCoverage';
export default function WaiveCoveragePage() {
	const router = useRouter();

	return (
		<ShoppingPageWrapper>
			<div className="flex items-start justify-between gap-8">
				<div className="max-w-2xl">
					<h1 className="mb-8 font-sans text-4xl font-medium tracking-tight text-gray-900">
						Coverage Waived Successfully
					</h1>

					<p className="mb-8 text-xl/relaxed text-gray-600">
						You have successfully waived your health coverage. You can always
						return to shop for coverage if your circumstances change.{' '}
					</p>

					<Link
						className="text-seafoam-700 block underline"
						href="/shopping"
						target="_blank"
						rel="noopener noreferrer"
					>
						What happens if my circumstances change?
					</Link>
				</div>

				<div className="text-primary">
					<WaiveCoverage />
				</div>
			</div>
			<div className="flex justify-end gap-4">
				<Button
					onClick={() => router.push('/dashboard')}
					className="bg-primary hover:bg-primary/90"
				>
					Go to Dashboard
				</Button>
			</div>
		</ShoppingPageWrapper>
	);
}

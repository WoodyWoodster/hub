'use client';

import { ShoppingPageWrapper } from '@/components/shopping-page-wrapper';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function MedicaidIneligiblePage() {
	const router = useRouter();

	return (
		<ShoppingPageWrapper>
			<h1 className="mb-6 font-sans text-4xl font-medium tracking-tight text-gray-900">
				Sorry, you can&apos;t use your HRA allowance for Medicaid
			</h1>

			<p className="mb-4 text-xl/relaxed text-gray-600">
				If you are enrolled in Medicaid, you are not eligible to use HRA
				allowance to purchase any health plans, and must waive coverage.
			</p>

			<Link
				href="#"
				className="hover:text-primary/90 mb-12 block text-sm underline"
			>
				Why does being enrolled in Medicaid not qualify me for HRA benefits?
			</Link>

			<div className="flex flex-col gap-4">
				<Button
					onClick={() => router.push('/shopping/waive-coverage')}
					className="bg-primary hover:bg-primary/90"
				>
					Waive coverage due to Medicaid Enrollment
				</Button>

				<Button
					variant="outline"
					onClick={() => router.push('/shopping/personal-info/medicaid')}
				>
					I&apos;m not enrolled in Medicaid
				</Button>
			</div>
		</ShoppingPageWrapper>
	);
}

'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Welcome() {
	const router = useRouter();

	return (
		<div className="mx-auto max-w-2xl">
			<h1 className="font-display text-onyx-700 text-center font-medium">
				<span className="mb-4 block text-5xl">Welcome to Take Command.</span>
				<span className="font-sans text-3xl">
					Let’s get some health insurance!
				</span>
			</h1>
			<p className="text-onyx-700 mt-12 text-lg font-normal">
				We&apos;re ready to help you find the best medical insurance for your
				health needs.
			</p>
			<div className="flex justify-between pt-8">
				<div /> {/* Empty div for spacing since this is the first page */}
				<Button
					onClick={() => router.push('/shopping/intentions')}
					className="bg-primary hover:bg-primary/90 w-full"
				>
					Get started
				</Button>
			</div>
		</div>
	);
}

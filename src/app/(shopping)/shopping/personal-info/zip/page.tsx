'use client';

import { ShoppingPageWrapper } from '@/components/shopping-page-wrapper';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import {
	personalInfoStep2Schema,
	PersonalInfoStep2Values,
} from '@/lib/schemas/shopping/personal-info-schema';

export default function ZipCodePage() {
	const router = useRouter();

	const form = useForm<PersonalInfoStep2Values>({
		resolver: zodResolver(personalInfoStep2Schema),
		defaultValues: {
			zipCode: '',
		},
	});

	function onSubmit(data: PersonalInfoStep2Values) {
		const existingData = JSON.parse(
			localStorage.getItem('shopping-form') || '{}',
		);
		const completeData = {
			...existingData,
			...data,
		};
		localStorage.setItem('shopping-form', JSON.stringify(completeData));

		// Navigate to next page
		router.push('/shopping/personal-info/tobacco-usage');
	}

	return (
		<ShoppingPageWrapper>
			<h1 className="font-display mb-4 text-4xl font-medium text-gray-900">
				My Location
			</h1>
			<p className="mb-8 text-xl/relaxed text-gray-600">
				Enter the ZIP code for your primary residence. This determines which
				health plans are available to you.
			</p>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
						<FormField
							control={form.control}
							name="zipCode"
							render={({ field }) => (
								<FormItem>
									<FormLabel>ZIP Code</FormLabel>
									<FormControl className="bg-white">
										<Input
											placeholder="Enter your ZIP code"
											maxLength={5}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="flex justify-between pt-8">
						<Button
							variant="ghost"
							onClick={() => router.push('/shopping/personal-info/')}
							className="flex items-center gap-2"
						>
							<ChevronLeft className="h-4 w-4" />
							Back
						</Button>
						<Button type="submit" className="bg-primary hover:bg-primary/90">
							Continue
						</Button>
					</div>
				</form>
			</Form>
		</ShoppingPageWrapper>
	);
}

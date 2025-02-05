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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
	personalInfoStep3Schema,
	type PersonalInfoStep3Values,
} from '@/lib/schemas/shopping/personal-info-schema';

export default function MedicaidPage() {
	const router = useRouter();

	const form = useForm<PersonalInfoStep3Values>({
		resolver: zodResolver(personalInfoStep3Schema),
		defaultValues: {
			hasMedicaid: false,
		},
	});

	function onSubmit(data: PersonalInfoStep3Values) {
		const existingData = JSON.parse(
			localStorage.getItem('shopping-form') || '{}',
		);
		const completeData = {
			...existingData,
			...data,
		};
		localStorage.setItem('shopping-form', JSON.stringify(completeData));

		router.push('/shopping/personal-info/documents');
	}

	return (
		<ShoppingPageWrapper>
			<h1 className="font-display mb-4 text-4xl font-medium text-gray-900">
				Are you currently enrolled in Medicaid?
			</h1>
			<p className="mb-8 text-xl/relaxed text-gray-600">
				Medicaid is a government program that provides health insurance to
				low-income individuals and families.
			</p>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="hasMedicaid"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<RadioGroup
										onValueChange={(value) => field.onChange(value === 'true')}
										defaultValue={field.value ? 'true' : 'false'}
										className="flex flex-col space-y-4"
									>
										<FormItem className="flex items-center space-y-0 space-x-3">
											<FormControl>
												<RadioGroupItem value="true" />
											</FormControl>
											<FormLabel className="font-normal">Yes</FormLabel>
										</FormItem>
										<FormItem className="flex items-center space-y-0 space-x-3">
											<FormControl>
												<RadioGroupItem value="false" />
											</FormControl>
											<FormLabel className="font-normal">No</FormLabel>
										</FormItem>
									</RadioGroup>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="flex justify-between pt-8">
						<Button
							variant="ghost"
							onClick={() => router.push('/shopping/personal-info/zip')}
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

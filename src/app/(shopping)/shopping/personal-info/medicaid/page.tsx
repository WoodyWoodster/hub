'use client';

import { ShoppingPageWrapper } from '@/components/shopping-page-wrapper';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
	personalInfoStep3Schema,
	type PersonalInfoValues,
} from '@/lib/schemas/shopping/personal-info-schema';

export default function MedicaidPage() {
	const router = useRouter();

	const form = useForm<PersonalInfoValues>({
		resolver: zodResolver(personalInfoStep3Schema), // Use the specific schema for this step
		defaultValues: {
			hasMedicaid: undefined,
		},
	});

	function onSubmit(data: PersonalInfoValues) {
		console.log('Attempting submit with data:', data);
		try {
			const validated = personalInfoStep3Schema.parse(data);
			console.log('Validation passed:', validated);

			if (validated.hasMedicaid) {
				router.push('/shopping/personal-info/medicaid/ineligible');
			} else {
				router.push('/shopping/personal-info/documents');
			}
		} catch (error) {
			console.error('Validation error:', error);
		}
	}

	return (
		<ShoppingPageWrapper>
			<h1 className="mb-4 font-sans text-4xl font-medium tracking-tight text-gray-900">
				Are you currently enrolled in Medicaid?
			</h1>
			<p className="mb-4 text-lg text-gray-600">
				Medicaid is a government program that provides health insurance to
				low-income individuals and families.
			</p>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<div className="space-y-4">
						<FormField
							control={form.control}
							name="hasMedicaid"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<RadioGroup
											value={
												field.value === true
													? 'yes'
													: field.value === false
														? 'no'
														: undefined
											}
											onValueChange={(value) => {
												console.log('Radio changed:', value);
												const booleanValue = value === 'yes';
												field.onChange(booleanValue);
												console.log('Field value after change:', booleanValue);
												console.log('Form values:', form.getValues());
											}}
											className="flex flex-col space-y-1"
										>
											<div className="flex items-center space-x-3">
												<RadioGroupItem
													value="yes"
													id="medicaid-yes"
													size="lg"
												/>
												<label className="font-medium" htmlFor="medicaid-yes">
													Yes
												</label>
											</div>
											<div className="flex items-center space-x-3">
												<RadioGroupItem value="no" id="medicaid-no" size="lg" />
												<label className="font-medium" htmlFor="medicaid-no">
													No
												</label>
											</div>
										</RadioGroup>
									</FormControl>
								</FormItem>
							)}
						/>
					</div>

					<div className="flex justify-between pt-8">
						<Button
							variant="ghost"
							onClick={() =>
								router.push('/shopping/personal-info/tobacco-usage')
							}
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

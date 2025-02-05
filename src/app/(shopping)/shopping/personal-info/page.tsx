'use client';

import { ShoppingPageWrapper } from '@/components/shopping-page-wrapper';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm, FieldErrors } from 'react-hook-form';
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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	personalInfoStep1Schema,
	type PersonalInfoStep1Values,
} from '@/lib/schemas/shopping/personal-info-schema';

export default function PersonalInformation() {
	const router = useRouter();

	const form = useForm<PersonalInfoStep1Values>({
		resolver: zodResolver(personalInfoStep1Schema),
		defaultValues: {
			firstName: '',
			lastName: '',
			dateOfBirth: '',
			preferredName: '',
			gender: 'other',
		},
	});

	// Add this to see validation errors
	const onError = (errors: FieldErrors<PersonalInfoStep1Values>) => {
		console.log('Form validation errors:', errors);
	};

	function onSubmit(data: PersonalInfoStep1Values) {
		console.log('Form submitted with data:', data);

		try {
			// Save to localStorage
			const existingData = JSON.parse(
				localStorage.getItem('shopping-form') || '{}',
			);
			const completeData = {
				...existingData,
				...data,
			};
			localStorage.setItem('shopping-form', JSON.stringify(completeData));
			console.log('Data saved successfully:', completeData);

			// Navigate to next page
			router.push('/shopping/personal-info/zip');
		} catch (error) {
			console.error('Error in form submission:', error);
		}
	}

	return (
		<ShoppingPageWrapper>
			<h1 className="font-display mb-4 text-4xl font-medium text-gray-900">
				Let&apos;s add your information
			</h1>
			<p className="mb-8 text-xl/relaxed text-gray-600">
				Please fill out the following information to help us find the best plan
				for you.
			</p>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit, onError)}
					className="space-y-8"
				>
					<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
						<FormField
							control={form.control}
							name="firstName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>First name</FormLabel>
									<FormControl className="bg-white">
										<Input placeholder="Enter your first name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="lastName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Last name</FormLabel>
									<FormControl className="bg-white">
										<Input placeholder="Enter your last name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="preferredName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Preferred name (optional)</FormLabel>
									<FormControl className="bg-white">
										<Input placeholder="Enter your preferred name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
						<FormField
							control={form.control}
							name="dateOfBirth"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Date of birth</FormLabel>
									<FormControl className="bg-white">
										<Input type="date" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="gender"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Gender</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl className="bg-white">
											<SelectTrigger>
												<SelectValue placeholder="Select your gender" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="male">Male</SelectItem>
											<SelectItem value="female">Female</SelectItem>
											<SelectItem value="other">Other</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="flex justify-between pt-8">
						<Button
							variant="ghost"
							onClick={() => router.push('/shopping/intentions')}
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

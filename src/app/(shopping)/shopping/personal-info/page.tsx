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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
	personalInfoSchema,
	type PersonalInfoValues,
} from '@/lib/schemas/shopping/personal-info-schema';

export default function PersonalInformation() {
	const router = useRouter();

	const form = useForm<PersonalInfoValues>({
		resolver: zodResolver(personalInfoSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			dateOfBirth: '',
			preferredName: '',
			zipCode: '',
			gender: 'other',
			tobaccoUse: false,
			medicaid: false,
			acknowledgment: false,
		},
	});

	function onSubmit(data: PersonalInfoValues) {
		console.log(data);
		router.push('/shopping/household');
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
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

					<div className="space-y-4">
						<FormField
							control={form.control}
							name="tobaccoUse"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-md mb-4 block font-medium">
										Have you used tobacco products in the last 6 months?
									</FormLabel>
									<FormControl>
										<RadioGroup
											onValueChange={(value) => field.onChange(value === 'yes')}
											defaultValue={field.value ? 'yes' : 'no'}
											className="flex flex-col space-y-0"
										>
											<div className="flex items-center space-x-2">
												<RadioGroupItem value="yes" id="tobacco-yes" />
												<label htmlFor="tobacco-yes">Yes</label>
											</div>
											<div className="flex items-center space-x-2">
												<RadioGroupItem value="no" id="tobacco-no" />
												<label htmlFor="tobacco-no">No</label>
											</div>
										</RadioGroup>
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="medicaid"
							render={({ field }) => (
								<FormItem className="flex flex-col items-start space-y-0 space-x-3">
									<FormLabel className="text-md mb-4 block font-medium">
										Are you currently enrolled in Medicaid?
									</FormLabel>
									<FormControl>
										<RadioGroup
											onValueChange={(value) => field.onChange(value === 'yes')}
											defaultValue={field.value ? 'yes' : 'no'}
											className="flex flex-col space-y-0"
										>
											<div className="flex items-center space-x-2">
												<RadioGroupItem value="yes" id="medicaid-yes" />
												<label htmlFor="medicaid-yes">Yes</label>
											</div>
											<div className="flex items-center space-x-2">
												<RadioGroupItem value="no" id="medicaid-no" />
												<label htmlFor="medicaid-no">No</label>
											</div>
										</RadioGroup>
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="acknowledgment"
							render={({ field }) => (
								<div className="mt-8">
									<FormItem className="flex flex-row items-start space-y-0 space-x-3">
										<FormControl>
											<Checkbox
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
										<div className="space-y-1 leading-none">
											<FormLabel>
												I acknowledge that the information provided is accurate
												and complete
											</FormLabel>
										</div>
									</FormItem>
								</div>
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

'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { usStates } from '@/lib/us-states';
import { Progress } from '@/components/ui/progress';
import {
	registerCompanySchema,
	RegisterCompanyValues,
} from '@/lib/schemas/companies';
import { useForm } from 'react-hook-form';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/hooks/use-toast';
import { track } from '@vercel/analytics/react';
import { useRouter } from 'next/navigation';
import { registerCompany } from '@/lib/services/companyService';

export function RegistrationForm() {
	const router = useRouter();
	const form = useForm<RegisterCompanyValues>({
		resolver: zodResolver(registerCompanySchema),
		defaultValues: {
			person: {
				fullName: '',
				email: '',
				dateOfBirth: '',
				password: '',
				confirmPassword: '',
			},
			company: {
				name: '',
				website: '',
				industry: '',
				size: '',
			},
			address: {
				street: '',
				city: '',
				state: '',
				zipCode: '',
			},
		},
	});

	async function onSubmit(data: RegisterCompanyValues) {
		const result = await registerCompany(data);
		if (result?.error) {
			console.log(result.error);
			return;
		} else {
			track('Signed Up', {
				companyName: data.company.name,
			});
			router.push('/onboarding/plan-setup');
		}

		toast({
			title: 'Welcome to HRA Hub!! 🎉',
			description: 'You have successfully signed up! 🚀',
		});
	}

	return (
		<div className="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
					Let&apos;s get your account setup!
				</h2>
			</div>
			<div className="mt-8 w-full">
				<div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
							<Progress value={25} className="w-full" />
							<div className="space-y-8">
								<div>
									<h3 className="text-lg leading-6 font-medium text-gray-900">
										Personal Information
									</h3>
									<div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
										<FormField
											control={form.control}
											name="person.fullName"
											render={({ field }) => (
												<FormItem className="sm:col-span-2">
													<FormLabel>Full Name</FormLabel>
													<FormControl>
														<Input placeholder="John Doe" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="person.email"
											render={({ field }) => (
												<FormItem className="sm:col-span-2">
													<FormLabel>Email</FormLabel>
													<FormControl>
														<Input
															type="email"
															placeholder="john.doe@example.com"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="person.dateOfBirth"
											render={({ field }) => (
												<FormItem className="sm:col-span-2">
													<FormLabel>Date of Birth</FormLabel>
													<FormControl>
														<Input type="date" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="person.password"
											render={({ field }) => (
												<FormItem className="sm:col-span-3">
													<FormLabel>Password</FormLabel>
													<FormControl>
														<Input
															type="password"
															placeholder="Enter your password"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="person.confirmPassword"
											render={({ field }) => (
												<FormItem className="sm:col-span-3">
													<FormLabel>Confirm Password</FormLabel>
													<FormControl>
														<Input
															type="password"
															placeholder="Confirm your password"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</div>
								<div>
									<h3 className="text-lg leading-6 font-medium text-gray-900">
										Company Details
									</h3>
									<div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
										<FormField
											control={form.control}
											name="company.name"
											render={({ field }) => (
												<FormItem className="sm:col-span-3">
													<FormLabel>Company Name</FormLabel>
													<FormControl>
														<Input placeholder="ACME Inc" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="company.website"
											render={({ field }) => (
												<FormItem className="sm:col-span-3">
													<FormLabel>Website</FormLabel>
													<FormControl>
														<Input
															type="url"
															placeholder="https://acme.com"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="company.industry"
											render={({ field }) => (
												<FormItem className="sm:col-span-3">
													<FormLabel>Industry</FormLabel>
													<FormControl>
														<Select
															onValueChange={field.onChange}
															defaultValue={field.value}
														>
															<SelectTrigger>
																<SelectValue placeholder="Select an industry" />
															</SelectTrigger>
															<SelectContent>
																<SelectItem value="technology">
																	Technology
																</SelectItem>
																<SelectItem value="healthcare">
																	Healthcare
																</SelectItem>
																<SelectItem value="finance">Finance</SelectItem>
																<SelectItem value="education">
																	Education
																</SelectItem>
																<SelectItem value="other">Other</SelectItem>
															</SelectContent>
														</Select>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="company.size"
											render={({ field }) => (
												<FormItem className="sm:col-span-3">
													<FormLabel>Company Size</FormLabel>
													<FormControl>
														<Select
															onValueChange={field.onChange}
															defaultValue={field.value}
														>
															<SelectTrigger>
																<SelectValue placeholder="Select company size" />
															</SelectTrigger>
															<SelectContent>
																<SelectItem value="1-10">
																	1-10 employees
																</SelectItem>
																<SelectItem value="11-50">
																	11-50 employees
																</SelectItem>
																<SelectItem value="51-200">
																	51-200 employees
																</SelectItem>
																<SelectItem value="201-500">
																	201-500 employees
																</SelectItem>
																<SelectItem value="501+">
																	501+ employees
																</SelectItem>
															</SelectContent>
														</Select>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</div>
								<div>
									<h3 className="text-lg leading-6 font-medium text-gray-900">
										Company Address
									</h3>
									<div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
										<FormField
											control={form.control}
											name="address.street"
											render={({ field }) => (
												<FormItem className="sm:col-span-6">
													<FormLabel>Street Address</FormLabel>
													<FormControl>
														<Input placeholder="123 Main St" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="address.city"
											render={({ field }) => (
												<FormItem className="sm:col-span-2">
													<FormLabel>City</FormLabel>
													<FormControl>
														<Input placeholder="Richardson" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="address.state"
											render={({ field }) => (
												<FormItem className="sm:col-span-2">
													<FormLabel>State</FormLabel>
													<FormControl>
														<Select
															onValueChange={field.onChange}
															defaultValue={field.value}
														>
															<SelectTrigger>
																<SelectValue placeholder="Select a state" />
															</SelectTrigger>
															<SelectContent>
																{usStates.map((state) => (
																	<SelectItem
																		key={state.value}
																		value={state.value}
																	>
																		{state.label}
																	</SelectItem>
																))}
															</SelectContent>
														</Select>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="address.zipCode"
											render={({ field }) => (
												<FormItem className="sm:col-span-2">
													<FormLabel>ZIP Code</FormLabel>
													<FormControl>
														<Input placeholder="12345" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</div>
							</div>
							<Button className="w-full" type="submit">
								{form.formState.isSubmitting ? 'Registering...' : 'Register'}
							</Button>
						</form>
					</Form>
				</div>
			</div>
		</div>
	);
}

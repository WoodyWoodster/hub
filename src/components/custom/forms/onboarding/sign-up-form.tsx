'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { signUpCompanyAction } from '@/lib/actions/companies/actions';
import { useActionState, useEffect } from 'react';
import { usStates } from '@/lib/us-states';
import { Check } from 'lucide-react';
import { redirect } from 'next/navigation';
import { Progress } from '@/components/ui/progress';

export function SignUpForm() {
	const [state, formAction, pending] = useActionState(signUpCompanyAction, {
		defaultValues: {
			person: {
				fullName: '',
				email: '',
				dateOfBirth: '',
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
				country: '',
			},
		},
		success: false,
		errors: {} as Record<string, string>,
	});

	useEffect(() => {
		if (state.success) {
			redirect('/dashboard');
		}
	}, [state.success]);

	return (
		<div className="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
					Let&apos;s get your account setup!
				</h2>
			</div>

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
				<div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
					<form action={formAction} className="space-y-8">
						<Progress value={33} className="w-full" />

						{state.success ? (
							<p className="flex items-center gap-2 text-sm text-green-600">
								<Check className="h-5 w-5" />
								Company added successfully.
							</p>
						) : null}

						<div className="space-y-8">
							<div>
								<h3 className="text-lg leading-6 font-medium text-gray-900">
									Personal Information
								</h3>
								<div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
									<div className="sm:col-span-3">
										<Label htmlFor="fullName">Full Name</Label>
										<Input
											id="fullName"
											name="person.fullName"
											placeholder="John Doe"
											disabled={pending}
											defaultValue={state.defaultValues?.person.fullName}
											className="mt-1"
										/>
									</div>

									<div className="sm:col-span-3">
										<Label htmlFor="email">Email</Label>
										<Input
											id="email"
											name="person.email"
											type="email"
											placeholder="john.doe@example.com"
											disabled={pending}
											defaultValue={state.defaultValues?.person.email}
											className="mt-1"
										/>
									</div>

									<div className="sm:col-span-3">
										<Label htmlFor="dateOfBirth">Date of Birth</Label>
										<Input
											id="dateOfBirth"
											name="person.dateOfBirth"
											type="date"
											disabled={pending}
											defaultValue={state.defaultValues?.person.dateOfBirth}
											className="mt-1"
										/>
									</div>
								</div>
							</div>

							<div>
								<h3 className="text-lg leading-6 font-medium text-gray-900">
									Company Details
								</h3>
								<div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
									<div className="sm:col-span-3">
										<Label htmlFor="orgName">Company Name</Label>
										<Input
											id="orgName"
											name="company.name"
											placeholder="ACME Inc"
											required
											defaultValue={state.defaultValues?.company.name}
											disabled={pending}
											className="mt-1"
										/>
									</div>

									<div className="sm:col-span-3">
										<Label htmlFor="website">Website</Label>
										<Input
											id="website"
											name="company.website"
											type="url"
											placeholder="https://acme.com"
											defaultValue={state.defaultValues?.company.website}
											disabled={pending}
											className="mt-1"
										/>
									</div>

									<div className="sm:col-span-3">
										<Label htmlFor="industry">Industry</Label>
										<Select
											name="company.industry"
											defaultValue={state.defaultValues?.company.industry}
											required
											disabled={pending}
										>
											<SelectTrigger className="mt-1">
												<SelectValue placeholder="Select an industry" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="technology">Technology</SelectItem>
												<SelectItem value="healthcare">Healthcare</SelectItem>
												<SelectItem value="finance">Finance</SelectItem>
												<SelectItem value="education">Education</SelectItem>
												<SelectItem value="other">Other</SelectItem>
											</SelectContent>
										</Select>
									</div>

									<div className="sm:col-span-3">
										<Label htmlFor="size">Company Size</Label>
										<Select
											name="company.size"
											defaultValue={state.defaultValues?.company.size}
											required
											disabled={pending}
										>
											<SelectTrigger className="mt-1">
												<SelectValue placeholder="Select company size" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="1-10">1-10 employees</SelectItem>
												<SelectItem value="11-50">11-50 employees</SelectItem>
												<SelectItem value="51-200">51-200 employees</SelectItem>
												<SelectItem value="201-500">
													201-500 employees
												</SelectItem>
												<SelectItem value="501+">501+ employees</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>
							</div>

							<div>
								<h3 className="text-lg leading-6 font-medium text-gray-900">
									Company Address
								</h3>
								<div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
									<div className="sm:col-span-6">
										<Label htmlFor="street">Street Address</Label>
										<Input
											id="street"
											required
											name="address.street"
											placeholder="12345 Straße"
											disabled={pending}
											defaultValue={state.defaultValues?.address.street}
											className="mt-1"
										/>
									</div>

									<div className="sm:col-span-2">
										<Label htmlFor="city">City</Label>
										<Input
											id="city"
											name="address.city"
											placeholder="Richardson"
											required
											disabled={pending}
											defaultValue={state.defaultValues?.address.city}
											className="mt-1"
										/>
									</div>

									<div className="sm:col-span-2">
										<Label htmlFor="state">State</Label>
										<Select name="address.state" disabled={pending}>
											<SelectTrigger className="mt-1">
												<SelectValue placeholder="Select a state" />
											</SelectTrigger>
											<SelectContent>
												{usStates.map((state) => (
													<SelectItem key={state.value} value={state.value}>
														{state.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>

									<div className="sm:col-span-2">
										<Label htmlFor="zipCode">ZIP Code</Label>
										<Input
											id="zipCode"
											name="address.zipCode"
											placeholder="12345"
											required
											disabled={pending}
											defaultValue={state.defaultValues?.address.zipCode}
											className="mt-1"
										/>
									</div>
								</div>
							</div>
						</div>

						<div>
							<Button type="submit" className="w-full" disabled={pending}>
								{pending ? 'Adding Company...' : 'Add Company'}
							</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

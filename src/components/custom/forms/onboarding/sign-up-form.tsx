import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
		<div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
			<form action={formAction} className="w-full max-w-lg">
				<Card>
					<CardHeader>
						<CardTitle className="py-2 text-3xl">
							Let&apos;s get your account setup!
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-6">
						{state.success ? (
							<p className="text-muted-foreground flex items-center gap-2 text-sm">
								<Check className="size-4" />
								Company added successfully.
							</p>
						) : null}
						<div className="space-y-4">
							<h3 className="text-lg font-medium">Personal Information</h3>
							<div className="space-y-2">
								<Label
									htmlFor="fullName"
									className="group-data-[invalid=true]/field:text-destructive"
								>
									Full Name <span aria-hidden="true">*</span>
								</Label>
								<Input
									id="fullName"
									name="person.fullName"
									placeholder="John Doe"
									className="group-data-[invalid=true]/field:border-destructive group-data-[invalid=true]/field:focus-visible:ring-destructive"
									disabled={pending}
									defaultValue={state.defaultValues?.person.fullName}
									aria-errormessage="error-fullName"
								/>
								<Label
									htmlFor="email"
									className="group-data-[invalid=true]/field:text-destructive"
								>
									Email <span aria-hidden="true">*</span>
								</Label>
								<Input
									id="email"
									name="person.email"
									type="email"
									placeholder="john.doe@example.com"
									className="group-data-[invalid=true]/field:border-destructive group-data-[invalid=true]/field:focus-visible:ring-destructive"
									disabled={pending}
									defaultValue={state.defaultValues?.person.email}
									aria-errormessage="error-email"
								/>
								{/* <Label
									htmlFor="password"
									className="group-data-[invalid=true]/field:text-destructive"
								>
									Password <span aria-hidden="true">*</span>
								</Label>
								<Input
									id="password"
									name="password"
									type="password"
									placeholder="Password"
									className="group-data-[invalid=true]/field:border-destructive group-data-[invalid=true]/field:focus-visible:ring-destructive"
									disabled={pending}
									defaultValue={state.defaultValues?.person.password}
									required
								/> */}
								<div className="grid grid-cols-2">
									<div className="gap-2">
										<Label
											htmlFor="dateOfBirth"
											className="group-data-[invalid=true]/field:text-destructive"
										>
											Date of Birth <span aria-hidden="true">*</span>
										</Label>
										<Input
											id="dateOfBirth"
											name="person.dateOfBirth"
											type="date"
											className="group-data-[invalid=true]/field:border-destructive group-data-[invalid=true]/field:focus-visible:ring-destructive"
											disabled={pending}
											defaultValue={state.defaultValues?.person.dateOfBirth}
											aria-errormessage="error-dateOfBirth"
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="space-y-4">
							<h3 className="text-lg font-medium">Company Details</h3>
							<div className="space-y-2">
								<Label htmlFor="orgName">Company Name</Label>
								<Input
									id="orgName"
									name="company.name"
									placeholder="ACME Inc"
									required
									defaultValue={state.defaultValues?.company.name}
									disabled={pending}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="website">Website</Label>
								<Input
									id="website"
									name="company.website"
									type="url"
									placeholder="https://acme.com"
									defaultValue={state.defaultValues?.company.website}
									disabled={pending}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="industry">Industry</Label>
								<Select
									name="company.industry"
									defaultValue={state.defaultValues?.company.industry}
									required
									disabled={pending}
								>
									<SelectTrigger>
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
							<div className="space-y-2">
								<Label htmlFor="size">Company Size</Label>
								<Select
									name="company.size"
									defaultValue={state.defaultValues?.company.size}
									required
									disabled={pending}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select company size" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="1-10">1-10 employees</SelectItem>
										<SelectItem value="11-50">11-50 employees</SelectItem>
										<SelectItem value="51-200">51-200 employees</SelectItem>
										<SelectItem value="201-500">201-500 employees</SelectItem>
										<SelectItem value="501+">501+ employees</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
						<div className="space-y-4">
							<h3 className="text-lg font-medium">Company Address</h3>
							<div className="space-y-2">
								<Label htmlFor="street">Street Address</Label>
								<Input
									id="street"
									required
									name="address.street"
									placeholder="12345 Straße"
									disabled={pending}
									defaultValue={state.defaultValues?.address.street}
								/>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="city">City</Label>
									<Input
										id="city"
										name="address.city"
										placeholder="Richardson"
										required
										disabled={pending}
										defaultValue={state.defaultValues?.address.city}
									/>
								</div>
								<div className="space-y-2">
									<Label
										htmlFor="state"
										className="group-data-[invalid=true]/field:text-destructive"
									>
										State <span aria-hidden="true">*</span>
									</Label>
									<Select name="address.state" disabled={pending}>
										<SelectTrigger
											className="group-data-[invalid=true]/field:border-destructive group-data-[invalid=true]/field:focus-visible:ring-destructive"
											aria-errormessage="error-state"
										>
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
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="zipCode">ZIP Code</Label>
									<Input
										id="zipCode"
										name="address.zipCode"
										placeholder="12345"
										required
										disabled={pending}
										defaultValue={state.defaultValues?.address.zipCode}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="country">Country</Label>
									<Select name="address.country" disabled={pending}>
										<SelectTrigger>
											<SelectValue placeholder="Select a country" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="USA">United States</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
						</div>
						<Button type="submit" className="w-full" disabled={pending}>
							{pending ? 'Adding Company...' : 'Add Company'}
						</Button>
					</CardContent>
				</Card>
			</form>
		</div>
	);
}

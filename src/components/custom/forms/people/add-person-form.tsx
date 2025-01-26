'use client';

import * as React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { addPersonAction } from '@/lib/actions/people/actions';
import { Check } from 'lucide-react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { usStates } from '@/lib/us-states';

export function AddPersonForm({
	className,
	onSuccess,
}: React.ComponentProps<typeof Card> & { onSuccess: () => void }) {
	const [state, formAction, pending] = React.useActionState(addPersonAction, {
		defaultValues: {
			fullName: '',
			email: '',
			dateOfBirth: '',
			hireDate: '',
			street: '',
			city: '',
			state: '',
			zipCode: '',
		},
		success: false,
		errors: {} as Record<string, string>,
	});

	React.useEffect(() => {
		if (state.success) {
			onSuccess();
		}
	}, [state.success, onSuccess]);

	return (
		<Card className={cn('w-full max-w-2xl', className)}>
			<form action={formAction}>
				<CardContent className="flex flex-col gap-6">
					{state.success ? (
						<p className="text-muted-foreground flex items-center gap-2 text-sm">
							<Check className="size-4" />
							Person added successfully.
						</p>
					) : null}

					<div className="space-y-4">
						<h3 className="text-lg font-semibold">Personal Information</h3>
						<div className="grid grid-cols-2 gap-4">
							<div
								className="group/field grid gap-2"
								data-invalid={!!state.errors?.fullName}
							>
								<Label
									htmlFor="fullName"
									className="group-data-[invalid=true]/field:text-destructive"
								>
									Full Name <span aria-hidden="true">*</span>
								</Label>
								<Input
									id="fullName"
									name="fullName"
									placeholder="John Doe"
									className="group-data-[invalid=true]/field:border-destructive group-data-[invalid=true]/field:focus-visible:ring-destructive"
									defaultValue={state.defaultValues.fullName}
									disabled={pending}
									aria-invalid={!!state.errors?.fullName}
									aria-errormessage="error-fullName"
								/>
								{state.errors?.fullName && (
									<p id="error-fullName" className="text-destructive text-sm">
										{state.errors.fullName}
									</p>
								)}
							</div>
						</div>
						<div
							className="group/field grid gap-2"
							data-invalid={!!state.errors?.email}
						>
							<Label
								htmlFor="email"
								className="group-data-[invalid=true]/field:text-destructive"
							>
								Email <span aria-hidden="true">*</span>
							</Label>
							<Input
								id="email"
								name="email"
								type="email"
								placeholder="john.doe@example.com"
								className="group-data-[invalid=true]/field:border-destructive group-data-[invalid=true]/field:focus-visible:ring-destructive"
								defaultValue={state.defaultValues.email}
								disabled={pending}
								aria-invalid={!!state.errors?.email}
								aria-errormessage="error-email"
							/>
							{state.errors?.email && (
								<p id="error-email" className="text-destructive text-sm">
									{state.errors.email}
								</p>
							)}
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div
								className="group/field grid gap-2"
								data-invalid={!!state.errors?.dateOfBirth}
							>
								<Label
									htmlFor="dateOfBirth"
									className="group-data-[invalid=true]/field:text-destructive"
								>
									Date of Birth <span aria-hidden="true">*</span>
								</Label>
								<Input
									id="dateOfBirth"
									name="dateOfBirth"
									type="date"
									className="group-data-[invalid=true]/field:border-destructive group-data-[invalid=true]/field:focus-visible:ring-destructive"
									defaultValue={state.defaultValues.dateOfBirth}
									disabled={pending}
									aria-invalid={!!state.errors?.dateOfBirth}
									aria-errormessage="error-dateOfBirth"
								/>
								{state.errors?.dateOfBirth && (
									<p
										id="error-dateOfBirth"
										className="text-destructive text-sm"
									>
										{state.errors.dateOfBirth}
									</p>
								)}
							</div>
							<div
								className="group/field grid gap-2"
								data-invalid={!!state.errors?.hireDate}
							>
								<Label
									htmlFor="hireDate"
									className="group-data-[invalid=true]/field:text-destructive"
								>
									Hire Date <span aria-hidden="true">*</span>
								</Label>
								<Input
									id="hireDate"
									name="hireDate"
									type="date"
									className="group-data-[invalid=true]/field:border-destructive group-data-[invalid=true]/field:focus-visible:ring-destructive"
									defaultValue={state.defaultValues.hireDate}
									disabled={pending}
									aria-invalid={!!state.errors?.hireDate}
									aria-errormessage="error-hireDate"
								/>
								{state.errors?.hireDate && (
									<p id="error-hireDate" className="text-destructive text-sm">
										{state.errors.hireDate}
									</p>
								)}
							</div>
						</div>
					</div>

					<div className="space-y-4">
						<h3 className="text-lg font-semibold">Home Address</h3>
						<div
							className="group/field grid gap-2"
							data-invalid={!!state.errors?.street}
						>
							<Label
								htmlFor="street"
								className="group-data-[invalid=true]/field:text-destructive"
							>
								Street Address <span aria-hidden="true">*</span>
							</Label>
							<Input
								id="street"
								name="street"
								placeholder="123 Main St"
								className="group-data-[invalid=true]/field:border-destructive group-data-[invalid=true]/field:focus-visible:ring-destructive"
								defaultValue={state.defaultValues.street}
								disabled={pending}
								aria-invalid={!!state.errors?.street}
								aria-errormessage="error-street"
							/>
							{state.errors?.street && (
								<p id="error-street" className="text-destructive text-sm">
									{state.errors.street}
								</p>
							)}
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div
								className="group/field grid gap-2"
								data-invalid={!!state.errors?.city}
							>
								<Label
									htmlFor="city"
									className="group-data-[invalid=true]/field:text-destructive"
								>
									City <span aria-hidden="true">*</span>
								</Label>
								<Input
									id="city"
									name="city"
									placeholder="Anytown"
									className="group-data-[invalid=true]/field:border-destructive group-data-[invalid=true]/field:focus-visible:ring-destructive"
									defaultValue={state.defaultValues.city}
									disabled={pending}
									aria-invalid={!!state.errors?.city}
									aria-errormessage="error-city"
								/>
								{state.errors?.city && (
									<p id="error-city" className="text-destructive text-sm">
										{state.errors.city}
									</p>
								)}
							</div>
							<div
								className="group/field grid gap-2"
								data-invalid={!!state.errors?.state}
							>
								<Label
									htmlFor="state"
									className="group-data-[invalid=true]/field:text-destructive"
								>
									State <span aria-hidden="true">*</span>
								</Label>
								<Select
									name="state"
									defaultValue={state.defaultValues.state}
									disabled={pending}
								>
									<SelectTrigger
										className="group-data-[invalid=true]/field:border-destructive group-data-[invalid=true]/field:focus-visible:ring-destructive"
										aria-invalid={!!state.errors?.state}
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
								{state.errors?.state && (
									<p id="error-state" className="text-destructive text-sm">
										{state.errors.state}
									</p>
								)}
							</div>
						</div>
						<div
							className="group/field grid gap-2"
							data-invalid={!!state.errors?.zipCode}
						>
							<Label
								htmlFor="zipCode"
								className="group-data-[invalid=true]/field:text-destructive"
							>
								ZIP Code <span aria-hidden="true">*</span>
							</Label>
							<Input
								id="zipCode"
								name="zipCode"
								placeholder="12345"
								className="group-data-[invalid=true]/field:border-destructive group-data-[invalid=true]/field:focus-visible:ring-destructive"
								defaultValue={state.defaultValues.zipCode}
								disabled={pending}
								aria-invalid={!!state.errors?.zipCode}
								aria-errormessage="error-zipCode"
							/>
							{state.errors?.zipCode && (
								<p id="error-zipCode" className="text-destructive text-sm">
									{state.errors.zipCode}
								</p>
							)}
						</div>
					</div>
				</CardContent>
				<CardFooter>
					<Button type="submit" disabled={pending}>
						{pending ? 'Submitting...' : 'Submit'}
					</Button>
				</CardFooter>
			</form>
		</Card>
	);
}

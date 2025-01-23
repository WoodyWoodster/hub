'use client';

import * as React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { addPersonAction } from '@/lib/actions/people/actions';
import { Check } from 'lucide-react';

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
			streetAddress: '',
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
						<p className="flex items-center gap-2 text-sm text-muted-foreground">
							<Check className="size-4" />
							Person added successfully.
						</p>
					) : null}

					<div className="space-y-4">
						<h3 className="text-lg font-semibold">Personal Information</h3>
						<div className="grid grid-cols-2 gap-4">
							<FormField
								id="fullName"
								label="Full Name"
								placeholder="John"
								error={state.errors?.fullName}
								defaultValue={state.defaultValues.fullName}
								disabled={pending}
							/>
						</div>
						<FormField
							id="email"
							label="Email"
							type="email"
							placeholder="john.doe@example.com"
							error={state.errors?.email}
							defaultValue={state.defaultValues.email}
							disabled={pending}
						/>
						<div className="grid grid-cols-2 gap-4">
							<FormField
								id="dateOfBirth"
								label="Date of Birth"
								type="date"
								error={state.errors?.dateOfBirth}
								defaultValue={state.defaultValues.dateOfBirth}
								disabled={pending}
							/>
							<FormField
								id="hireDate"
								label="Hire Date"
								type="date"
								error={state.errors?.hireDate}
								defaultValue={state.defaultValues.hireDate}
								disabled={pending}
							/>
						</div>
					</div>

					<div className="space-y-4">
						<h3 className="text-lg font-semibold">Home Address</h3>
						<FormField
							id="streetAddress"
							label="Street Address"
							placeholder="123 Main St"
							error={state.errors?.streetAddress}
							defaultValue={state.defaultValues.streetAddress}
							disabled={pending}
						/>
						<div className="grid grid-cols-2 gap-4">
							<FormField
								id="city"
								label="City"
								placeholder="Anytown"
								error={state.errors?.city}
								defaultValue={state.defaultValues.city}
								disabled={pending}
							/>
							<FormField
								id="state"
								label="State"
								placeholder="CA"
								error={state.errors?.state}
								defaultValue={state.defaultValues.state}
								disabled={pending}
							/>
						</div>
						<FormField
							id="zipCode"
							label="ZIP Code"
							placeholder="12345"
							error={state.errors?.zipCode}
							defaultValue={state.defaultValues.zipCode}
							disabled={pending}
						/>
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

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
	id: string;
	label: string;
	error?: string;
}

function FormField({ id, label, error, ...props }: FormFieldProps) {
	return (
		<div className="group/field grid gap-2" data-invalid={!!error}>
			<Label
				htmlFor={id}
				className="group-data-[invalid=true]/field:text-destructive"
			>
				{label} <span aria-hidden="true">*</span>
			</Label>
			<Input
				id={id}
				name={id}
				className="group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive"
				aria-invalid={!!error}
				aria-errormessage={`error-${id}`}
				{...props}
			/>
			{error && (
				<p id={`error-${id}`} className="text-sm text-destructive">
					{error}
				</p>
			)}
		</div>
	);
}

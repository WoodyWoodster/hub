'use client';

import * as React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
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
import { useForm } from 'react-hook-form';
import { addPersonSchema } from '@/lib/schemas/people/add-person-schema';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { useSession } from 'next-auth/react';
import { addPersonAction } from '@/lib/actions/people/actions';
import { FC } from 'react';
import { Role } from '../../tables/people/table';

interface AddPersonFormProps {
	onSuccess: () => void;
	roles: Role[];
}

export const AddPersonForm: FC<AddPersonFormProps> = ({ onSuccess, roles }) => {
	const session = useSession();
	const form = useForm<z.infer<typeof addPersonSchema>>({
		resolver: zodResolver(addPersonSchema),
		defaultValues: {
			fullName: '',
			email: '',
			dateOfBirth: '',
			hireDate: '',
			roleId: '',
			street: '',
			city: '',
			state: '',
			zipCode: '',
			companyId: session.data?.user.companyId,
			createdBy: session.data?.user.id,
		},
	});

	const onSubmit = async (values: z.infer<typeof addPersonSchema>) => {
		console.log(values);
		const formData = new FormData();
		Object.entries(values).forEach(([key, value]) => {
			formData.append(key, value);
		});

		const result = await addPersonAction(formData);

		if (result.errors) {
			toast({
				title: 'Failed to add person',
				description: result.errors.form,
			});
			return;
		}

		onSuccess();

		toast({
			title: `${values.fullName} added successfully!`,
			description: `${values.fullName} will receive an invite email when they are eligible to begin shopping.`,
		});
	};

	return (
		<Card className="w-full">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<CardContent className="flex flex-col gap-6">
						<div className="space-y-4">
							<h3 className="text-lg font-semibold">Personal Information</h3>
							<div className="grid grid-cols-2 gap-4">
								<div className="group/field grid gap-2">
									<FormField
										control={form.control}
										name="fullName"
										render={({ field }) => (
											<FormItem
												className="group/field grid gap-2"
												data-invalid={!!form.formState.errors.fullName}
											>
												<FormLabel>Full Name</FormLabel>
												<FormControl>
													<Input
														id="fullName"
														type="text"
														placeholder="John Doe"
														className="group-data-[invalid=true]/field:border-destructive group-data-[invalid=true]/field:focus-visible:ring-destructive"
														{...field}
													/>
												</FormControl>
											</FormItem>
										)}
									/>
								</div>
								<div className="group/field grid gap-2">
									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<FormItem
												className="group/field grid gap-2"
												data-invalid={!!form.formState.errors.email}
											>
												<FormLabel>Email</FormLabel>
												<FormControl>
													<Input
														id="email"
														type="email"
														placeholder="john.doe@example.com"
														className="group-data-[invalid=true]/field:border-destructive group-data-[invalid=true]/field:focus-visible:ring-destructive"
														{...field}
													/>
												</FormControl>
											</FormItem>
										)}
									/>
								</div>
							</div>

							<div className="grid grid-cols-3 gap-4">
								<div className="group/field grid gap-2">
									<FormField
										control={form.control}
										name="dateOfBirth"
										render={({ field }) => (
											<FormItem
												className="group/field grid gap-2"
												data-invalid={!!form.formState.errors.hireDate}
											>
												<FormLabel>Date of Birth</FormLabel>
												<FormControl>
													<Input
														id="dateOfBirth"
														type="date"
														className="group-data-[invalid=true]/field:border-destructive group-data-[invalid=true]/field:focus-visible:ring-destructive"
														{...field}
													/>
												</FormControl>
											</FormItem>
										)}
									/>
								</div>
								<div className="group/field grid gap-2">
									<FormField
										control={form.control}
										name="hireDate"
										render={({ field }) => (
											<FormItem
												className="group/field grid gap-2"
												data-invalid={!!form.formState.errors.hireDate}
											>
												<FormLabel>Hire Date</FormLabel>
												<FormControl>
													<Input
														id="hireDate"
														type="date"
														className="group-data-[invalid=true]/field:border-destructive group-data-[invalid=true]/field:focus-visible:ring-destructive"
														{...field}
													/>
												</FormControl>
											</FormItem>
										)}
									/>
								</div>
								<div className="group/field grid gap-2">
									<FormField
										control={form.control}
										name="roleId"
										render={({ field }) => (
											<FormItem className="group/field grid gap-2">
												<FormLabel>Role</FormLabel>
												<FormControl>
													<Select
														onValueChange={field.onChange}
														defaultValue={field.value}
													>
														<SelectTrigger className="group-data-[invalid=true]/field:border-destructive group-data-[invalid=true]/field:focus-visible:ring-destructive">
															<SelectValue placeholder="Select a role" />
														</SelectTrigger>
														<SelectContent>
															{roles.map((role) => (
																<SelectItem key={role.id} value={role.id}>
																	{role.name}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
												</FormControl>
											</FormItem>
										)}
									/>
								</div>
							</div>
						</div>

						<div className="space-y-4">
							<h3 className="text-lg font-semibold">Home Address</h3>
							<div className="group/field grid gap-2">
								<FormField
									control={form.control}
									name="street"
									render={({ field }) => (
										<FormItem
											className="group/field grid gap-2"
											data-invalid={!!form.formState.errors.street}
										>
											<FormLabel>Street Address</FormLabel>
											<FormControl>
												<Input
													id="street"
													type="text"
													placeholder="123 Main St"
													className="group-data-[invalid=true]/field:border-destructive group-data-[invalid=true]/field:focus-visible:ring-destructive"
													{...field}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</div>
							<div className="grid grid-cols-3 gap-4">
								<div className="group/field grid gap-2">
									<FormField
										control={form.control}
										name="city"
										render={({ field }) => (
											<FormItem
												className="group/field grid gap-2"
												data-invalid={!!form.formState.errors.city}
											>
												<FormLabel>City</FormLabel>
												<FormControl>
													<Input
														id="city"
														type="text"
														placeholder="Anytown"
														className="group-data-[invalid=true]/field:border-destructive group-data-[invalid=true]/field:focus-visible:ring-destructive"
														{...field}
													/>
												</FormControl>
											</FormItem>
										)}
									/>
								</div>
								<div className="group/field grid gap-2">
									<FormField
										control={form.control}
										name="state"
										render={({ field }) => (
											<FormItem className="group/field grid gap-2">
												<FormLabel>State</FormLabel>
												<FormControl>
													<Select
														onValueChange={field.onChange}
														defaultValue={field.value}
													>
														<SelectTrigger className="group-data-[invalid=true]/field:border-destructive group-data-[invalid=true]/field:focus-visible:ring-destructive">
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
											</FormItem>
										)}
									/>
								</div>
								<div className="group/field">
									<FormField
										control={form.control}
										name="zipCode"
										render={({ field }) => (
											<FormItem
												className="group/field grid gap-2"
												data-invalid={!!form.formState.errors.zipCode}
											>
												<FormLabel>ZIP Code</FormLabel>
												<FormControl>
													<Input
														id="zipCode"
														type="text"
														placeholder="12345"
														className="group-data-[invalid=true]/field:border-destructive group-data-[invalid=true]/field:focus-visible:ring-destructive"
														{...field}
													/>
												</FormControl>
											</FormItem>
										)}
									/>
								</div>
							</div>
						</div>
					</CardContent>
					<CardFooter>
						<Button type="submit" className="w-full">
							{form.formState.isSubmitting ? 'Adding person...' : 'Add Person'}
						</Button>
					</CardFooter>
				</form>
			</Form>
		</Card>
	);
};

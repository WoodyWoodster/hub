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
import {
	addPersonSchema,
	AddPersonValues,
} from '@/lib/schemas/people/add-person-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { useSession } from 'next-auth/react';
import { addPersonAction } from '@/lib/actions/people/actions';
import { FC } from 'react';
import { track } from '@vercel/analytics/react';
import { getExternalRoles } from '@/lib/queries/roles/queries';
import { useQuery, useQueryClient } from '@tanstack/react-query';

interface AddPersonFormProps {
	onSuccess: () => void;
}

export const AddPersonForm: FC<AddPersonFormProps> = ({ onSuccess }) => {
	const session = useSession();
	const queryClient = useQueryClient();
	const form = useForm<AddPersonValues>({
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
	const {
		data: roles,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['roles'],
		queryFn: () => getExternalRoles(),
		enabled: !!session.data?.user.id,
	});

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error loading roles</div>;

	const onSubmit = async (values: AddPersonValues) => {
		console.log(values);
		const result = await addPersonAction(values);
		if (result.errors) {
			toast({
				title: 'Failed to add person',
				description: result.errors.form,
			});
			return;
		}

		track('Added person', {
			companyId: values.companyId,
			email: values.email,
			role: values.roleId,
		});

		queryClient.invalidateQueries({ queryKey: ['people'] });

		onSuccess();

		toast({
			title: `${values.fullName} added successfully!`,
			description: `${values.fullName} will receive an invite email when they are eligible to begin shopping.`,
		});
	};

	return (
		<div className="p-3 pb-0">
			<Card className="pt-6">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<CardContent className="flex flex-col gap-6">
							<div className="space-y-4">
								<div>
									<h3 className="text-lg leading-6 font-medium text-gray-900">
										Personal Information
									</h3>
									<div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
										<FormField
											control={form.control}
											name="fullName"
											render={({ field, fieldState }) => (
												<FormItem className="sm:col-span-3">
													<FormLabel
														className={`text-base font-medium ${fieldState.error ? 'text-critical-700' : 'text-gray-900'}`}
													>
														Full Name
													</FormLabel>
													<FormControl>
														<Input placeholder="John Doe" {...field} />
													</FormControl>
													<FormMessage className="text-critical-700 mt-1.5 text-sm" />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="email"
											render={({ field, fieldState }) => (
												<FormItem className="sm:col-span-3">
													<FormLabel
														className={`text-base font-medium ${fieldState.error ? 'text-critical-700' : 'text-gray-900'}`}
													>
														Email
													</FormLabel>
													<FormControl>
														<Input
															placeholder="john.doe@example.com"
															{...field}
														/>
													</FormControl>
													<FormMessage className="text-critical-700 mt-1.5 text-sm" />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="dateOfBirth"
											render={({ field, fieldState }) => (
												<FormItem className="sm:col-span-2">
													<FormLabel
														className={`text-base font-medium ${fieldState.error ? 'text-critical-700' : 'text-gray-900'}`}
													>
														Date of Birth
													</FormLabel>
													<FormControl>
														<Input type="date" {...field} />
													</FormControl>
													<FormMessage className="text-critical-700 mt-1.5 text-sm" />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="hireDate"
											render={({ field, fieldState }) => (
												<FormItem className="sm:col-span-2">
													<FormLabel
														className={`text-base font-medium ${fieldState.error ? 'text-critical-700' : 'text-gray-900'}`}
													>
														Hire Date
													</FormLabel>
													<FormControl>
														<Input type="date" {...field} />
													</FormControl>
													<FormMessage className="text-critical-700 mt-1.5 text-sm" />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="roleId"
											render={({ field, fieldState }) => (
												<FormItem className="sm:col-span-2">
													<FormLabel
														className={`text-base font-medium ${fieldState.error ? 'text-critical-700' : 'text-gray-900'}`}
													>
														Role
													</FormLabel>
													<FormControl>
														<Select
															onValueChange={field.onChange}
															defaultValue={field.value}
														>
															<SelectTrigger className="group-data-[invalid=true]/field:border-destructive group-data-[invalid=true]/field:focus-visible:ring-destructive">
																<SelectValue placeholder="Select a role" />
															</SelectTrigger>
															<SelectContent>
																{roles?.map((role) => (
																	<SelectItem key={role.id} value={role.id}>
																		{role.name}
																	</SelectItem>
																))}
															</SelectContent>
														</Select>
													</FormControl>
													<FormMessage className="text-critical-700 mt-1.5 text-sm" />
												</FormItem>
											)}
										/>
									</div>
								</div>
							</div>

							<div>
								<h3 className="text-lg leading-6 font-medium text-gray-900">
									Home Address
								</h3>
								<div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
									<FormField
										control={form.control}
										name="street"
										render={({ field, fieldState }) => (
											<FormItem className="sm:col-span-6">
												<FormLabel
													className={`text-base font-medium ${fieldState.error ? 'text-critical-700' : 'text-gray-900'}`}
												>
													Street Address
												</FormLabel>
												<FormControl>
													<Input placeholder="123 Main St" {...field} />
												</FormControl>
												<FormMessage className="text-critical-700 mt-1.5 text-sm" />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="city"
										render={({ field, fieldState }) => (
											<FormItem className="sm:col-span-2">
												<FormLabel
													className={`text-base font-medium ${fieldState.error ? 'text-critical-700' : 'text-gray-900'}`}
												>
													City
												</FormLabel>
												<FormControl>
													<Input placeholder="Richardson" {...field} />
												</FormControl>
												<FormMessage className="text-critical-700 mt-1.5 text-sm" />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="state"
										render={({ field, fieldState }) => (
											<FormItem className="sm:col-span-2">
												<FormLabel
													className={`text-base font-medium ${fieldState.error ? 'text-critical-700' : 'text-gray-900'}`}
												>
													State
												</FormLabel>
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
												<FormMessage className="text-critical-700 mt-1.5 text-sm" />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="zipCode"
										render={({ field, fieldState }) => (
											<FormItem className="sm:col-span-2">
												<FormLabel
													className={`text-base font-medium ${fieldState.error ? 'text-critical-700' : 'text-gray-900'}`}
												>
													ZIP Code
												</FormLabel>
												<FormControl>
													<Input placeholder="12345" {...field} />
												</FormControl>
												<FormMessage className="text-critical-700 mt-1.5 text-sm" />
											</FormItem>
										)}
									/>
								</div>
							</div>
						</CardContent>
						<CardFooter>
							<Button type="submit" className="w-full">
								{form.formState.isSubmitting
									? 'Adding person...'
									: 'Add Person'}
							</Button>
						</CardFooter>
					</form>
				</Form>
			</Card>
		</div>
	);
};

'use client';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Select, SelectItem } from '@/components/ui/select';
import { planSetupSchema } from '@/lib/schemas/onboarding/plan-setup-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	SelectContent,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export function PlanSetupForm() {
	const form = useForm<z.infer<typeof planSetupSchema>>({
		resolver: zodResolver(planSetupSchema),
		defaultValues: {
			plan: {
				startDate: '',
				eligibleEmployees: undefined,
				participatingEmployees: undefined,
				autopay: false,
			},
		},
	});

	const getNextSixMonths = () => {
		const months = [];
		const date = new Date();
		for (let i = 0; i < 6; i++) {
			date.setMonth(date.getMonth() + 1);
			months.push(
				date.toLocaleString('default', { month: 'long', year: 'numeric' }),
			);
		}
		return months;
	};

	return (
		<div className="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
					Plan Setup
				</h2>
			</div>
			<div className="mt-8 w-full">
				<div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
					<Form {...form}>
						<form className="space-y-8">
							<Progress value={50} className="w-full" />
							<div className="space-y-8">
								<div>
									<h3 className="text-lg leading-6 font-medium text-gray-900">
										Plan Details
									</h3>
									<div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
										<FormField
											control={form.control}
											name="plan.startDate"
											render={({ field }) => (
												<FormItem className="sm:col-span-6">
													<FormLabel>
														When would you like your HRA to start?
													</FormLabel>
													<Select
														onValueChange={field.onChange}
														defaultValue={field.value}
													>
														<FormControl>
															<SelectTrigger>
																<SelectValue placeholder="Select a start date" />
															</SelectTrigger>
														</FormControl>

														<SelectContent>
															{getNextSixMonths().map((month) => (
																<SelectItem key={month} value={month}>
																	{month}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="plan.eligibleEmployees"
											render={({ field }) => (
												<FormItem className="sm:col-span-6">
													<FormLabel>
														How many benefit eligible employees do you have?
													</FormLabel>
													<FormControl>
														<Input
															type="number"
															placeholder="Enter number of eligible employees"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="plan.participatingEmployees"
											render={({ field }) => (
												<FormItem className="sm:col-span-6">
													<FormLabel>
														How many participating employees do you have?
													</FormLabel>
													<FormControl>
														<Input
															type="number"
															placeholder="Enter number of participating employees"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</div>
							</div>
							<div className="flex justify-between">
								<Button variant="outline" type="button">
									<Link href="/sign-up">Back</Link>
								</Button>
								<Button type="submit">Continue</Button>
							</div>
						</form>
					</Form>
				</div>
			</div>
		</div>
	);
}

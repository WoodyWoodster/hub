'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { planSetupSchema } from '@/lib/schemas/onboarding/plan-setup-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export function PlanSetupForm() {
	const [showAutoPay, setShowAutoPay] = useState(false);
	const [showWarningModal, setShowWarningModal] = useState(false);

	const form = useForm<z.infer<typeof planSetupSchema>>({
		resolver: zodResolver(planSetupSchema),
		defaultValues: {
			plan: {
				startDate: '',
				eligibleEmployees: '',
				participatingEmployees: '',
				autopay: false,
				selectedPlan: undefined,
			},
		},
	});

	const startDate = form.watch('plan.startDate');
	const eligibleEmployees = form.watch('plan.eligibleEmployees');
	const participatingEmployees = form.watch('plan.participatingEmployees');
	const autopay = form.watch('plan.autopay');

	useEffect(() => {
		if (startDate && eligibleEmployees && participatingEmployees) {
			setShowAutoPay(true);
		} else {
			setShowAutoPay(false);
		}

		const eligibleCount = Number(eligibleEmployees);
		const participatingCount = Number(participatingEmployees);

		if (participatingCount > eligibleCount) {
			form.setError('plan.participatingEmployees', {
				type: 'manual',
				message: 'Participating employees cannot exceed eligible employees',
			});
		} else {
			form.clearErrors('plan.participatingEmployees');
		}

		if (
			(eligibleCount >= 50 || participatingCount >= 50) &&
			!isNaN(eligibleCount) &&
			!isNaN(participatingCount)
		) {
			setShowWarningModal(true);
		}
	}, [startDate, eligibleEmployees, participatingEmployees, form]);

	const handleGoToChat = () => {
		console.log('Redirecting to chat...');
	};

	const getNextSixMonths = () => {
		const months = [];
		const date = new Date();
		for (let i = 0; i < 6; i++) {
			date.setMonth(date.getMonth() + 1);
			const displayValue = date.toLocaleString('default', {
				month: 'long',
				year: 'numeric',
			});
			const dbValue = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-01`;
			months.push({ display: displayValue, value: dbValue });
		}
		return months;
	};

	return (
		<div className="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
			<Dialog open={showWarningModal} onOpenChange={setShowWarningModal}>
				<DialogContent className="sm:max-w-md">
					<DialogClose className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none">
						<X className="h-4 w-4" />
						<span className="sr-only">Close</span>
					</DialogClose>
					<DialogHeader>
						<DialogTitle className="text-2xl font-bold">
							You can&apos;t proceed
						</DialogTitle>
					</DialogHeader>
					<DialogDescription className="space-y-4">
						If you haven&apos;t already, you&apos;ll want to make sure you offer
						an &quot;affordable&quot; reimbursement amount to avoid any
						potential penalties. Please chat with us or email us at{' '}
						<a
							href="mailto:sales@takecommandhealth.com"
							className="text-primary hover:underline"
						>
							sales@takecommandhealth.com
						</a>
						.
					</DialogDescription>
					<div className="mt-6 flex justify-end gap-4">
						<DialogClose asChild>
							<Button variant="outline">Go Back</Button>
						</DialogClose>
						<Button
							onClick={handleGoToChat}
							className="bg-primary hover:bg-[#245347]"
						>
							Go to chat
						</Button>
					</div>
				</DialogContent>
			</Dialog>
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
					Plan Setup
				</h2>
			</div>
			<div className="mt-8 w-full">
				<div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
					<Form {...form}>
						<form
							className="space-y-8"
							onSubmit={form.handleSubmit((data) => console.log(data))}
						>
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
																<SelectItem
																	key={month.value}
																	value={month.value}
																>
																	{month.display}
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

								{showAutoPay && (
									<div className="space-y-6">
										<div>
											<h3 className="text-lg font-medium">
												Do you want to add AutoPay to your plan?
											</h3>
											<p className="mt-2 text-gray-600">
												AutoPay payment solution simulates the same cashflow
												experience as a traditional group plan – employers pay
												monthly premiums directly to insurance carriers, then
												withhold any employee portion via payroll as needed.
												AutoPay enables the convenience of a group plan with the
												personalization of the individual market.{' '}
												<a href="#" className="text-primary hover:underline">
													Click here
												</a>{' '}
												to learn more about AutoPay.
											</p>
											<div className="mt-4 text-sm text-gray-600">
												<p className="font-medium">
													Important: If you want to use AutoPay, you must
													complete your AutoPay application and bank set-up at
													least <span className="font-bold">35 days</span> prior
													to your HRA plan start date. If today, February 1st,
													2025, is less than{' '}
													<span className="font-bold">35 days</span> before your
													selected start date, you can:
												</p>
												<ul className="mt-2 list-decimal pl-5">
													<li>
														Select &quot;No&quot; and move forward with a
														reimbursement model
													</li>
												</ul>
											</div>

											<div className="mt-6 grid grid-cols-2 gap-4">
												<Button
													type="button"
													variant={autopay ? 'default' : 'outline'}
													className={`h-24 ${autopay ? 'border-primary border-2' : ''}`}
													onClick={() => {
														form.setValue('plan.autopay', true);
														form.setValue('plan.selectedPlan', 'Growth');
													}}
												>
													Yes
												</Button>
												<Button
													type="button"
													variant={autopay === false ? 'default' : 'outline'}
													className={`h-24 ${autopay === false ? 'border-primary border-2' : ''}`}
													onClick={() => {
														form.setValue('plan.autopay', false);
														form.setValue('plan.selectedPlan', 'Starter');
													}}
												>
													No
												</Button>
											</div>

											{autopay !== undefined && (
												<div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
													<Card className="p-6">
														<h4 className="text-lg font-medium">
															{autopay
																? 'Growth Plan Cost'
																: 'Starter Plan Cost'}
														</h4>
														<p className="mt-2 text-gray-600">
															With this selection you qualify for our{' '}
															{autopay ? 'Growth' : 'Starter'} Plan, here you
															will be charged ${autopay ? '30' : '20'} per
															employee per month (PEPM) (all non-waived
															employees) + ${autopay ? '100' : '40'} monthly
															platform fee.
														</p>
													</Card>
													<Card className="p-6">
														<div className="flex items-center justify-between">
															<h4 className="text-lg font-medium">
																{autopay
																	? 'Growth Plan Clarification'
																	: 'Starter Plan Clarification'}
															</h4>
															<Badge
																variant="secondary"
																className="bg-[#D4B4A7] text-white"
															>
																{autopay ? 'GROWTH' : 'STARTER'}
															</Badge>
														</div>
														<p className="mt-2 text-gray-600">
															{autopay
																? 'Health benefits with a payment solution and integrations that serve growing companies up to 49 employees.'
																: 'Easy & cost-effective solution for small employers new-to-benefits, up to 49 employees.'}
														</p>
													</Card>
												</div>
											)}
										</div>
									</div>
								)}
							</div>
							<Button className="w-full" type="submit">
								Continue
							</Button>
						</form>
					</Form>
				</div>
			</div>
		</div>
	);
}

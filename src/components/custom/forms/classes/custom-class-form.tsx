'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';

export function CustomClassForm() {
	const form = useForm({
		defaultValues: {
			className: '',
			employmentType: '',
			salaryType: '',
			seasonalType: '',
			geographicArea: '',
			reimbursementStructure: '',
			waitingPeriod: '',
		},
	});

	return (
		<div className="p-3 pb-0">
			<Card className="pt-6">
				<Form {...form}>
					<form onSubmit={form.handleSubmit((data) => console.log(data))}>
						<CardContent className="space-y-8">
							<div>
								<h3 className="text-lg font-medium text-gray-900">
									Class Information
								</h3>
								<div className="mt-6 space-y-6">
									<FormField
										control={form.control}
										name="className"
										render={({ field, fieldState }) => (
											<FormItem>
												<FormLabel
													className={`text-base font-medium ${fieldState.error ? 'text-critical-700' : 'text-gray-900'}`}
												>
													Name your class
												</FormLabel>
												<FormControl>
													<Input placeholder="Class name" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="employmentType"
										render={({ field, fieldState }) => (
											<FormItem>
												<FormLabel
													className={`text-base font-medium ${fieldState.error ? 'text-critical-700' : 'text-gray-900'}`}
												>
													Please select full-time, part-time, or both
												</FormLabel>
												<div className="grid grid-cols-2 gap-4">
													<Button
														type="button"
														variant={
															field.value === 'full-time'
																? 'default'
																: 'outline'
														}
														onClick={() => field.onChange('full-time')}
														className="h-24 w-full"
													>
														Full-Time
													</Button>
													<Button
														type="button"
														variant={
															field.value === 'part-time'
																? 'default'
																: 'outline'
														}
														onClick={() => field.onChange('part-time')}
														className="h-24 w-full"
													>
														Part-Time
													</Button>
												</div>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="salaryType"
										render={({ field, fieldState }) => (
											<FormItem>
												<FormLabel
													className={`text-base font-medium ${fieldState.error ? 'text-critical-700' : 'text-gray-900'}`}
												>
													Please select salary, non-salary, or both
												</FormLabel>
												<div className="grid grid-cols-2 gap-4">
													<Button
														type="button"
														variant={
															field.value === 'salary' ? 'default' : 'outline'
														}
														onClick={() => field.onChange('salary')}
														className="h-24 w-full"
													>
														Salary
													</Button>
													<Button
														type="button"
														variant={
															field.value === 'non-salary'
																? 'default'
																: 'outline'
														}
														onClick={() => field.onChange('non-salary')}
														className="h-24 w-full"
													>
														Non-Salary
													</Button>
												</div>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="seasonalType"
										render={({ field, fieldState }) => (
											<FormItem>
												<FormLabel
													className={`text-base font-medium ${fieldState.error ? 'text-critical-700' : 'text-gray-900'}`}
												>
													Please select seasonal, non-seasonal, or both
												</FormLabel>
												<div className="grid grid-cols-2 gap-4">
													<Button
														type="button"
														variant={
															field.value === 'seasonal' ? 'default' : 'outline'
														}
														onClick={() => field.onChange('seasonal')}
														className="h-24 w-full"
													>
														Seasonal
													</Button>
													<Button
														type="button"
														variant={
															field.value === 'non-seasonal'
																? 'default'
																: 'outline'
														}
														onClick={() => field.onChange('non-seasonal')}
														className="h-24 w-full"
													>
														Non-Seasonal
													</Button>
												</div>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="geographicArea"
										render={({ field, fieldState }) => (
											<FormItem>
												<FormLabel
													className={`text-base font-medium ${fieldState.error ? 'text-critical-700' : 'text-gray-900'}`}
												>
													Please select specific geographic area or all areas
												</FormLabel>
												<div className="grid grid-cols-2 gap-4">
													<Button
														type="button"
														variant={
															field.value === 'specific' ? 'default' : 'outline'
														}
														onClick={() => field.onChange('specific')}
														className="h-24 w-full"
													>
														Specific Geographic Areas
													</Button>
													<Button
														type="button"
														variant={
															field.value === 'all' ? 'default' : 'outline'
														}
														onClick={() => field.onChange('all')}
														className="h-24 w-full"
													>
														All Geographic Areas
													</Button>
												</div>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="reimbursementStructure"
										render={({ field, fieldState }) => (
											<FormItem>
												<FormLabel
													className={`text-base font-medium ${fieldState.error ? 'text-critical-700' : 'text-gray-900'}`}
												>
													How do you want to structure your reimbursements
													(reimbursements are set for month)?
												</FormLabel>
												<p className="mt-2 text-sm text-gray-600">
													You will only reimburse what employees actually spend
												</p>
												<div className="mt-4 grid grid-cols-2 gap-4">
													<Button
														type="button"
														variant={
															field.value === 'same' ? 'default' : 'outline'
														}
														onClick={() => field.onChange('same')}
														className="h-24 w-full"
													>
														All Employees Same Amount
													</Button>
													<Button
														type="button"
														variant={
															field.value === 'vary-age' ? 'default' : 'outline'
														}
														onClick={() => field.onChange('vary-age')}
														className="h-24 w-full"
													>
														Vary by Age
													</Button>
													<Button
														type="button"
														variant={
															field.value === 'vary-family'
																? 'default'
																: 'outline'
														}
														onClick={() => field.onChange('vary-family')}
														className="h-24 w-full"
													>
														Vary by Family Size
													</Button>
													<Button
														type="button"
														variant={
															field.value === 'vary-both'
																? 'default'
																: 'outline'
														}
														onClick={() => field.onChange('vary-both')}
														className="h-24 w-full"
													>
														Vary by Age and Family Size
													</Button>
												</div>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="waitingPeriod"
										render={({ field, fieldState }) => (
											<FormItem>
												<FormLabel
													className={`text-base font-medium ${fieldState.error ? 'text-critical-700' : 'text-gray-900'}`}
												>
													Waiting period
												</FormLabel>
												<div className="grid grid-cols-2 gap-4">
													<Button
														type="button"
														variant={
															field.value === 'immediately'
																? 'default'
																: 'outline'
														}
														onClick={() => field.onChange('immediately')}
														className="h-24 w-full"
													>
														Immediately
													</Button>
													<Button
														type="button"
														variant={
															field.value === '30' ? 'default' : 'outline'
														}
														onClick={() => field.onChange('30')}
														className="h-24 w-full"
													>
														30 Days
													</Button>
													<Button
														type="button"
														variant={
															field.value === '60' ? 'default' : 'outline'
														}
														onClick={() => field.onChange('60')}
														className="h-24 w-full"
													>
														60 Days
													</Button>
													<Button
														type="button"
														variant={
															field.value === '90' ? 'default' : 'outline'
														}
														onClick={() => field.onChange('90')}
														className="h-24 w-full"
													>
														90 Days
													</Button>
												</div>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>
							<Button type="submit" className="w-full">
								Create
							</Button>
						</CardContent>
					</form>
				</Form>
			</Card>
		</div>
	);
}

'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer';
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
import { HelpCircle, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { CustomClassForm } from '../classes/custom-class-form';

export function PlanStructureForm() {
	const router = useRouter();
	const form = useForm({
		defaultValues: {
			multipleClasses: '',
			hoursPerWeek: '',
			monthsPerYear: '',
		},
	});

	return (
		<div className="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
					Plan Structure
				</h2>
			</div>
			<div className="mt-8 w-full">
				<div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
					<Form {...form}>
						<form className="space-y-8">
							<Card className="pt-6">
								<CardContent className="space-y-8">
									<Progress value={66} className="w-full" />
									<div className="space-y-8">
										<FormField
											control={form.control}
											name="multipleClasses"
											render={({ field }) => (
												<FormItem className="sm:col-span-6">
													<FormLabel className="text-base font-medium text-gray-900">
														Do you need more than one class?
													</FormLabel>
													<div className="grid grid-cols-2 gap-4">
														<Button
															type="button"
															variant={
																field.value === 'yes' ? 'default' : 'outline'
															}
															onClick={() => field.onChange('yes')}
															className="h-24 w-full"
														>
															Yes
														</Button>
														<Button
															type="button"
															variant={
																field.value === 'no' ? 'default' : 'outline'
															}
															onClick={() => field.onChange('no')}
															className="h-24 w-full"
														>
															No
														</Button>
													</div>
													<FormMessage className="text-critical-700 mt-1.5 text-sm" />
												</FormItem>
											)}
										/>

										<Card className="p-4">
											<div className="flex items-start gap-2">
												<HelpCircle className="h-5 w-5 flex-shrink-0 text-gray-500" />
												<div className="space-y-2">
													<p className="font-medium">
														ICHRA classes help employers prioritize their health
														benefits budget.
													</p>
													<ul className="space-y-1 text-sm text-gray-600">
														<li>
															Employee classes separate employees into groups by
															legitimate job-based criteria like hours worked or
															location.
														</li>
														<li>
															The nice thing about ICHRA is that you can combine
															it with a traditional group health plan.
														</li>
														<li>
															Employers may offer one class of employees a group
															health plan and another class of employees an
															ICHRA.
														</li>
														<li>
															The only caveat is that employers cannot offer
															employees in the same class (say full-time
															employees) the choice between a traditional group
															health plan or ICHRA.
														</li>
														<li>
															Each class needs to have only one benefit
															offering.
														</li>
													</ul>
												</div>
											</div>
										</Card>

										<div>
											<div className="flex items-center justify-between">
												<h3 className="text-lg font-medium text-gray-900">
													Do you have questions about the ICHRA class rules?
												</h3>
												<Button variant="outline" size="sm">
													Learn more about ICHRA classes
												</Button>
											</div>
											<p className="mt-2 text-gray-600">
												Let&apos;s look at the ICHRA class rules, which ensure
												that benefits are offered fairly to all employees.
											</p>
										</div>

										<div className="space-y-6">
											<h3 className="text-lg font-medium text-gray-900">
												Next, we&apos;ll help you design your employee classes
												and reimbursement structure for each class.
											</h3>
											<p className="text-gray-600">
												You will need to assign your classes and set
												reimbursement amounts for each employee class.
												Don&apos;t worry, we&apos;ll help you make sure your
												classes are compliant!
											</p>

											<div className="flex items-center gap-2">
												<Input type="checkbox" className="h-4 w-4" />
												<span className="text-sm">
													Select All / Unselect All
												</span>
											</div>

											<Card className="p-6">
												<div className="space-y-4">
													<div className="flex items-center gap-2">
														<Input type="checkbox" className="h-4 w-4" />
														<span className="font-medium">All Employees</span>
													</div>
													<div className="flex flex-wrap gap-2">
														<Badge
															variant="secondary"
															className="bg-gray-100 text-gray-600"
														>
															All Geographic Areas
														</Badge>
														<Badge
															variant="secondary"
															className="bg-gray-100 text-gray-600"
														>
															All Employees Same Amount: $400
														</Badge>
														<Badge
															variant="secondary"
															className="bg-gray-100 text-gray-600"
														>
															Insurance Premiums Only
														</Badge>
														<Badge
															variant="secondary"
															className="bg-gray-100 text-gray-600"
														>
															Waiting Period: Immediately
														</Badge>
													</div>
												</div>
											</Card>

											<Drawer>
												<DrawerTrigger asChild>
													<Card className="flex cursor-pointer flex-col items-center justify-center p-8 hover:bg-gray-50">
														<div className="rounded-full bg-green-50 p-3">
															<Plus className="h-6 w-6 text-green-600" />
														</div>
														<h3 className="mt-4 font-medium text-green-800">
															Add new class
														</h3>
														<p className="text-sm text-gray-500">
															Create a new class
														</p>
													</Card>
												</DrawerTrigger>
												<DrawerContent className="h-[90vh]">
													<DrawerHeader>
														<DrawerTitle>Create a new class</DrawerTitle>
													</DrawerHeader>
													<div className="overflow-y-auto px-4 pb-8">
														<CustomClassForm />
													</div>
												</DrawerContent>
											</Drawer>
										</div>

										<FormField
											control={form.control}
											name="hoursPerWeek"
											render={({ field }) => (
												<FormItem className="sm:col-span-6">
													<FormLabel className="text-base font-medium text-gray-900">
														How many hours per week must employees be scheduled
														to work to be considered full-time?
													</FormLabel>
													<p className="mb-2 text-sm text-gray-600">
														This information helps us distinguish between
														part-time and full-time employees
													</p>
													<FormControl>
														<Input placeholder="Hours per week" {...field} />
													</FormControl>
													<p className="mt-1 text-sm text-gray-500">
														Please enter the amount of hours considered to be
														full-time
													</p>
													<FormMessage className="text-critical-700 mt-1.5 text-sm" />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="monthsPerYear"
											render={({ field }) => (
												<FormItem className="sm:col-span-6">
													<FormLabel className="text-base font-medium text-gray-900">
														How many months per year must employees be scheduled
														to work to be considered non-seasonal?
													</FormLabel>
													<p className="mb-2 text-sm text-gray-600">
														This information helps us distinguish between
														seasonal and non-seasonal employees
													</p>
													<Select
														onValueChange={field.onChange}
														value={field.value}
													>
														<FormControl>
															<SelectTrigger>
																<SelectValue placeholder="Please select" />
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															{[3, 6, 9, 12].map((months) => (
																<SelectItem
																	key={months}
																	value={months.toString()}
																>
																	{months} months
																</SelectItem>
															))}
														</SelectContent>
													</Select>
													<p className="mt-1 text-sm text-gray-500">
														Please select the range of months considered to be
														non-seasonal
													</p>
													<FormMessage className="text-critical-700 mt-1.5 text-sm" />
												</FormItem>
											)}
										/>
									</div>
								</CardContent>
								<CardFooter>
									<div className="flex w-full justify-between">
										<Button
											variant="outline"
											type="button"
											onClick={() => router.back()}
										>
											Back
										</Button>
										<Button type="submit">Continue</Button>
									</div>
								</CardFooter>
							</Card>
						</form>
					</Form>
				</div>
			</div>
		</div>
	);
}

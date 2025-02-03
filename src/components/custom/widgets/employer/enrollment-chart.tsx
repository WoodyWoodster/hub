'use client';

import * as React from 'react';
import { Label, Pie, PieChart, ResponsiveContainer } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import { Button } from '@/components/ui/button';

const chartData = [
	{ enrollment: 'easyEnroll', employees: 210, fill: 'var(--color-easyEnroll)' },
	{ enrollment: 'selfEnroll', employees: 75, fill: 'var(--color-selfEnroll)' },
	{ enrollment: 'optOut', employees: 28, fill: 'var(--color-optOut)' },
];

const chartConfig = {
	easyEnroll: {
		label: 'Easy Enroll',
		color: 'hsl(var(--chart-1))',
	},
	selfEnroll: {
		label: 'Self Enroll',
		color: 'hsl(var(--chart-2))',
	},
	optOut: {
		label: 'Opted Out',
		color: 'hsl(var(--chart-4))',
	},
} satisfies ChartConfig;

export function EnrollmentChart() {
	const totalEmployees = React.useMemo(() => {
		return chartData.reduce((acc, curr) => acc + curr.employees, 0);
	}, []);

	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
				<CardTitle>Employee Enrollment</CardTitle>
				<Button variant="link" size="link">
					Download Report
				</Button>
			</CardHeader>
			<CardContent>
				<div className="flex flex-col items-center gap-4 md:flex-row">
					<div className="min-h-[250px] w-full md:w-3/5">
						<ChartContainer config={chartConfig} className="h-full w-full">
							<ResponsiveContainer width="100%" height={250}>
								<PieChart>
									<ChartTooltip
										cursor={false}
										content={<ChartTooltipContent hideLabel />}
									/>
									<Pie
										data={chartData}
										dataKey="employees"
										nameKey="enrollment"
										innerRadius={70}
										strokeWidth={5}
									>
										<Label
											content={({ viewBox }) => {
												if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
													return (
														<text
															x={viewBox.cx}
															y={viewBox.cy}
															textAnchor="middle"
															dominantBaseline="middle"
														>
															<tspan
																x={viewBox.cx}
																y={viewBox.cy}
																className="fill-foreground text-2xl font-bold"
															>
																{totalEmployees.toLocaleString()}
															</tspan>
															<tspan
																x={viewBox.cx}
																y={(viewBox.cy || 0) + 20}
																className="fill-muted-foreground text-sm"
															>
																Employees
															</tspan>
														</text>
													);
												}
											}}
										/>
									</Pie>
								</PieChart>
							</ResponsiveContainer>
						</ChartContainer>
					</div>
					<div className="w-full space-y-3 md:w-2/5">
						{Object.keys(chartConfig).map((key) => (
							<div key={key} className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<div
										className="h-3 w-3 rounded-full"
										style={{
											backgroundColor:
												chartConfig[key as keyof typeof chartConfig].color,
										}}
									/>
									<span className="text-muted-foreground text-sm">
										{chartConfig[key as keyof typeof chartConfig].label}
									</span>
								</div>
								<span className="font-medium">
									{chartData
										.find((item) => item.enrollment === key)
										?.employees.toLocaleString()}
								</span>
							</div>
						))}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

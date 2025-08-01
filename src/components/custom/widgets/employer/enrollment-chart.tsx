'use client';

import * as React from 'react';
import { Pie, PieChart, ResponsiveContainer, Cell } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import { Button } from '@/components/ui/button';

const chartData = [
	{ enrollment: 'easyEnroll', employees: 210 },
	{ enrollment: 'selfEnroll', employees: 75 },
	{ enrollment: 'optOut', employees: 28 },
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
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle className="text-muted-foreground text-lg font-normal">
					Employee Enrollment
				</CardTitle>
				<Button variant="link" className="text-primary hover:text-primary/90">
					Download Report
				</Button>
			</CardHeader>
			<CardContent>
				<div className="flex items-center justify-between">
					<ChartContainer config={chartConfig} className="h-[260px] w-[260px]">
						<ResponsiveContainer>
							<PieChart>
								<ChartTooltip content={<ChartTooltipContent />} />
								<Pie
									data={chartData}
									dataKey="employees"
									nameKey="enrollment"
									innerRadius={0}
									outerRadius="90%"
									paddingAngle={2}
								>
									{chartData.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={
												chartConfig[
													entry.enrollment as keyof typeof chartConfig
												].color
											}
										/>
									))}
								</Pie>
							</PieChart>
						</ResponsiveContainer>
					</ChartContainer>
					<div className="space-y-4">
						{Object.entries(chartConfig).map(([key, value]) => (
							<div
								key={key}
								className="flex items-center justify-between gap-8"
							>
								<div className="flex items-center gap-2">
									<div
										className="h-3 w-3 rounded-full"
										style={{ backgroundColor: value.color }}
									/>
									<span className="text-muted-foreground text-sm">
										{value.label}
									</span>
								</div>
								<span className="font-medium">
									{chartData.find((item) => item.enrollment === key)?.employees}
								</span>
							</div>
						))}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

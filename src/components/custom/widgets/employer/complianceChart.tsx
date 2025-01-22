'use client';

import * as React from 'react';
import { Pie, PieChart } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import { Button } from '@/components/ui/button';
const chartData = [
	{ compliance: 'easyEnroll', employees: 291, fill: 'var(--color-easyEnroll)' },
	{ compliance: 'selfEnroll', employees: 10, fill: 'var(--color-selfEnroll)' },
	{ compliance: 'optOut', employees: 22, fill: 'var(--color-optOut)' },
];

const chartConfig = {
	easyEnroll: {
		label: 'Compliant',
		color: 'hsl(var(--chart-1))',
	},
	selfEnroll: {
		label: 'Non-Compliant',
		color: 'hsl(var(--chart-2))',
	},
	optOut: {
		label: 'Pending',
		color: 'hsl(var(--chart-4))',
	},
} satisfies ChartConfig;

export function ComplianceChart() {
	return (
		<Card className="flex flex-col">
			<CardHeader className="flex-row items-center justify-between pb-0">
				<CardTitle>Q1 Compliance</CardTitle>
				<Button variant="link" size="link">
					Download Report
				</Button>
			</CardHeader>
			<CardContent className="flex flex-row items-center justify-between pb-0">
				<ChartContainer
					config={chartConfig}
					className="aspect-square h-[15.625rem]"
				>
					<PieChart>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Pie
							data={chartData}
							dataKey="employees"
							nameKey="compliance"
						></Pie>
					</PieChart>
				</ChartContainer>
				<div className="w-full space-y-2 text-sm text-muted-foreground">
					{Object.keys(chartConfig).map((key) => (
						<div
							key={key}
							className="flex flex-row items-center justify-between"
						>
							<div className="flex flex-row items-center justify-between">
								<div
									className="mr-2 h-2 w-2 rounded-full"
									style={{
										backgroundColor:
											chartConfig[key as keyof typeof chartConfig].color,
									}}
								></div>
								<div>{chartConfig[key as keyof typeof chartConfig].label}</div>
							</div>
							<span className="font-bold">
								{chartData
									.find((item) => item.compliance === key)
									?.employees.toLocaleString()}
							</span>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}

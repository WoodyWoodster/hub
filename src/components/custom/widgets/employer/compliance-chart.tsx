'use client';
import React from 'react'; // Import React
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
	{ compliance: 'easyEnroll', employees: 291 },
	{ compliance: 'selfEnroll', employees: 10 },
	{ compliance: 'optOut', employees: 22 },
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
		<Card className="w-full">
			<CardHeader className="flex flex-col items-start justify-between space-y-2 pb-4 sm:flex-row sm:items-center sm:space-y-0">
				<CardTitle className="text-lg sm:text-xl">Q1 Compliance</CardTitle>
				<Button variant="link" size="sm" className="h-auto p-0">
					<span className="text-xs">Download Report</span>
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
										content={<ChartTooltipContent />}
									/>
									<Pie
										data={chartData}
										dataKey="employees"
										nameKey="compliance"
										innerRadius={0}
										outerRadius={90}
										paddingAngle={2}
									>
										{chartData.map((entry, index) => (
											<Cell
												key={`cell-${index}`}
												fill={
													chartConfig[
														entry.compliance as keyof typeof chartConfig
													].color
												}
											/>
										))}
									</Pie>
								</PieChart>
							</ResponsiveContainer>
						</ChartContainer>
					</div>
					<div className="w-full space-y-3 md:w-2/5">
						{Object.entries(chartConfig).map(([key, value]) => (
							<div key={key} className="flex items-center justify-between">
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
									{chartData
										.find((item) => item.compliance === key)
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

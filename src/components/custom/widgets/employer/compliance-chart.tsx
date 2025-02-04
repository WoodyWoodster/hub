'use client';
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
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-2 sm:space-y-0">
				<CardTitle className="text-lg sm:text-xl">Q1 Compliance</CardTitle>
				<Button
					className="flex h-auto items-center p-0"
					variant="link"
					size="sm"
				>
					<span className="block text-xs leading-none">View Details</span>
				</Button>
			</CardHeader>
			<CardContent>
				<div className="flex flex-col items-center justify-between md:flex-row">
					<ChartContainer
						config={chartConfig}
						className="h-[160px] w-[full] lg:h-[160px] lg:w-[160px] xl:h-[200px] xl:w-[200px]"
					>
						<ResponsiveContainer>
							<PieChart>
								<ChartTooltip content={<ChartTooltipContent />} />
								<Pie
									data={chartData}
									dataKey="employees"
									nameKey="compliance"
									innerRadius={0}
									outerRadius="90%"
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
									{chartData.find((item) => item.compliance === key)?.employees}
								</span>
							</div>
						))}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

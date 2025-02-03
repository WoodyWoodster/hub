import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type React from 'react';
import { Button } from '@/components/ui/button';

type AutopayColumn = {
	title: string;
	amount?: string;
	percentage?: string;
	updatedDate: string;
};

type AutopayData = {
	title: string;
	autopayColumns: {
		upcomingFunding: AutopayColumn;
		dispersement: AutopayColumn;
		participation: AutopayColumn;
	};
};

type CardProps = React.ComponentProps<typeof Card> & AutopayData;

export function AutopayWidget({
	className,
	title,
	autopayColumns,
	...props
}: CardProps) {
	return (
		<Card className={cn('w-full', className)} {...props}>
			<CardHeader className="flex flex-col items-start justify-between space-y-2 sm:flex-row sm:items-center sm:space-y-0">
				<CardTitle className="text-lg sm:text-xl">{title}</CardTitle>
				<Button
					className="flex h-auto items-center p-0"
					variant="link"
					size="sm"
				>
					<span className="block text-xs leading-none">View Details</span>
				</Button>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-4">
					{Object.entries(autopayColumns).map(([key, column]) => (
						<div key={key} className="flex flex-col gap-1">
							<span className="text-muted-foreground text-sm font-semibold">
								{column.title}
							</span>
							<div>
								{column.amount && (
									<>
										<span className="text-seafoam-700 block text-2xl leading-none font-bold sm:text-3xl">
											{column.amount}
										</span>
										<div className="text-muted-foreground mt-2 text-xs sm:mt-4">
											Last updated: {column.updatedDate}
										</div>
									</>
								)}
								{column.percentage && (
									<>
										<span className="text-seafoam-700 block text-2xl leading-none font-bold sm:text-3xl">
											{column.percentage}
										</span>
										<div className="text-muted-foreground mt-2 text-xs sm:mt-4">
											Active Employees
										</div>
									</>
								)}
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}

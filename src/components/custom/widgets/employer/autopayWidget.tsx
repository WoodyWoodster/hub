import { cn } from '@/lib/utils';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import React from 'react';
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
		<Card className={cn('flex w-full flex-col', className)} {...props}>
			<CardHeader className="flex-row items-center justify-between">
				<CardTitle>{title}</CardTitle>
				<Button className='flex items-center' variant="link" size="link">
					<span className='block text-xs leading-none'>View Details</span>
				</Button>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-3 gap-4">
					{Object.entries(autopayColumns).map(([key, column]) => (
						<div key={key} className="flex flex-col gap-1">
							<span className="text-sm font-semibold text-muted-foreground">
								{column.title}
							</span>
							<div>
								{column.amount && (
                                    <>
                                        <span className="text-3xl font-bold leading-none block text-seafoam-700">
                                            {column.amount}
                                        </span>
										<div className="mt-4 text-xs text-muted-foreground">
											Last updated: {column.updatedDate}
										</div>
									</>
								)}
								{column.percentage && (
									<>
                                        <span className="text-3xl font-bold leading-none block text-seafoam-700">
                                            {column.percentage}
                                        </span>
                                        <div className="mt-4 text-xs text-muted-foreground">
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

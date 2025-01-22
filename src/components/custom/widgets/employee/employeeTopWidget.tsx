import { cn } from '@/lib/utils';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import React from 'react';

type AmountData = {
	type: string;
	amount: string;
	frequency?: string;
};

type WidgetData = {
	icon?: React.ComponentType<{ className?: string }>;
	description: string;
};

type Widget = {
	title: string;
	amount: AmountData[];
	data: WidgetData[];
};

type CardProps = React.ComponentProps<typeof Card> & Widget;

export function EmployeeTopWidget({
	className,
	title,
	amount,
	data,
	...props
}: CardProps) {
	return (
		<Card className={cn('flex w-full flex-col', className)} {...props}>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="text-3xl font-bold leading-none">
					{amount.map((amount) => (
						<span
							className={
								amount.type == 'negative'
									? 'text-critical-600'
									: amount.type == 'positive'
										? 'text-success-600'
										: 'text-onyx-700'
							}
							key={amount.amount}
						>
							{amount.amount}
							{amount.frequency == 'Monthly' && (
								<span className="ml-1 inline-block text-xs text-muted-foreground">
									/ month
								</span>
							)}
						</span>
					))}
				</div>
			</CardContent>
			<CardFooter className="mt-auto">
				<div className="text-sm text-muted-foreground">
					{data.map((data) => (
						<div className="flex items-center gap-2" key={data.description}>
							{data.icon ? <data.icon className="size-4" /> : null}
							<span className="block">{data.description}</span>
						</div>
					))}
				</div>
			</CardFooter>
		</Card>
	);
}

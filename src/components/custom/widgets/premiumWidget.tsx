import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';

type Premium = {
	planType: string;
	planTitle: string;
	monthlyCost: string;
};

type Widget = {
	title: string;
	premiums: Premium[];
};

type CardProps = React.ComponentProps<typeof Card> & Widget;

export function PremiumWidget({ className, premiums, ...props }: CardProps) {
	return (
		<Card className={cn('flex w-full flex-col', className)} {...props}>
			<CardHeader>
				<CardTitle>Recent Premiums</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="text-3xl font-bold leading-none">
					{premiums.map((premium) => (
						<div key={premium.planTitle}>
							<span>{premium.planTitle}</span>
							<span>{premium.monthlyCost}</span>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}

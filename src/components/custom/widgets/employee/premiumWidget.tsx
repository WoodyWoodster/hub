import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { BriefcaseMedical, HeartPulse, Eye, PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Premium = {
	isPrimaryInsurance: boolean;
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
				<CardTitle>2025 Premiums</CardTitle>
			</CardHeader>
			<CardContent>
					{premiums.map((premium) => (
						<React.Fragment key={premium.planTitle}>
							<Separator />
							<div
								key={premium.planTitle}
								className="flex items-start my-3"
							>
								<div
									className={cn(
										'flex items-center gap-2 p-2 bg-sienna-200 rounded-full mr-3',
										premium.isPrimaryInsurance
											? 'bg-seafoam-200'
											: 'bg-sienna-200',
									)}
								>
								{premium.planType === 'Health' && (
									<BriefcaseMedical className="size-6" />
								)}
								{premium.planType === 'Dental' && (
									<HeartPulse className="size-6" />
								)}
								{premium.planType === 'Vision' && (
									<Eye className="size-6" />
								)}
							</div>
							<div>
								<span className="block text-lg font-medium leading-6">
									{premium.planTitle}
								</span>
								<span className="block mt-0.5 text-xs text-muted-foreground">
									{premium.planType}
								</span>
								<div className="mt-1">
									<span className="inline-block text-xl font-bold text-seafoam-700">
										{premium.monthlyCost}
									</span>
									<span className="ml-1 inline-block text-sm font-medium text-seafoam-700">
										/mo
									</span>
								</div>
							</div>
						</div>
                        </React.Fragment>
					))}
                    <Button className="w-full mt-4">
                        <PlusIcon className="size-4" />
                        Add Additional Premium
                    </Button>
			</CardContent>
		</Card>
	);
}

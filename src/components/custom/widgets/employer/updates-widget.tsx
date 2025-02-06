import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import type React from 'react';

type Update = {
	id: number;
	employeeName: string;
	date: string;
	status: string;
};

type UpdatesWidgetProps = {
	title: string;
	updates: Update[];
};

type CardProps = React.ComponentProps<typeof Card> & UpdatesWidgetProps;

export function UpdatesWidget({
	className,
	title,
	updates,
	...props
}: CardProps) {
	return (
		<Card className={cn('w-full', className)} {...props}>
			<CardHeader>
				<CardTitle className="text-lg sm:text-xl">{title}</CardTitle>
			</CardHeader>
			<CardContent className="px-0 sm:px-6">
				<div className="overflow-x-auto">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[40%] sm:w-auto">Employee</TableHead>
								<TableHead className="w-[30%] sm:w-auto">Updated on</TableHead>
								<TableHead className="w-[30%] text-right sm:w-auto">
									Status
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{updates.map((update) => (
								<TableRow key={update.id}>
									<TableCell className="font-medium">
										{update.employeeName}
									</TableCell>
									<TableCell className="text-sm">
										{new Date(update.date).toLocaleDateString()}
									</TableCell>
									<TableCell className="text-right">
										<Badge
											variant={
												update.status === 'Terminated'
													? 'destructive'
													: update.status === 'Shopping'
														? 'successful'
														: 'pending'
											}
										>
											{update.status}
										</Badge>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</CardContent>
		</Card>
	);
}

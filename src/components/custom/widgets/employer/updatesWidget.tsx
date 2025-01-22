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
import React from 'react';

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
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Employee</TableHead>
							<TableHead>Updated on</TableHead>
							<TableHead className="text-right">Status</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{updates.map((update) => (
							<TableRow key={update.id}>
								<TableCell>{update.employeeName}</TableCell>
								<TableCell>
									{new Date(update.date).toLocaleDateString()}
								</TableCell>
								<TableCell className="text-right">
									<Badge
										variant={
											update.status === 'terminated'
												? 'destructive'
												: update.status === 'shopping'
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
			</CardContent>
		</Card>
	);
}

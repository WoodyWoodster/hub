import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type Transactions = {
	id: number;
	date: string;
	type: string;
	amount: string;
	status: string;
};

type Widget = {
	title: string;
	transactions: Transactions[];
};

type CardProps = React.ComponentProps<typeof Card> & Widget;

export function TransactionsWidget({ className, transactions, ...props }: CardProps) {
	return (
		<Card className={cn('flex w-full flex-col', className)} {...props}>
			<CardHeader>
				<CardTitle>Recent Transactions</CardTitle>
			</CardHeader>
			<CardContent>
                <div className='flex flex-col gap-4'>
                    <Table>
                        <TableHeader>
                            <TableRow>
							<TableHead>Date</TableHead>
							<TableHead>Amount</TableHead>
							<TableHead>Type</TableHead>
							<TableHead>Status</TableHead>
						</TableRow>
					    </TableHeader>  
                        <TableBody>
                            {transactions.map((transaction) => (
                                <TableRow key={transaction.id}>
                                    <TableCell>{transaction.date}</TableCell>
                                    <TableCell>{transaction.amount}</TableCell>
                                    <TableCell>{transaction.type}</TableCell>
                                    <TableCell>
                                        <Badge variant={transaction.status === 'Rejected' ? 'destructive' : transaction.status === 'Reimbursed' ? 'successful' : 'pending'}>
                                            {transaction.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className='flex justify-between gap-4'>
                        <Button variant='outline' className='mt-4 w-full'>View All History</Button>
                        <Button className='mt-4 w-full'>Submit Medical Expense</Button>
                    </div>
                </div>
			</CardContent>
		</Card>
	);
}

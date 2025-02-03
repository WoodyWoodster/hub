'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	type ColumnDef,
	type ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type SortingState,
	useReactTable,
	type VisibilityState,
} from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal, Download, Filter } from 'lucide-react';
import { useState } from 'react';
import { AddPersonButton } from '../../buttons/people/add-person-button';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { useQuery } from '@tanstack/react-query';
import { getPeopleForCompany } from '@/lib/queries/roles/queries';
import { useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '../../badge';

interface Columns {
	id: string;
	fullName: string;
	email: string;
	role: string | null;
	dateOfBirth: string;
}

export const columns: ColumnDef<Columns>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && 'indeterminate')
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
				className="translate-y-[2px]"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
				className="translate-y-[2px]"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'fullName',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					className="hover:bg-transparent"
				>
					Employee
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => (
			<div className="flex items-center gap-3">
				<Avatar className="h-8 w-8">
					<AvatarImage src={`https://avatar.vercel.sh/${row.original.email}`} />
					<AvatarFallback>{row.getValue('fullName')}</AvatarFallback>
				</Avatar>
				<div className="flex flex-col">
					<span className="font-medium">{row.getValue('fullName')}</span>
					<span className="text-muted-foreground text-sm">
						{row.original.email}
					</span>
				</div>
			</div>
		),
	},
	{
		accessorKey: 'role',
		header: 'Role',
		cell: ({ row }) => <div>{row.getValue('role')}</div>,
	},
	{
		accessorKey: 'dateOfBirth',
		header: 'Date of Birth',
		cell: ({ row }) => <div>{row.getValue('dateOfBirth')}</div>,
	},
	{
		accessorKey: 'hireDate',
		header: 'Hire Date',
		cell: ({ row }) => <div>{row.getValue('hireDate')}</div>,
	},
	{
		id: 'actions',
		enableHiding: false,
		cell: ({ row }) => {
			const person = row.original;

			return (
				<div className="flex items-center justify-between">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="h-8 w-8 p-0">
								<span className="sr-only">Open menu</span>
								<MoreHorizontal className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Actions</DropdownMenuLabel>
							<DropdownMenuItem
								onClick={() =>
									navigator.clipboard.writeText(person.id.toString())
								}
							>
								Copy person ID
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>View details</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			);
		},
	},
];

export const PeopleTable = () => {
	const { data: session } = useSession();
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState({});
	const { data: people } = useQuery({
		queryKey: ['people'],
		queryFn: () => getPeopleForCompany(session?.user?.companyId as string),
		enabled: !!session?.user?.companyId,
	});

	const table = useReactTable({
		data: people ?? [],
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	return (
		<div className="w-full space-y-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<h2 className="text-lg font-semibold">People</h2>
					<Badge variant="purple" className="rounded-full">
						{people?.length ?? 0} People
					</Badge>
				</div>
				<div className="flex items-center space-x-2">
					<Input
						placeholder="Search..."
						value={
							(table.getColumn('fullName')?.getFilterValue() as string) ?? ''
						}
						onChange={(event) =>
							table.getColumn('fullName')?.setFilterValue(event.target.value)
						}
						className="max-w-sm bg-white"
					/>
					<AddPersonButton />
					<Button variant="outline" size="sm">
						<Download className="mr-2 h-4 w-4" />
						Export
					</Button>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" size="sm" className="ml-auto">
								<Filter className="mr-2 h-4 w-4" />
								Columns
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							{table
								.getAllColumns()
								.filter((column) => column.getCanHide())
								.map((column) => {
									return (
										<DropdownMenuCheckboxItem
											key={column.id}
											className="capitalize"
											checked={column.getIsVisible()}
											onCheckedChange={(value) =>
												column.toggleVisibility(!!value)
											}
										>
											{column.id}
										</DropdownMenuCheckboxItem>
									);
								})}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
			<div className="rounded-lg border bg-white shadow-sm">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id} className="hover:bg-transparent">
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id} className="bg-gray-50/50">
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
									className="hover:bg-gray-50/50"
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell
											key={cell.id}
											className="border border-gray-200 p-2"
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2 py-4">
				<div className="text-muted-foreground flex-1 text-sm">
					{table.getFilteredSelectedRowModel().rows.length} of{' '}
					{table.getFilteredRowModel().rows.length} row(s) selected.
				</div>
				<div className="space-x-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Previous
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
};

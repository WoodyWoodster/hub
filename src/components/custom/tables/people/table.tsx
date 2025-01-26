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
	ColumnDef,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
	VisibilityState,
} from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react';
import { FC, useState } from 'react';
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

interface Person {
	id: number;
	fullName: string;
	email: string;
	role: string | null;
	dateOfBirth: string;
}

interface PeopleTableProps {
	people: Person[];
}

export const columns: ColumnDef<Person>[] = [
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
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'fullName',
		header: 'Full Name',
		cell: ({ row }) => <div>{row.getValue('fullName')}</div>,
	},
	{
		accessorKey: 'email',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Email
					<ArrowUpDown />
				</Button>
			);
		},
		cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
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
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal />
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
			);
		},
	},
];

export const PeopleTable: FC<PeopleTableProps> = ({ people }) => {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState({});

	const table = useReactTable({
		data: people,
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
		<>
			<h1 className="font-display mb-6 text-3xl font-semibold">People</h1>
			<div className="w-full">
				<div className="flex items-center py-4">
					<Input
						placeholder="Search..."
						value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
						onChange={(event) =>
							table.getColumn('email')?.setFilterValue(event.target.value)
						}
						className="max-w-sm bg-white"
					/>
					<AddPersonButton />
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="secondary" className="ml-auto">
								Columns <ChevronDown />
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
				<div className="rounded-md border">
					<Table className="w-full bg-white">
						<TableHeader>
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map((header) => {
										return (
											<TableHead key={header.id}>
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
									>
										{row.getVisibleCells().map((cell) => (
											<TableCell key={cell.id}>
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
		</>
	);
};

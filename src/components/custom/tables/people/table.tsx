'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
	DropdownMenu,
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
import {
	MoreHorizontal,
	Filter,
	ChevronDown,
	Download,
	ArrowUpDown,
} from 'lucide-react';
import { useState } from 'react';
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
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/custom/badge';
import { AddPersonButton } from '@/components/custom/buttons/people/add-person-button';

interface Columns {
	id: string;
	fullName: string;
	email: string;
	role: string | null;
	dateOfBirth: string;
	hireDate: string | null;
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
		header: ({ column }) => {
			return (
				<div
					className="flex items-center space-x-2"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					<span>Employee</span>
					<Button variant="ghost" className="h-8 w-8 p-0">
						<span className="sr-only">Sort</span>
						<ArrowUpDown className="h-4 w-4" />
					</Button>
				</div>
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
		accessorKey: 'status',
		header: 'Status',
		cell: () => <Badge variant="purple">{'Status Example'}</Badge>,
	},
	{
		accessorKey: 'role',
		header: 'Role',
	},
	{
		accessorKey: 'dateOfBirth',
		header: 'Date of Birth',
	},
	{
		accessorKey: 'hireDate',
		header: 'Hire Date',
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
	const [isSearchFocused, setIsSearchFocused] = useState(false);
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
			<div>
				<h2 className="text-2xl font-semibold">People</h2>
				<p className="text-muted-foreground py-2 text-sm">
					Here you can manage your team members. You can adjust their roles,
					classes and more.
				</p>
			</div>
			<Card className="w-full">
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
					<div className="flex items-center space-x-2">
						<h3 className="text-lg font-semibold">Roster</h3>
						<Badge
							variant="secondary"
							className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50"
						>
							{people?.length ?? 0} Users
						</Badge>
					</div>
					<div className="flex items-center space-x-2"></div>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center space-x-2">
								<Input
									placeholder="Search..."
									value={
										(table.getColumn('fullName')?.getFilterValue() as string) ??
										''
									}
									onChange={(event) =>
										table
											.getColumn('fullName')
											?.setFilterValue(event.target.value)
									}
									onFocus={() => setIsSearchFocused(true)}
									onBlur={() => setIsSearchFocused(false)}
									className={`bg-white transition-all duration-150 ease-in-out ${isSearchFocused ? 'w-[325px]' : 'w-[250px]'}`}
								/>
								<Button
									variant="secondary"
									size="sm"
									className="hover:bg-primary h-9 hover:text-white"
								>
									Active
								</Button>
								<Button
									variant="secondary"
									size="sm"
									className="hover:bg-primary h-9 hover:text-white"
								>
									Archive
								</Button>
							</div>
							<div className="flex items-center space-x-2">
								<AddPersonButton />
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="outline">
											All Statuses <ChevronDown className="ml-2 h-4 w-4" />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										{/* Status options */}
									</DropdownMenuContent>
								</DropdownMenu>
								<Button variant="outline">
									<Filter className="mr-2 h-4 w-4" /> Filter
								</Button>
								<Button variant="outline" size="sm">
									<Download className="mr-2 h-4 w-4" />
									Download
								</Button>
							</div>
						</div>
						<div className="rounded-lg border bg-white shadow-sm">
							<Table>
								<TableHeader>
									{table.getHeaderGroups().map((headerGroup) => (
										<TableRow
											key={headerGroup.id}
											className="hover:bg-transparent"
										>
											{headerGroup.headers.map((header) => {
												return (
													<TableHead
														key={header.id}
														className="border-grey-200 border bg-gray-50/50 px-4 py-3 text-left text-sm font-medium text-gray-500"
													>
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
						<div className="flex flex-col items-center justify-between gap-4 p-4 sm:flex-row">
							<div className="flex items-center space-x-2">
								<span className="text-muted-foreground text-sm">Show</span>
								<select
									className="border-input bg-background ring-offset-background h-8 rounded-md border px-3 py-1 text-sm"
									value={table.getState().pagination.pageSize}
									onChange={(e) => {
										table.setPageSize(Number(e.target.value));
									}}
								>
									{[10, 20, 30, 40, 50].map((pageSize) => (
										<option key={pageSize} value={pageSize}>
											{pageSize}
										</option>
									))}
								</select>
								<span className="text-muted-foreground text-sm">Items</span>
							</div>
							<div className="flex items-center space-x-2">
								<Button
									variant="outline"
									size="sm"
									onClick={() => table.previousPage()}
									disabled={!table.getCanPreviousPage()}
								>
									Previous
								</Button>
								<span className="text-sm">
									Page {table.getState().pagination.pageIndex + 1} of{' '}
									{table.getPageCount()}
								</span>
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
				</CardContent>
			</Card>
		</div>
	);
};

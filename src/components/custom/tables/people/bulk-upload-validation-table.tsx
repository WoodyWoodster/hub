'use client';

import { useState, useRef, useCallback, useMemo } from 'react';
import {
	useReactTable,
	getCoreRowModel,
	getSortedRowModel,
	type SortingState,
	flexRender,
	createColumnHelper,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { type Roster, RosterSchema } from '@/lib/schemas/roster/schema';
import { useQuery } from '@tanstack/react-query';
import { getExternalRoles } from '@/lib/queries/roles/queries';

interface RowData {
	data: Partial<Roster>;
	errors: Record<string, string> | null;
}

export default function BulkUploadValidationTable({
	data,
	onDataChange,
}: {
	data: RowData[];
	onDataChange: (newData: RowData[]) => void;
}) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [editingCell, setEditingCell] = useState<{
		rowIndex: number;
		columnId: string;
	} | null>(null);
	const [editValue, setEditValue] = useState<string>('');
	const [selectedError, setSelectedError] = useState<string | null>(null);

	const { data: roles } = useQuery({
		queryKey: ['roles'],
		queryFn: () => getExternalRoles(),
	});

	const columnHelper = createColumnHelper<RowData>();

	const columns = useMemo(
		() => [
			columnHelper.accessor((row) => row.data['First Name'], {
				id: 'First Name',
				header: 'First Name',
				size: 120,
			}),
			columnHelper.accessor((row) => row.data['Middle Name'], {
				id: 'Middle Name',
				header: 'Middle Name',
				size: 120,
			}),
			columnHelper.accessor((row) => row.data['Last Name'], {
				id: 'Last Name',
				header: 'Last Name',
				size: 120,
			}),
			columnHelper.accessor((row) => row.data['Preferred Name'], {
				id: 'Preferred Name',
				header: 'Preferred Name',
				size: 120,
			}),
			columnHelper.accessor((row) => row.data['Email'], {
				id: 'Email',
				header: 'Email',
				size: 250,
			}),
			columnHelper.accessor((row) => row.data['Phone Number'], {
				id: 'Phone Number',
				header: 'Phone Number',
				size: 150,
			}),
			columnHelper.accessor((row) => row.data['Employee Number'], {
				id: 'Employee Number',
				header: 'Employee Number',
				size: 150,
			}),
			columnHelper.accessor((row) => row.data['Role'], {
				id: 'Role',
				header: 'Role',
				size: 200,
			}),
			columnHelper.accessor((row) => row.data['Address'], {
				id: 'Address',
				header: 'Address',
				size: 200,
			}),
			columnHelper.accessor((row) => row.data['Address 2'], {
				id: 'Address 2',
				header: 'Address 2',
				size: 150,
			}),
			columnHelper.accessor((row) => row.data['City'], {
				id: 'City',
				header: 'City',
				size: 150,
			}),
			columnHelper.accessor((row) => row.data['Zip Code'], {
				id: 'Zip Code',
				header: 'Zip Code',
				size: 120,
			}),
			columnHelper.accessor((row) => row.data['County'], {
				id: 'County',
				header: 'County',
				size: 150,
			}),
			columnHelper.accessor((row) => row.data['State'], {
				id: 'State',
				header: 'State',
				size: 100,
			}),
			columnHelper.accessor((row) => row.data['Employment Type'], {
				id: 'Employment Type',
				header: 'Employment Type',
				size: 150,
			}),
			columnHelper.accessor((row) => row.data['Hire Date'], {
				id: 'Hire Date',
				header: 'Hire Date',
				size: 120,
			}),
			columnHelper.accessor((row) => row.data['DOB'], {
				id: 'DOB',
				header: 'DOB',
				size: 120,
			}),
		],
		[columnHelper],
	);

	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	});

	const { rows } = table.getRowModel();

	const parentRef = useRef<HTMLDivElement>(null);

	const rowVirtualizer = useVirtualizer({
		count: rows.length,
		getScrollElement: () => parentRef.current,
		estimateSize: useCallback(() => 48, []),
		overscan: 5,
	});

	const handleCellClick = useCallback(
		(rowIndex: number, columnId: string) => {
			const row = data[rowIndex];
			if (row?.errors?.[columnId as keyof Roster]) {
				setSelectedError(
					`${columnId}: ${row.errors[columnId as keyof Roster]}`,
				);
			} else {
				setSelectedError(null);
			}
		},
		[data],
	);

	const handleCellDoubleClick = useCallback(
		(rowIndex: number, columnId: string) => {
			setEditingCell({ rowIndex, columnId });
			setEditValue(
				(data[rowIndex]?.data[columnId as keyof Roster] as string) || '',
			);
		},
		[data],
	);

	const finishEditing = useCallback(
		(rowIndex: number, columnId: string, value: string) => {
			const newData = [...data];
			if (!newData[rowIndex]) return;

			newData[rowIndex] = {
				...newData[rowIndex],
				data: {
					...newData[rowIndex].data,
					[columnId]: value,
				},
			};

			const validationResult = RosterSchema.safeParse(newData[rowIndex].data);
			if (validationResult.success) {
				newData[rowIndex].errors = null;
			} else {
				const errors: Record<string, string> = {};
				validationResult.error.issues.forEach((issue) => {
					errors[issue.path[0]] = issue.message;
				});
				newData[rowIndex].errors = errors;
			}

			onDataChange(newData);
			setEditingCell(null);
			setSelectedError(null);
		},
		[data, onDataChange],
	);

	return (
		<div className="rounded-lg border border-gray-200 bg-white shadow-sm">
			{selectedError && (
				<div className="mb-4 rounded-md bg-red-50 p-4">
					<div className="flex">
						<div className="flex-shrink-0">
							<span className="text-red-400">!</span>
						</div>
						<div className="ml-3">
							<h3 className="text-sm font-medium text-red-800">
								Validation Error
							</h3>
							<div className="mt-2 text-sm text-red-700">{selectedError}</div>
						</div>
					</div>
				</div>
			)}
			<div className="overflow-hidden">
				<div className="overflow-x-auto">
					<Table className="w-full border-collapse">
						<TableHeader className="sticky top-0 z-10 bg-gray-50">
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow
									key={headerGroup.id}
									className="border-b border-gray-200"
								>
									{headerGroup.headers.map((header) => (
										<TableHead
											key={header.id}
											style={{
												width: header.getSize(),
												minWidth: header.getSize(),
											}}
											className="border-r border-gray-200 bg-gray-50 px-4 py-3 text-left text-sm font-medium text-gray-500 first:border-l"
										>
											<div
												className="flex items-center gap-2"
												onClick={header.column.getToggleSortingHandler()}
											>
												{flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
												{header.column.getIsSorted() && (
													<span className="text-gray-400">
														{header.column.getIsSorted() === 'asc' ? (
															<ChevronUp className="h-4 w-4" />
														) : (
															<ChevronDown className="h-4 w-4" />
														)}
													</span>
												)}
											</div>
										</TableHead>
									))}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							<TableRow className="relative">
								<TableCell colSpan={columns.length} className="p-0">
									<div
										ref={parentRef}
										className="max-h-[600px] overflow-y-auto"
									>
										<div
											style={{
												height: `${rowVirtualizer.getTotalSize()}px`,
												width: '100%',
												position: 'relative',
											}}
										>
											{rowVirtualizer.getVirtualItems().map((virtualRow) => {
												const row = rows[virtualRow.index];
												return (
													<div
														key={row.id}
														className="absolute top-0 left-0 w-full border-b border-gray-200"
														style={{
															height: `${virtualRow.size}px`,
															transform: `translateY(${virtualRow.start}px)`,
														}}
													>
														<div className="flex h-full">
															{row.getVisibleCells().map((cell) => (
																<div
																	key={cell.id}
																	style={{
																		width: cell.column.getSize(),
																		minWidth: cell.column.getSize(),
																	}}
																	className={`flex items-center border-r border-gray-200 px-4 py-2 text-sm first:border-l ${
																		row.original.errors?.[
																			cell.column.id as keyof Roster
																		]
																			? 'bg-red-50'
																			: 'bg-white hover:bg-gray-50/50'
																	}`}
																	onClick={() =>
																		handleCellClick(row.index, cell.column.id)
																	}
																	onDoubleClick={() =>
																		handleCellDoubleClick(
																			row.index,
																			cell.column.id,
																		)
																	}
																>
																	{editingCell?.rowIndex === row.index &&
																	editingCell?.columnId === cell.column.id ? (
																		cell.column.id === 'Role' ? (
																			<Select
																				value={editValue}
																				onValueChange={(value) => {
																					finishEditing(
																						row.index,
																						cell.column.id,
																						value,
																					);
																				}}
																			>
																				<SelectTrigger className="w-full">
																					<SelectValue placeholder="Select a role" />
																				</SelectTrigger>
																				<SelectContent>
																					{roles?.map((role) => (
																						<SelectItem
																							key={role.id}
																							value={role.name}
																						>
																							{role.name}
																						</SelectItem>
																					))}
																				</SelectContent>
																			</Select>
																		) : (
																			<Input
																				value={editValue}
																				onChange={(e) =>
																					setEditValue(e.target.value)
																				}
																				onBlur={() =>
																					finishEditing(
																						row.index,
																						cell.column.id,
																						editValue,
																					)
																				}
																				onKeyDown={(e) => {
																					if (e.key === 'Enter') {
																						finishEditing(
																							row.index,
																							cell.column.id,
																							editValue,
																						);
																					} else if (e.key === 'Escape') {
																						setEditingCell(null);
																					}
																				}}
																				className="w-full"
																				autoFocus
																			/>
																		)
																	) : (
																		flexRender(
																			cell.column.columnDef.cell,
																			cell.getContext(),
																		)
																	)}
																</div>
															))}
														</div>
													</div>
												);
											})}
										</div>
									</div>
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</div>
			</div>
		</div>
	);
}

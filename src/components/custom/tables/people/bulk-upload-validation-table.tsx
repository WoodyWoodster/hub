'use client';

import { useState, useRef, useCallback } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { type Roster, RosterSchema } from '@/lib/schemas/roster/schema';
import { useVirtualizer } from '@tanstack/react-virtual';

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
	const columns: (keyof Roster)[] = [
		'First Name',
		'Middle Name',
		'Last Name',
		'Preferred Name',
		'Email',
		'Phone Number',
		'Employee Number',
		'Role',
		'Address',
		'Address 2',
		'City',
		'Zip Code',
		'County',
		'State',
		'Employment Type',
		'Hire Date',
		'DOB',
	];

	const [editingCell, setEditingCell] = useState<{
		rowIndex: number;
		column: keyof Roster;
	} | null>(null);
	const [editValue, setEditValue] = useState<string>('');
	const [selectedError, setSelectedError] = useState<string | null>(null);
	const [sortColumn, setSortColumn] = useState<keyof Roster | null>(null);
	const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

	const parentRef = useRef<HTMLDivElement>(null);

	const rowVirtualizer = useVirtualizer({
		count: data.length,
		getScrollElement: () => parentRef.current,
		estimateSize: useCallback(() => 48, []),
		overscan: 10,
		scrollPaddingStart: 48,
		scrollPaddingEnd: 0,
	});

	const handleSort = useCallback(
		(column: keyof Roster) => {
			setSortColumn((currentColumn) => {
				if (currentColumn === column) {
					setSortDirection((current) => (current === 'asc' ? 'desc' : 'asc'));
				} else {
					setSortDirection('asc');
				}
				return column;
			});

			const sortedData = [...data].sort((a, b) => {
				const aValue = a.data[column];
				const bValue = b.data[column];

				if (!aValue && !bValue) return 0;
				if (!aValue) return 1;
				if (!bValue) return -1;

				const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
				return sortDirection === 'asc' ? comparison : -comparison;
			});

			onDataChange(sortedData);
		},
		[data, onDataChange, sortDirection],
	);

	const handleCellClick = useCallback(
		(rowIndex: number, column: keyof Roster) => {
			const row = data[rowIndex];
			if (row?.errors?.[column]) {
				setSelectedError(`${column}: ${row.errors[column]}`);
			} else {
				setSelectedError(null);
			}
		},
		[data],
	);

	const handleCellDoubleClick = useCallback(
		(rowIndex: number, column: keyof Roster) => {
			setEditingCell({ rowIndex, column });
			setEditValue((data[rowIndex]?.data[column] as string) || '');
		},
		[data],
	);

	const finishEditing = useCallback(
		(rowIndex: number, column: keyof Roster, value: string) => {
			const newData = [...data];
			if (!newData[rowIndex]) return;

			newData[rowIndex] = {
				...newData[rowIndex],
				data: {
					...newData[rowIndex].data,
					[column]: value,
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
		<div className="rounded-lg border border-gray-200 bg-white shadow">
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
			<div className="relative rounded border">
				<div className="overflow-x-auto">
					<Table>
						<TableHeader className="sticky top-0 z-10 bg-gray-50">
							<TableRow>
								{columns.map((column) => (
									<TableHead
										key={column}
										onClick={() => handleSort(column)}
										className="group cursor-pointer px-6 py-4 text-sm font-medium text-gray-500 first:pl-4 last:pr-4"
									>
										<div className="flex items-center gap-2">
											<span>{column}</span>
											{sortColumn === column && (
												<span className="text-gray-400">
													{sortDirection === 'asc' ? (
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
						</TableHeader>
						<TableBody>
							<TableRow>
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
												const row = data[virtualRow.index];
												if (!row) return null;

												return (
													<div
														key={virtualRow.index}
														className="absolute w-full border-b"
														style={{
															height: `${virtualRow.size}px`,
															transform: `translateY(${virtualRow.start}px)`,
														}}
													>
														<div className="flex h-full">
															{columns.map((column) => (
																<div
																	key={column}
																	className={`flex-1 px-6 py-4 text-sm text-gray-900 first:pl-4 last:pr-4 ${
																		row.errors?.[column] ? 'bg-red-50' : ''
																	}`}
																	onClick={() =>
																		handleCellClick(virtualRow.index, column)
																	}
																	onDoubleClick={() =>
																		handleCellDoubleClick(
																			virtualRow.index,
																			column,
																		)
																	}
																>
																	{editingCell?.rowIndex === virtualRow.index &&
																	editingCell?.column === column ? (
																		<Input
																			value={editValue}
																			onChange={(e) =>
																				setEditValue(e.target.value)
																			}
																			onBlur={() =>
																				finishEditing(
																					virtualRow.index,
																					column,
																					editValue,
																				)
																			}
																			onKeyDown={(e) => {
																				if (e.key === 'Enter') {
																					finishEditing(
																						virtualRow.index,
																						column,
																						editValue,
																					);
																				} else if (e.key === 'Escape') {
																					setEditingCell(null);
																				}
																			}}
																			className="focus:border-primary focus:ring-primary w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
																			autoFocus
																		/>
																	) : (
																		<span className="block truncate">
																			{row.data[column] as string}
																		</span>
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

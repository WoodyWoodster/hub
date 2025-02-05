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
	const columnConfig = [
		{ key: 'First Name' as keyof Roster, width: '120px' },
		{ key: 'Middle Name' as keyof Roster, width: '120px' },
		{ key: 'Last Name' as keyof Roster, width: '120px' },
		{ key: 'Preferred Name' as keyof Roster, width: '120px' },
		{ key: 'Email' as keyof Roster, width: '250px' },
		{ key: 'Phone Number' as keyof Roster, width: '150px' },
		{ key: 'Employee Number' as keyof Roster, width: '150px' },
		{ key: 'Role' as keyof Roster, width: '200px' },
		{ key: 'Address' as keyof Roster, width: '200px' },
		{ key: 'Address 2' as keyof Roster, width: '150px' },
		{ key: 'City' as keyof Roster, width: '150px' },
		{ key: 'Zip Code' as keyof Roster, width: '120px' },
		{ key: 'County' as keyof Roster, width: '150px' },
		{ key: 'State' as keyof Roster, width: '100px' },
		{ key: 'Employment Type' as keyof Roster, width: '150px' },
		{ key: 'Hire Date' as keyof Roster, width: '120px' },
		{ key: 'DOB' as keyof Roster, width: '120px' },
	];

	const columns = columnConfig.map((config) => config.key);

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
		overscan: 5,
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
		<div className="rounded-lg border border-gray-200 bg-white shadow-sm">
			{selectedError && (
				<div className="mb-4 rounded-md bg-red-50 p-4">
					<div className="flex">
						<div className="flex-shrink-0">
							<span className="text-red-400">!</span>
						</div>
						<div className="ml-3">
							<h3 className="text-sm font-medium text-red-800">
								{selectedError}
							</h3>
						</div>
					</div>
				</div>
			)}
			<div className="overflow-hidden">
				<div className="overflow-x-auto">
					<Table className="w-full border-collapse">
						<TableHeader className="sticky top-0 z-10 bg-gray-50">
							<TableRow className="border-b border-gray-200">
								{columnConfig.map(({ key, width }) => (
									<TableHead
										key={key}
										onClick={() => handleSort(key)}
										style={{ width, minWidth: width }}
										className="border-r border-gray-200 bg-gray-50 px-4 py-3 text-left text-sm font-medium text-gray-500 first:border-l"
									>
										<div className="flex items-center gap-2">
											<span>{key}</span>
											{sortColumn === key && (
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
												const row = data[virtualRow.index];
												if (!row) return null;

												return (
													<div
														key={virtualRow.index}
														className="absolute top-0 left-0 w-full border-b border-gray-200"
														style={{
															height: `${virtualRow.size}px`,
															transform: `translateY(${virtualRow.start}px)`,
														}}
													>
														<div className="flex h-full">
															{columnConfig.map(({ key, width }) => (
																<div
																	key={key}
																	style={{ width, minWidth: width }}
																	className={`flex items-center border-r border-gray-200 px-4 py-2 text-sm first:border-l ${
																		row.errors?.[key]
																			? 'bg-red-50'
																			: 'bg-white hover:bg-gray-50/50'
																	}`}
																	onClick={() =>
																		handleCellClick(virtualRow.index, key)
																	}
																	onDoubleClick={() =>
																		handleCellDoubleClick(virtualRow.index, key)
																	}
																>
																	{editingCell?.rowIndex === virtualRow.index &&
																	editingCell?.column === key ? (
																		<Input
																			value={editValue}
																			onChange={(e) =>
																				setEditValue(e.target.value)
																			}
																			onBlur={() =>
																				finishEditing(
																					virtualRow.index,
																					key,
																					editValue,
																				)
																			}
																			onKeyDown={(e) => {
																				if (e.key === 'Enter') {
																					finishEditing(
																						virtualRow.index,
																						key,
																						editValue,
																					);
																				} else if (e.key === 'Escape') {
																					setEditingCell(null);
																				}
																			}}
																			className="w-full"
																			autoFocus
																		/>
																	) : (
																		<span className="block truncate">
																			{row.data[key] as string}
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

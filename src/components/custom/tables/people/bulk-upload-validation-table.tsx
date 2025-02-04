/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useRef, type KeyboardEvent } from 'react';
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
import { Roster, RosterSchema } from '@/lib/schemas/roster/schema';

export default function BulkUploadValidationTable({
	data,
	onDataChange,
}: {
	data: any[];
	onDataChange: (newData: any[]) => void;
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
		column: string;
	} | null>(null);
	const [editValue, setEditValue] = useState<string>('');
	const [selectedError, setSelectedError] = useState<string | null>(null);
	const [sortColumn, setSortColumn] = useState<string | null>(null);
	const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
	const inputRef = useRef<HTMLInputElement>(null);

	const handleSort = (column: keyof Roster) => {
		if (sortColumn === column) {
			setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
		} else {
			setSortColumn(column);
			setSortDirection('asc');
		}

		const sortedData = [...data].sort((a, b) => {
			if (a.data[column] < b.data[column])
				return sortDirection === 'asc' ? -1 : 1;
			if (a.data[column] > b.data[column])
				return sortDirection === 'asc' ? 1 : -1;
			return 0;
		});

		onDataChange(sortedData);
	};

	const handleCellClick = (rowIndex: number, column: keyof Roster) => {
		if (data[rowIndex].errors && data[rowIndex].errors[column]) {
			setSelectedError(`${column}: ${data[rowIndex].errors[column]}`);
		} else {
			setSelectedError(null);
		}
	};

	const handleCellDoubleClick = (rowIndex: number, column: keyof Roster) => {
		setEditingCell({ rowIndex, column });
		setEditValue((data[rowIndex].data[column] as string) || '');
	};

	const handleCellChange = (value: string) => {
		setEditValue(value);
	};

	const finishEditing = (
		rowIndex: number,
		column: keyof Roster,
		value: string,
	) => {
		const newData = [...data];
		newData[rowIndex].data[column] = value;

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
	};

	const handleKeyDown = (
		e: KeyboardEvent<HTMLInputElement>,
		rowIndex: number,
		column: keyof Roster,
	) => {
		if (e.key === 'Enter') {
			finishEditing(rowIndex, column, editValue);
		} else if (e.key === 'Escape') {
			setEditingCell(null);
		}
	};

	return (
		<div className="overflow-x-auto">
			{selectedError && (
				<div className="mt-4 rounded border border-red-300 bg-red-100 p-2 text-red-700">
					Error: {selectedError}
				</div>
			)}
			<Table className="w-full border-collapse">
				<TableHeader>
					<TableRow className="bg-gray-100">
						{columns.map((column) => (
							<TableHead
								key={column}
								onClick={() => handleSort(column)}
								className="cursor-pointer border border-gray-300 p-2 text-left font-bold"
							>
								<div className="flex items-center justify-between">
									{column}
									{sortColumn === column &&
										(sortDirection === 'asc' ? (
											<ChevronUp className="h-4 w-4" />
										) : (
											<ChevronDown className="h-4 w-4" />
										))}
								</div>
							</TableHead>
						))}
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.map((row, rowIndex) => (
						<TableRow key={rowIndex} className="hover:bg-gray-50">
							{columns.map((column) => (
								<TableCell
									key={column}
									className={`border border-gray-300 p-2 ${row.errors && row.errors[column] ? 'bg-red-100' : ''}`}
									onClick={() => handleCellClick(rowIndex, column)}
									onDoubleClick={() => handleCellDoubleClick(rowIndex, column)}
								>
									{editingCell?.rowIndex === rowIndex &&
									editingCell?.column === column ? (
										<Input
											ref={inputRef}
											value={editValue}
											onChange={(e) => handleCellChange(e.target.value)}
											onBlur={() => finishEditing(rowIndex, column, editValue)}
											onKeyDown={(e) => handleKeyDown(e, rowIndex, column)}
											className="w-full rounded border border-gray-400 p-1"
											autoFocus
										/>
									) : (
										<span className="block min-h-[1.5rem] w-full">
											{row.data[column] as string}
										</span>
									)}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}

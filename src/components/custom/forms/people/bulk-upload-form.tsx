/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import type React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import BulkUploadValidationTable from '../../tables/people/bulk-upload-validation-table';
import { submitPeople, uploadCSV } from '@/lib/actions/roster/actions';
import { Card } from '@/components/ui/card';

interface BulkUploadFormProps {
	onSuccess: () => void;
}

export const BulkUploadForm: React.FC<BulkUploadFormProps> = ({
	onSuccess,
}) => {
	const { register, handleSubmit } = useForm();
	const [validationResults, setValidationResults] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const { toast } = useToast();

	const onSubmit = async (data: any) => {
		setIsLoading(true);
		const formData = new FormData();
		formData.append('file', data.file[0]);

		try {
			const result = await uploadCSV(formData);
			setValidationResults(result.validationResults);
		} catch (error) {
			console.log('Error uploading CSV', error);
			toast({
				title: 'Error',
				description: 'Failed to upload and validate CSV',
				variant: 'destructive',
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleDataChange = (newData: any[]) => {
		setValidationResults(newData);
	};

	const handleDataSubmit = async () => {
		const validPeople = validationResults
			.filter((r) => !r.errors)
			.map((r) => r.data);
		const result = await submitPeople(validPeople);
		toast({
			title: 'Data Submitted Successfully',
			description: (
				<div>
					<p>Created: {result.created}</p>
					<p>Updated: {result.updated}</p>
				</div>
			),
			variant: 'success',
		});
		onSuccess();
	};

	const errorCount = validationResults.filter((r) => r.errors).length;

	return (
		<Card className="p-6">
			<form onSubmit={handleSubmit(onSubmit)} className="mb-4">
				<div className="flex flex-col">
					<Input type="file" accept=".csv" {...register('file')} />
					<Button
						type="submit"
						variant="outline"
						className="mt-2"
						disabled={isLoading}
					>
						{isLoading ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Processing
							</>
						) : (
							'Upload and Validate'
						)}
					</Button>
					{!errorCount && validationResults.length > 0 && (
						<Button onClick={handleDataSubmit} className="mt-4">
							Submit Valid Data
						</Button>
					)}
				</div>
			</form>

			{isLoading && (
				<div className="flex h-32 items-center justify-center">
					<Loader2 className="h-8 w-8 animate-spin" />
				</div>
			)}

			{errorCount > 0 && (
				<div className="mt-4 rounded bg-yellow-100 p-2 text-yellow-700">
					There {errorCount === 1 ? 'is' : 'are'} {errorCount} row
					{errorCount !== 1 ? 's' : ''} out of {validationResults.length} with
					errors. Click on highlighted cells to see specific errors.
				</div>
			)}
			{!isLoading && validationResults.length > 0 && (
				<div className="animate-fade-in">
					<BulkUploadValidationTable
						data={validationResults}
						onDataChange={handleDataChange}
					/>
				</div>
			)}
		</Card>
	);
};

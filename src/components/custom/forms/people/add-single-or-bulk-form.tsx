'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { AddPersonForm } from './add-person-form';
import { BulkUploadForm } from './bulk-upload-form';

interface AddPersonOrBulkFormProps {
	onSuccess: () => void;
}

export const AddPersonOrBulkForm: React.FC<AddPersonOrBulkFormProps> = ({
	onSuccess,
}) => {
	const [formType, setFormType] = React.useState<'single' | 'bulk' | null>(
		null,
	);

	if (formType === null) {
		return (
			<div className="space-y-6 p-6">
				<h3 className="text-lg font-medium">
					How would you like to add people?
				</h3>
				<RadioGroup
					onValueChange={(value) => setFormType(value as 'single' | 'bulk')}
				>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="single" id="single" />
						<Label htmlFor="single">Add a single person</Label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="bulk" id="bulk" />
						<Label htmlFor="bulk">Bulk upload (CSV)</Label>
					</div>
				</RadioGroup>
			</div>
		);
	}

	return formType === 'single' ? (
		<AddPersonForm onSuccess={onSuccess} />
	) : (
		<BulkUploadForm onSuccess={onSuccess} />
	);
};

'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer';
import { Plus } from 'lucide-react';
import { AddPersonOrBulkForm } from '../../forms/people/add-single-or-bulk-form';

export const AddPersonButton = () => {
	const [open, setOpen] = React.useState(false);

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button>
					<Plus className="mr-2 h-4 w-4" /> Add Person
				</Button>
			</DrawerTrigger>
			<DrawerContent className="flex h-[85vh] max-h-[85vh] flex-col">
				<DrawerHeader className="flex-shrink-0">
					<DrawerTitle>Add New Person(s)</DrawerTitle>
					<DrawerDescription>
						Choose how you&apos;d like to add people to HRA Hub.
					</DrawerDescription>
				</DrawerHeader>
				<div className="flex-grow overflow-y-auto px-4">
					<AddPersonOrBulkForm onSuccess={() => setOpen(false)} />
				</div>
				<DrawerFooter className="flex-shrink-0">
					<DrawerClose asChild>
						<Button variant="outline">Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};

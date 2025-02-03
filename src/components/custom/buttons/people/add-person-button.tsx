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
import { AddPersonForm } from '@/components/custom/forms/people/add-person-form';
import { Plus } from 'lucide-react';

export const AddPersonButton = () => {
	const [open, setOpen] = React.useState(false);

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button>
					<Plus className="mr-2 h-4 w-4" /> Add Person
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Add New Person</DrawerTitle>
					<DrawerDescription>
						Fill out the form to add a new person to HRA Hub.
					</DrawerDescription>
				</DrawerHeader>
				<AddPersonForm onSuccess={() => setOpen(false)} />
				<DrawerFooter>
					<DrawerClose asChild>
						<Button variant="outline">Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};

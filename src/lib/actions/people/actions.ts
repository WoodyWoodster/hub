'use server';

import { db } from '@/db';
import { addresses, people } from '@/db/schema';
import { addPersonSchema } from '@/lib/schemas/people/add-person-schema';
import { z } from 'zod';

export async function addPersonAction(_prevState: unknown, formData: FormData) {
	const defaultValues = z
		.record(z.string(), z.string())
		.parse(Object.fromEntries(formData.entries()));

	try {
		const data = addPersonSchema.parse(Object.fromEntries(formData));

		const [insertedPerson] = await db
			.insert(people)
			.values({
				fullName: data.fullName,
				email: data.email,
				dateOfBirth: new Date(data.dateOfBirth),
				hireDate: new Date(data.hireDate),
			})
			.returning({ id: people.id });

		if (!insertedPerson) {
			throw new Error('Failed to insert person');
		}

		const [insertedAddress] = await db
			.insert(addresses)
			.values({
				personId: insertedPerson.id,
				streetAddress: data.streetAddress,
				city: data.city,
				state: data.state,
				zipCode: data.zipCode,
			})
			.returning({ id: addresses.id });

		if (!insertedAddress) {
			throw new Error('Failed to insert address');
		}

		console.log(data);

		return {
			defaultValues: {
				fullName: '',
				email: '',
				dateOfBirth: '',
				hireDate: '',
				streetAddress: '',
				city: '',
				state: '',
				zipCode: '',
			},
			success: true,
			errors: null,
		};
	} catch (error) {
		if (error instanceof z.ZodError) {
			const fieldErrors = Object.fromEntries(
				Object.entries(error.formErrors.fieldErrors).map(([key, value]) => [
					key,
					value?.join(', '),
				]),
			);
			return {
				defaultValues,
				success: false,
				errors: fieldErrors,
			};
		}

		console.error(error);
		return {
			defaultValues,
			success: false,
			errors: { form: 'An unexpected error occurred' },
		};
	}
}

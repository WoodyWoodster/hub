'use server';

import { addPersonSchema } from '@/lib/schemas/people/add-person-schema';
import { z } from 'zod';

export async function addPersonAction(_prevState: unknown, formData: FormData) {
	const defaultValues = z
		.record(z.string(), z.string())
		.parse(Object.fromEntries(formData.entries()));

	try {
		const data = addPersonSchema.parse(Object.fromEntries(formData));

		// This simulates a slow response like a form submission.
		// Need to replace this with our actual logic to store this
		// person to our Neon db.
		await new Promise((resolve) => setTimeout(resolve, 1000));

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
			return {
				defaultValues,
				success: false,
				errors: Object.fromEntries(
					Object.entries(error.flatten().fieldErrors).map(([key, value]) => [
						key,
						value?.join(', '),
					]),
				),
			};
		}

		return {
			defaultValues,
			success: false,
			errors: null,
		};
	}
}

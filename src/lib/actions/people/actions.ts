'use server';

import { signOut } from '@/auth';
import { db } from '@/db';
import { addresses, companyPeople, companies, people } from '@/db/schema';
import { addPersonSchema } from '@/lib/schemas/people/add-person-schema';
import { UUID } from 'crypto';
import { eq } from 'drizzle-orm';
import { revalidateTag } from 'next/cache';
import { z } from 'zod';

export async function addPersonAction(_prevState: unknown, formData: FormData) {
	const defaultValues = z
		.record(z.string(), z.string())
		.parse(Object.fromEntries(formData.entries()));

	try {
		const data = addPersonSchema.parse(Object.fromEntries(formData));

		const insertPersonData: typeof people.$inferInsert = {
			email: data.email,
			fullName: data.fullName,
			dateOfBirth: data.dateOfBirth,
		};

		const [insertedPerson] = await db
			.insert(people)
			.values(insertPersonData)
			.returning({ id: people.id });

		if (!insertedPerson) {
			throw new Error('Failed to insert person');
		}

		const [insertedAddress] = await db
			.insert(addresses)
			.values({
				street: data.street,
				city: data.city,
				state: data.state,
				zipCode: data.zipCode,
			})
			.returning({ id: addresses.id });

		if (!insertedAddress) {
			throw new Error('Failed to insert address');
		}

		console.log(data);
		revalidateTag('people');

		return {
			defaultValues: {
				fullName: '',
				email: '',
				dateOfBirth: '',
				hireDate: '',
				street: '',
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

export async function getCompaniesForPerson(personId: UUID) {
	try {
		const companiesForPerson = await db
			.select({
				companyId: companies.id,
				companyName: companies.name,
			})
			.from(companyPeople)
			.innerJoin(companies, eq(companyPeople.companyId, companies.id))
			.where(eq(companyPeople.personId, personId));
		return companiesForPerson;
	} catch (error) {
		console.error(error);
		return null;
	}
}

export async function logOut() {
	await signOut();
}

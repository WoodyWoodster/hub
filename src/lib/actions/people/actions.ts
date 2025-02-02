'use server';

import { signOut } from '@/auth';
import { db } from '@/db';
import {
	addresses,
	companyPeople,
	companies,
	people,
	roles,
	companyPersonRoles,
	peopleAddresses,
} from '@/db/schema';
import {
	addPersonSchema,
	AddPersonValues,
} from '@/lib/schemas/people/add-person-schema';
import { count, eq } from 'drizzle-orm';
import { revalidatePath, unstable_cache } from 'next/cache';
import { z } from 'zod';

export async function addPersonAction(data: AddPersonValues) {
	try {
		const validatedData = addPersonSchema.parse(data);

		const validatedPerson: typeof people.$inferInsert = {
			email: validatedData.email,
			fullName: validatedData.fullName,
			dateOfBirth: validatedData.dateOfBirth,
		};

		const validatedAddress: typeof addresses.$inferInsert = {
			street: validatedData.street,
			city: validatedData.city,
			state: validatedData.state,
			zipCode: validatedData.zipCode,
		};

		try {
			await db.transaction(async (tx) => {
				const [insertedPerson] = await tx
					.insert(people)
					.values(validatedPerson)
					.returning({ id: people.id });

				const [insertedAddress] = await tx
					.insert(addresses)
					.values(validatedAddress)
					.returning({ id: addresses.id });

				await tx.insert(peopleAddresses).values({
					personId: insertedPerson.id,
					addressId: insertedAddress.id,
				});

				const companyPeopleCount = await tx
					.select({
						count: count(),
					})
					.from(companyPeople);

				if (companyPeopleCount[0].count) {
					const [insertedCompanyPerson] = await tx
						.insert(companyPeople)
						.values({
							personId: insertedPerson.id,
							companyId: data.companyId,
							hireDate: data.hireDate,
							isDefault: true,
						})
						.returning({ id: companyPeople.id });

					await tx.insert(companyPersonRoles).values({
						companyPersonId: insertedCompanyPerson.id,
						roleId: data.roleId,
					});
				} else {
					const [insertedCompanyPerson] = await tx
						.insert(companyPeople)
						.values({
							personId: insertedPerson.id,
							companyId: data.companyId,
							hireDate: data.hireDate,
						})
						.returning({ id: companyPeople.id });

					await tx.insert(companyPersonRoles).values({
						companyPersonId: insertedCompanyPerson.id,
						roleId: data.roleId,
					});
				}

				// TODO: Create a new user in the Cognito user pool
			});
		} catch (error) {
			console.error(error);
			return {
				success: false,
				errors: { form: 'An unexpected error occurred' },
			};
		}

		revalidatePath('/people');

		return {
			success: true,
			errors: null,
		};
	} catch (error) {
		if (error instanceof z.ZodError) {
			const fieldErrors = error.flatten().fieldErrors;
			return {
				success: false,
				errors: fieldErrors,
			};
		}

		console.error(error);
		return {
			success: false,
			errors: { form: 'An unexpected error occurred' },
		};
	}
}

export const getPeople = unstable_cache(
	async () => {
		return await db
			.select({
				id: people.id,
				fullName: people.fullName,
				email: people.email,
				role: roles.name,
				dateOfBirth: people.dateOfBirth,
				hireDate: companyPeople.hireDate,
			})
			.from(people)
			.leftJoin(companyPeople, eq(people.id, companyPeople.personId))
			.leftJoin(
				companyPersonRoles,
				eq(companyPeople.id, companyPersonRoles.companyPersonId),
			)
			.leftJoin(roles, eq(companyPersonRoles.roleId, roles.id));
	},
	['people'],
	{ revalidate: 60, tags: ['people'] },
);

export async function getCompaniesForPerson(personId: string) {
	try {
		const companiesForPerson = await db
			.select({
				id: companies.id,
				name: companies.name,
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

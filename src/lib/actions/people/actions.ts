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
import { eq } from 'drizzle-orm';
import { unstable_cache } from 'next/cache';
import { z } from 'zod';

type AddPersonResult = {
	success: boolean;
	errors: Record<string, string[]> | null;
};

export async function addPersonAction(
	data: AddPersonValues,
): Promise<AddPersonResult> {
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

				const [insertedCompanyPerson] = await tx
					.insert(companyPeople)
					.values({
						personId: insertedPerson.id,
						companyId: validatedData.companyId,
						hireDate: validatedData.hireDate,
						isDefault: true,
					})
					.returning({ id: companyPeople.id });

				await tx.insert(companyPersonRoles).values({
					companyPersonId: insertedCompanyPerson.id,
					roleId: validatedData.roleId,
				});

				// TODO: Create a new user in the Cognito user pool
			});
		} catch (error) {
			console.error(error);
			return {
				success: false,
				errors: { form: ['An unexpected error occurred'] },
			};
		}

		return {
			success: true,
			errors: null,
		};
	} catch (error) {
		if (error instanceof z.ZodError) {
			const fieldErrors: Record<string, string[]> = {};
			for (const [key, value] of Object.entries(error.flatten().fieldErrors)) {
				fieldErrors[key] = Array.isArray(value) ? value : [value!.toString()];
			}
			return {
				success: false,
				errors: fieldErrors,
			};
		}

		console.error(error);
		return {
			success: false,
			errors: { form: ['An unexpected error occurred'] },
		};
	}
}

export async function bulkAddPersonAction(
	validatedPeople: AddPersonValues[],
): Promise<{
	created: number;
	errors: Record<number, Record<string, string[]>> | null;
}> {
	const errors: Record<number, Record<string, string[]>> = {};
	let created = 0;

	await db.transaction(async (tx) => {
		try {
			const insertedPeople = await tx
				.insert(people)
				.values(
					validatedPeople.map((person) => ({
						email: person.email,
						fullName: person.fullName,
						dateOfBirth: person.dateOfBirth,
					})),
				)
				.returning({ id: people.id });

			const insertedAddresses = await tx
				.insert(addresses)
				.values(
					validatedPeople.map((person) => ({
						street: person.street,
						city: person.city,
						state: person.state,
						zipCode: person.zipCode,
					})),
				)
				.returning({ id: addresses.id });

			await tx.insert(peopleAddresses).values(
				insertedPeople.map((person, index) => ({
					personId: person.id,
					addressId: insertedAddresses[index].id,
				})),
			);

			const insertedCompanyPeople = await tx
				.insert(companyPeople)
				.values(
					insertedPeople.map((person, index) => ({
						personId: person.id,
						companyId: validatedPeople[index].companyId,
						hireDate: validatedPeople[index].hireDate,
						isDefault: true,
					})),
				)
				.returning({ id: companyPeople.id });

			await tx.insert(companyPersonRoles).values(
				insertedCompanyPeople.map((companyPerson, index) => ({
					companyPersonId: companyPerson.id,
					roleId: validatedPeople[index].roleId,
				})),
			);

			created = validatedPeople.length;
		} catch (error) {
			console.error('Error in bulk insertion:', error);
			errors[0] = {
				form: ['An unexpected error occurred during bulk insertion'],
			};
		}
	});

	return {
		created,
		errors: Object.keys(errors).length > 0 ? errors : null,
	};
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

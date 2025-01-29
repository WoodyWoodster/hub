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
import { addPersonSchema } from '@/lib/schemas/people/add-person-schema';
import { eq, sql } from 'drizzle-orm';
import { revalidatePath, unstable_cache } from 'next/cache';
import { z } from 'zod';

export async function addPersonAction(formData: FormData) {
	const defaultValues = z
		.record(z.string(), z.string())
		.parse(Object.fromEntries(formData.entries()));

	try {
		const data = addPersonSchema.parse(Object.fromEntries(formData));

		const validatedPerson: typeof people.$inferInsert = {
			email: data.email,
			fullName: data.fullName,
			dateOfBirth: data.dateOfBirth,
		};

		const validatedAddress: typeof addresses.$inferInsert = {
			street: data.street,
			city: data.city,
			state: data.state,
			zipCode: data.zipCode,
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
						companyId: data.companyId,
						hireDate: data.hireDate,
					})
					.returning({ id: companyPeople.id });

				// TODO: Should use the role from the form data
				const [employeeRole] = await tx
					.select()
					.from(roles)
					.where(sql`name = 'Employee'`);

				await tx.insert(companyPersonRoles).values({
					companyPersonId: insertedCompanyPerson.id,
					roleId: employeeRole.id,
				});

				// TODO: Create a new user in the Cognito user pool
			});
		} catch (error) {
			console.error(error);
			return {
				defaultValues,
				success: false,
				errors: { form: 'An unexpected error occurred' },
			};
		}

		revalidatePath('/people');

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
			const fieldErrors = error.flatten().fieldErrors;
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

/**
 *
 * @param companyId The id of the company to get people for
 * @returns A list of people for the company
 */
export const getPeopleForCompany = async (companyId: string) => {
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
		.innerJoin(companyPeople, eq(people.id, companyPeople.personId))
		.innerJoin(
			companyPersonRoles,
			eq(companyPeople.id, companyPersonRoles.companyPersonId),
		)
		.innerJoin(roles, eq(companyPersonRoles.roleId, roles.id))
		.where(eq(companyPeople.companyId, companyId));
};

export async function getCompaniesForPerson(personId: string) {
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

'use server';

import { createUser } from '@/auth';
import { db } from '@/db';
import {
	addresses,
	companies,
	companyAddresses,
	companyPeople,
	companyPersonRoles,
	people,
	roles,
} from '@/db/schema';
import { signUpCompanySchema } from '@/lib/schemas/companies/sign-up-company-schema';
import { isErr } from '@/types/result';
import { sql } from 'drizzle-orm';

export async function signUpCompanyAction(formData: FormData) {
	console.log('formData', formData);
	const validatedFields = signUpCompanySchema.safeParse({
		person: {
			fullName: formData.get('person.fullName'),
			email: formData.get('person.email'),
			dateOfBirth: formData.get('person.dateOfBirth'),
			password: formData.get('person.password'),
			confirmPassword: formData.get('person.confirmPassword'),
		},
		company: {
			name: formData.get('company.name'),
			website: formData.get('company.website'),
			industry: formData.get('company.industry'),
			size: formData.get('company.size'),
		},
		address: {
			street: formData.get('address.street'),
			city: formData.get('address.city'),
			state: formData.get('address.state'),
			zipCode: formData.get('address.zipCode'),
		},
	});

	if (!validatedFields.success) {
		return { error: validatedFields.error.flatten().fieldErrors };
	}

	const { person, company, address } = validatedFields.data;

	console.log('person', person);
	console.log('company', company);
	console.log('address', address);

	try {
		await db.transaction(async (tx) => {
			const [insertedCompany] = await tx
				.insert(companies)
				.values(company)
				.returning({ id: companies.id });

			const [insertedPerson] = await tx
				.insert(people)
				.values(person)
				.returning({ id: people.id });

			const [insertedAddress] = await tx
				.insert(addresses)
				.values(address)
				.returning({ id: addresses.id });

			const [insertCompanyPerson] = await tx
				.insert(companyPeople)
				.values({
					companyId: insertedCompany.id,
					personId: insertedPerson.id,
				})
				.returning({ id: companyPeople.id });

			await tx.insert(companyAddresses).values({
				companyId: insertedCompany.id,
				addressId: insertedAddress.id,
			});

			const [externalAdminRole] = await tx
				.select({
					id: roles.id,
				})
				.from(roles)
				.where(sql`name = 'external_admin'`);

			await tx.insert(companyPersonRoles).values({
				companyPersonId: insertCompanyPerson.id,
				roleId: externalAdminRole.id,
			});
		});

		const result = await createUser(person.email, person.password);

		if (isErr(result)) {
			return { error: result.error };
		}

		return { success: true };
	} catch (error) {
		console.error('Failed to add company', error);
		return { error: 'Failed to create company. Please try again.' };
	}
}

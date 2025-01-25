/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { db } from '@/db';
import {
	addresses,
	companies,
	companyAddresses,
	companyPeople,
	people,
} from '@/db/schema';
import { signUpCompanySchema } from '@/lib/schemas/companies/sign-up-company-schema';

function parseFormData(formData: FormData): Record<string, any> {
	const obj: Record<string, any> = {};
	formData.forEach((value, key) => {
		const keys = key.split('.');
		let current = obj;
		keys.forEach((k, index) => {
			if (index === keys.length - 1) {
				current[k] = value;
			} else {
				current[k] = current[k] || {};
				current = current[k];
			}
		});
	});
	console.log('Parsed Data:', JSON.stringify(obj, null, 2));
	return obj;
}

export async function signUpCompanyAction(
	_prevState: unknown,
	formData: FormData,
) {
	try {
		console.log('formData', formData);
		const parsedData = parseFormData(formData);
		const data = signUpCompanySchema.parse(parsedData);
		console.log('Saving company data', data);

		const insertCompanyData: typeof companies.$inferInsert = {
			name: data.company.name,
			size: data.company.size,
			industry: data.company.industry,
			website: data.company.website,
		};

		const insertPersonData: typeof people.$inferInsert = {
			email: data.person.email,
			fullName: data.person.fullName,
			dateOfBirth: data.person.dateOfBirth,
		};

		const insertCompanyAddressData: typeof addresses.$inferInsert = {
			streetAddress: data.address.street,
			city: data.address.city,
			state: data.address.state,
			zipCode: data.address.zipCode,
		};

		await db.transaction(async (tx) => {
			const [insertedCompany] = await tx
				.insert(companies)
				.values(insertCompanyData)
				.returning({ id: companies.id });

			const [insertedPerson] = await tx
				.insert(people)
				.values(insertPersonData)
				.returning({ id: people.id });

			const [insertedAddress] = await tx
				.insert(addresses)
				.values(insertCompanyAddressData)
				.returning({ id: addresses.id });

			await tx
				.insert(companyPeople)
				.values({
					companyId: insertedCompany.id,
					personId: insertedPerson.id,
				})
				.returning({
					companyId: companyPeople.companyId,
					personId: companyPeople.personId,
				});

			await tx
				.insert(companyAddresses)
				.values({
					companyId: insertedCompany.id,
					addressId: insertedAddress.id,
				})
				.returning({
					companyId: companyAddresses.companyId,
					addressId: companyAddresses.addressId,
				});
		});

		return {
			defaultValues: {
				person: {
					fullName: '',
					email: '',
					dateOfBirth: '',
				},
				company: {
					name: '',
					website: '',
					industry: '',
					size: '',
				},
				address: {
					street: '',
					city: '',
					state: '',
					zipCode: '',
					country: '',
				},
			},
			success: true,
			errors: {} as Record<string, string>,
		};
	} catch (error) {
		console.error('Failed to add company', error);
		return {
			_prevState,
			success: false,
			errors: { form: (error as Error).message },
		};
	}
}

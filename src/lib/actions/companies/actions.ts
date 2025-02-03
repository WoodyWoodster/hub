'use server';

import { createUser } from '@/auth';
import { db } from '@/db';
import {
	addresses,
	companies,
	companyAddresses,
	companyOnboardingProgress,
	companyPeople,
	companyPersonRoles,
	onboardingSteps,
	people,
	roles,
} from '@/db/schema';
import { isErr } from '@/types/result';
import { eq, sql } from 'drizzle-orm';
import { createStripeCustomerAction } from '../stripe/actions';
import { ADMIN_ROLE_NAME } from '@/lib/constants/onboarding';
import { RegisterCompanyValues } from '@/lib/schemas/companies';

export async function registerCompanyAction({
	company,
	person,
	address,
}: RegisterCompanyValues) {
	console.log('Processing company registration');
	let userAttributes = {};
	let companyId = '';
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
					isDefault: true,
				})
				.returning({ id: companyPeople.id });

			await tx.insert(companyAddresses).values({
				companyId: insertedCompany.id,
				addressId: insertedAddress.id,
			});

			const [externalAdminRole] = await tx
				.select()
				.from(roles)
				.where(sql`name = ${ADMIN_ROLE_NAME}`);

			await tx.insert(companyPersonRoles).values({
				companyPersonId: insertCompanyPerson.id,
				roleId: externalAdminRole.id,
			});

			const steps = await db.select().from(onboardingSteps);

			await tx.insert(companyOnboardingProgress).values(
				steps.map((step) => ({
					companyId: insertedCompany.id,
					stepId: step.id,
					isCompleted: false,
				})),
			);

			userAttributes = {
				email: person.email,
				name: person.fullName,
				birthdate: person.dateOfBirth,
				'custom:companyAssociations': JSON.stringify([
					{
						companyId: insertedCompany.id,
						companyName: company.name,
						companyPersonId: insertCompanyPerson.id,
						roleId: externalAdminRole.id,
						roleName: externalAdminRole.name,
					},
				]),
			};
			companyId = insertedCompany.id;
		});

		const result = await createUser(
			person.email,
			person.password,
			userAttributes,
		);

		if (isErr(result)) {
			console.log('Failed to create user', result.error);
			return { error: result.error };
		}

		const stripeCustomer = await createStripeCustomerAction(
			person.email,
			company.name,
		);

		await db
			.update(companies)
			.set({
				stripeCustomerId: stripeCustomer.id,
			})
			.where(eq(companies.id, companyId));

		return { success: true };
	} catch (error) {
		console.error('Failed to add company', error);
		return { error: 'Failed to create company. Please try again.' };
	}
}

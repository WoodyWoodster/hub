'use server';

import { db } from '@/db';
import { companyPeople, companyPersonRoles, people, roles } from '@/db/schema';
import { sql, eq } from 'drizzle-orm';

export const getExternalRoles = async () => {
	return await db
		.select()
		.from(roles)
		.where(sql`is_internal = false`)
		.orderBy(roles.name);
};

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

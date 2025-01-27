import { PeopleTable } from '@/components/custom/tables/people/table';
import { db } from '@/db';
import { companyPeople, companyPersonRoles, people, roles } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { unstable_cache } from 'next/cache';

const getPeople = unstable_cache(
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

export default async function PeoplePage() {
	console.log('Getting people');
	const allPeople = await getPeople();
	console.log(allPeople);
	return <PeopleTable people={allPeople} />;
}

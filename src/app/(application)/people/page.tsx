import { PeopleTable } from '@/components/custom/tables/people/table';
import { db } from '@/db';
import { people } from '@/db/schema';
import { unstable_cache } from 'next/cache';

const getPeople = unstable_cache(
	async () => {
		return await db.select().from(people);
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

import { PeopleTable } from '@/components/custom/tables/people/table';
import { db } from '@/db';
import { people } from '@/db/schema';

export default async function PeoplePage() {
	const allPeople = await db.select().from(people);
	return <PeopleTable people={allPeople} />;
}

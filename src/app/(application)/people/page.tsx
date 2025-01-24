import { PeopleTable } from '@/components/custom/tables/people/table';
import { db } from '@/db';
import { people } from '@/db/schema';

export default async function PeoplePage() {
	console.log('Getting people');
	const allPeople = await db.select().from(people);
	console.log(allPeople);
	return <PeopleTable people={allPeople} />;
}

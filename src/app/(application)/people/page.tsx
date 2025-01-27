import { PeopleTable } from '@/components/custom/tables/people/table';
import { getPeople } from '@/lib/actions/people/actions';
import { Suspense } from 'react';

export default async function PeoplePage() {
	const allPeople = await getPeople();
	if (!allPeople) {
		return <div>Failed to load people</div>;
	}
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<PeopleTable people={allPeople} />
		</Suspense>
	);
}

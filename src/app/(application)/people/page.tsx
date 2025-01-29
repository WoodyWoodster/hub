import { auth } from '@/auth';
import { PeopleTable } from '@/components/custom/tables/people/table';
import { getPeopleForCompany } from '@/lib/actions/people/actions';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export default async function PeoplePage() {
	const session = await auth();
	if (!session) {
		redirect('/login');
	}
	const people = await getPeopleForCompany(session.user.companyId);
	if (!people) {
		return <div>Failed to load people</div>;
	}
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<PeopleTable people={people} />
		</Suspense>
	);
}

import { auth } from '@/auth';
import { PeopleTable } from '@/components/custom/tables/people/table';
import {
	getExternalRoles,
	getPeopleForCompany,
} from '@/lib/queries/roles/queries';
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
	const roles = await getExternalRoles();
	if (!roles) {
		return <div>Failed to load roles</div>;
	}
	return (
		<Suspense>
			<PeopleTable people={people} roles={roles} />
		</Suspense>
	);
}

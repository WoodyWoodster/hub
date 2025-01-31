import { auth } from '@/auth';
import { PeopleTable } from '@/components/custom/tables/people/table';
import { getPeopleForCompany } from '@/lib/actions/people/actions';
import { getExternalRoles } from '@/lib/queries/roles/queries';
import { SessionProvider } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export default async function PeoplePage() {
	const session = await auth();
  // Comment to trigger PR
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
			<SessionProvider>
				<PeopleTable people={people} roles={roles} />
			</SessionProvider>
		</Suspense>
	);
}

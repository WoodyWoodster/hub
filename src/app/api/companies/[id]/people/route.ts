import { getPeopleForCompany } from '@/lib/queries/people/queries';
import { UUID } from 'crypto';
import { validate as isUUID } from 'uuid';

export async function GET(
	req: Request,
	{ params }: { params: Promise<{ id: UUID }> },
) {
	const companyId = (await params).id;

	if (!companyId) {
		return new Response('Company ID is required', { status: 400 });
	}

	if (!isUUID(companyId)) {
		return new Response('Invalid Company ID', { status: 400 });
	}

	return new Response(JSON.stringify(await getPeopleForCompany(companyId)), {
		status: 200,
	});
}

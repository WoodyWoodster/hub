import { db } from '@/db';
import { companies } from '@/db/schema';
import { sql } from 'drizzle-orm';
import {
	registerCompanySchema,
	RegisterCompanyValues,
} from '@/lib/schemas/companies';
import { registerCompanyAction } from '@/lib/actions/companies/actions';

export async function registerCompany(data: RegisterCompanyValues) {
	const validatedFields = registerCompanySchema.safeParse(data);

	if (!validatedFields.success) {
		return { error: validatedFields.error.flatten().fieldErrors };
	}

	const { person, company, address } = validatedFields.data;

	try {
		await registerCompanyAction({
			person,
			company,
			address,
		});
	} catch (error) {
		console.log(error);
	}
}

export async function updateCompanyStripeCustomerId(
	companyId: string,
	stripeCustomerId: string,
) {
	await db
		.update(companies)
		.set({ stripeCustomerId })
		.where(sql`id = ${companyId}`);
}

import { db } from '@/db';
import { companies } from '@/db/schema';
import { sql } from 'drizzle-orm';
import { registerCompanySchema } from '@/lib/schemas/companies';
import { processCompanyRegistration } from '@/lib/actions/companies/actions';

export async function registerCompany(formData: FormData) {
	const validatedFields = registerCompanySchema.safeParse({
		person: {
			fullName: formData.get('person.fullName'),
			email: formData.get('person.email'),
			dateOfBirth: formData.get('person.dateOfBirth'),
			password: formData.get('person.password'),
			confirmPassword: formData.get('person.confirmPassword'),
		},
		company: {
			name: formData.get('company.name'),
			website: formData.get('company.website'),
			industry: formData.get('company.industry'),
			size: formData.get('company.size'),
		},
		address: {
			street: formData.get('address.street'),
			city: formData.get('address.city'),
			state: formData.get('address.state'),
			zipCode: formData.get('address.zipCode'),
		},
	});

	if (!validatedFields.success) {
		return { error: validatedFields.error.flatten().fieldErrors };
	}

	const { person, company, address } = validatedFields.data;

	try {
		await processCompanyRegistration({
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

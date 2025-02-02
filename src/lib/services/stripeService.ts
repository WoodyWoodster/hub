import { createStripeCustomer as createStripeCustomerOriginal } from '@/lib/actions/stripe/actions';

export async function createStripeCustomer(email: string, companyName: string) {
	try {
		return await createStripeCustomerOriginal(email, companyName);
	} catch (error) {
		console.error('Failed to create Stripe customer', error);
		throw new Error('Failed to create Stripe customer');
	}
}

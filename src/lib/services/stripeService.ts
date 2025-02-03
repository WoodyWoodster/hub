import { createStripeCustomerAction } from '@/lib/actions/stripe/actions';

export async function createStripeCustomer(email: string, companyName: string) {
	try {
		return await createStripeCustomerAction(email, companyName);
	} catch (error) {
		console.error('Failed to create Stripe customer', error);
		throw new Error('Failed to create Stripe customer');
	}
}

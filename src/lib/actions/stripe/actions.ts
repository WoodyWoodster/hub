'use server';

import { stripe } from '@/lib/stripe';

export async function createStripeCustomerAction(email: string, name: string) {
	try {
		const customer = await stripe.customers.create({
			email,
			name,
		});
		return customer;
	} catch (error) {
		console.error('Error creating Stripe customer:', error);
		throw new Error('Failed to create customer');
	}
}

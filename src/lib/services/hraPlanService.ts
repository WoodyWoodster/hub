'use server';

import { z } from 'zod';
import { createHraPlanAction } from '../actions/hraPlans/actions';
import { planSetupSchema } from '../schemas/onboarding/plan-setup-schema';

export async function createHraPlan(data: z.infer<typeof planSetupSchema>) {
	const validatedFields = planSetupSchema.safeParse(data);

	if (!validatedFields.success) {
		return { error: validatedFields.error.flatten().fieldErrors };
	}

	const { plan } = validatedFields.data;

	try {
		await createHraPlanAction({
			plan,
		});
	} catch (error) {
		console.log(error);
	}
}

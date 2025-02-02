import { db } from '@/db';
import { hraPlans } from '@/db/schema';
import { planSetupSchema } from '@/lib/schemas/onboarding/plan-setup-schema';
import { z } from 'zod';

export async function createHraPlanAction({
	plan,
}: z.infer<typeof planSetupSchema>) {
	console.log('Processing HRA plan creation');
	let hraPlanId = '';
	try {
		await db.transaction(async (tx) => {
			const [insertedHraPlan] = await tx
				.insert(hraPlans)
				.values({
					companyId: plan.companyId,
					startDate: plan.startDate,
				})
				.returning({ id: hraPlans.id });

			hraPlanId = insertedHraPlan.id;
		});
		return { success: true, hraPlanId };
	} catch (error) {
		console.error('Error creating HRA plan:', error);
		return { error: 'Failed to create HRA plan' };
	}
}

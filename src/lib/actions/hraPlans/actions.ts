import { db } from '@/db';
import { hraPlans } from '@/db/schema';
import { PlanSetupValues } from '@/lib/schemas/onboarding/plan-setup-schema';

export async function createHraPlanAction({ plan }: PlanSetupValues) {
	console.log('Processing HRA plan creation');
	try {
		await db.transaction(async (tx) => {
			await tx
				.insert(hraPlans)
				.values({
					companyId: plan.companyId,
					startDate: plan.startDate,
				})
				.returning({ id: hraPlans.id });
		});
		return { success: true };
	} catch (error) {
		console.error('Error creating HRA plan:', error);
		return { error: 'Failed to create HRA plan' };
	}
}

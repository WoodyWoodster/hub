import { db } from '@/db';
import {
	companyOnboardingProgress,
	hraPlans,
	onboardingSteps,
} from '@/db/schema';
import { PlanSetupValues } from '@/lib/schemas/onboarding/plan-setup-schema';
import { sql } from 'drizzle-orm';

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

			const [planSetupStep] = await tx
				.select({ id: onboardingSteps.id })
				.from(onboardingSteps)
				.where(sql`${onboardingSteps.stepName} = 'Plan Setup'`);

			await tx
				.update(companyOnboardingProgress)
				.set({ isCompleted: true })
				.where(
					sql`${companyOnboardingProgress.companyId} = ${plan.companyId} AND ${companyOnboardingProgress.stepId} = ${planSetupStep.id}`,
				);
		});
		return { success: true };
	} catch (error) {
		console.error('Error creating HRA plan:', error);
		return { error: 'Failed to create HRA plan' };
	}
}

import { z } from 'zod';

export const planSetupSchema = z.object({
	plan: z
		.object({
			startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
				message: 'Invalid start date',
			}),
			eligibleEmployees: z.number().min(1, {
				message: 'Must have at least one eligible employee',
			}),
			participatingEmployees: z.number().min(1, {
				message: 'Must have at least one participating employee',
			}),
			autopay: z.boolean(),
		})
		.refine((data) => data.participatingEmployees <= data.eligibleEmployees, {
			message:
				'Participating employees must be less than or equal to eligible employees',
		}),
});

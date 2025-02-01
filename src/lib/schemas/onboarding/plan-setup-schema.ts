import { z } from 'zod';

export const planSetupSchema = z.object({
	plan: z
		.object({
			startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
				message: 'Invalid start date',
			}),
			eligibleEmployees: z
				.string()
				.min(1, 'Please enter the number of eligible employees'),
			participatingEmployees: z
				.string()
				.min(1, 'Please enter the number of participating employees'),
			autopay: z.boolean(),
		})
		.refine((data) => data.participatingEmployees <= data.eligibleEmployees, {
			message:
				'Participating employees must be less than or equal to eligible employees',
		}),
});

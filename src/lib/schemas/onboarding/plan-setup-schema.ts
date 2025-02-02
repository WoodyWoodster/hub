import { z } from 'zod';

export const planSetupSchema = z.object({
	plan: z
		.object({
			companyId: z.string().uuid({ message: 'Invalid company ID' }),
			startDate: z
				.string()
				.regex(/^\d{4}-\d{2}-\d{2}$/, 'Please select a valid start date'),
			eligibleEmployees: z
				.string()
				.min(1, 'Please enter the number of eligible employees')
				.refine(
					(val) => !isNaN(Number(val)) && Number(val) > 0,
					'Must be a positive number',
				),
			participatingEmployees: z
				.string()
				.min(1, 'Please enter the number of participating employees')
				.refine(
					(val) => !isNaN(Number(val)) && Number(val) > 0,
					'Must be a positive number',
				),
			autopay: z.boolean(),
			selectedPlan: z.enum(['Growth', 'Starter']),
		})
		.refine(
			(data) => {
				const eligible = Number(data.eligibleEmployees);
				const participating = Number(data.participatingEmployees);
				return participating <= eligible;
			},
			{
				message: 'Participating employees cannot exceed eligible employees',
				path: ['participatingEmployees'],
			},
		),
});

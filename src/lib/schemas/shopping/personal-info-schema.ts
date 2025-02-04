import * as z from 'zod';

export const personalInfoSchema = z.object({
	firstName: z.string().min(1, 'First name is required'),
	lastName: z.string().min(1, 'Last name is required'),
	dateOfBirth: z.string().min(1, 'Date of birth is required'),
	preferredName: z.string().optional(),
	zipCode: z.string().min(5, 'Valid ZIP code is required').max(5),
	gender: z.enum(['male', 'female', 'other']),
	tobaccoUse: z.boolean(),
	medicaid: z.boolean(),
	acknowledgment: z.boolean().refine((val) => val === true, {
		message: 'You must acknowledge the document',
	}),
});

export type PersonalInfoValues = z.infer<typeof personalInfoSchema>;

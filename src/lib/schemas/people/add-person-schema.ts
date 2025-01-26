import { z } from 'zod';

export const addPersonSchema = z.object({
	fullName: z
		.string()
		.min(2, { message: 'First name must be at least 2 characters' })
		.max(255, { message: 'First name must be at most 255 characters' }),
	email: z.string().email({ message: 'Invalid email address' }),
	dateOfBirth: z.string().refine((dob) => !isNaN(Date.parse(dob)), {
		message: 'Invalid date of birth',
	}),
	hireDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
		message: 'Invalid hire date',
	}),
	street: z
		.string()
		.min(5, { message: 'Street address must be at least 5 characters' })
		.max(100, { message: 'Street address must be at most 100 characters' }),
	city: z
		.string()
		.min(2, { message: 'City must be at least 2 characters' })
		.max(50, { message: 'City must be at most 50 characters' }),
	state: z
		.string()
		.length(2, { message: 'State must be a 2-letter abbreviation' }),
	zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, {
		message: 'Invalid ZIP code format',
	}),
});

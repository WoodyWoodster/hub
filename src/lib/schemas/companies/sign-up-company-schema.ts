import { z } from 'zod';

export const signUpCompanySchema = z.object({
	person: z.object({
		fullName: z
			.string()
			.min(2, { message: 'First name must be at least 2 characters' })
			.max(255, { message: 'First name must be at most 255 characters' }),
		email: z.string().email({ message: 'Invalid email address' }),
		dateOfBirth: z.string().refine((dob) => !isNaN(Date.parse(dob)), {
			message: 'Invalid date of birth',
		}),
	}),
	company: z.object({
		name: z
			.string()
			.min(2, { message: 'Name must be at least 2 characters' })
			.max(255, { message: 'Name must be at most 255 characters' }),
		website: z.string().url({ message: 'Invalid website URL' }),
		industry: z
			.string()
			.min(2, { message: 'Industry must be at least 2 characters' })
			.max(50, { message: 'Industry must be at most 50 characters' }),
		size: z
			.string()
			.min(2, { message: 'Size must be at least 2 characters' })
			.max(50, { message: 'Size must be at most 50 characters' }),
	}),
	address: z.object({
		street: z
			.string()
			.min(2, { message: 'Street must be at least 2 characters' })
			.max(255, { message: 'Street must be at most 255 characters' }),
		city: z
			.string()
			.min(2, { message: 'City must be at least 2 characters' })
			.max(100, { message: 'City must be at most 100 characters' }),
		state: z
			.string()
			.min(2, { message: 'State must be at least 2 characters' })
			.max(100, { message: 'State must be at most 100 characters' }),
		zipCode: z
			.string()
			.min(2, { message: 'Zip Code must be at least 2 characters' })
			.max(20, { message: 'Zip Code must be at most 20 characters' }),
		country: z
			.string()
			.min(2, { message: 'Country must be at least 2 characters' })
			.max(100, { message: 'Country must be at most 100 characters' }),
	}),
});

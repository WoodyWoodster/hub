import { z } from 'zod';

export type Roster = z.infer<typeof RosterSchema>;

export const RosterSchema = z.object({
	'First Name': z.string().min(1, 'First Name is required.'),
	'Middle Name': z.string().optional(),
	'Last Name': z.string().min(1, 'Last Name is required.'),
	'Preferred Name': z.string().optional(),
	Email: z.string().email('Invalid email address.'),
	'Phone Number': z
		.string()
		.regex(
			/^\d{3}-\d{3}-\d{4}$/,
			'Invalid phone number. Please use XXX-XXX-XXXX format.',
		),
	'Employee Number': z.string().min(1, 'Employee Number is required'),
	Role: z.enum(['Admin', 'Employee', 'Manager'], {
		required_error:
			'Role is required and must be one of Admin, Employee, or Manager.',
	}),
	Address: z.string().min(1, 'Address is required.'),
	'Address 2': z.string().optional(),
	City: z.string().min(1, 'City is required.'),
	'Zip Code': z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code.'),
	County: z.string().min(1, 'County is required.'),
	State: z.string().length(2, 'State must be a 2-letter code.'),
	'Employment Type': z.string().min(1, 'Employment Type is required.'),
	'Hire Date': z
		.string()
		.regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD).'),
	DOB: z
		.string()
		.regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD).'),
});

import { z } from 'zod';

// Complete schema with all fields
export const personalInfoSchema = z.object({
	// Step 1 fields
	firstName: z.string().min(1, 'First name is required'),
	lastName: z.string().min(1, 'Last name is required'),
	dateOfBirth: z.string().min(1, 'Date of birth is required'),
	preferredName: z.string().optional(),
	gender: z.enum(['male', 'female', 'other']),

	// Step 2 fields (ZIP page)
	zipCode: z.string().min(5, 'Valid ZIP code is required').max(5),

	// Step 3 fields (Medicaid page)
	hasMedicaid: z.boolean(),

	// Step 4 fields (Tobacco page)
	usesTobacco: z.boolean(),
	lastTobaccoUse: z.string().optional(),
});

// Create specific types/schemas for each step
export const personalInfoStep1Schema = personalInfoSchema.pick({
	firstName: true,
	lastName: true,
	dateOfBirth: true,
	preferredName: true,
	gender: true,
});

export const personalInfoStep2Schema = personalInfoSchema.pick({
	zipCode: true,
});

export const personalInfoStep3Schema = personalInfoSchema.pick({
	hasMedicaid: true,
});

export const personalInfoStep4Schema = personalInfoSchema.pick({
	usesTobacco: true,
	lastTobaccoUse: true,
});

// Types for each step
export type PersonalInfoStep1Values = z.infer<typeof personalInfoStep1Schema>;
export type PersonalInfoStep2Values = z.infer<typeof personalInfoStep2Schema>;
export type PersonalInfoStep3Values = z.infer<typeof personalInfoStep3Schema>;
export type PersonalInfoStep4Values = z.infer<typeof personalInfoStep4Schema>;
export type PersonalInfoValues = z.infer<typeof personalInfoSchema>;

import { z } from 'zod';

export type LoginFormValues = z.infer<typeof loginSchema>;

export const loginSchema = z.object({
	email: z.string().email({ message: 'Invalid email address' }),
	password: z
		.string()
		.min(8, { message: 'Password must be at least 8 characters' }),
});

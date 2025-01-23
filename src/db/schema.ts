import { date, integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export const people = pgTable('people', {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	fullName: varchar('full_name', { length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull().unique(),
	dateOfBirth: date('date_of_birth').notNull(),
	hireDate: date('hire_date').notNull(),
});

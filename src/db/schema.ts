import { date, integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export const people = pgTable('people', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
	fullName: varchar('full_name', { length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull().unique(),
	dateOfBirth: date('date_of_birth').notNull(),
	hireDate: date('hire_date').notNull(),
});

export const addresses = pgTable('addresses', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
	personId: integer('person_id')
		.references(() => people.id)
		.notNull(),
	streetAddress: varchar('street_address', { length: 255 }).notNull(),
	city: varchar({ length: 100 }).notNull(),
	state: varchar({ length: 2 }).notNull(),
	zipCode: varchar('zip_code', { length: 10 }).notNull(),
});

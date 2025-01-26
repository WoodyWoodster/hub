import { date, integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export const people = pgTable('people', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
	fullName: varchar('full_name', { length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull().unique(),
	dateOfBirth: date('date_of_birth').notNull(),
});

export const addresses = pgTable('addresses', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
	streetAddress: varchar('street_address', { length: 255 }).notNull(),
	city: varchar({ length: 100 }).notNull(),
	state: varchar({ length: 2 }).notNull(),
	zipCode: varchar('zip_code', { length: 10 }).notNull(),
});

export const companies = pgTable('companies', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
	name: varchar({ length: 255 }).notNull(),
	website: varchar({ length: 255 }),
	industry: varchar({ length: 50 }).notNull(),
	size: varchar({ length: 50 }).notNull(),
});

export const companyPeople = pgTable('company_people', {
	companyId: integer('company_id')
		.references(() => companies.id)
		.notNull(),
	personId: integer('person_id')
		.references(() => people.id)
		.notNull(),
	hireDate: date('hire_date'),
});

export const companyAddresses = pgTable('company_addresses', {
	companyId: integer('company_id')
		.references(() => companies.id)
		.notNull(),
	addressId: integer('address_id')
		.references(() => addresses.id)
		.notNull(),
});

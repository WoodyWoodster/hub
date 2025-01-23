import { relations } from 'drizzle-orm';
import { date, integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export const people = pgTable('people', {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	fullName: varchar('full_name', { length: 255 }).notNull(),
	email: varchar('email', { length: 255 }).notNull().unique(),
	dateOfBirth: date('date_of_birth').notNull(),
	hireDate: date('hire_date').notNull(),
});

export const addresses = pgTable('addresses', {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	personId: integer('person_id').notNull(),
	streetAddress: varchar('street_address', { length: 255 }).notNull(),
	city: varchar('city', { length: 100 }).notNull(),
	state: varchar('state', { length: 2 }).notNull(),
	zipCode: varchar('zip_code', { length: 10 }).notNull(),
});

export const peopleRelations = relations(people, ({ one }) => ({
	address: one(addresses, {
		fields: [people.id],
		references: [addresses.personId],
	}),
}));

export const addressesRelations = relations(addresses, ({ one }) => ({
	person: one(people, {
		fields: [addresses.personId],
		references: [people.id],
	}),
}));

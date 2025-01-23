import { relations } from 'drizzle-orm';
import { date, integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export const people = pgTable('people', {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	fullName: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull().unique(),
	dateOfBirth: date().notNull(),
	hireDate: date().notNull(),
});

export const addresses = pgTable('addresses', {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	personId: integer().notNull(),
	streetAddress: varchar({ length: 255 }).notNull(),
	city: varchar({ length: 100 }).notNull(),
	state: varchar({ length: 2 }).notNull(),
	zipCode: varchar({ length: 10 }).notNull(),
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

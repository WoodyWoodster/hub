import {
	date,
	integer,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
	varchar,
} from 'drizzle-orm/pg-core';

export const people = pgTable('people', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
	fullName: varchar('full_name', { length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull().unique(),
	dateOfBirth: date('date_of_birth').notNull(),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'date', precision: 3 })
		.defaultNow()
		.$onUpdate(() => new Date()),
});

export const addresses = pgTable('addresses', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
	street: varchar('street_address', { length: 255 }).notNull(),
	city: varchar({ length: 100 }).notNull(),
	state: varchar({ length: 2 }).notNull(),
	zipCode: varchar('zip_code', { length: 10 }).notNull(),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'date', precision: 3 })
		.defaultNow()
		.$onUpdate(() => new Date()),
});

export const companies = pgTable('companies', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
	name: varchar({ length: 255 }).notNull(),
	website: varchar({ length: 255 }),
	industry: varchar({ length: 50 }).notNull(),
	size: varchar({ length: 50 }).notNull(),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'date', precision: 3 })
		.defaultNow()
		.$onUpdate(() => new Date()),
});

export const companyPeople = pgTable(
	'company_people',
	{
		id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
		companyId: integer('company_id')
			.references(() => companies.id)
			.notNull(),
		personId: integer('person_id')
			.references(() => people.id)
			.notNull(),
		hireDate: date('hire_date'),
		createdAt: timestamp('created_at').defaultNow(),
		updatedAt: timestamp('updated_at', {
			mode: 'date',
			precision: 3,
		})
			.$onUpdate(() => new Date())
			.defaultNow(),
	},
	(table) => [
		uniqueIndex('unique_company_people').on(table.companyId, table.personId),
	],
);

export const companyAddresses = pgTable('company_addresses', {
	companyId: integer('company_id')
		.references(() => companies.id)
		.notNull(),
	addressId: integer('address_id')
		.references(() => addresses.id)
		.notNull(),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'date', precision: 3 })
		.defaultNow()
		.$onUpdate(() => new Date()),
});

export const roles = pgTable('roles', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
	name: varchar({ length: 50 }).notNull().unique(),
	description: text('description'),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'date', precision: 3 })
		.defaultNow()
		.$onUpdate(() => new Date()),
});

export const permissions = pgTable('permissions', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
	name: varchar({ length: 100 }).notNull().unique(),
	description: text('description'),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'date', precision: 3 })
		.defaultNow()
		.$onUpdate(() => new Date()),
});

export const rolePermissions = pgTable(
	'role_permissions',
	{
		roleId: integer('role_id')
			.references(() => roles.id)
			.notNull(),
		permissionId: integer('permission_id')
			.references(() => permissions.id)
			.notNull(),
		createdAt: timestamp('created_at').defaultNow(),
	},
	(table) => [
		{
			uniqueRolePermission: uniqueIndex('unique_role_permission').on(
				table.roleId,
				table.permissionId,
			),
		},
	],
);

export const companyPersonRoles = pgTable(
	'company_person_roles',
	{
		companyPersonId: integer('company_person_id')
			.references(() => companyPeople.id)
			.notNull(),
		roleId: integer('role_id')
			.references(() => roles.id)
			.notNull(),
		createdAt: timestamp('created_at').defaultNow(),
	},
	(table) => [
		{
			uniqueCompanyPersonRole: uniqueIndex('unique_company_person_role').on(
				table.companyPersonId,
				table.roleId,
			),
		},
	],
);

import { sql } from 'drizzle-orm';
import {
	boolean,
	date,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
	uuid,
	varchar,
} from 'drizzle-orm/pg-core';

export const people = pgTable('people', {
	id: uuid('id')
		.primaryKey()
		.default(sql`uuid_generate_v7()`),
	fullName: varchar('full_name', { length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull().unique(),
	dateOfBirth: date('date_of_birth').notNull(),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'date', precision: 3 })
		.defaultNow()
		.$onUpdate(() => new Date()),
});

export const peopleAddresses = pgTable('people_addresses', {
	personId: uuid('person_id')
		.references(() => people.id)
		.notNull(),
	addressId: uuid('address_id')
		.references(() => addresses.id)
		.notNull(),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'date', precision: 3 })
		.defaultNow()
		.$onUpdate(() => new Date()),
});

export const addresses = pgTable('addresses', {
	id: uuid('id')
		.primaryKey()
		.default(sql`uuid_generate_v7()`),
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
	id: uuid('id')
		.primaryKey()
		.default(sql`uuid_generate_v7()`),
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
		id: uuid('id')
			.primaryKey()
			.default(sql`uuid_generate_v7()`),
		companyId: uuid('company_id')
			.references(() => companies.id)
			.notNull(),
		personId: uuid('person_id')
			.references(() => people.id)
			.notNull(),
		hireDate: date('hire_date'),
		isDefault: boolean('is_default').notNull().default(false),
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
		uniqueIndex('unique_default_company_per_person')
			.on(table.personId)
			.where(sql`is_default = true`),
	],
);

export const companyAddresses = pgTable('company_addresses', {
	companyId: uuid('company_id')
		.references(() => companies.id)
		.notNull(),
	addressId: uuid('address_id')
		.references(() => addresses.id)
		.notNull(),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'date', precision: 3 })
		.defaultNow()
		.$onUpdate(() => new Date()),
});

export const roles = pgTable('roles', {
	id: uuid('id')
		.primaryKey()
		.default(sql`uuid_generate_v7()`),
	name: varchar({ length: 50 }).notNull().unique(),
	description: text('description'),
	isInternal: boolean('is_internal').notNull().default(false),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'date', precision: 3 })
		.defaultNow()
		.$onUpdate(() => new Date()),
});

export const permissions = pgTable('permissions', {
	id: uuid('id')
		.primaryKey()
		.default(sql`uuid_generate_v7()`),
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
		roleId: uuid('role_id')
			.references(() => roles.id)
			.notNull(),
		permissionId: uuid('permission_id')
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
		companyPersonId: uuid('company_person_id')
			.references(() => companyPeople.id)
			.notNull(),
		roleId: uuid('role_id')
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

export const onboardingSteps = pgTable('onboarding_steps', {
	id: uuid('id')
		.primaryKey()
		.default(sql`uuid_generate_v7()`),
	stepName: varchar('step_name', { length: 255 }).notNull(),
	description: varchar('description', { length: 500 }),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'date', precision: 3 })
		.defaultNow()
		.$onUpdate(() => new Date()),
});

export const companyOnboardingProgress = pgTable(
	'company_onboarding_progress',
	{
		companyId: uuid('company_id')
			.references(() => companies.id)
			.notNull(),
		stepId: uuid('step_id')
			.references(() => onboardingSteps.id)
			.notNull(),
		isCompleted: boolean('is_completed').notNull().default(false),
		completedAt: timestamp('completed_at'),
		createdAt: timestamp('created_at').defaultNow(),
		updatedAt: timestamp('updated_at', { mode: 'date', precision: 3 })
			.defaultNow()
			.$onUpdate(() => new Date()),
	},
	(table) => [
		{
			uniqueCompanyOnboardingStep: uniqueIndex(
				'unique_company_onboarding_step',
			).on(table.companyId, table.stepId),
		},
	],
);

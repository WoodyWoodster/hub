import { sql } from 'drizzle-orm';
import {
	boolean,
	date,
	integer,
	pgEnum,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
	uuid,
	varchar,
} from 'drizzle-orm/pg-core';

// Enums
export const classStructure = pgEnum('class_structure', [
	'VARY_BY_AGE',
	'VARY_BY_FAMILY_SIZE',
	'VARY_BY_FAMILY_SIZE_AND_AGE',
	'ALL_EMPLOYEES',
]);

export const eligibleForReimbursement = pgEnum('eligible_for_reimbursement', [
	'PREMIUM_ONLY',
	'PREMIUM_AND_MEDICAL_EXPENSES',
]);

export const reimbursementType = pgEnum('reimbursement_type', [
	'EMPLOYEE',
	'SPOUSE',
	'CHILDREN',
	'SPOUSE_AND_CHILDREN',
]);

export const waitingPeriod = pgEnum('waiting_period', [
	'IMMEDIATE',
	'FIRST_OF_MONTH_AFTER_30_DAYS',
	'FIRST_OF_MONTH_AFTER_60_DAYS',
	'FIRST_OF_MONTH_AFTER_90_DAYS',
]);

// Tables
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
	stripeCustomerId: varchar('stripe_customer_id'),
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

// Rename to hraPrograms???
export const hraPlans = pgTable(
	'hra_plans',
	{
		id: uuid('id')
			.primaryKey()
			.default(sql`uuid_generate_v7()`),
		companyId: uuid('company_id')
			.references(() => companies.id)
			.notNull(),
		startDate: date('start_date').notNull(),
		endDate: date('end_date'),
		fullTimeHourQualification: integer('full_time_hour_qualification'),
		seasonalMonthQualification: integer('seasonal_month_qualification'),
		createdAt: timestamp('created_at').defaultNow(),
		updatedAt: timestamp('updated_at', { mode: 'date', precision: 3 })
			.defaultNow()
			.$onUpdate(() => new Date()),
	},
	(table) => [uniqueIndex('unique_hra_plan').on(table.companyId, table.id)],
);

export const hraClasses = pgTable(
	'hra_classes',
	{
		id: uuid('id')
			.primaryKey()
			.default(sql`uuid_generate_v7()`),
		planId: uuid('plan_id')
			.references(() => hraPlans.id)
			.notNull(),
		name: varchar('name', { length: 255 }).notNull(),
		classStructure: classStructure('class_structure')
			.notNull()
			.default('ALL_EMPLOYEES'),
		isFullTime: boolean('is_full_time').notNull().default(false),
		isSalaried: boolean('is_salaried').notNull().default(false),
		isSeasonal: boolean('is_seasonal').notNull().default(false),
		isSpecificGeography: boolean('is_specific_geography')
			.notNull()
			.default(false),
		geographyDescription: text('geography_description'),
		waitingPeriod: waitingPeriod('waiting_period')
			.notNull()
			.default('IMMEDIATE'),
		eligibleForReimbursement: eligibleForReimbursement(
			'eligible_for_reimbursement',
		)
			.notNull()
			.default('PREMIUM_ONLY'),
		createdAt: timestamp('created_at').defaultNow(),
		updatedAt: timestamp('updated_at', { mode: 'date', precision: 3 })
			.defaultNow()
			.$onUpdate(() => new Date()),
	},
	(table) => [uniqueIndex('unique_hra_class').on(table.planId, table.name)],
);

export const reimbursementRates = pgTable(
	'reimbursement_rates',
	{
		id: uuid('id')
			.primaryKey()
			.default(sql`uuid_generate_v7()`),
		classId: uuid('class_id')
			.references(() => hraClasses.id)
			.notNull(),
		isVaryingByAge: boolean('is_varying_by_age').notNull().default(false),
		reimbursementAmount: integer('reimbursement_amount').notNull(),
		reimbursementType: reimbursementType('reimbursement_type').notNull(),
		createdAt: timestamp('created_at').defaultNow(),
		updatedAt: timestamp('updated_at', { mode: 'date', precision: 3 })
			.defaultNow()
			.$onUpdate(() => new Date()),
	},
	(table) => [
		uniqueIndex('unique_reimbursement_rate').on(table.classId, table.id),
	],
);

export const ageCurves = pgTable('age_curves', {
	id: uuid('id')
		.primaryKey()
		.default(sql`uuid_generate_v7()`),
	reimbursementRateId: uuid('reimbursement_rate_id')
		.references(() => reimbursementRates.id)
		.notNull(),
	name: varchar('name', { length: 255 }).notNull(),
	state: varchar('state', { length: 2 }).notNull(),
	isDefault: boolean('is_default').notNull().default(false),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'date', precision: 3 })
		.defaultNow()
		.$onUpdate(() => new Date()),
});

export const ageCurveMultipliers = pgTable('age_curve_multipliers', {
	id: uuid('id')
		.primaryKey()
		.default(sql`uuid_generate_v7()`),
	ageCurveId: uuid('age_curve_id')
		.references(() => ageCurves.id)
		.notNull(),
	multiplier: integer('multiplier').notNull(),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'date', precision: 3 })
		.defaultNow()
		.$onUpdate(() => new Date()),
});

export const healthBenefits = pgTable('health_benefits', {
	id: uuid('id')
		.primaryKey()
		.default(sql`uuid_generate_v7()`),
	companyPersonId: uuid('company_person_id')
		.references(() => companyPeople.id)
		.notNull(),
	classId: uuid('class_id')
		.references(() => hraClasses.id)
		.notNull(),
	isWaived: boolean('is_waived').notNull().default(false),
	eligibilityStartDate: date('eligibility_start_date'),
	eligibilityEndDate: date('eligibility_end_date'),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'date', precision: 3 })
		.defaultNow()
		.$onUpdate(() => new Date()),
});

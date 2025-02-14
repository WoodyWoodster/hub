'use server';

import { db } from '@/db';
import { roles } from '@/db/schema';
import { sql } from 'drizzle-orm';

export const getExternalRoles = async () => {
	return await db
		.select()
		.from(roles)
		.where(sql`is_internal = false`)
		.orderBy(roles.name);
};

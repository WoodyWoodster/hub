'use server';

import { parseAndValidateCSV } from '@/lib/utils/csv/roster-validation';

export async function uploadCSV(formData: FormData) {
	const file = formData.get('file') as File;
	if (!file) {
		throw new Error('No file uploaded');
	}

	const content = await file.text();

	const validationResults = parseAndValidateCSV(content);

	return {
		validationResults,
	};
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function submitPeople(people: any[]) {
	const created = people.filter((p) => !p.id).length;
	const updated = people.filter((p) => p.id).length;

	// TODO: Add actual submission logic here

	return { created, updated };
}

'use server';

import {
	addPersonSchema,
	AddPersonValues,
} from '@/lib/schemas/people/add-person-schema';
import { parseAndValidateCSV } from '@/lib/utils/csv/roster-validation';
import { bulkAddPersonAction } from '../people/actions';
import { Roster } from '@/lib/schemas/roster/schema';
import { z } from 'zod';
import { getExternalRoles } from '@/lib/queries/roles/queries';

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

type SubmitPeopleResult = {
	created: number;
	errors: Record<number, Record<string, string[]>> | null;
};

export async function submitPeople(
	companyId: string,
	people: Roster[],
	createdBy: string,
): Promise<SubmitPeopleResult> {
	const validatedPeople: AddPersonValues[] = [];
	const errors: Record<number, Record<string, string[]>> = {};
	const roles = await getExternalRoles();

	people.forEach((person, index) => {
		try {
			console.log('Validating person', person);
			const validatedData = addPersonSchema.parse({
				fullName:
					`${person['First Name']} ${person['Middle Name'] || ''} ${person['Last Name']}`.trim(),
				email: person.Email,
				dateOfBirth: person.DOB,
				hireDate: person['Hire Date'],
				roleId: roles.find((role) => role.name === person.Role)?.id,
				street: person.Address,
				city: person.City,
				state: person.State,
				zipCode: person['Zip Code'],
				companyId,
				createdBy,
			});
			console.log('Validated data', validatedData);
			validatedPeople.push(validatedData);
		} catch (error) {
			if (error instanceof z.ZodError) {
				errors[index] = error.flatten().fieldErrors as Record<string, string[]>;
			} else {
				console.error(`Error processing person at index ${index}:`, error);
				errors[index] = { form: ['An unexpected error occurred'] };
			}
		}
	});

	if (Object.keys(errors).length > 0) {
		return {
			created: 0,
			errors,
		};
	}

	console.log('Count of validated people:', validatedPeople.length);

	try {
		const result = await bulkAddPersonAction(validatedPeople);
		return {
			created: result.created,
			errors: result.errors,
		};
	} catch (error) {
		console.error('Error in bulk person creation:', error);
		return {
			created: 0,
			errors: Object.keys(errors).length > 0 ? errors : null,
		};
	}
}

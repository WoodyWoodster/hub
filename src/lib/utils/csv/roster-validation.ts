import { Roster, RosterSchema } from '@/lib/schemas/roster/schema';
import { parse } from 'csv-parse/sync';

export function parseAndValidateCSV(csvContent: string) {
	const records = parse(csvContent, { columns: true, skip_empty_lines: true });
	const results: {
		data: Roster;
		errors: Record<string, string> | null;
	}[] = [];

	records.forEach((record: Record<string, string>) => {
		const result = RosterSchema.safeParse({
			...record,
			age: record.age ? Number.parseInt(record.age, 10) : undefined,
		});

		if (result.success) {
			results.push({ data: result.data, errors: null });
		} else {
			const errors: Record<string, string> = {};
			console.log(result.error.issues);
			result.error.issues.forEach((issue) => {
				errors[issue.path[0]] = issue.message;
			});
			results.push({ data: record as Roster, errors });
		}
	});

	return results;
}

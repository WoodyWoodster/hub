import React from 'react';
import { CompanyWidgets } from '@/components/custom/companyWidgets';

export default function Dashboard() {
	return (
		<>
			<h1 className="mb-6 font-display text-3xl font-semibold">Dashboard</h1>
			<CompanyWidgets />
			{/* <EmployeeWidgets /> */}
		</>
	);
}

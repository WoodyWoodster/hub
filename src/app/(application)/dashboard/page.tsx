import React from 'react';
import { CompanyWidgets } from '@/components/custom/company-widgets';

export default function Dashboard() {
	return (
		<>
			<h1 className="font-display mb-6 text-3xl font-semibold">Dashboard</h1>
			<CompanyWidgets />
			{/* <EmployeeWidgets /> */}
		</>
	);
}

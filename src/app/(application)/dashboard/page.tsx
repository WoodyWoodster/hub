import React from 'react';
import { EmployeeWidgets } from '@/components/custom/employeeWidgets';

export default function Dashboard() {
	return (
		<>
			<h1 className="mb-6 font-display text-3xl font-semibold">Dashboard</h1>
			<EmployeeWidgets />
		</>
	);
}

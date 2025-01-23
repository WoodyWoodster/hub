import React from 'react';
import { AutoPayWidget } from '@/components/custom/widgets/employer/autopayWidget';
import { companyWidgets } from '@/lib/dashboardWidgets';

export default function AutoPay() {
	return (
		<>
			<h1 className="mb-6 font-display text-3xl font-semibold">AutoPay</h1>
			{companyWidgets.autopayWidget.map((widget) => (
				<AutoPayWidget
					key={widget.title}
					title={widget.title}
					autopayColumns={widget.autopayColumns}
				/>
			))}
		</>
	);
}

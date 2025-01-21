import { employeeWidgets } from '@/lib/dashboardWidgets';
import { EmployeeTopWidget } from './widgets/employeeTopWidget';
import { PremiumWidget } from './widgets/premiumWidget';

export function EmployeeWidgets() {
	const employeeTopWidgetsCount = employeeWidgets.topWidgets.length;
	return (
		<div className="flex flex-col gap-4">
			<div className={`grid grid-cols-${employeeTopWidgetsCount} gap-4`}>
				{employeeWidgets.topWidgets.map((widget, index) => (
					<EmployeeTopWidget key={index} {...widget} />
				))}
			</div>

			<PremiumWidget
				title="Recent Premiums"
				premiums={employeeWidgets.premiumWidget.premiums}
			/>
		</div>
	);
}

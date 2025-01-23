import { companyWidgets } from '@/lib/dashboardWidgets';
import { AutoPayWidget } from './widgets/employer/autopayWidget';
import { EnrollmentChart } from './widgets/employer/enrollmentChart';
import { ComplianceChart } from './widgets/employer/complianceChart';
import { UpdatesWidget } from './widgets/employer/updatesWidget';

export function CompanyWidgets() {
	// const employeeTopWidgetsCount = employeeWidgets.topWidgets.length;
	return (
		<div className="flex flex-col gap-4">
			{companyWidgets.autopayWidget.map((widget) => (
				<AutoPayWidget
					key={widget.title}
					title={widget.title}
					autopayColumns={widget.autopayColumns}
				/>
			))}
			<div className="grid grid-cols-2 gap-4">
				<EnrollmentChart />
				<ComplianceChart />
			</div>
			<div className="gap-4">
				<UpdatesWidget
					title="Recent Updates"
					updates={companyWidgets.updatesWidget.updates}
				/>
			</div>
		</div>
	);
}

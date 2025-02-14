import { companyWidgets } from '@/lib/dashboardWidgets';
import { UpdatesWidget } from './widgets/employer/updates-widget';
import { AutopayWidget } from './widgets/employer/autopay-widget';
import { EnrollmentChart } from './widgets/employer/enrollment-chart';
import { ComplianceChart } from './widgets/employer/compliance-chart';

export function CompanyWidgets() {
	return (
		<div className="flex flex-col gap-4">
			{companyWidgets.autopayWidget.map((widget) => (
				<AutopayWidget
					key={widget.title}
					title={widget.title}
					autopayColumns={widget.autopayColumns}
				/>
			))}
			<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
				<EnrollmentChart />
				<ComplianceChart />
			</div>
			<div className="w-full">
				<UpdatesWidget
					title="Recent Updates"
					updates={companyWidgets.updatesWidget.updates}
				/>
			</div>
		</div>
	);
}

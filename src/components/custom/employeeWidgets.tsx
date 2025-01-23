import { employeeWidgets } from '@/lib/dashboardWidgets';
import { EmployeeTopWidget } from './widgets/employee/employeeTopWidget';
import { PremiumWidget } from './widgets/employee/premiumWidget';
import { TransactionsWidget } from './widgets/employee/transactionsWidget';

export function EmployeeWidgets() {
	// const employeeTopWidgetsCount = employeeWidgets.topWidgets.length;
	return (
		<div className="flex flex-col gap-4">
			<div className={`grid grid-cols-3 gap-4`}>
				{employeeWidgets.topWidgets.map((widget, index) => (
					<EmployeeTopWidget key={index} {...widget} />
				))}
			</div>
			<div className="grid grid-cols-3 gap-4">
				<PremiumWidget
					title="Recent Premiums"
					premiums={employeeWidgets.premiumWidget.premiums}
				/>
				<TransactionsWidget
					className="col-span-2"
					title="Recent Transactions"
					transactions={employeeWidgets.transactionsWidget.transactions}
				/>
			</div>
		</div>
	);
}

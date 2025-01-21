import { BriefcaseMedical, HeartPulse } from 'lucide-react';

export const employeeWidgets = {
	topWidgets: [
		{
			title: 'Reimbursement Allowance',
			amount: [
				{
					type: 'neutral',
					amount: '$1,250.00',
					frequency: 'Monthly',
				},
			],
			data: [
				{
					description: 'You + Spouse + 2 Dependents',
				},
			],
		},
		{
			title: 'Monthly Premium Costs',
			amount: [
				{
					type: 'negative',
					amount: '$975.06',
					frequency: 'Monthly',
				},
			],
			data: [
				{
					icon: HeartPulse,
					description: 'Oscar Bronze Simple - Standard',
				},
				{
					icon: BriefcaseMedical,
					description: 'Delta Dental',
				},
			],
		},
		{
			title: 'Remaining Allowance',
			amount: [
				{
					type: 'positive',
					amount: '$549.88',
				},
			],
			data: [
				{
					description: 'Available through February 2025',
				},
			],
		},
	],
	premiumWidget: {
		title: '2025 Premiums',
		premiums: [
			{
				isPrimaryInsurance: true,
				planType: 'Health',
				planTitle: 'Oscar Bronze Simple - Standard',
				monthlyCost: '$975.06',
			},
			{
				isPrimaryInsurance: false,
				planType: 'Dental',
				planTitle: 'Delta Dental',
				monthlyCost: '$19.92',
			},
			{
				isPrimaryInsurance: false,
				planType: 'Vision',
				planTitle: 'VSP',
				monthlyCost: '$66.72',
			},
		],
	},
	transactionWidget: {
		title: 'Recent Transactions',
		transactions: [
			{
				date: '2025-01-01',
				type: 'Medical Expense',
				amount: '$275.00',
			},
			{
				date: '2025-01-01',
				type: 'AutoPay Premium',
				amount: '$908.75',
			},
		],
	},
};

export const companyWidgets = {
	topWidgets: [
		{
			title: 'Total Allowance',
		},
	],
};

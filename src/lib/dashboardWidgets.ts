import { BriefcaseMedical, HeartPulse } from 'lucide-react';

const today = new Date().toLocaleDateString();

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
	transactionsWidget: {
		title: 'Recent Transactions',
		transactions: [
			{
				id: 1,
				date: '2025-01-01',
				type: 'Medical Expense',
				amount: '$275.00',
				status: 'Rejected',
			},
			{
				id: 2,
				date: '2025-01-01',
				type: 'AutoPay Premium',
				amount: '$908.75',
				status: 'Reimbursed',
			},
			{
				id: 3,
				date: '2025-01-01',
				type: 'AutoPay Premium',
				amount: '$908.75',
				status: 'Pending',
			},
			{
				id: 4,
				date: '2025-01-01',
				type: 'AutoPay Premium',
				amount: '$908.75',
				status: 'Pending',
			},
			{
				id: 5,
				date: '2025-01-01',
				type: 'AutoPay Premium',
				amount: '$908.75',
				status: 'Pending',
			},
			{
				id: 6,
				date: '2025-01-01',
				type: 'AutoPay Premium',
				amount: '$908.75',
				status: 'Pending',
			},
			{
				id: 7,
				date: '2025-01-01',
				type: 'AutoPay Premium',
				amount: '$908.75',
				status: 'Pending',
			},
		],
	},
};

export const companyWidgets = {
	autopayWidget: [
		{
			title: 'AutoPay',
			autopayColumns: {
				upcomingFunding: {
					title: 'Upcoming Funding',
					amount: '$89,737.64',
					updatedDate: today,
				},
				dispersement: {
					title: 'Account Balance',
					amount: '$52,311.29',
					updatedDate: today,
				},
				participation: {
					title: 'AutoPay Participation',
					percentage: '98%',
					updatedDate: today,
				},
			},
		},
	],
	updatesWidget: {
		title: 'Recent Updates',
		updates: [
			{
				id: 1,
				employeeName: 'Miles O’Brien',
				date: '2025-01-01',
				status: 'Terminated',
			},
			{
				id: 2,
				employeeName: 'Benjamin Sisko',
				date: '2025-01-01',
				status: 'New Employee',
			},
			{
				id: 3,
				employeeName: 'Marla Laster',
				date: '2025-01-01',
				status: 'Shopping',
			},
		],
	},
};

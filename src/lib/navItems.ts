import {
	BookOpen,
	Bot,
	Building2,
	CheckCircle2,
	DollarSign,
	LayoutDashboardIcon,
	Library,
	MessageCircleQuestion,
	Settings,
	SquareTerminal,
	UserCircle,
	Users,
	Home,
	Info,
	HeartPulse,
	ClipboardPlus,
} from 'lucide-react';

export const navItems = {
	employee: [
		{
			title: 'Dashboard',
			url: '/dashboard',
			icon: SquareTerminal,
			isActive: true,
		},
		{
			title: 'Benefits',
			url: '/benefits',
			icon: Bot,
		},
		{
			title: 'Documents',
			url: '/documents',
			icon: BookOpen,
		},
	],
	admin: [
		{
			title: 'Dashboard',
			url: '/dashboard',
			icon: LayoutDashboardIcon,
			isActive: true,
		},
		{
			title: 'People',
			url: '/people',
			icon: Users,
		},
		{
			title: 'Documents',
			url: '/documents',
			icon: BookOpen,
		},
		{
			title: 'Settings',
			url: '/settings',
			icon: Settings,
		},
	],
	tcHub: [
		{
			title: 'Users',
			url: '#',
			icon: UserCircle,
			isActive: true,
		},
		{
			title: 'Companies',
			url: '#',
			icon: Building2,
		},
		{
			title: 'AutoPay',
			url: '#',
			icon: DollarSign,
			items: [
				{
					title: 'Transfer',
					url: '#',
				},
				{
					title: 'Accounts',
					url: '#',
				},
				{
					title: 'Registration Tracking',
					url: '#',
				},
				{
					title: 'Funding Events',
					url: '#',
				},
				{
					title: 'Funding Reports',
					url: '#',
				},
				{
					title: 'Issues',
					url: '#',
				},
			],
		},
		{
			title: 'Settings',
			url: '#',
			icon: Settings,
			items: [
				{
					title: 'General',
					url: '#',
				},
				{
					title: 'Team',
					url: '#',
				},
				{
					title: 'Billing',
					url: '#',
				},
				{
					title: 'Limits',
					url: '#',
				},
			],
		},
	],
	resources: [
		{
			name: 'Support',
			url: '#',
			icon: MessageCircleQuestion,
		},
		{
			name: 'Resource Center',
			url: '#',
			icon: Library,
		},
	],
	shopping: [
		{
			title: 'Personal Information',
			icon: CheckCircle2,
			items: [
				{ title: 'Basic Info', url: '/shopping/personal-info' },
				{ title: 'Location', url: '/shopping/personal-info/zip' },
				{ title: 'Household', url: '/shopping/household' },
				{ title: 'Household Income', url: '/shopping/household-income' },
			],
		},
		{
			title: 'Medical Preferences',
			icon: CheckCircle2,
			items: [
				{ title: 'Doctor Preferences', url: '/shopping/preferences/doctor' },
				{
					title: 'Hospital Preferences',
					url: '/shopping/preferences/hospital',
				},
				{
					title: 'Prescription Preferences',
					url: '/shopping/preferences/prescription',
				},
			],
		},
		{
			title: 'Health Plan Selection',
			icon: CheckCircle2,
			items: [
				{
					title: 'Find a Health Plan',
					url: '/shopping/plan-selection/plan-finder',
				},
				{
					title: 'Carrier Questions',
					url: '/shopping/plan-selection/carrier-questions',
				},
			],
		},
		{
			title: 'Review',
			icon: CheckCircle2,
			items: [
				{ title: 'Review Details', url: '/shopping/review' },
				{ title: 'Complete Purchase', url: '/shopping/review/purchase' },
			],
		},
	],
};

export const shoppingNavItems = [
	{
		title: 'Welcome',
		icon: Home,
		items: [{ title: 'Get Started', url: '/shopping' }],
	},
	{
		title: 'Personal Information',
		icon: Info,
		items: [
			{ title: 'Basic Information', url: '/shopping/personal-info' },
			{ title: 'ZIP Code', url: '/shopping/personal-info/zip' },
			{ title: 'Tobacco Usage', url: '/shopping/personal-info/tobacco-usage' },
			{
				title: 'Medicaid Eligibility',
				url: '/shopping/personal-info/medicaid',
			},
			{ title: 'Household', url: '/shopping/personal-info/household' },
			{
				title: 'Household Income',
				url: '/shopping/personal-info/household-income',
			},
		],
	},
	{
		title: 'Medical Preferences',
		icon: HeartPulse,
		items: [
			{ title: 'Doctors', url: '/shopping/preferences/doctors' },
			{ title: 'Hospitals', url: '/shopping/preferences/hospitals' },
			{ title: 'Prescriptions', url: '/shopping/preferences/prescriptions' },
		],
	},
	{
		title: 'Health Plan Selection',
		icon: ClipboardPlus,
		items: [
			{ title: 'Available Plans', url: '/shopping/plans' },
			{ title: 'Plan Comparison', url: '/shopping/plans/compare' },
		],
	},
	{
		title: 'Review & Submit',
		icon: CheckCircle2,
		items: [
			{ title: 'Review Information', url: '/shopping/review' },
			{ title: 'Submit Application', url: '/shopping/review/submit' },
		],
	},
];

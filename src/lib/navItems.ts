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
			url: '/shopping/personal-info',
			icon: CheckCircle2,
		},
		{
			title: 'Dependents',
			url: '/shopping/household',
			icon: CheckCircle2,
		},
		{
			title: 'Household Income',
			url: '/shopping/household-income',
			icon: CheckCircle2,
		},
		{
			title: 'Doctor Preferences',
			url: '/shopping/doctors',
			icon: CheckCircle2,
		},
		{
			title: 'Hospital Preferences',
			url: '/shopping/hospitals',
			icon: CheckCircle2,
		},
		{
			title: 'Prescription Preferences',
			url: '/shopping/prescriptions',
			icon: CheckCircle2,
		},
		{
			title: 'Plan Selection',
			url: '/shopping/plan-selection',
			icon: CheckCircle2,
		},
		{
			title: 'Carrier Questions',
			url: '/shopping/carrier-questions',
			icon: CheckCircle2,
		},
		{
			title: 'Review',
			url: '/shopping/review',
			icon: CheckCircle2,
		},
	],
};

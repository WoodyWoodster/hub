import {
	BookOpen,
	Bot,
	Building2,
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
};

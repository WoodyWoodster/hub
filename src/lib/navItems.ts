import {
	BookOpen,
	Bot,
	Command,
	GalleryVerticalEnd,
	LayoutDashboardIcon,
	Library,
	Map,
	MessageCircleQuestion,
	Settings,
	Settings2,
	SquareTerminal,
	Users,
} from 'lucide-react';

export const navItems = {
	user: {
		name: 'Hostile',
		email: 'hostile@takecommandhealth.com',
		avatar: '/avatars/shadcn.jpg',
	},
	teams: [
		{
			name: 'Take Command Health',
			logo: GalleryVerticalEnd,
			plan: 'Professional',
		},
		{
			name: 'Goodfolks, LLC',
			logo: Command,
			plan: 'Free',
		},
		{
			name: 'Acme, Inc.',
			logo: Map,
			plan: 'Free',
		},
	],
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
			icon: SquareTerminal,
			isActive: true,
		},
		{
			title: 'Companies',
			url: '#',
			icon: Bot,
		},
		{
			title: 'AutoPay',
			url: '#',
			icon: BookOpen,
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
			icon: Settings2,
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

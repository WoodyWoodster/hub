'use client';

import * as React from 'react';

import { NavMain } from '@/components/nav-main';
import { NavResources } from '@/components/nav-resources';
import { NavUser } from '@/components/nav-user';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
	SidebarSeparator,
} from '@/components/ui/sidebar';
import { LogoPrimary } from '@/components/logo';
import { navItems } from '@/lib/navItems';
import { usePathname } from 'next/navigation';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const pathname = usePathname();

	const getNavItems = () => {
		if (pathname?.startsWith('/admin')) {
			return navItems.tcHub;
		} else {
			return navItems.admin;
		}
	};
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<LogoPrimary className="w-48" />
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={getNavItems()} />
			</SidebarContent>
			<SidebarFooter>
				<NavResources resources={navItems.resources} />
				<SidebarSeparator />
				<NavUser user={navItems.user} teams={navItems.teams} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}

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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<LogoPrimary className="w-48" />
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={navItems.admin} />
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

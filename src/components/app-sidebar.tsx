'use client';

import * as React from 'react';

import { NavMain } from '@/components/nav-main';
import { NavProjects } from '@/components/nav-projects';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from '@/components/ui/sidebar';
import { navItems } from '@/lib/navItems';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar
			collapsible="icon"
			{...props}
		>
			<SidebarHeader>
				<TeamSwitcher teams={navItems.teams} />
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={navItems.navMain} />
				<NavProjects projects={navItems.projects} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={navItems.user} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}

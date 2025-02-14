'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

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
import { LogoPrimaryReversed } from '@/components/logo';
import { navItems, shoppingNavItems } from '@/lib/navItems';
import { NavShopping } from '@/components/nav-shopping';

export function ShoppingSidebar({
	className,
	...props
}: React.ComponentProps<'div'>) {
	return (
		<div className="bg-blue-700">
			<Sidebar
				collapsible="icon"
				className={cn(
					'[&_[data-sidebar=sidebar]]:bg-seafoam-700 text-white',
					'[&_.bg-sidebar]:bg-seafoam-700 text-white',
					'[&_[data-sidebar=menu-button]]:text-sm',
					'[&_[data-sidebar=menu-sub-button]]:text-sm',
					'[&_[data-sidebar=menu-button]_svg]:size-4',
					'[&_[data-sidebar=menu-sub-button]_svg]:size-3',
					className,
				)}
				{...props}
			>
				<SidebarHeader className="pr-8">
					<LogoPrimaryReversed />
				</SidebarHeader>
				<SidebarContent>
					<NavShopping items={shoppingNavItems} />
				</SidebarContent>
				<SidebarFooter>
					<NavResources resources={navItems.resources} />
					<SidebarSeparator />
					<NavUser />
				</SidebarFooter>
				<SidebarRail />
			</Sidebar>
		</div>
	);
}

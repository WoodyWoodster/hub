'use client';

import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import { LucideIcon } from 'lucide-react';

export function NavResources({
	resources,
}: {
	resources: {
		name: string;
		url: string;
		icon: LucideIcon;
	}[];
}) {
	return (
		<SidebarGroup className="group-data-[collapsible=icon]:hidden">
			<SidebarGroupLabel>Resources</SidebarGroupLabel>
			<SidebarMenu>
				{resources.map((item) => (
					<SidebarMenuItem key={item.name}>
						<SidebarMenuButton size="sm" asChild>
							<a href={item.url}>
								<item.icon />
								<span>{item.name}</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}

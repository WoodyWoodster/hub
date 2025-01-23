'use client';

import { ChevronRight, type LucideIcon } from 'lucide-react';

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
	SidebarGroup,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function NavMain({
	items,
}: {
	items: {
		title: string;
		url: string;
		icon?: LucideIcon;
		isActive?: boolean;
		items?: {
			title: string;
			url: string;
		}[];
	}[];
}) {
	const pathname = usePathname();

	return (
		<SidebarGroup>
			<SidebarMenu>
				{items.map((item) => (
					<React.Fragment key={item.title}>
						{item.items && (
							<Collapsible
								key={item.title}
								asChild
								defaultOpen={pathname.startsWith(item.url)}
								className="group/collapsible"
							>
								<SidebarMenuItem>
									<CollapsibleTrigger asChild>
										<SidebarMenuButton tooltip={item.title} asChild>
											<Link href={item.url}>
												{item.icon && <item.icon />}
												<span>{item.title}</span>
												<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
											</Link>
										</SidebarMenuButton>
									</CollapsibleTrigger>
									<CollapsibleContent>
										<SidebarMenuSub>
											{item.items?.map((subItem) => (
												<SidebarMenuSubItem key={subItem.title}>
													<SidebarMenuSubButton asChild>
														<a href={subItem.url}>
															<span>{subItem.title}</span>
														</a>
													</SidebarMenuSubButton>
												</SidebarMenuSubItem>
											))}
										</SidebarMenuSub>
									</CollapsibleContent>
								</SidebarMenuItem>
							</Collapsible>
						)}
						{!item.items && (
							<SidebarMenuItem key={item.title}>
								<SidebarMenuButton
									isActive={pathname.startsWith(item.url)}
									tooltip={item.title}
									asChild
								>
									<Link href={item.url}>
										{item.icon && <item.icon />}
										<span>{item.title}</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						)}
					</React.Fragment>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}

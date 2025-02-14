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

export function NavShopping({
	items,
}: {
	items: {
		title: string;
		icon?: LucideIcon;
		items?: {
			title: string;
			url: string;
		}[];
	}[];
}) {
	const pathname = usePathname();

	const isPersonalInfoSection = (items: { url: string }[]) => {
		return items?.some(
			(item) =>
				item.url.startsWith('/shopping/personal-info') ||
				item.url.startsWith('/shopping/medicaid') ||
				item.url.startsWith('/shopping/tobacco') ||
				item.url.startsWith('/shopping/household'),
		);
	};

	return (
		<SidebarGroup>
			<SidebarMenu>
				{items.map((item) => (
					<React.Fragment key={item.title}>
						{item.items && (
							<Collapsible
								key={item.title}
								asChild
								defaultOpen={isPersonalInfoSection(item.items)}
								className="group/collapsible"
							>
								<SidebarMenuItem>
									<CollapsibleTrigger asChild>
										<SidebarMenuButton tooltip={item.title}>
											<div className="flex w-full items-center">
												{item.icon && <item.icon />}
												<span className="ml-2 block text-sm">{item.title}</span>
												<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
											</div>
										</SidebarMenuButton>
									</CollapsibleTrigger>
									<CollapsibleContent>
										<SidebarMenuSub>
											{item.items?.map((subItem) => (
												<SidebarMenuSubItem key={subItem.title}>
													<SidebarMenuSubButton
														asChild
														isActive={pathname === subItem.url}
														className="hover:bg-seafoam-600 data-[active=true]:bg-seafoam-600 active:bg-seafoam-600 !text-white"
													>
														<Link href={subItem.url}>
															<span>{subItem.title}</span>
														</Link>
													</SidebarMenuSubButton>
												</SidebarMenuSubItem>
											))}
										</SidebarMenuSub>
									</CollapsibleContent>
								</SidebarMenuItem>
							</Collapsible>
						)}
					</React.Fragment>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}

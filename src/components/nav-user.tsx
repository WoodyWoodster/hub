'use client';

import {
	Building,
	Building2,
	ChevronsUpDown,
	LogOut,
	User,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from '@/components/ui/sidebar';
import React from 'react';
import { LogOutButton } from './custom/buttons/people/log-out-button';
import { useSession } from 'next-auth/react';
import { getCompaniesForPerson } from '@/lib/actions/people/actions';
import { useQuery } from '@tanstack/react-query';

export function NavUser() {
	const { isMobile } = useSidebar();
	const [activeCompany, setActiveCompany] = React.useState({});
	const session = useSession();
	const user = {
		id: session?.data?.user?.personId as string,
		name: session?.data?.user?.name as string,
		email: session?.data?.user?.email as string,
		image: session?.data?.user?.image as string,
		initials: session?.data?.user?.name
			?.split(' ')
			.map((word) => word.charAt(0))
			.join(''),
	};
	// TODO: Consider moving this out of the component
	const {
		data: companies,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['companies', user.id],
		queryFn: () => getCompaniesForPerson(user.id),
		enabled: !!user.id,
	});

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error loading companies</div>;

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Avatar className="h-8 w-8 rounded-lg">
								<AvatarImage src={user.image} alt={user.name} />
								<AvatarFallback className="rounded-lg">
									{user.initials}
								</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-semibold">{user.name}</span>
								<span className="truncate text-xs">{user.email}</span>
							</div>
							<ChevronsUpDown className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className={`${
							activeCompany
								? 'w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
								: 'w-0'
						} min-w-56 rounded-lg`}
						side={isMobile ? 'bottom' : 'right'}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<Avatar className="h-8 w-8 rounded-lg">
									<AvatarImage src={user.image} alt={user.name} />
									<AvatarFallback className="rounded-lg">
										{user.initials}
									</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-semibold">{user.name}</span>
									<span className="truncate text-xs">{user.email}</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<User />
								My Profile
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Building2 />
								Switch to company profile
							</DropdownMenuItem>
						</DropdownMenuGroup>

						<DropdownMenuSeparator />
						<DropdownMenuLabel className="text-muted-foreground text-xs">
							Companies
						</DropdownMenuLabel>
						{companies?.map((company) => (
							<DropdownMenuItem
								key={company.name}
								onClick={() => setActiveCompany(company)}
								className="gap-2 p-2"
							>
								<div className="flex size-6 items-center justify-center rounded-sm border">
									<Building className="size-4" />
								</div>
								{company.name}
							</DropdownMenuItem>
						))}
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<LogOut />
							<LogOutButton />
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}

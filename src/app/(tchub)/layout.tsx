import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Bell, Search, Settings } from 'lucide-react';

export default function ApplicationLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
					<div className="flex flex-1 items-center justify-end gap-4 px-8">
						<Bell className="size-5" />
						<Settings className="size-5" />
						<Search className="size-5" />
					</div>
				</header>
				<main className="px-8">{children}</main>
			</SidebarInset>
		</SidebarProvider>
	);
}

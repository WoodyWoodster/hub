'use client';

import { ShoppingSidebar } from '@/components/shopping-sidebar';
import { LogoMark } from '@/components/logo';
import { Button } from '@/components/ui/button';
import {
	SidebarInset,
	SidebarProvider,
	useSidebar,
} from '@/components/ui/sidebar';
import { Bell, Menu, Search } from 'lucide-react';
import Link from 'next/link';
import { AnimatePresence } from 'framer-motion';

function HeaderContent() {
	const { setOpenMobile } = useSidebar();

	return (
		<div className="flex flex-1 items-center justify-between gap-4 px-8 md:justify-end">
			<Button
				variant="ghost"
				size="icon"
				className="md:hidden"
				onClick={() => setOpenMobile(true)}
			>
				<Menu className="size-8" />
			</Button>
			<Link href="/" className="block md:hidden">
				<LogoMark className="h-10" />
			</Link>
			<div className="flex items-center gap-4">
				<Bell className="size-5" />
				<Search className="size-5" />
			</div>
		</div>
	);
}

export default function ShoppingLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<SidebarProvider>
			<ShoppingSidebar />
			<SidebarInset>
				<header className="mb-8 flex h-16 shrink-0 items-center gap-2 bg-white shadow-sm transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:mb-0 md:bg-transparent md:shadow-none">
					<HeaderContent />
				</header>
				<main className="px-8">
					<div className="mx-auto max-w-3xl py-12">
						<AnimatePresence mode="wait" initial={true}>
							{children}
						</AnimatePresence>
					</div>
				</main>
			</SidebarInset>
		</SidebarProvider>
	);
}

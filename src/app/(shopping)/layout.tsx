'use client';

import { ShoppingSidebar } from '@/components/shopping-sidebar';
import { LogoMark } from '@/components/logo';
import { Button } from '@/components/ui/button';
import {
	SidebarInset,
	SidebarProvider,
	useSidebar,
} from '@/components/ui/sidebar';
import { Bell, Menu, Search, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { navItems } from '@/lib/navItems';

const pageVariants = {
	initial: {
		opacity: 0,
		x: 20,
	},
	animate: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.5,
			ease: 'easeOut',
		},
	},
	exit: {
		opacity: 0,
		x: -20,
		transition: {
			duration: 0.3,
			ease: 'easeIn',
		},
	},
};

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
	const pathname = usePathname();
	const router = useRouter();

	// Find current page index in shopping flow
	const currentPageIndex = navItems.shopping.findIndex(
		(item) => item.url === pathname,
	);
	const previousPage =
		currentPageIndex > 0 ? navItems.shopping[currentPageIndex - 1].url : null;
	const nextPage =
		currentPageIndex < navItems.shopping.length - 1
			? navItems.shopping[currentPageIndex + 1].url
			: null;

	return (
		<SidebarProvider>
			<ShoppingSidebar />
			<SidebarInset>
				<header className="mb-8 flex h-16 shrink-0 items-center gap-2 bg-white shadow-sm transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:mb-0 md:bg-transparent md:shadow-none">
					<HeaderContent />
				</header>
				<main className="px-8">
					<AnimatePresence mode="wait">
						<motion.div
							key={pathname}
							initial="initial"
							animate="animate"
							exit="exit"
							variants={pageVariants}
							className="mx-auto max-w-3xl py-12"
						>
							<div className="space-y-12">
								{children}

								<div className="flex justify-between pt-8">
									{previousPage ? (
										<Button
											variant="ghost"
											onClick={() => router.push(previousPage)}
											className="flex items-center gap-2"
										>
											<ChevronLeft className="h-4 w-4" />
											Back
										</Button>
									) : (
										<div /> // Empty div for spacing
									)}

									{nextPage && (
										<Button
											onClick={() => router.push(nextPage)}
											className="bg-primary hover:bg-primary/90"
										>
											Continue
										</Button>
									)}
								</div>
							</div>
						</motion.div>
					</AnimatePresence>
				</main>
			</SidebarInset>
		</SidebarProvider>
	);
}

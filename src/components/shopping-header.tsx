'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ChevronDown, LogOut, MapPin, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function ShoppingHeader() {
	const router = useRouter();

	return (
		<div className="border-b bg-white">
			<div className="flex h-14 items-center justify-between px-4">
				<div className="flex items-center">
					<div className="flex items-center gap-3 text-sm">
						<MapPin className="size-4" />
						<span className="text-sm font-bold">75098</span>
					</div>
					<Separator orientation="vertical" className="bg-onyx-200 mx-4 h-4" />
					<div className="flex items-center gap-2 text-sm">
						<Users className="size-4" />
						<span className="block">
							<strong className="font-bold">2</strong> People
						</span>
					</div>
					<Separator orientation="vertical" className="bg-onyx-200 mx-4 h-4" />
					<div className="flex items-center gap-3 text-sm">
						<span>Allowance</span>
						<span className="text-seafoam-600 font-bold">$550</span>
					</div>
					<div className="ml-8 flex items-center gap-3">
						<Button
							variant="outline"
							size="sm"
							className="flex items-center gap-1 text-sm"
						>
							Edit
							<ChevronDown className="h-4 w-4" />
						</Button>
					</div>
				</div>

				<div className="flex items-center space-x-2">
					<Button
						variant="secondary"
						size="sm"
						className="flex items-center gap-1 text-sm"
						onClick={() => router.push('/dashboard')}
					>
						Exit to Dashboard
						<LogOut className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	);
}

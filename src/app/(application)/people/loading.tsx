import { Loader2 } from 'lucide-react';

export default function Loading() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
			<div className="rounded-lg bg-white p-8 shadow-2xl dark:bg-gray-800">
				<Loader2 className="text-primary h-16 w-16 animate-spin dark:text-blue-400" />
				<p className="mt-4 animate-pulse text-lg font-semibold text-gray-700 dark:text-gray-300">
					Loading...
				</p>
			</div>
		</div>
	);
}

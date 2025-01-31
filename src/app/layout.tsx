import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Toaster } from '@/components/ui/toaster';
import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { ReactQueryProvider } from '@/lib/providers/query-provider';

export const metadata: Metadata = {
	title: 'Take Command Health',
	description: 'Helping people Take Command of their health insurance',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="font-sans antialiased">
				<SessionProvider>
					<ReactQueryProvider>{children}</ReactQueryProvider>
				</SessionProvider>
				<Analytics />
				<SpeedInsights />
				<Toaster />
			</body>
		</html>
	);
}

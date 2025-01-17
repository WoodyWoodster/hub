import type { Metadata } from 'next';
import '../styles/globals.css';

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
			<body className="font-sans antialiased">{children}</body>
		</html>
	);
}

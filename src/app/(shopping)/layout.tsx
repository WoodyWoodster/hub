export default function ShoppingLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<h1>Shopping</h1>
			{children}
		</>
	);
}

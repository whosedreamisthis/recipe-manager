import type { Metadata } from 'next';

import './globals.css';
import TopNav from '@/components/Navigation/TopNav';
import Sidebar from '@/components/Navigation/Sidebar';

export const metadata: Metadata = {
	title: 'Recipe Manager',
	description: 'recipe manager',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<TopNav />
				<div className="flex">
					<Sidebar />
					<main> {children} </main>
				</div>
			</body>
		</html>
	);
}

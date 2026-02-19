import type { Metadata } from 'next';

import './globals.css';
import TopNav from '@/components/Navigation/TopNav';
import Sidebar from '@/components/Navigation/Sidebar';
import BottomNav from '@/components/Navigation/BottomNav';

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
			<body className="h-[100dvh] flex flex-col overflow-hidden">
				<TopNav />
				<main className="flex-1 overflow-y-auto no-scrollbar relative">
					<div className="max-w-2xl mx-auto p-4">{children}</div>
				</main>
				<BottomNav />
			</body>
		</html>
	);
}

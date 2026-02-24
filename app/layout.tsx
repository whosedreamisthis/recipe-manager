import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { Suspense } from 'react';

import './globals.css';
import TopNav from '@/components/Navigation/TopNav';
import BottomNav from '@/components/Navigation/BottomNav';
import Providers from '@/components/Providers';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from '@/components/ui/sonner';

const roboto = Roboto({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-roboto', // This creates a CSS variable
});

export const metadata: Metadata = {
	title: 'Recipe Manager',
	description: 'recipe manager',
	icons: {
		icon:
			'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👨‍🍳</text></svg>',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en">
				<head>
					<link rel="preconnect" href="https://images.unsplash.com" />
					<link
						rel="dns-prefetch"
						href="https://images.unsplash.com"
					/>
				</head>
				<body
					className={`flex flex-col ${roboto.className} antialiased`}
				>
					<Providers>
						<Suspense fallback={<div className="h-10" />}>
							<TopNav />
						</Suspense>
						<main className="flex-1 overflow-y-auto no-scrollbar relative">
							<div className="max-w-2xl mx-auto p-4">
								<Suspense
									fallback={<div className="h-0 opacity-0" />}
								>
									{children}
								</Suspense>
							</div>
						</main>
						<BottomNav />
					</Providers>
					<Toaster position="bottom-right" richColors />
				</body>
			</html>
		</ClerkProvider>
	);
}

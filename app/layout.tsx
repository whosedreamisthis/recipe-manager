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
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body
					className={`flex flex-col ${roboto.variable} font-sans antialiased`}
				>
					<Providers>
						<Suspense fallback={<div className="h-10" />}>
							<TopNav />
						</Suspense>
						<main className="flex-1 overflow-y-auto no-scrollbar relative">
							<div className="max-w-2xl mx-auto p-4">
								<Suspense
									fallback={
										<div className="h-screen flex items-center justify-center">
											Loading...
										</div>
									}
								>
									{children}
								</Suspense>
							</div>
							<Toaster position="bottom-right" richColors />
						</main>
						<BottomNav />
					</Providers>
				</body>
			</html>
		</ClerkProvider>
	);
}

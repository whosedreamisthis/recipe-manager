'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ThumbsDown, UtensilsCrossed } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link'; // Import Link
import { useUIStore } from '@/stores/useUIStore'; // Import UI Store
import { useEffect } from 'react';
import {
	ClerkProvider,
	SignInButton,
	SignUpButton,
	SignedIn,
	SignedOut,
	UserButton,
} from '@clerk/nextjs';
import ProfileButton from '../ProfileButton';
export default function TopNav() {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const router = useRouter();
	const setActiveTab = useUIStore((state) => state.setActiveTab);

	const isDetailPage =
		pathname.startsWith('/recipes/') && pathname !== '/recipes';

	const handleLogoClick = () => {
		setActiveTab('search'); // Reset to search tab when returning home
	};

	useEffect(() => {
		// A. HANDLE BROWSER BACK/FORWARD (Popstate)
		const handlePopState = () => {
			if (pathname === '/' || pathname === '/recipes') {
				const tabFromUrl = new URLSearchParams(
					window.location.search,
				).get('tab');
				// Update store to match URL, but don't push a new history entry (prevents infinite loops)
				setActiveTab(tabFromUrl || 'search', false);
			}
		};

		window.addEventListener('popstate', handlePopState);

		// B. HANDLE PAGE LOAD / NAVIGATION CHANGE
		// If we navigate to /recent or /shopping-list, update the store state
		if (pathname === '/recent') setActiveTab('recent', false);
		else if (pathname === '/shopping-list')
			setActiveTab('shopping-list', false);
		else if (pathname === '/' || pathname === '/recipes') {
			const tabFromUrl = searchParams.get('tab');
			setActiveTab(tabFromUrl || 'search', false);
		}

		return () => window.removeEventListener('popstate', handlePopState);
	}, [pathname, searchParams, setActiveTab]);

	return (
		<header className="flex flex-row justify-between items-center mr-2">
			<div className="h-10 border-b border-slate-800 flex items-center px-4 backdrop-blur-md z-50">
				<div className="flex items-center gap-3 w-full">
					{isDetailPage ? (
						<Button
							variant="ghost"
							size="sm"
							onClick={() => router.back()}
							className="flex items-center gap-1 -ml-2 text-slate-700 hover:text-cyan-400"
						>
							<ChevronLeft className="w-5 h-5" />
							<span className="font-mono text-xs uppercase tracking-widest">
								Back
							</span>
						</Button>
					) : (
						/* Wrap the logo in a Link */
						<Link
							href="/recipes/"
							onClick={handleLogoClick}
							className="flex items-center gap-2 hover:opacity-80 transition-opacity"
						>
							<UtensilsCrossed className="w-5 h-5 text-cyan-500" />
							<h1 className="font-mono font-bold text-sm tracking-tighter uppercase">
								Recipe_Vault
								<span className="text-cyan-500">.sys</span>
							</h1>
						</Link>
					)}
				</div>
			</div>
			<div className="flex gap-3">
				<ProfileButton />
			</div>
		</header>
	);
}

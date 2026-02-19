'use client';

import { usePathname, useRouter } from 'next/navigation';
import { ChevronLeft, UtensilsCrossed } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TopNav() {
	const pathname = usePathname();
	const router = useRouter();

	// Check if we are on a detail page (e.g., /recipes/miso-ramen-001)
	const isDetailPage =
		pathname.startsWith('/recipes/') && pathname !== '/recipes';

	return (
		<header className="h-10 border-b border-slate-800 flex items-center px-4  backdrop-blur-md z-50">
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
					<div className="flex items-center gap-2">
						<UtensilsCrossed className="w-5 h-5 text-cyan-500" />
						<h1 className="font-mono font-bold text-sm tracking-tighter uppercase">
							Recipe_Vault
							<span className="text-cyan-500">.sys</span>
						</h1>
					</div>
				)}
			</div>
		</header>
	);
}

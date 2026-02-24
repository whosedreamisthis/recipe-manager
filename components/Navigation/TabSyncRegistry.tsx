'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useUIStore } from '@/stores/useUIStore';

export default function TabSyncRegistry() {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const setActiveTab = useUIStore((state) => state.setActiveTab);

	useEffect(() => {
		// This logic now runs AFTER the main UI is interactive
		if (pathname === '/recent') {
			setActiveTab('recent', false);
		} else if (pathname === '/shopping-list') {
			setActiveTab('shopping-list', false);
		} else if (pathname === '/' || pathname === '/recipes') {
			const tabFromUrl = searchParams.get('tab');
			setActiveTab(tabFromUrl || 'search', false);
		}
	}, [pathname, searchParams, setActiveTab]);

	return null; // Renders nothing, just handles logic
}

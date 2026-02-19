'use client';
import { useUIStore } from '@/stores/useUIStore';
import { Clock, Heart, ScrollText, Search } from 'lucide-react';
import React from 'react';

export default function BottomNav() {
	const { activeTab, setActiveTab } = useUIStore();
	return (
		<div className="flex gap-4 justify-around m-2">
			<Search
				onClick={() => setActiveTab('search')}
				className={
					activeTab === 'search' ? 'text-cyan-500' : 'text-slate-400'
				}
			/>
			<Heart
				onClick={() => setActiveTab('favourites')}
				className={
					activeTab === 'favourites'
						? 'text-red-500 fill-red-400'
						: 'text-slate-400'
				}
			/>
			<Clock />
			<ScrollText />
		</div>
	);
}

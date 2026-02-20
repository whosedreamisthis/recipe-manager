'use client';
import { useUIStore } from '@/stores/useUIStore';
import { Clock, Bookmark, ScrollText, Search } from 'lucide-react';
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
			<Bookmark
				onClick={() => setActiveTab('saved')}
				className={
					activeTab === 'saved' ? 'fill-gray-700' : 'text-slate-400'
				}
			/>
			<Clock />
			<ScrollText />
		</div>
	);
}

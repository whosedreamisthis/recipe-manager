'use client';
import { useUIStore } from '@/stores/useUIStore';
import { Clock, Bookmark, ScrollText, Search } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function BottomNav() {
	const { activeTab, setActiveTab } = useUIStore();
	return (
		<div className="flex gap-4 justify-around m-2">
			<Link href="/recipes/">
				<Search
					onClick={() => setActiveTab('search')}
					className={
						activeTab === 'search'
							? 'text-cyan-500'
							: 'text-slate-400'
					}
				/>
			</Link>
			<Link href="/recipes/">
				<Bookmark
					onClick={() => setActiveTab('saved')}
					className={
						activeTab === 'saved'
							? 'fill-cyan-500 text-cyan-500'
							: 'text-slate-400'
					}
				/>
			</Link>

			<Link href="/groceries/">
				<ScrollText
					onClick={() => setActiveTab('groceries')}
					className={
						activeTab === 'groceries'
							? 'text-cyan-500'
							: 'text-slate-400'
					}
				/>
			</Link>
			<Link href="/recent/">
				<Clock
					onClick={() => setActiveTab('recent')}
					className={
						activeTab === 'recent'
							? 'text-cyan-500'
							: 'text-slate-400'
					}
				/>
			</Link>
		</div>
	);
}

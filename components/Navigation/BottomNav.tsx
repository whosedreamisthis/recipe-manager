'use client';
import { useCategoryStore } from '@/stores/useCategoryStore';
import { useSearchStore } from '@/stores/useSearchStore';
import { useUIStore } from '@/stores/useUIStore';
import { Clock, Bookmark, ScrollText, Search, Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function BottomNav() {
	const { activeTab, setActiveTab } = useUIStore();
	const setQuery = useSearchStore((state) => state.setQuery);
	const setCategory = useCategoryStore((state) => state.setCategory);

	const handleTabChange = (newTab: string) => {
		setActiveTab(newTab);
		// Reset filters so the new tab starts "fresh"
		setQuery('');
		setCategory('');
	};

	return (
		<div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-3 flex justify-around items-center z-50">
			{/* 1. SEARCH TAB */}
			<Link
				href="/"
				onClick={() => handleTabChange('search')}
				className="flex flex-col items-center gap-1"
			>
				<Search
					className={`w-6 h-6 transition-colors ${
						activeTab === 'search'
							? 'text-cyan-500'
							: 'text-slate-400'
					}`}
				/>
			</Link>

			{/* 2. SAVED TAB (Uses URL Param) */}
			<Link
				href="/?tab=saved"
				onClick={() => handleTabChange('saved')}
				className="flex flex-col items-center gap-1"
			>
				<Bookmark
					className={`w-6 h-6 transition-colors ${
						activeTab === 'saved'
							? 'fill-cyan-500 text-cyan-500'
							: 'text-slate-400'
					}`}
				/>
			</Link>

			{/* 3. RECENT PAGE */}
			<Link
				href="/recent"
				onClick={() => handleTabChange('recent')}
				className="flex flex-col items-center gap-1"
			>
				<Clock
					className={`w-6 h-6 transition-colors ${
						activeTab === 'recent'
							? 'text-cyan-500'
							: 'text-slate-400'
					}`}
				/>
			</Link>

			{/* 4. GROCERIES PAGE */}
			<Link
				href="/shopping-list"
				onClick={() => handleTabChange('shopping-list')}
				className="flex flex-col items-center gap-1"
			>
				<ScrollText
					className={`w-6 h-6 transition-colors ${
						activeTab === 'shopping-list'
							? 'text-cyan-500'
							: 'text-slate-400'
					}`}
				/>
			</Link>

			<Link
				href="/create"
				onClick={() => handleTabChange('create')}
				className="flex flex-col items-center gap-1"
			>
				<Plus
					className={`w-6 h-6 transition-colors ${
						activeTab === 'create'
							? 'text-cyan-500'
							: 'text-slate-400'
					}`}
				/>
			</Link>
		</div>
	);
}

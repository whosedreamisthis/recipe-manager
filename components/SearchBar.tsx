'use client';
import { Search } from 'lucide-react';
import React, { useState, useEffect } from 'react'; // Added hooks
import { Input } from './ui/input';
import { useSearchStore } from '@/stores/useSearchStore';

export default function SearchBar() {
	const setQuery = useSearchStore((state) => state.setQuery);
	const globalQuery = useSearchStore((state) => state.query);

	// 1. Local state for immediate UI feedback
	const [localValue, setLocalValue] = useState(globalQuery);

	// 2. Debounce effect: Wait 300ms before updating global state
	useEffect(() => {
		const handler = setTimeout(() => {
			setQuery(localValue);
		}, 300);

		return () => clearTimeout(handler);
	}, [localValue, setQuery]);

	return (
		<div className="relative flex flex-row gap-4">
			<Search className="absolute left-2 top-2 text-slate-400" />
			<Input
				className="pl-10 focus-visible:ring-cyan-500"
				placeholder="Search recipes..."
				value={localValue}
				onChange={(e) => setLocalValue(e.target.value)} // Updates local state only
			/>
		</div>
	);
}

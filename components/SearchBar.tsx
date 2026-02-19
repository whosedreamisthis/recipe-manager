'use client';
import { Search } from 'lucide-react';
import React from 'react';
import { Input } from './ui/input';
import { useSearchStore } from '@/stores/useSearchStore';

export default function SearchBar() {
	const query = useSearchStore((state) => state.query);
	const setQuery = useSearchStore((state) => state.setQuery);
	return (
		<div className="relative flex flex-row gap-4">
			<Search className="absolute left-2 top-2" />
			<Input
				className="pl-10"
				value={query}
				onChange={(e) => {
					setQuery(e.target.value);
				}}
			/>
		</div>
	);
}

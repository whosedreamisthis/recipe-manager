import { Clock, Heart, ScrollText, Search } from 'lucide-react';
import React from 'react';

export default function BottomNav() {
	return (
		<div className="flex gap-4 justify-around m-2">
			<Search />
			<Clock />
			<ScrollText />
			<Heart />
		</div>
	);
}

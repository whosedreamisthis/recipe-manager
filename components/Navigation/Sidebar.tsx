import React from 'react';
import Link from 'next/link';
export default function Sidebar() {
	return (
		<aside className="w-64 border-r flex flex-col hidden md:flex">
			<nav className="flex-1 p-4 space-y-2">
				<Link
					href="/recipes"
					className="block p-2 hover:bg-gray-100 rounded"
				>
					Recipe Gallary
				</Link>
				<Link
					href="/settings"
					className="block p-2 hover:bg-gray-100 rounded"
				>
					Settings
				</Link>
			</nav>
		</aside>
	);
}

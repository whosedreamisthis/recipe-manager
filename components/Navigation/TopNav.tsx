export default function TopNav() {
	return (
		<header className="h-16 border-b flex items-center px-6 z-10">
			<div className="font-bold text-xl">My App</div>
			<div className="ml-auto flex gap-4">
				<button className="px-3 py-1 bg-blue-600 text-white rounded">
					Profile
				</button>
			</div>
		</header>
	);
}

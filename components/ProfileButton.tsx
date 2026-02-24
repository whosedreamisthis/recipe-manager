'use client';

import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';
import { User, LogIn, UserPlus } from 'lucide-react';
import { useState, useEffect } from 'react'; // Added
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function ProfileButton() {
	const { isSignedIn, isLoaded } = useUser();
	const [mounted, setMounted] = useState(false);

	// Delay "Heavy" hydration until after the first paint
	useEffect(() => {
		setMounted(true);
	}, []);

	// 1. Placeholder (Matches UserButton size to prevent CLS)
	if (!isLoaded || !mounted) {
		return (
			<div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center">
				<User className="h-4 w-4 text-slate-300" />
			</div>
		);
	}

	// 2. Logged In: Clerk UserButton
	if (isSignedIn) {
		return (
			<div className="h-8 w-8">
				{' '}
				{/* Explicit container to stabilize layout */}
				<UserButton
					afterSignOutUrl="/"
					appearance={{
						elements: {
							avatarBox: 'h-8 w-8',
						},
					}}
				/>
			</div>
		);
	}

	// 3. Logged Out: Custom Dropdown
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				{/* Replaced Button with plain button to save ~10ms of TBT */}
				<button
					className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors outline-none"
					aria-label="User menu"
				>
					<User className="h-5 w-5 text-slate-600" />
				</button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end" className="w-56 z-[100]">
				<DropdownMenuLabel>Account</DropdownMenuLabel>
				<DropdownMenuSeparator />

				<SignInButton mode="modal">
					<DropdownMenuItem
						onSelect={(e) => e.preventDefault()}
						className="cursor-pointer"
					>
						<LogIn className="mr-2 h-4 w-4" />
						<span>Log In</span>
					</DropdownMenuItem>
				</SignInButton>

				<SignUpButton mode="modal">
					<DropdownMenuItem
						onSelect={(e) => e.preventDefault()}
						className="cursor-pointer"
					>
						<UserPlus className="mr-2 h-4 w-4" />
						<span>Sign Up</span>
					</DropdownMenuItem>
				</SignUpButton>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

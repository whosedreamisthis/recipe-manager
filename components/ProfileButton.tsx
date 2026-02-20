'use client';

import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';
import { User, LogIn, UserPlus } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export default function ProfileButton() {
	const { isSignedIn, isLoaded } = useUser();

	// 1. Prevent "flash" of sign-in button while Clerk loads
	if (!isLoaded)
		return (
			<div className="h-8 w-8 rounded-full bg-slate-100 animate-pulse" />
		);

	// 2. If logged in, show Clerk's built-in UserButton
	if (isSignedIn) {
		return (
			<UserButton
				afterSignOutUrl="/"
				appearance={{
					elements: {
						avatarBox: 'h-8 w-8',
					},
				}}
			/>
		);
	}

	// 3. If logged out, show our custom Dropdown with Clerk's logic
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon" className="rounded-full">
					<User className="h-5 w-5 text-slate-600" />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end" className="w-56">
				<DropdownMenuLabel>Account</DropdownMenuLabel>
				<DropdownMenuSeparator />

				<SignInButton mode="modal">
					<DropdownMenuItem onSelect={(e) => e.preventDefault()}>
						<LogIn className="mr-2 h-4 w-4" />
						<span>Log In</span>
					</DropdownMenuItem>
				</SignInButton>

				<SignUpButton mode="modal">
					<DropdownMenuItem onSelect={(e) => e.preventDefault()}>
						<UserPlus className="mr-2 h-4 w-4" />
						<span>Sign Up</span>
					</DropdownMenuItem>
				</SignUpButton>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

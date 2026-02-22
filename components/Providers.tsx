'use client';
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function Providers({ children }: { children: React.ReactNode }) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						// Prevent frequent background re-fetches that block the UI thread
						staleTime: 1000 * 60 * 5, // 5 minutes
						gcTime: 1000 * 60 * 60 * 24, // 24 hours
						refetchOnWindowFocus: false, // Prevents a re-render every time you switch tabs
					},
				},
			}),
	);
	return (
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	);
}

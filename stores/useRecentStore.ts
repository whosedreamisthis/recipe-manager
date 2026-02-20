import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RecentState {
	recentIds: string[];
	addToRecent: (id: string) => void;
}

export const useRecentStore = create<RecentState>()(
	persist(
		(set) => ({
			recentIds: [],
			addToRecent: (id) =>
				set((state) => {
					// 1. Remove the ID if it already exists (to avoid duplicates)
					const filtered = state.recentIds.filter(
						(existingId) => existingId !== id,
					);

					// 2. Add to the front and limit to 10
					const updated = [id, ...filtered].slice(0, 10);

					return { recentIds: updated };
				}),
		}),
		{ name: 'recent-recipes' },
	),
);

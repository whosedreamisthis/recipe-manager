import { create } from 'zustand';

type SearchType = {
	query: string;
	setQuery: (q: string) => void;
};

export const useSearchStore = create<SearchType>((set) => ({
	query: '',
	setQuery: (q) =>
		set({
			query: q,
		}),
}));

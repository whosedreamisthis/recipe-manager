// stores/useUIStore.ts (or add to your Category store)
import { create } from 'zustand';

type UIType = {
	activeTab: string;
	setActiveTab: (tab: string) => void;
};
export const useUIStore = create<UIType>((set) => ({
	activeTab: 'search', // 'search' | 'favourites' | 'recent'
	setActiveTab: (tab) => set({ activeTab: tab }),
}));

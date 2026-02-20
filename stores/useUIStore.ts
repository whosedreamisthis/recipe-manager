// stores/useUIStore.ts
import { create } from 'zustand';

type UIType = {
	activeTab: string;
	setActiveTab: (tab: string, shouldPush?: boolean) => void;
};

export const useUIStore = create<UIType>((set) => ({
	activeTab: 'search',
	setActiveTab: (tab, shouldPush = true) => {
		// Only push to history if we are toggling between 'search' and 'saved' on the home page
		if (shouldPush && (tab === 'search' || tab === 'saved')) {
			const url = tab === 'search' ? '/' : '/?tab=saved';
			window.history.pushState({ tab }, '', url);
		}
		set({ activeTab: tab });
	},
}));

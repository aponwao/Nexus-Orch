import { create } from 'zustand';

interface UIState {
  isRightSidebarOpen: boolean;
  activeModal: string | null;
  toggleRightSidebar: () => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isRightSidebarOpen: true,
  activeModal: null,
  toggleRightSidebar: () => set((state) => ({ isRightSidebarOpen: !state.isRightSidebarOpen })),
  openModal: (modalId: string) => set({ activeModal: modalId }),
  closeModal: () => set({ activeModal: null }),
}));

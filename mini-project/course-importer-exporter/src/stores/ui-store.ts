import { create } from 'zustand';

interface UIState { 
    page: number;
    setPage: (page: number) => void;

    modalIsOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
    page: 1,
    setPage: (page) => set({ page }), 

    modalIsOpen: false,
    openModal: () => set({ modalIsOpen: true }),
    closeModal: () => set({ modalIsOpen: false }),
}));
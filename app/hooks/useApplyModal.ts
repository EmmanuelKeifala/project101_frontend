/** @format */

import { create } from "zustand";

interface ApplyModalStore {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

const useApplyModal = create<ApplyModalStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));

export default useApplyModal;

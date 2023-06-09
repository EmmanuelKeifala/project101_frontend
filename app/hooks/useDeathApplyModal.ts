/** @format */

import { create } from "zustand";

interface DeathApplyModalStore {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

const useDeathApplyModal = create<DeathApplyModalStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));

export default useDeathApplyModal;

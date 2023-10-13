import { create } from 'zustand';

interface CancelModalStore {
	targetOrderId: string | undefined;
	setOrder: (orderId: string) => void;
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

const useCancelModal = create<CancelModalStore>((set) => ({
	targetOrderId: undefined,
	setOrder: (orderId: string) => set((state) => ({ ...state, targetOrderId: orderId })),
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));

export default useCancelModal;

import { create } from 'zustand';
import { ClientUser } from '../types';

interface CancelModalStore {
	isOpen: boolean;
	targetOrderId: string | undefined;
	targetUser: ClientUser | undefined;
	setOrder: (orderId: string) => void;
	setUser: (orderId: ClientUser) => void;
	onOpen: () => void;
	onClose: () => void;
}

const useCancelModal = create<CancelModalStore>((set) => ({
	isOpen: false,
	targetOrderId: undefined,
	targetUser: undefined,
	setOrder: (orderId: string) => set((state) => ({ ...state, targetOrderId: orderId })),
	setUser: (user: ClientUser) => set((state) => ({ ...state, targetUser: user })),
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));

export default useCancelModal;

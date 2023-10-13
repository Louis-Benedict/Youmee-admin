import { create } from 'zustand'

interface AddEnrolleeModalStore {
    isOpen: boolean
    currentUserId: string
    selectCurrentUser: (currentUserId: any) => void
    onOpen: () => void
    onClose: () => void
}

const useAddEnrolleeModal = create<AddEnrolleeModalStore>((set) => ({
    currentUserId: '',
    selectCurrentUser: (currentUserId: any) => set({ currentUserId }),
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))

export default useAddEnrolleeModal

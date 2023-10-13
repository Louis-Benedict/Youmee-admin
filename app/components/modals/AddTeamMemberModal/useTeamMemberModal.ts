import { create } from 'zustand'

interface AddTeamMemberModalStore {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

const useAddTeamMemberModal = create<AddTeamMemberModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))

export default useAddTeamMemberModal

import { TeamMember } from '@/app/(dashboard)/team/queries'
import { create } from 'zustand'

interface useConfirmDialogStore {
    id: string
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
    setId: (id: string) => void
}

const useConfirmDialog = create<useConfirmDialogStore>((set) => ({
    id: '',
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    setId: (id: string) => set({ id }),
}))

export default useConfirmDialog

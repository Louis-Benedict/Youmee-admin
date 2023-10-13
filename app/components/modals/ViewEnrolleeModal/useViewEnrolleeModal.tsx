import { Enrollee, User } from '@prisma/client'
import { create } from 'zustand'

interface useViewEnrolleeModalStore {
    selectedEnrollee: Enrollee | undefined
    selectEnrollee: (selectedEnrollee: any) => void

    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

const useViewEnrolleeModal = create<useViewEnrolleeModalStore>((set) => ({
    selectedEnrollee: undefined,
    isOpen: false,

    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    selectEnrollee: (selectedEnrollee: any) => set({ selectedEnrollee }),
}))

export default useViewEnrolleeModal

import { TeamMember } from '@/app/(dashboard)/team/queries'
import { create } from 'zustand'

interface useEditTeamMemberModalStore {
    selectedTeamMember: TeamMember | undefined
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
    selectTeamMember: (selectedTeamMember: any) => void
}

const useEditTeamMemberModal = create<useEditTeamMemberModalStore>((set) => ({
    selectedTeamMember: undefined,
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    selectTeamMember: (selectedTeamMember: any) => set({ selectedTeamMember }),
}))

export default useEditTeamMemberModal

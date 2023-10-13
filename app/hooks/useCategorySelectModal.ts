import { create } from 'zustand'
import { ClientCategory } from '../types'

interface CategorySelectModal {
    isOpen: boolean
    categories: ClientCategory[]
    selectedCategory: ClientCategory | null
    setCategories: (categories: ClientCategory[]) => void
    setSelectedCategory: (label: string) => void
    onOpen: () => void
    onClose: () => void
}

const useCategorySelectModal = create<CategorySelectModal>((set, get) => ({
    categories: [],
    selectedCategory: null,
    isOpen: false,
    setCategories: (categories: ClientCategory[]) => set({ categories }),
    setSelectedCategory: (label: string) =>
        set((state) => ({
            selectedCategory: state.categories.find((category) => {
                return category.label == label.toUpperCase()
            }),
        })),

    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))

export default useCategorySelectModal

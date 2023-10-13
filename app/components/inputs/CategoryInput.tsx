'use client'

import { Icon } from 'lucide-react'

interface CategoryBoxProps {
    icon: Icon
    label: string
    selected?: boolean
    onClick: (value: string) => void
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
    icon: Icon,
    label,
    selected,
    onClick,
}) => {
    return (
        <div
            onClick={() => onClick(label)}
            className={`
        rounded-md
        p-2
		border-[1px]
        flex
		flex-col
		justify-around
		items-center
        ${selected && 'border-neutral-500 dark:text-white text-primary-dark'}
        gap-2
        hover:dark:bg-primary-dark dark:bg-primary-dark bg-white
        transition
        cursor-pointer
      `}
        >
            <Icon size={26} />
            <div className="text-xs font-semibold">{label}</div>
        </div>
    )
}

export default CategoryBox

'use client';
import useCategorySelectModal from '@/app/hooks/useCategorySelectModal';
import { ChevronDown } from 'lucide-react';
import { FC } from 'react';

interface CategorySearchBarSelectorProps {
	title: string;
	onOpen: () => void;
	onClose: () => void;
}

const CategorySearchBarSelector: FC<CategorySearchBarSelectorProps> = ({
	title,
	onClose,
	onOpen,
}) => {
	return (
		<div
			onClick={onOpen}
			className='text-xs   font-semibold border-[1px] border-neutral-800 text-neutral-300 dark:bg-primary-dark bg-white hover:bg-secondary-dark rounded-xl'>
			<div className='pl-3 p-2 flex flex-row items-center'>
				<div>{title}</div>
				<div>
					<ChevronDown size={20} />
				</div>
			</div>
		</div>
	);
};

export default CategorySearchBarSelector;

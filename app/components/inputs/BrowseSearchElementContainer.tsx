'use client';

import CategorySearchBarSelector from './BrowseSearchElement';
import useCategorySelectModal from '@/app/hooks/useCategorySelectModal';
import useCategorySelectPriceModal from '@/app/hooks/useCategorySelectPriceModal';
import { useEffect, useRef } from 'react';

export default function BrowseSearchElementContainer() {
	const { onOpen: categoryOnOpen, onClose: categoryOnClose } = useCategorySelectModal();

	const selectedCategoryLabel = useCategorySelectModal((state) => state.selectedCategory?.label);

	const {
		onOpen: categorySelectPriceOnOpen,
		onClose: categorySelectPriceOnClose,
		upperBound,
		lowerBound,
	} = useCategorySelectPriceModal();

	return (
		<div className='flex flex-row items-end gap-4 ml-4'>
			<CategorySearchBarSelector
				onOpen={categoryOnOpen}
				onClose={categoryOnClose}
				title={selectedCategoryLabel ?? 'Categories'}
			/>
			<CategorySearchBarSelector
				onOpen={categorySelectPriceOnOpen}
				onClose={categorySelectPriceOnClose}
				title={`${lowerBound}$ - ${upperBound}$`}
			/>
		</div>
	);
}

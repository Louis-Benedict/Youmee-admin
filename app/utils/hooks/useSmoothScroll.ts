import { MutableRefObject, useCallback, useEffect, useRef } from 'react';

const useSmoothScroll = (
	itemsLength: number,
	sizeRef: MutableRefObject<HTMLDivElement | null>
) => {
	const sliderRef = useRef<HTMLDivElement | null>(null);
	const amountToMoveRef = useRef(0);

	useEffect(() => {
		const recalculateAmountToMove = () => {
			if (sizeRef.current && itemsLength > 0) {
				amountToMoveRef.current = sizeRef.current.offsetWidth / itemsLength;
			}
		};

		recalculateAmountToMove();

		// Recalculate amountToMove whenever the itemsLength or sizeRef changes
		window.addEventListener('resize', recalculateAmountToMove);
		return () => {
			window.removeEventListener('resize', recalculateAmountToMove);
		};
	}, [itemsLength, sizeRef]);

	const slideLeft = useCallback(() => {
		if (sliderRef.current && amountToMoveRef.current) {
			sliderRef.current.scrollTo({
				left: sliderRef.current.scrollLeft - amountToMoveRef.current,
				behavior: 'smooth',
			});
		}
	}, []);

	const slideRight = useCallback(() => {
		if (sliderRef.current && amountToMoveRef.current) {
			sliderRef.current.scrollTo({
				left: sliderRef.current.scrollLeft + amountToMoveRef.current,
				behavior: 'smooth',
			});
		}
	}, []);

	return { sliderRef, slideLeft, slideRight };
};

export default useSmoothScroll;

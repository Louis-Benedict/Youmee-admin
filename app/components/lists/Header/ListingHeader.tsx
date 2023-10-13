import { FC } from 'react';
import SlideLeftButton from '../../ui/Button/SlideLeftButton';
import Heading from '../../ui/Heading';
import SlideRightButton from '../../ui/Button/SlideRightButton';

interface ListingHeaderProps {
	title: string;
	onSlideLeft: () => void;
	onSlideRight: () => void;
}

const ListingHeader: FC<ListingHeaderProps> = ({
	title,
	onSlideLeft,
	onSlideRight,
}) => {
	return (
		<div className='flex items-center justify-between mb-2'>
			<Heading title={title} />
			{onSlideLeft && onSlideRight && (
				<div className='hidden md:flex items-center flex-row gap-2 justify-end'>
					<SlideLeftButton onClick={onSlideLeft} />
					<SlideRightButton onClick={onSlideRight} />
				</div>
			)}
		</div>
	);
};

export default ListingHeader;

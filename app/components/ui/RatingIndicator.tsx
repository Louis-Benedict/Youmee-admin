import { Star } from 'lucide-react';
import { FC } from 'react';

interface RatingIndicatorProps {
	rating: number | null;
}

const RatingIndicator: FC<RatingIndicatorProps> = ({ rating }) => {
	return (
		<>
			<Star
				size={12}
				className='fill-yellow-500 mr-0.5  text-yellow-500'
			/>
			<span className='text-secondary-font-dark'>{rating ?? '-'}</span>
		</>
	);
};

export default RatingIndicator;

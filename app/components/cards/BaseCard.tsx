import { FC } from 'react';

interface BaseCardProps {
	title: React.ReactElement | string;
	body: React.ReactElement | string;
	footer?: React.ReactElement | string;
	cta?: VoidFunction;
}

const BaseCard: FC<BaseCardProps> = ({ title, body, footer, cta }) => {
	return (
		<div
			onClick={cta}
			className='flex flex-col gap-2 text-xs dark:bg-secondary-dark text-secondary-font-dark rounded-md p-4'>
			<div className='text-sm font-bold dark:text-white text-primary-dark flex flex-row items-center gap-2'>
				{title}
			</div>
			<div>{body}</div>
			<div className='flex flex-row gap-2 mt-2'>{footer}</div>
		</div>
	);
};

export default BaseCard;
